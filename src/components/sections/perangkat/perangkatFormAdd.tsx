"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createUserPerangkatSchema } from "@/schema/userPerangkatSchema";
import { notifier } from "../../../lib/ToastNotifier";
import { useRouter } from "next/navigation";
import { Spinner } from "../../ui/spinner";
import {
  Eye,
  EyeClosed,
  Image as ImageIcon,
  Trash,
  Upload,
  FileImage,
} from "lucide-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";
import { usePost } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePerangkatDraftStore } from "@/stores/perangkatFormAddDraft";
import { useFormPersist } from "@/hooks/useFormPersist";
import { Skeleton } from "@/components/ui/skeleton";

export default function PerangkatFormAdd() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasSyncedDraft, setHasSyncedDraft] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { post, loading } = usePost(`/protected/perangkat`);

  // Store functions
  const {
    data: draft,
    updateDraft,
    clearDraft,
    isHydrated,
  } = usePerangkatDraftStore();

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Default values yang kosong (untuk server render)
  const defaultValues = useMemo(
    () => ({
      name: "",
      email: "",
      role: "PERANGKAT_DESA" as const,
      jabatan: "",
      password: "",
      isActive: true,
      confirmPassword: "",
    }),
    [],
  );

  // Setup form
  const form = useForm<z.infer<typeof createUserPerangkatSchema>>({
    resolver: zodResolver(createUserPerangkatSchema),
    defaultValues,
  });

  // 🔥 SYNC DRAFT DATA - TAPI HANYA SETELAH MOUNTED & TIDAK DI SERVER
  useEffect(() => {
    if (!isMounted || hasSyncedDraft) return;

    // Tunggu store hydrated dan ada draft
    if (isHydrated && draft) {
      const hasDraftData =
        draft.name || draft.email || draft.jabatan || draft.imagePreview;

      if (hasDraftData) {
        console.log("Syncing draft data to form...", draft);

        // Gunakan setValue individual, bukan reset() untuk menghindari re-render besar
        if (draft.name) form.setValue("name", draft.name);
        if (draft.email) form.setValue("email", draft.email);
        if (draft.role) form.setValue("role", draft.role);
        if (draft.jabatan) form.setValue("jabatan", draft.jabatan);
        if (draft.isActive !== undefined)
          form.setValue("isActive", draft.isActive);

        // ✅ Sync image preview dari draft
        if (draft.imagePreview) {
          setImagePreview(draft.imagePreview);
          console.log("Image preview loaded from draft");
        }

        setHasSyncedDraft(true);
        notifier.info("Draft Dimuat", "Data draft sebelumnya telah dimuat");
      }
    }
  }, [isMounted, isHydrated, draft, form, hasSyncedDraft]);

  const role = useWatch({ name: "role", control: form.control });

  useFormPersist(
    form.watch,
    (safeData) => {
      if (!isMounted) return;
      updateDraft({
        name: safeData?.name || "",
        email: safeData?.email || "",
        role: safeData?.role || "PERANGKAT_DESA",
        jabatan: safeData?.jabatan || "",
        isActive: safeData?.isActive ?? true,
        imagePreview: imagePreview || undefined,
        imageFileName: imageFile?.name,
        imageSize: imageFile?.size,
      });
    },
    {
      skipFields: ["password", "confirmPassword", "image"],
      waitTime: 800,
      isActive: !isSubmitting && isMounted,
    },
  );

  // Effect untuk role change - hanya di client
  useEffect(() => {
    if (!isMounted) return;

    if (role === "LURAH") {
      form.setValue("jabatan", "Lurah");
    } else {
      form.setValue("jabatan", "");
    }
  }, [role, form, isMounted]);

  // Handler untuk image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran
      if (file.size > 5 * 1024 * 1024) {
        notifier.error("Error", "Ukuran gambar maksimal 5MB");
        return;
      }

      // Validasi tipe
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        notifier.error("Error", "Format gambar harus JPG, PNG, atau WEBP");
        return;
      }

      setImageFile(file);

      // Preview image (base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);

        // ✅ Simpan ke draft
        updateDraft({
          imagePreview: base64,
          imageFileName: file.name,
          imageSize: file.size,
        });
      };
      reader.readAsDataURL(file);

      // Set value ke form
      form.setValue("image", file);
    }
  };

  // Handler untuk hapus gambar
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    form.setValue("image", undefined);

    // ✅ Clear dari draft
    updateDraft({
      imagePreview: undefined,
      imageFileName: undefined,
      imageSize: undefined,
    });
  };

  // Handler untuk reset dengan clear draft
  const handleReset = useCallback(() => {
    form.reset(defaultValues);
    clearDraft();
    setImageFile(null);
    setImagePreview(null);
    setHasSyncedDraft(false);
    notifier.info("Reset", "Form telah direset dan draft dihapus");
  }, [form, clearDraft, defaultValues]);

  async function onSubmit(data: z.infer<typeof createUserPerangkatSchema>) {
    setIsSubmitting(true);
    try {
      // Buat FormData untuk upload file
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("role", data.role);
      formData.append("isActive", data.isActive.toString());

      if (data.jabatan) {
        formData.append("jabatan", data.jabatan);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Kirim FormData (bukan JSON)
      const res = await post(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notifier.success(
        "Berhasil",
        res?.message || "Perangkat desa berhasil ditambahkan",
      );

      // Clear draft setelah sukses
      clearDraft();

      router.back();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.log(err);
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan pada server",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLoading = loading || isSubmitting;

  // Cek apakah ada draft data
  const hasDraft = useMemo(() => {
    if (!draft || !isMounted) return false;
    return !!(draft.name || draft.email || draft.jabatan || draft.imagePreview);
  }, [draft, isMounted]);

  // Cek apakah ada image draft
  const hasImageDraft = useMemo(() => {
    return !!draft?.imagePreview;
  }, [draft]);

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="mb-4">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Nama */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Role Select */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Jabatan */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-32 w-32 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-12" />
            </div>
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-12" />
            </div>
          </div>

          {/* Status Switch */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-6 w-11 rounded-full" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-full sm:w-36 rounded-md" />
          <Skeleton className="h-10 w-full sm:w-44 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Loading State untuk Hydration */}
      {!isHydrated && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Spinner className="size-4 text-yellow-600" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Memuat draft tersimpan...
            </p>
          </div>
        </div>
      )}

      {/* Draft Status Indicator - hanya tampil jika ada draft */}
      {hasDraft && isHydrated && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              ⚡ Draft otomatis disimpan. Data tidak akan hilang saat halaman
              direfresh.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Grid untuk field nama dan email agar lebih rapi di layar besar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama */}
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Nama{" "}
                  {draft?.name && isHydrated && (
                    <span className="text-green-600 dark:text-green-400 text-xs font-normal">
                      • Draft tersimpan
                    </span>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  readOnly={isLoading}
                  placeholder="Nama lengkap"
                  className="transition-shadow focus:ring-2 focus:ring-blue-500"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Email{" "}
                  {draft?.email && isHydrated && (
                    <span className="text-green-600 dark:text-green-400 text-xs font-normal">
                      • Draft tersimpan
                    </span>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  readOnly={isLoading}
                  type="email"
                  placeholder="contoh@email.com"
                  className="transition-shadow focus:ring-2 focus:ring-blue-500"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Role dan Jabatan - bisa digrid juga jika diperlukan, tapi jabatan dinamis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Role */}
          <Controller
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Role</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    suppressHydrationWarning
                    className="w-full transition-shadow focus:ring-2 focus:ring-blue-500"
                  >
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent suppressHydrationWarning>
                    <SelectItem value="PERANGKAT_DESA">
                      Perangkat Desa
                    </SelectItem>
                    <SelectItem value="LURAH">Lurah</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Jabatan - hanya tampil untuk PERANGKAT_DESA */}
          {role === "PERANGKAT_DESA" && (
            <Controller
              control={form.control}
              name="jabatan"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Jabatan{" "}
                    {draft?.jabatan && isHydrated && (
                      <span className="text-green-600 dark:text-green-400 text-xs font-normal">
                        • Draft tersimpan
                      </span>
                    )}
                  </FieldLabel>
                  <Input
                    {...field}
                    readOnly={isLoading}
                    placeholder="Jabatan perangkat"
                    className="transition-shadow focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </div>

        {/* Upload Gambar */}
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="flex items-center gap-2">
                Foto Profil
                {hasImageDraft && isHydrated && (
                  <span className="text-green-600 dark:text-green-400 text-xs font-normal">
                    • Draft tersimpan
                  </span>
                )}
              </FieldLabel>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Preview Image */}
                <div className="flex-1 max-w-xs mx-auto md:mx-0">
                  {imagePreview ? (
                    <div className="relative w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 cursor-pointer opacity-90 hover:opacity-100 shadow-lg"
                        onClick={handleRemoveImage}
                        disabled={isLoading}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      {hasImageDraft && isHydrated && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <FileImage className="h-3 w-3" />
                          Draft
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Belum ada foto
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button & Info */}
                <div className="flex-1 space-y-4">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e.target.files?.[0]);
                    }}
                    disabled={isLoading}
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                  />
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg space-y-1">
                    <FieldDescription className="text-sm flex items-center gap-1">
                      <span className="font-medium">Format:</span> JPG, PNG,
                      WEBP
                    </FieldDescription>
                    <FieldDescription className="text-sm flex items-center gap-1">
                      <span className="font-medium">Ukuran maksimal:</span> 5MB
                    </FieldDescription>
                    <FieldDescription className="text-sm flex items-center gap-1">
                      <span className="font-medium">Rasio:</span> 1:1 (Square)
                    </FieldDescription>
                  </div>

                  {/* Info Draft Image */}
                  {hasImageDraft && isHydrated && draft?.imageFileName && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileImage className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-700 dark:text-blue-300">
                            {draft.imageFileName}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            {draft.imageSize
                              ? (draft.imageSize / 1024).toFixed(1)
                              : 0}{" "}
                            KB
                            {draft.imageSize &&
                              draft.imageSize > 1024 * 1024 && (
                                <span className="text-red-600 dark:text-red-400 ml-1">
                                  (Melebihi batas, pilih ulang)
                                </span>
                              )}
                          </p>
                          <p className="text-xs text-blue-500 dark:text-blue-500 mt-1">
                            ⚠️ Gambar draft akan hilang jika halaman direfresh.
                            Pilih ulang file untuk memastikan upload.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password dan Confirm Password dalam grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    readOnly={isLoading}
                    placeholder="Masukkan password"
                    className="transition-shadow focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer px-3"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeClosed className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <FieldDescription>
                  Minimal 8 karakter, huruf besar, kecil, angka & simbol
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Konfirmasi Password</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    readOnly={isLoading}
                    placeholder="Konfirmasi password"
                    className="transition-shadow focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer px-3"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeClosed className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Status */}
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <Field className="flex items-center justify-between border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
              <div>
                <FieldLabel className="text-base">Status Aktif</FieldLabel>
                <FieldDescription>Tentukan apakah user aktif</FieldDescription>
              </div>
              <FieldContent>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  suppressHydrationWarning
                  className="data-[state=checked]:bg-blue-600"
                />
              </FieldContent>
            </Field>
          )}
        />

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="cursor-pointer w-full sm:w-auto"
            disabled={isLoading}
          >
            Reset & Hapus Draft
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="size-4" /> Menyimpan...
              </span>
            ) : (
              "Simpan Perangkat"
            )}
          </Button>
        </div>
      </form>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-800 space-y-1">
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>⚡</span> Data otomatis disimpan sebagai draft saat Anda
          berhenti mengetik.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>🔒</span> Password tidak disimpan di draft untuk keamanan.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>💾</span> Draft tetap tersimpan meskipun halaman direfresh.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>📸</span> Gambar disimpan sebagai preview (base64). Pilih ulang
          file gambar sebelum submit untuk memastikan upload berhasil.
        </p>
      </div>
    </div>
  );
}

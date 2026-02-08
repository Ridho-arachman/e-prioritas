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

  // Auto-save persist - hanya di client side
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
        // ✅ Simpan image preview ke draft (base64)
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
      console.log(err);

      const error = err as AxiosError<ApiError>;
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
      <div className="space-y-6">
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
            <div className="flex gap-4">
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
        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-44 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Loading State untuk Hydration */}
      {!isHydrated && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Spinner className="size-4" />
            <p className="text-sm text-yellow-700">Memuat draft tersimpan...</p>
          </div>
        </div>
      )}

      {/* Draft Status Indicator - hanya tampil jika ada draft */}
      {hasDraft && isHydrated && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-blue-700">
              ⚡ Draft otomatis disimpan. Data tidak akan hilang saat halaman
              direfresh.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nama */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Nama{" "}
                {draft?.name && isHydrated && (
                  <span className="text-green-600 text-xs">
                    • Draft tersimpan
                  </span>
                )}
              </FieldLabel>
              <Input
                {...field}
                readOnly={isLoading}
                placeholder="Nama lengkap"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  <span className="text-green-600 text-xs">
                    • Draft tersimpan
                  </span>
                )}
              </FieldLabel>
              <Input
                {...field}
                readOnly={isLoading}
                type="email"
                placeholder="contoh@email.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                <SelectTrigger suppressHydrationWarning>
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent suppressHydrationWarning>
                  <SelectItem value="PERANGKAT_DESA">Perangkat Desa</SelectItem>
                  <SelectItem value="LURAH">Lurah</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                    <span className="text-green-600 text-xs">
                      • Draft tersimpan
                    </span>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  readOnly={isLoading}
                  placeholder="Jabatan perangkat"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {/* Upload Gambar */}
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Foto Profil{" "}
                {hasImageDraft && isHydrated && (
                  <span className="text-green-600 text-xs">
                    • Draft tersimpan
                  </span>
                )}
              </FieldLabel>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Preview Image */}
                <div className="flex-1">
                  {imagePreview ? (
                    <div className="relative w-full aspect-square border-2 border-dashed rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={handleRemoveImage}
                        disabled={isLoading}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      {hasImageDraft && isHydrated && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          <FileImage className="h-3 w-3 inline mr-1" />
                          Draft tersimpan
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Belum ada foto
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button & Info */}
                <div className="flex-1 space-y-3">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e.target.files?.[0]);
                    }}
                    disabled={isLoading}
                    className="cursor-pointer"
                  />
                  <div className="space-y-1">
                    <FieldDescription className="text-sm">
                      <span className="font-medium">Format:</span> JPG, PNG,
                      WEBP
                    </FieldDescription>
                    <FieldDescription className="text-sm">
                      <span className="font-medium">Ukuran maksimal:</span> 5MB
                    </FieldDescription>
                    <FieldDescription className="text-sm">
                      <span className="font-medium">Rasio:</span> 1:1 (Square)
                    </FieldDescription>
                  </div>

                  {/* Info Draft Image */}
                  {hasImageDraft && isHydrated && draft?.imageFileName && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileImage className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-700">
                            {draft.imageFileName}
                          </p>
                          <p className="text-xs text-blue-600">
                            {draft.imageSize
                              ? (draft.imageSize / 1024).toFixed(1)
                              : 0}{" "}
                            KB
                            {draft.imageSize &&
                              draft.imageSize > 1024 * 1024 && (
                                <span className="text-red-600 ml-1">
                                  (Melebihi batas, pilih ulang)
                                </span>
                              )}
                          </p>
                          <p className="text-xs text-blue-500 mt-1">
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
                  placeholder="Masukkan password baru"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              <FieldDescription>
                Minimal 8 karakter, huruf besar, kecil, angka & simbol
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Status */}
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <Field className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <FieldLabel>Status Aktif</FieldLabel>
                <FieldDescription>Tentukan apakah user aktif</FieldDescription>
              </div>
              <FieldContent>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  suppressHydrationWarning
                />
              </FieldContent>
            </Field>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="cursor-pointer"
            disabled={isLoading}
          >
            Reset & Hapus Draft
          </Button>

          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" /> Menyimpan...
              </span>
            ) : (
              "Simpan Perangkat"
            )}
          </Button>
        </div>
      </form>

      {/* Footer Info */}
      <div className="mt-6 space-y-2">
        <p className="text-xs text-muted-foreground">
          ⚡ Data otomatis disimpan sebagai draft saat Anda berhenti mengetik.
        </p>
        <p className="text-xs text-muted-foreground">
          🔒 Password tidak disimpan di draft untuk keamanan.
        </p>
        <p className="text-xs text-muted-foreground">
          💾 Draft tetap tersimpan meskipun halaman direfresh.
        </p>
        <p className="text-xs text-muted-foreground">
          📸 Gambar disimpan sebagai preview (base64). Pilih ulang file gambar
          sebelum submit untuk memastikan upload berhasil.
        </p>
      </div>
    </>
  );
}

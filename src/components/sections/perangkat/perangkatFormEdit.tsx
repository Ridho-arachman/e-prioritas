"use client";

import z from "zod";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "../../ui/spinner";
import { notifier } from "../../../lib/ToastNotifier";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { updateUserPerangkatSchema } from "@/schema/userPerangkatSchema";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet, usePatch } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Trash, Image as ImageIcon, FileImage } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function PerangkatFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, mutate } = useGet(
    `/protected/perangkat/${id}`,
  );

  const { patch, loading } = usePatch(`/protected/perangkat/${id}`);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof updateUserPerangkatSchema>>({
    resolver: zodResolver(updateUserPerangkatSchema),
    defaultValues: {
      name: "",
      email: "",
      jabatan: "",
      role: undefined,
      isActive: true,
      image: undefined,
    },
  });

  useEffect(() => {
    if (!data) return;

    form.setValue("name", data.name || "");
    form.setValue("email", data.email || "");
    form.setValue("role", data.role || "PERANGKAT_DESA");
    form.setValue("jabatan", data.jabatan || "");
    form.setValue("isActive", data.isActive ?? true);

    setImagePreview(data.image || null);
    setIsImageRemoved(false);
    setImageFile(null);
    setIsInitialLoad(false);

    resetFileInput();
  }, [data]);

  const role = form.watch("role");

  useEffect(() => {
    if (isInitialLoad) return;

    if (role === "LURAH") {
      form.setValue("jabatan", "Lurah");
    }
  }, [role, isInitialLoad]);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      notifier.error("Error", "Ukuran gambar maksimal 5MB");
      resetFileInput();
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifier.error("Error", "Format gambar harus JPG, PNG, atau WEBP");
      resetFileInput();
      return;
    }

    setImageFile(file);
    setIsImageRemoved(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    form.setValue("image", file);
    resetFileInput();
  };

  const handleRemoveImage = () => {
    if (!data?.image && !imagePreview) return;

    setImagePreview(null);
    setImageFile(null);
    setIsImageRemoved(true);
    form.setValue("image", undefined);
    resetFileInput();
  };

  const handleResetConfirm = () => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("email", data.email);
      form.setValue("role", data.role);
      form.setValue("jabatan", data.jabatan || "");
      form.setValue("isActive", data.isActive);
      setImagePreview(data.image || null);
      setImageFile(null);
      setIsImageRemoved(false);
    }
    resetFileInput();
    setResetDialogOpen(false);
  };

  if (isLoading && !data) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-32 w-32 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof updateUserPerangkatSchema>) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("jabatan", data.jabatan || "");
      formData.append("role", data.role);
      formData.append("isActive", data.isActive.toString());

      if (isImageRemoved && !imageFile) {
        formData.append("removeImage", "true");
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await patch(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notifier.success(
        "Berhasil",
        res?.message || "Perangkat desa berhasil diperbarui",
      );
      resetFileInput();
      router.back();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan pada server",
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Grid untuk Nama dan Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama */}
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nama</FieldLabel>
                <Input
                  {...field}
                  readOnly={loading}
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
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  readOnly={loading}
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

        {/* Foto Profil */}
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Foto Profil</FieldLabel>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Preview Image */}
                <div className="flex-1 max-w-xs mx-auto md:mx-0">
                  {imagePreview && !isImageRemoved ? (
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
                        className="absolute top-2 right-2 z-50 opacity-90 hover:opacity-100 shadow-lg"
                        onClick={handleRemoveImage}
                        disabled={loading}
                        style={{ zIndex: 100 }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      {!imageFile && data?.image && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-40 flex items-center gap-1">
                          <FileImage className="h-3 w-3" />
                          Foto saat ini
                        </div>
                      )}
                      {imageFile && (
                        <div className="absolute bottom-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded-full z-40 flex items-center gap-1">
                          <FileImage className="h-3 w-3" />
                          Preview baru
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {isImageRemoved ? "Foto dihapus" : "Belum ada foto"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button & Info */}
                <div className="flex-1 space-y-4">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleImageChange}
                    disabled={loading}
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
                  {!imagePreview && data?.image && !isImageRemoved && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileImage className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-700 dark:text-blue-300">
                            Foto profil saat ini tersimpan
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            Pilih file baru untuk mengganti foto
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

        {/* Grid untuk Role dan Jabatan */}
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
                  disabled={loading}
                  key={field.value || "default"}
                >
                  <SelectTrigger className="w-full transition-shadow focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
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

          {/* Jabatan */}
          <Controller
            control={form.control}
            name="jabatan"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Jabatan</FieldLabel>
                <Input
                  {...field}
                  readOnly={loading || role === "LURAH"}
                  placeholder={role === "LURAH" ? "Lurah" : "Jabatan perangkat"}
                  value={role === "LURAH" ? "Lurah" : field.value}
                  className="transition-shadow focus:ring-2 focus:ring-blue-500"
                />
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
                  disabled={loading}
                  className="data-[state=checked]:bg-blue-600"
                />
              </FieldContent>
            </Field>
          )}
        />

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          {/* Tombol Reset dengan AlertDialog */}
          <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="cursor-pointer w-full sm:w-auto"
              >
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Batalkan perubahan?</AlertDialogTitle>
                <AlertDialogDescription>
                  Semua perubahan yang belum disimpan akan hilang. Data akan
                  kembali ke keadaan awal.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetConfirm}>
                  Ya, Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="size-4" /> Menyimpan...
              </span>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-800 space-y-1">
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>⚡</span> Pastikan semua data terisi dengan benar sebelum
          disimpan.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>📸</span> Foto profil bersifat opsional. Biarkan kosong jika
          tidak ingin mengubah.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span>🗑️</span> Klik tombol hapus pada foto untuk menghapus foto
          profil saat ini.
        </p>
      </div>
    </div>
  );
}

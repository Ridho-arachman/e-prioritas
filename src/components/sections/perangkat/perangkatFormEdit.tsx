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
  const [isInitialLoad, setIsInitialLoad] = useState(true); // ✅ Tambahkan state ini

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

  // ✅ PERBAIKAN 1: Hanya depend on [data], HAPUS form dari dependency
  useEffect(() => {
    if (!data) return;

    // ✅ Set nilai form dengan benar
    form.setValue("name", data.name || "");
    form.setValue("email", data.email || "");
    form.setValue("role", data.role || "PERANGKAT_DESA"); // ✅ Pastikan ada default value
    form.setValue("jabatan", data.jabatan || "");
    form.setValue("isActive", data.isActive ?? true);

    setImagePreview(data.image || null);
    setIsImageRemoved(false);
    setImageFile(null);
    setIsInitialLoad(false); // ✅ Set initial load selesai

    resetFileInput();
  }, [data]); // ✅ HANYA [data]

  // ✅ PERBAIKAN 2: Gunakan form.watch() bukan useWatch untuk initial value
  const role = form.watch("role");

  // ✅ PERBAIKAN 3: Hanya jalankan saat bukan initial load
  useEffect(() => {
    if (isInitialLoad) return; // ✅ Skip saat initial load

    if (role === "LURAH") {
      form.setValue("jabatan", "Lurah");
    } else if (role === "PERANGKAT_DESA") {
      // Biarkan jabatan tetap seperti yang ada di data
      // Tidak perlu reset ke kosong
    }
  }, [role, isInitialLoad]); // ✅ Tambahkan isInitialLoad ke dependency

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
    if (!confirm("Apakah Anda yakin ingin menghapus foto profil?")) return;

    setImagePreview(null);
    setImageFile(null);
    setIsImageRemoved(true);
    form.setValue("image", undefined);
    resetFileInput();
  };

  if (isLoading && !data) {
    return (
      <div className="space-y-4 animate-pulse">
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
          <div className="flex gap-4">
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
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nama */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nama</FieldLabel>
              <Input {...field} readOnly={loading} placeholder="Nama lengkap" />
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
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                readOnly={loading}
                type="email"
                placeholder="contoh@email.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Foto Profil */}
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Foto Profil</FieldLabel>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  {imagePreview && !isImageRemoved ? (
                    <div className="relative w-full aspect-square border-2 border-dashed rounded-xl overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 z-50"
                        onClick={handleRemoveImage}
                        disabled={loading}
                        style={{ zIndex: 100 }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      {!imageFile && data?.image && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-40">
                          <FileImage className="h-3 w-3 inline mr-1" />
                          Foto saat ini
                        </div>
                      )}
                      {imageFile && (
                        <div className="absolute bottom-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded z-40">
                          <FileImage className="h-3 w-3 inline mr-1" />
                          Preview baru
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-square border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/30">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {isImageRemoved ? "Foto dihapus" : "Belum ada foto"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleImageChange}
                    disabled={loading}
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
                  {!imagePreview && data?.image && !isImageRemoved && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileImage className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-700">
                            Foto profil saat ini tersimpan
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
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

        {/* Role - ✅ PERBAIKAN: Tambahkan key berdasarkan value */}
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
                key={field.value || "default"} // ✅ Force re-render saat value berubah
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERANGKAT_DESA">Perangkat Desa</SelectItem>
                  <SelectItem value="LURAH">Lurah</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Jabatan - ✅ PERBAIKAN: Tampilkan untuk semua role, tapi disabled untuk LURAH */}
        <Controller
          control={form.control}
          name="jabatan"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Jabatan</FieldLabel>
              <Input
                {...field}
                readOnly={loading || role === "LURAH"} // ✅ Disabled saat LURAH
                placeholder={role === "LURAH" ? "Lurah" : "Jabatan perangkat"}
                value={role === "LURAH" ? "Lurah" : field.value} // ✅ Force value "Lurah" saat role LURAH
              />
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
                  disabled={loading}
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
            onClick={() => {
              if (confirm("Batalkan perubahan?")) {
                // ✅ Reset ke nilai awal dari data
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
              }
            }}
            disabled={loading}
            className="cursor-pointer"
          >
            Reset
          </Button>

          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" /> Menyimpan...
              </span>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4 space-y-2">
        <p className="text-xs text-muted-foreground">
          ⚡ Pastikan semua data terisi dengan benar sebelum disimpan.
        </p>
        <p className="text-xs text-muted-foreground">
          📸 Foto profil bersifat opsional. Biarkan kosong jika tidak ingin
          mengubah.
        </p>
        <p className="text-xs text-muted-foreground">
          🗑️ Klik tombol hapus pada foto untuk menghapus foto profil saat ini.
        </p>
      </div>
    </div>
  );
}

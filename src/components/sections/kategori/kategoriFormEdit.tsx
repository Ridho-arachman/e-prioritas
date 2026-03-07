"use client";

import z from "zod";
import { useEffect } from "react";
import { Spinner } from "../../ui/spinner";
import { notifier } from "../../../lib/ToastNotifier";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { kategoriSchema } from "@/schema/kategoriSchema";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGet, usePut } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { Tag, FileText, Hash, Save, RotateCcw, ArrowLeft } from "lucide-react";

// Simple skeleton dengan gaya yang sama
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

export function KategoriFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGet(`/protected/kategori/${id}`);

  const form = useForm<z.infer<typeof kategoriSchema>>({
    resolver: zodResolver(kategoriSchema),
    defaultValues: {
      code: "",
      nama: "",
      deskripsi: "",
    },
  });

  const { put, loading } = usePut(`/protected/kategori/${id}`);

  // Populate form saat fetch selesai
  useEffect(() => {
    if (data) {
      form.reset({
        nama: data?.nama,
        deskripsi: data?.deskripsi,
        code: data?.code,
      });
    }
  }, [data, form]);

  const handleSubmit = async (data: z.infer<typeof kategoriSchema>) => {
    try {
      const res = await put(data);

      notifier.success(
        "Berhasil",
        res?.message || "Kategori berhasil diperbarui",
      );
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-60" />
        </div>

        <div className="flex justify-end gap-3 pt-8 border-t border-border">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl shadow-lg shadow-primary/5 p-4 md:p-6">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Code Kategori */}
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label
                  htmlFor="code"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  Code Kategori
                </Label>
                <Input
                  {...field}
                  id="code"
                  placeholder="Contoh: KAT001, INFRA001..."
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                  className="w-full transition-shadow focus:ring-2 focus:ring-primary/50"
                />
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span>🔤</span> Gunakan format unik untuk kode kategori
                </div>
                {fieldState.invalid && (
                  <FieldError>
                    {fieldState.error?.message || "Wajib diisi"}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Nama Kategori */}
          <Controller
            name="nama"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label
                  htmlFor="nama"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  Nama Kategori
                </Label>
                <Input
                  {...field}
                  id="nama"
                  placeholder="Contoh: Infrastruktur, Kesehatan..."
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                  className="w-full transition-shadow focus:ring-2 focus:ring-primary/50"
                />
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span>🏷️</span> Nama kategori yang akan ditampilkan
                </div>
                {fieldState.invalid && (
                  <FieldError>
                    {fieldState.error?.message || "Wajib diisi"}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Deskripsi */}
          <Controller
            name="deskripsi"
            control={form.control}
            render={({ field, fieldState }) => {
              const charCount = field.value?.length || 0;
              const isOverLimit = charCount >= 500;

              return (
                <Field>
                  <Label
                    htmlFor="deskripsi"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Deskripsi
                  </Label>
                  <Textarea
                    {...field}
                    id="deskripsi"
                    rows={4}
                    placeholder="Tulis deskripsi singkat kategori ini..."
                    disabled={loading}
                    aria-invalid={fieldState.invalid || isOverLimit}
                    className={`w-full max-w-150 resize-y min-h-30 transition-shadow focus:ring-2 focus:ring-primary/50 ${
                      isOverLimit ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    maxLength={500}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <span>📝</span> Opsional
                    </span>
                    <span
                      className={
                        isOverLimit
                          ? "text-red-600 font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {charCount}/500
                    </span>
                  </div>

                  {/* Pesan error dari Zod */}
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}

                  {/* Custom error untuk limit */}
                  {isOverLimit && !fieldState.error && (
                    <FieldError>Maksimal 500 karakter!</FieldError>
                  )}
                </Field>
              );
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="cursor-pointer flex-1 sm:flex-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={() => {
                if (data) {
                  form.reset({
                    code: data.code,
                    nama: data.nama,
                    deskripsi: data.deskripsi,
                  });
                }
              }}
              disabled={loading}
              className="cursor-pointer flex-1 sm:flex-none"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            {loading ? (
              <div className="flex items-center">
                <Spinner className="mr-2 size-4" />
                Menyimpan...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Footer note */}
      <div className="mt-4 text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/50 pt-4">
        <span className="flex items-center gap-1">
          ✏️ Pastikan data yang diubah sudah benar
        </span>
        <span className="flex items-center gap-1">
          📝 Deskripsi maksimal 500 karakter
        </span>
      </div>
    </div>
  );
}

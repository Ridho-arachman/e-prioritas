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

// Simple skeleton
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
      namaKategori: "",
      deskripsi: "",
      status: "AKTIF",
    },
  });

  const { put, loading } = usePut(`/protected/kategori/${id}`);

  // Populate form saat fetch selesai
  useEffect(() => {
    if (data) {
      form.reset({
        namaKategori: data?.namaKategori,
        deskripsi: data?.deskripsi,
        status: data?.status,
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
      <div className="space-y-6">
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

  // ------------------------
  // 🔥 FORM NORMAL
  // ------------------------
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-6">
        {/* Nama Kategori */}
        <Controller
          name="namaKategori"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="namaKategori">Nama Kategori</Label>
              <Input
                {...field}
                id="namaKategori"
                placeholder="Contoh: Infrastruktur, Kesehatan..."
                disabled={loading}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Deskripsi */}
        <Controller
          name="deskripsi"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                {...field}
                id="deskripsi"
                rows={4}
                placeholder="Tulis deskripsi singkat..."
                disabled={loading}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                disabled={loading}
                key={field.value}
              >
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Pilih status kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AKTIF">Aktif</SelectItem>
                  <SelectItem value="NON_AKTIF">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />
      </div>

      <div className="flex justify-end gap-3 pt-8 border-t border-border">
        <Button
          variant="ghost"
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="cursor-pointer"
        >
          Kembali
        </Button>

        <Button type="submit" disabled={loading} className="cursor-pointer">
          {loading ? (
            <div className="flex items-center">
              <Spinner className="mr-2 size-4" />
              Menyimpan...
            </div>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </div>
    </form>
  );
}

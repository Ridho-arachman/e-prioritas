"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { notifier } from "../../../lib/ToastNotifier";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { kategoriSchema } from "@/schema/kategoriSchema";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "../../ui/spinner"; // Pastikan Spinner diekspor dengan benar
import { usePost } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

export function KategoriFormAdd() {
  const router = useRouter();

  const form = useForm<z.infer<typeof kategoriSchema>>({
    resolver: zodResolver(kategoriSchema),
    defaultValues: {
      namaKategori: "",
      deskripsi: "",
      status: "AKTIF",
    },
  });

  const { post, loading } = usePost("/protected/kategori");

  const handleSubmit = async (data: any) => {
    try {
      const res = await post(data);
      notifier.success(
        "Berhasil",
        res?.message || "Kategori berhasil ditambahkan",
      );
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  const formComponent = (
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
                aria-invalid={fieldState.invalid}
                placeholder="Contoh: Infrastruktur, Kesehatan..."
                disabled={loading} // Tambahkan disabled saat loading
              />
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
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                {...field}
                id="deskripsi"
                placeholder="Tulis deskripsi singkat..."
                aria-invalid={fieldState.invalid}
                rows={4}
                disabled={loading} // Tambahkan disabled saat loading
              />
              {fieldState.invalid && (
                <FieldError>
                  {fieldState.error?.message || "Wajib diisi"}
                </FieldError>
              )}
            </Field>
          )}
        />
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
                disabled={loading} // Tambahkan disabled saat loading
              >
                <SelectTrigger id="status" className="w-[240px]">
                  <SelectValue placeholder="Pilih status kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AKTIF">Aktif</SelectItem>
                  <SelectItem value="NON_AKTIF">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError>
                  {fieldState.error?.message || "Wajib diisi"}
                </FieldError>
              )}
            </Field>
          )}
        />
      </div>
      <div className="flex items-center justify-end gap-3 pt-8 border-t border-border">
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
            "Simpan Kategori"
          )}
        </Button>
      </div>
    </form>
  );

  return formComponent;
}

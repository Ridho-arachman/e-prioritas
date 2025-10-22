"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Tambahkan Label dari shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { useCreateKategori } from "@/hooks/api/kategoriHooks";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { kategoriSchema } from "@/schema/kategoriSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifier } from "../ToastNotifier";

// Hapus semua import yang tidak terpakai seperti useParams

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

  const { execute, loading } = useCreateKategori();
  const { errors } = form.formState;

  const handleSubmit = async (data: z.infer<typeof kategoriSchema>) => {
    const res = await execute(
      `/protected/kategori`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      `/protected/kategori` // SWR mutate key
    );
    if (res) {
      router.back();
      notifier.success(res.message || "Kategori berhasil ditambahkan");
    } else {
      notifier.error("Gagal menambahkan kategori");
    }
  };

  return (
    // Menggunakan form.handleSubmit yang diikat ke RHF
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Mulai mengganti FieldGroup dengan div standar 
        dan menggunakan Controller untuk semua field.
      */}
      <div className="space-y-6">
        {/* Nama Kategori */}
        <Controller
          name="namaKategori"
          control={form.control}
          render={({ field, fieldState }) => (
            // Ganti Field dengan div yang dibungkus Field kustom/div standar
            <Field>
              <Label htmlFor="namaKategori">Nama Kategori</Label>
              <Input
                {...field} // Menyebarkan value, onChange, onBlur
                id="namaKategori"
                aria-invalid={fieldState.invalid}
                placeholder="Contoh: Infrastruktur, Kesehatan..."
                // Tidak perlu required di sini, karena sudah ditangani Zod
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
            // Ganti Field dengan div yang dibungkus Field kustom/div standar
            <Field>
              <Label htmlFor="deskripsi">Deskripsi</Label>
              {/* Ganti InputGroup/InputGroupTextarea dengan Textarea shadcn */}
              <Textarea
                {...field} // Menyebarkan value, onChange, onBlur
                id="deskripsi"
                placeholder="Tulis deskripsi singkat..."
                aria-invalid={fieldState.invalid}
                rows={4}
              />
              {/* Anda bisa menambahkan fitur hitungan karakter di sini jika perlu */}
              {fieldState.invalid && (
                <FieldError>
                  {fieldState.error?.message || "Wajib diisi"}
                </FieldError>
              )}
            </Field>
          )}
        />

        {/* Status (Select) */}
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
              >
                <SelectTrigger id="status" className="w-[240px]">
                  <SelectValue placeholder="Pilih status kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AKTIF">Aktif</SelectItem>
                  {/* Pastikan nilai ini sesuai dengan Schema Zod Anda */}
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
        <Button variant="ghost" type="button" onClick={() => router.back()}>
          Kembali
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Kategori"}
        </Button>
      </div>
    </form>
  );
}

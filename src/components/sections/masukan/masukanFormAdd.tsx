"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "../../ui/spinner";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { notifier } from "../../../lib/ToastNotifier";
import { useRouter } from "next/navigation";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { useCreateMasukanWarga } from "@/hooks/api/useMasukanWarga";
import { useGetAllKategoriNoProtected } from "@/hooks/api/useKategori";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "../../ui/select";
import { Kategori } from "@prisma/client";
import { MessageSquare, Mail, MapPin, User, ClipboardList } from "lucide-react";

export default function MasukanWargaFormAdd() {
  const router = useRouter();
  const { execute, loading } = useCreateMasukanWarga();
  const { data, isLoading } = useGetAllKategoriNoProtected();
  const kategori: any = data?.data ?? [];

  const form = useForm<z.infer<typeof createMasukanWargaSchema>>({
    resolver: zodResolver(createMasukanWargaSchema),
    defaultValues: {
      namaPengirim: "",
      emailPengirim: "",
      lokasiRt: "",
      lokasiRw: "",
      deskripsiMasukan: "",
      kategoriId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createMasukanWargaSchema>) {
    const { data: res, error } = await execute(
      "/masukan-warga",
      data,
      { headers: { "Content-Type": "application/json" } },
      "/masukan-warga",
    );

    if (error) {
      notifier.error(error);
      return;
    }

    notifier.success(res?.message || "Masukan warga berhasil dikirim");
    router.back();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100"
    >
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        Form Masukan Warga
      </h2>

      <div className="grid gap-4">
        {/* Nama */}
        <Controller
          control={form.control}
          name="namaPengirim"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  className="pl-9"
                  placeholder="Masukkan nama lengkap"
                  autoComplete="off"
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          control={form.control}
          name="emailPengirim"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="contoh@email.com"
                  autoComplete="off"
                  className="pl-9"
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* RT */}
        <Controller
          control={form.control}
          name="lokasiRt"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>RT</FieldLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Contoh: 003"
                  autoComplete="off"
                  className="pl-9"
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* RW */}
        <Controller
          control={form.control}
          name="lokasiRw"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>RW</FieldLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Contoh: 001"
                  autoComplete="off"
                  className="pl-9"
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Deskripsi */}
        <Controller
          control={form.control}
          name="deskripsiMasukan"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Deskripsi Masukan</FieldLabel>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Tulis masukan atau saran Anda..."
                  className="pl-9"
                  rows={4}
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Kategori */}
        <Controller
          control={form.control}
          name="kategoriId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Kategori</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading || isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori masukan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    {kategori.map((item: Kategori) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.namaKategori}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          disabled={loading}
        >
          Reset
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <Spinner className="mr-2 size-4" />
              Mengirim...
            </div>
          ) : (
            "Kirim Masukan"
          )}
        </Button>
      </div>
    </form>
  );
}

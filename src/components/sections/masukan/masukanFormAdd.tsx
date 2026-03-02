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
import { createMasukanWargaFormSchema } from "@/schema/masukanWarga";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "../../ui/select";

import {
  MessageSquare,
  MapPin,
  User,
  ClipboardList,
  Phone,
  Heading,
} from "lucide-react";
import { useGet, usePost } from "@/hooks/useApi";
import { DomainIsu } from "@/app/generated/prisma";

export default function MasukanWargaFormAdd() {
  const router = useRouter();
  const { post: execute, loading } = usePost("/masukan-warga");
  const { data, isLoading } = useGet("/kategori");

  const domainIsu = data?.data ?? []; // ✅ Akses data.data sesuai response handler

  const form = useForm<z.infer<typeof createMasukanWargaFormSchema>>({
    resolver: zodResolver(createMasukanWargaFormSchema),
    defaultValues: {
      namaPengirim: "",
      nomorHp: "",
      judul: "",
      lokasiRt: "",
      lokasiRw: "",
      deskripsi: "",
      domainIsuId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createMasukanWargaFormSchema>) {
    // ✅ Kirim hanya field yang relevan untuk create (opsional: filter field server-side)
    const payload = {
      namaPengirim: data.namaPengirim,
      nomorHp: data.nomorHp,
      judul: data.judul,
      lokasiRt: data.lokasiRt,
      lokasiRw: data.lokasiRw,
      deskripsi: data.deskripsi,
      domainIsuId: data.domainIsuId,
      // isLocked & expiresAt akan pakai default dari schema/backend
    };

    const { data: res, error } = await execute(payload);

    if (error) {
      notifier.error(error);
      return;
    }

    notifier.success(
      "Berhasil",
      res?.message || "Masukan warga berhasil dikirim",
    );
    form.reset();
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

        {/* Nomor HP */}
        <Controller
          control={form.control}
          name="nomorHp"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nomor HP</FieldLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  placeholder="081234567890"
                  autoComplete="off"
                  className="pl-9"
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Judul */}
        <Controller
          control={form.control}
          name="judul"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Judul Masukan</FieldLabel>
              <div className="relative">
                <Heading className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Contoh: Perbaikan lampu jalan"
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
                  placeholder="003"
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
                  placeholder="001"
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
          name="deskripsi"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Deskripsi Masukan</FieldLabel>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Tulis masukan atau saran Anda secara lengkap..."
                  className="pl-9"
                  rows={4}
                  readOnly={loading}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Domain Isu (Kategori) */}
        <Controller
          control={form.control}
          name="domainIsuId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Kategori Masukan</FieldLabel>
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
                    {domainIsu.map((item: DomainIsu) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.nama}
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

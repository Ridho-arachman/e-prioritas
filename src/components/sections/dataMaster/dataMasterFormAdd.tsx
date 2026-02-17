"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { notifier } from "@/lib/ToastNotifier";
import { dataMasterSchema } from "@/schema/dataMasterSchema";
import { useGet, usePost } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

type CreateDataMasterInput = z.infer<typeof dataMasterSchema>;

export default function DataMasterFormAdd() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Ambil daftar domain isu untuk dropdown
  const { data: domainResponse, isLoading: domainLoading } =
    useGet(`/protected/kategori`);
  const domainList = domainResponse ?? [];

  const { post: execute, loading } = usePost("/protected/data-master");

  const form = useForm<CreateDataMasterInput>({
    resolver: zodResolver(dataMasterSchema),
    defaultValues: {
      domainIsuId: "",
      namaAtribut: "",
      nilai: "",
      lokasiRt: null,
      lokasiRw: null,
      jumlah: null,
      sumberData: null,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: CreateDataMasterInput) {
    try {
      const res = await execute(data, {
        headers: { "Content-Type": "application/json" },
      });

      notifier.success(res?.message || "Data master berhasil ditambahkan");
      router.back();
    } catch (err) {
      const error = err as AxiosError<ApiError>;

      notifier.error(
        error.response?.data?.message || "Gagal menambahkan data master",
      );
    }
  }

  // Tampilkan loading skeleton saat data domain belum siap
  if (!isMounted || domainLoading) {
    return (
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="animate-pulse bg-muted h-4 w-32 rounded"></div>
          <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="animate-pulse bg-muted h-4 w-32 rounded"></div>
          <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="animate-pulse bg-muted h-4 w-32 rounded"></div>
          <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="animate-pulse bg-muted h-4 w-10 rounded"></div>
            <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="animate-pulse bg-muted h-4 w-10 rounded"></div>
            <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="animate-pulse bg-muted h-4 w-16 rounded"></div>
          <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="animate-pulse bg-muted h-4 w-24 rounded"></div>
          <div className="animate-pulse bg-muted h-10 w-full rounded"></div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <div className="animate-pulse bg-muted h-10 w-24 rounded"></div>
          <div className="animate-pulse bg-muted h-10 w-32 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          {/* Domain Isu */}
          <Controller
            control={form.control}
            name="domainIsuId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Domain Isu</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Pilih domain isu" />
                  </SelectTrigger>
                  <SelectContent>
                    {domainList.map((domain: any) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {domain.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Nama Atribut */}
          <Controller
            control={form.control}
            name="namaAtribut"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nama Atribut</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  readOnly={loading}
                  placeholder="Masukkan nama atribut (misal: jumlah rumah)"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Nilai (teks) */}
          <Controller
            control={form.control}
            name="nilai"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nilai</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  readOnly={loading}
                  placeholder="Masukkan nilai (misal: Tinggi, 100, Baik)"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Lokasi RT & RW */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="lokasiRt"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>RT (opsional)</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    max={999}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? null : Number(e.target.value);
                      field.onChange(val);
                    }}
                    id={field.name}
                    readOnly={loading}
                    placeholder="Contoh: 1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="lokasiRw"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>RW (opsional)</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    max={999}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? null : Number(e.target.value);
                      field.onChange(val);
                    }}
                    id={field.name}
                    readOnly={loading}
                    placeholder="Contoh: 5"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Jumlah */}
          <Controller
            control={form.control}
            name="jumlah"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Jumlah (opsional)</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val =
                      e.target.value === "" ? null : Number(e.target.value);
                    field.onChange(val);
                  }}
                  id={field.name}
                  readOnly={loading}
                  placeholder="Contoh: 100"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Sumber Data */}
          <Controller
            control={form.control}
            name="sumberData"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Sumber Data (opsional)
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value === "" ? null : e.target.value;
                    field.onChange(val);
                  }}
                  id={field.name}
                  readOnly={loading}
                  placeholder="Misal: BPS, Survey Internal"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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
                  Menyimpan...
                </div>
              ) : (
                "Simpan Data"
              )}
            </Button>
          </div>
        </div>
      </form>

      <p className="text-xs text-muted-foreground pt-2">
        Pastikan semua data sudah benar sebelum disimpan.
      </p>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Spinner } from "../../ui/spinner";
import { notifier } from "../../../lib/ToastNotifier";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { dataMasterSchema } from "@/schema/dataMasterSchema";
import { Skeleton } from "../../ui/skeleton";
import { useGet, usePut } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

// Tipe data dari Prisma
import { DataMaster, DomainIsu, User } from "@/app/generated/prisma";
import z from "zod";

type DataMasterWithRelations = DataMaster & {
  domainIsu: Pick<DomainIsu, "nama">;
  diprosesOleh: Pick<User, "name"> | null;
};

type DataMasterEditForm = z.infer<typeof dataMasterSchema>;

export default function DataMasterFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // State untuk menandai apakah domain sudah siap
  const [isDomainReady, setIsDomainReady] = useState(false);

  // Ambil detail data master
  const {
    data: response,
    isLoading,
    error,
  } = useGet(`/protected/data-master/${id}`);
  const detail = (response as DataMasterWithRelations) || null;

  console.log("detail", detail);

  // Ambil daftar domain isu untuk dropdown
  const { data: domainResponse } = useGet(`/protected/kategori`);
  const domainList = domainResponse ?? [];

  // Set domainReady saat domainList terisi
  useEffect(() => {
    if (domainList.length > 0) {
      setIsDomainReady(true);
    }
  }, [domainList]);

  const { put: execute, loading } = usePut(`/protected/data-master/${id}`);

  const form = useForm<DataMasterEditForm>({
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

  // Set default value setelah data detail didapat
  useEffect(() => {
    if (!detail) return;

    form.reset({
      domainIsuId: detail.domainIsuId,
      namaAtribut: detail.namaAtribut,
      nilai: detail.nilai,
      lokasiRt: detail.lokasiRt ?? null,
      lokasiRw: detail.lokasiRw ?? null,
      jumlah: detail.jumlah ?? null,
      sumberData: detail.sumberData ?? null,
    });

    console.log("domainIsuId setelah reset:", detail.domainIsuId);
  }, [detail, form]);

  // Set nilai domainIsuId lagi setelah domainList tersedia (jika detail sudah ada)
  useEffect(() => {
    if (detail && domainList.length > 0) {
      form.setValue("domainIsuId", detail.domainIsuId);
    }
  }, [domainList, detail, form]);

  // Handle Submit
  const onSubmit = async (formData: DataMasterEditForm) => {
    try {
      const res = await execute(formData);
      notifier.success(res?.message || "Data master berhasil diperbarui");
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error(
        "Gagal Mengedit",
        err?.response?.data?.message ||
          "Terjadi kesalahan saat mengedit data master",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="text-center text-red-500 py-8">
        Gagal memuat data. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          {/* Domain Isu - hanya dirender setelah domain siap */}
          {isDomainReady ? (
            <Controller
              control={form.control}
              name="domainIsuId"
              render={({ field, fieldState }) => {
                // Debug: lihat nilai saat ini
                console.log("field.value", field.value);
                console.log(
                  "domainList IDs",
                  domainList.map((d: any) => d.id),
                );

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Domain Isu</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading || loading}
                      key={field.value} // ✅ PENTING: memaksa rerender saat nilai berubah
                    >
                      <SelectTrigger>
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
                );
              }}
            />
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {/* Nama Atribut */}
          <Controller
            control={form.control}
            name="namaAtribut"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nama Atribut</FieldLabel>
                <Input
                  {...field}
                  placeholder="Masukkan nama atribut"
                  readOnly={loading}
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Nilai */}
          <Controller
            control={form.control}
            name="nilai"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nilai</FieldLabel>
                <Input
                  {...field}
                  placeholder="Masukkan nilai (misal: 5, Tinggi, dll)"
                  readOnly={loading}
                  disabled={isLoading}
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
                  <FieldLabel htmlFor={field.name}>RT</FieldLabel>
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
                    placeholder="Contoh: 1"
                    autoComplete="off"
                    readOnly={loading}
                    disabled={isLoading}
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
                  <FieldLabel htmlFor={field.name}>RW</FieldLabel>
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
                    placeholder="Contoh: 5"
                    autoComplete="off"
                    readOnly={loading}
                    disabled={isLoading}
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
                  placeholder="Contoh: 100"
                  readOnly={loading}
                  disabled={isLoading}
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
                  placeholder="Misal: BPS, Survey Internal"
                  readOnly={loading}
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Info Update */}
          {detail.diprosesOleh && (
            <div className="text-sm text-muted-foreground border-t pt-4">
              <p>
                Diproses oleh:{" "}
                <Badge variant="outline">{detail.diprosesOleh.name}</Badge>
              </p>
              <p>
                Terakhir diperbarui:{" "}
                {new Date(detail.updatedAt).toLocaleString("id-ID")}
              </p>
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={loading || isLoading}
              onClick={() => router.back()}
            >
              Kembali
            </Button>
            <Button
              type="submit"
              disabled={loading || isLoading}
              className="cursor-pointer"
            >
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
        </div>
      </form>

      <p className="text-xs text-muted-foreground">
        Pastikan semua data sudah benar sebelum disimpan.
      </p>
    </div>
  );
}

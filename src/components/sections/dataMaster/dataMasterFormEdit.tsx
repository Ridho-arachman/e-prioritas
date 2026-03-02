"use client";

import { useEffect } from "react";
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

// Import schema yang benar
import { dataMasterUpdateSchema } from "@/schema/dataMasterSchema";
import { Skeleton } from "../../ui/skeleton";
import { useGet, usePut } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

import {
  DataMaster,
  DomainIsu,
  User,
  NilaiKritikalitas,
} from "@/app/generated/prisma";
import z from "zod";

type DataMasterWithRelations = DataMaster & {
  domainIsu: Pick<DomainIsu, "id" | "nama">;
  diprosesOleh: Pick<User, "name" | "email"> | null;
};

type DataMasterEditForm = z.infer<typeof dataMasterUpdateSchema>;

const KRITIKALITAS_OPTIONS: NilaiKritikalitas[] = [
  "KRITIS",
  "TINGGI",
  "SEDANG",
  "RENDAH",
];

export default function DataMasterFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // Ambil detail data master
  const {
    data: response,
    isLoading,
    error,
  } = useGet(`/protected/data-master/${id}`);

  const detail = response as DataMasterWithRelations | undefined;

  // Ambil daftar domain isu
  const { data: domainResponse } = useGet(`/protected/kategori`);
  const domainList = domainResponse ?? [];

  const { put: execute, loading } = usePut(`/protected/data-master/${id}`);

  const form = useForm<DataMasterEditForm>({
    resolver: zodResolver(dataMasterUpdateSchema),
    defaultValues: {
      domainIsuId: "",
      namaAtribut: "",
      kritikalitas: undefined,
      jumlah: null,
      tahunData: null,
      isActive: true,
    },
  });

  // Hydrate form dari data detail
  useEffect(() => {
    if (!detail) return;

    form.reset({
      domainIsuId: detail.domainIsuId,
      namaAtribut: detail.namaAtribut,
      kritikalitas: detail.kritikalitas,
      jumlah: detail.jumlah ?? null,
      tahunData: detail.tahunData ?? null,
      isActive: detail.isActive,
    });
  }, [detail, form]);

  const onSubmit = async (formData: DataMasterEditForm) => {
    try {
      const res = await execute(formData);
      notifier.success(res?.message || "Data master berhasil diperbarui");
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error(
        err?.response?.data?.message ||
          "Terjadi kesalahan saat mengedit data master",
      );
    }
  };

  if (isLoading) return <Skeleton className="h-40 w-full" />;

  if (error || !detail) {
    return (
      <div className="text-center text-red-500 py-8">Gagal memuat data</div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Domain Isu */}
      <Controller
        control={form.control}
        name="domainIsuId"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Domain Isu</FieldLabel>
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={loading}
              key={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih domain isu" />
              </SelectTrigger>
              <SelectContent>
                {domainList.map((domain: DomainIsu) => (
                  <SelectItem key={domain.id} value={domain.id}>
                    {domain.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Nama Atribut */}
      <Controller
        control={form.control}
        name="namaAtribut"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nama Atribut</FieldLabel>
            <Input {...field} value={field.value ?? ""} readOnly={loading} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Kritikalitas */}
      <Controller
        control={form.control}
        name="kritikalitas"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Kritikalitas</FieldLabel>
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={loading}
              key={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kritikalitas" />
              </SelectTrigger>
              <SelectContent>
                {KRITIKALITAS_OPTIONS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Tahun Data */}
      <Controller
        control={form.control}
        name="tahunData"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Tahun Data</FieldLabel>
            <Input
              type="number"
              min={2000}
              max={2100}
              value={field.value ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val === "" ? null : Number(val));
              }}
              readOnly={loading}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Jumlah */}
      <Controller
        control={form.control}
        name="jumlah"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Jumlah</FieldLabel>
            <Input
              type="number"
              min={0}
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              readOnly={loading}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Status Aktif */}
      <Controller
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <Field>
            <FieldLabel>Status</FieldLabel>
            <Select
              onValueChange={(val) => field.onChange(val === "true")}
              value={field.value ? "true" : "false"}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Aktif</SelectItem>
                <SelectItem value="false">Non-Aktif</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      {/* Info diproses oleh */}
      {detail.diprosesOleh && (
        <div className="text-sm text-muted-foreground border-t pt-4">
          <p>
            Diproses oleh{" "}
            <Badge variant="outline">{detail.diprosesOleh.name}</Badge>
            {detail.diprosesOleh.email && ` (${detail.diprosesOleh.email})`}
          </p>
          <p className="text-xs">
            Terakhir diperbarui:{" "}
            {new Date(detail.updatedAt).toLocaleString("id-ID")}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}

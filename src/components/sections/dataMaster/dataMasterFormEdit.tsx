"use client";

import { useEffect } from "react";
import { Spinner } from "../../ui/spinner";
import { notifier } from "../../../lib/ToastNotifier";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
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

import { DataMaster, DomainIsu, User } from "@/app/generated/prisma";
import z from "zod";
import { formatWilayah } from "@/utils/formatRtRw";

type DataMasterWithRelations = DataMaster & {
  domainIsu: Pick<DomainIsu, "nama">;
  diprosesOleh: Pick<User, "name"> | null;
};

type DataMasterEditForm = z.infer<typeof dataMasterSchema>;

const KRITIKALITAS_OPTIONS = ["KRITIS", "TINGGI", "SEDANG", "RENDAH"];

export default function DataMasterFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    error,
  } = useGet(`/protected/data-master/${id}`);

  const detail = (response as DataMasterWithRelations) || null;

  const { data: domainResponse } = useGet(`/protected/kategori`);
  const domainList = domainResponse ?? [];

  const { put: execute, loading } = usePut(`/protected/data-master/${id}`);

  const form = useForm<DataMasterEditForm>({
    resolver: zodResolver(dataMasterSchema),

    // ✅ CRITICAL FIX
    defaultValues: {
      domainIsuId: "",
      namaAtribut: "",
      kritikalitas: undefined,
      lokasiRt: null,
      lokasiRw: null,
      jumlah: null,
      sumberData: null,
    },
  });

  // ✅ Hydrate form dari DB
  useEffect(() => {
    if (!detail) return;

    form.reset({
      domainIsuId: detail.domainIsuId,
      namaAtribut: detail.namaAtribut,
      kritikalitas: detail.kritikalitas,
      lokasiRt: detail.lokasiRt ?? null,
      lokasiRw: detail.lokasiRw ?? null,
      jumlah: detail.jumlah ?? null,
      sumberData: detail.sumberData ?? null,
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
      {/* Domain */}
      <Controller
        control={form.control}
        name="domainIsuId"
        render={({ field }) => (
          <Field>
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
                {domainList.map((domain: any) => (
                  <SelectItem key={domain.id} value={domain.id}>
                    {domain.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      {/* Nama Atribut */}
      <Controller
        control={form.control}
        name="namaAtribut"
        render={({ field }) => (
          <Field>
            <FieldLabel>Nama Atribut</FieldLabel>
            <Input {...field} value={field.value ?? ""} readOnly={loading} />
          </Field>
        )}
      />

      {/* Kritikalitas */}
      <Controller
        control={form.control}
        name="kritikalitas"
        render={({ field }) => (
          <Field>
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
          </Field>
        )}
      />

      {/* RT / RW */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={form.control}
          name="lokasiRt"
          render={({ field }) => (
            <Field>
              <FieldLabel>RT</FieldLabel>
              <Input
                type="number"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(formatWilayah(e.target.value))}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="lokasiRw"
          render={({ field }) => (
            <Field>
              <FieldLabel>RW</FieldLabel>
              <Input
                type="number"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(formatWilayah(e.target.value))}
              />
            </Field>
          )}
        />
      </div>

      {/* Jumlah */}
      <Controller
        control={form.control}
        name="jumlah"
        render={({ field }) => (
          <Field>
            <FieldLabel>Jumlah</FieldLabel>
            <Input
              type="number"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            />
          </Field>
        )}
      />

      {/* Sumber */}
      <Controller
        control={form.control}
        name="sumberData"
        render={({ field }) => (
          <Field>
            <FieldLabel>Sumber Data</FieldLabel>
            <Input
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
            />
          </Field>
        )}
      />

      {/* Info */}
      {detail.diprosesOleh && (
        <div className="text-sm text-muted-foreground border-t pt-4">
          <p>
            Diproses oleh{" "}
            <Badge variant="outline">{detail.diprosesOleh.name}</Badge>
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}

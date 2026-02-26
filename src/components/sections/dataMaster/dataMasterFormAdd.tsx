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
import { formatWilayah } from "@/utils/formatRtRw";

type CreateDataMasterInput = z.infer<typeof dataMasterSchema>;

const KRITIKALITAS_OPTIONS = ["KRITIS", "TINGGI", "SEDANG", "RENDAH"];

export default function DataMasterFormAdd() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { data: domainResponse, isLoading: domainLoading } =
    useGet(`/protected/kategori`);
  const domainList = domainResponse ?? [];

  const { post: execute, loading } = usePost("/protected/data-master");

  const form = useForm<CreateDataMasterInput>({
    resolver: zodResolver(dataMasterSchema),
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: CreateDataMasterInput) {
    try {
      const res = await execute(data);

      notifier.success(res?.message || "Data master berhasil ditambahkan");
      router.back();
    } catch (err) {
      const error = err as AxiosError<ApiError>;

      notifier.error(
        error.response?.data?.message || "Gagal menambahkan data master",
      );
    }
  }

  if (!isMounted || domainLoading) return null;

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
                <FieldLabel>Domain Isu</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
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
            )}
          />

          {/* Nama Atribut */}
          <Controller
            control={form.control}
            name="namaAtribut"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nama Atribut</FieldLabel>
                <Input
                  {...field}
                  readOnly={loading}
                  placeholder="Contoh: Jumlah Rumah Tidak Layak Huni"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Kritikalitas (FIXED → SELECT) */}
          <Controller
            control={form.control}
            name="kritikalitas"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Kritikalitas</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Lokasi RT / RW (FIXED → STRING FORMAT) */}
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
                    onChange={(e) =>
                      field.onChange(formatWilayah(e.target.value))
                    }
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
                    onChange={(e) =>
                      field.onChange(formatWilayah(e.target.value))
                    }
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
                <FieldLabel>Jumlah (opsional)</FieldLabel>
                <Input
                  type="number"
                  min={0}
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

          {/* Sumber Data */}
          <Controller
            control={form.control}
            name="sumberData"
            render={({ field }) => (
              <Field>
                <FieldLabel>Sumber Data</FieldLabel>
                <Input
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : e.target.value,
                    )
                  }
                  placeholder="Contoh: BPS"
                />
              </Field>
            )}
          />

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
    </>
  );
}

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
// ✅ Import schema yang benar (create)
import { dataMasterCreateSchema } from "@/schema/dataMasterSchema";
import { useGet, usePost } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

// ✅ Tipe data dari schema create
type CreateDataMasterInput = z.infer<typeof dataMasterCreateSchema>;

const KRITIKALITAS_OPTIONS = ["KRITIS", "TINGGI", "SEDANG", "RENDAH"];

export default function DataMasterFormAdd() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Ambil daftar domain isu dari endpoint yang benar
  const { data: domainResponse, isLoading: domainLoading } = useGet(
    "/protected/kategori",
  );
  // Asumsi response: { data: DomainIsu[] }
  const domainList = domainResponse ?? [];

  // ✅ Endpoint create yang benar (single)
  const { post: execute, loading } = usePost("/protected/data-master");

  const CURRENT_YEAR = new Date().getFullYear();
  const form = useForm<CreateDataMasterInput>({
    resolver: zodResolver(dataMasterCreateSchema),
    defaultValues: {
      domainIsuId: "",
      namaAtribut: "",
      kritikalitas: undefined,
      tahunData: CURRENT_YEAR, // number
      isActive: true,
      jumlah: null,
      // diprosesOlehId tidak perlu diisi, akan diisi backend dari session
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: CreateDataMasterInput) {
    try {
      const res = await execute(data);
      notifier.success(res?.message || "Data master berhasil ditambahkan");
      router.back(); // Kembali ke halaman sebelumnya (list)
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      notifier.error(
        error.response?.data?.message || "Gagal menambahkan data master",
      );
    }
  }

  if (!isMounted || domainLoading) return null;

  return (
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
              <Input
                {...field}
                readOnly={loading}
                placeholder="Contoh: Jumlah Rumah Tidak Layak Huni"
              />
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
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === "" ? undefined : Number(val));
                }}
                readOnly={loading}
                placeholder={`Contoh: ${CURRENT_YEAR}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Jumlah (opsional) */}
        <Controller
          control={form.control}
          name="jumlah"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
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
  );
}

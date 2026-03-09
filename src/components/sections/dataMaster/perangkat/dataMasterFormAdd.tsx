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
import { dataMasterCreateSchema } from "@/schema/dataMasterSchema";
import { useGet, usePost } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { Tag, Hash, Save, RotateCcw } from "lucide-react";

type CreateDataMasterInput = z.infer<typeof dataMasterCreateSchema>;

const KRITIKALITAS_OPTIONS = ["KRITIS", "TINGGI", "SEDANG", "RENDAH"];

export default function DataMasterFormAdd() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { data: domainResponse, isLoading: domainLoading } = useGet(
    "/protected/kategori",
  );
  const domainList = domainResponse ?? [];

  const { post: execute, loading } = usePost("/protected/data-master");

  const CURRENT_YEAR = new Date().getFullYear();
  const form = useForm<CreateDataMasterInput>({
    resolver: zodResolver(dataMasterCreateSchema),
    defaultValues: {
      domainIsuId: "",
      namaAtribut: "",
      kritikalitas: undefined,
      tahunData: CURRENT_YEAR,
      isActive: true,
      jumlah: null,
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

  if (!isMounted || domainLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="bg-card border rounded-xl shadow-sm p-4 md:p-6 space-y-6">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      {/* Form Card */}
      <div className="bg-card border rounded-xl shadow-lg shadow-primary/5 p-4 md:p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Grid 2 kolom untuk field yang berpasangan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Domain Isu */}
            <Controller
              control={form.control}
              name="domainIsuId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    Domain Isu
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full transition-shadow focus:ring-2 focus:ring-primary/50">
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
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    Nama Atribut
                  </FieldLabel>
                  <Input
                    {...field}
                    readOnly={loading}
                    placeholder="Contoh: Jumlah Rumah Tidak Layak Huni"
                    className="transition-shadow focus:ring-2 focus:ring-primary/50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Baris kedua: Kritikalitas + Tahun Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kritikalitas */}
            <Controller
              control={form.control}
              name="kritikalitas"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <span>🔥</span>
                    Kritikalitas
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full transition-shadow focus:ring-2 focus:ring-primary/50">
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

            {/* Tahun Data */}
            <Controller
              control={form.control}
              name="tahunData"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <span>📅</span>
                    Tahun Data
                  </FieldLabel>
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
                    className="transition-shadow focus:ring-2 focus:ring-primary/50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Jumlah (opsional) - full width */}
          <Controller
            control={form.control}
            name="jumlah"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                  <span>🔢</span>
                  Jumlah (opsional)
                </FieldLabel>
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
                  placeholder="Masukkan jumlah jika ada"
                  className="transition-shadow focus:ring-2 focus:ring-primary/50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Status Aktif */}
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <Field>
                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                  <span>⚡</span>
                  Status
                </FieldLabel>
                <Select
                  onValueChange={(val) => field.onChange(val === "true")}
                  value={field.value ? "true" : "false"}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full transition-shadow focus:ring-2 focus:ring-primary/50">
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
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading}
              className="cursor-pointer w-full sm:w-auto"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
            >
              {loading ? (
                <div className="flex items-center">
                  <Spinner className="mr-2 size-4" />
                  Menyimpan...
                </div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Data
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-4 text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/50 pt-4">
          <span className="flex items-center gap-1">
            📊 Domain isu wajib dipilih
          </span>
          <span className="flex items-center gap-1">
            🔢 Jumlah bersifat opsional
          </span>
          <span className="flex items-center gap-1">
            ⚡ Status menentukan tampilan data
          </span>
        </div>
      </div>
    </div>
  );
}

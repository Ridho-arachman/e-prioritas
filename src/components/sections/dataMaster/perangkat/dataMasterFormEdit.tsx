"use client";

import { useEffect } from "react";
import { Spinner } from "../../../ui/spinner";
import { notifier } from "../../../../lib/ToastNotifier";
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

import { dataMasterUpdateSchema } from "@/schema/dataMasterSchema";
import { Skeleton } from "../../../ui/skeleton";
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
import { Tag, Hash, Save, RotateCcw, ArrowLeft } from "lucide-react";

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

  if (isLoading) {
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

  if (error || !detail) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="text-center text-red-500 py-8 border rounded-lg">
          Gagal memuat data
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
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    disabled={loading}
                    key={field.value}
                  >
                    <SelectTrigger className="w-full transition-shadow focus:ring-2 focus:ring-primary/50">
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
                    value={field.value ?? ""}
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
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    disabled={loading}
                    key={field.value}
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
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? null : Number(val));
                    }}
                    readOnly={loading}
                    placeholder="Contoh: 2025"
                    className="transition-shadow focus:ring-2 focus:ring-primary/50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Jumlah - full width */}
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

          {/* Info diproses oleh */}
          {detail.diprosesOleh && (
            <div className="text-sm text-muted-foreground border-t pt-4 space-y-1">
              <p>
                Diproses oleh{" "}
                <Badge variant="outline" className="font-normal">
                  {detail.diprosesOleh.name}
                </Badge>
                {detail.diprosesOleh.email && ` (${detail.diprosesOleh.email})`}
              </p>
              <p className="text-xs">
                Terakhir diperbarui:{" "}
                {new Date(detail.updatedAt).toLocaleString("id-ID")}
              </p>
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
              className="cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
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
                  Simpan Perubahan
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

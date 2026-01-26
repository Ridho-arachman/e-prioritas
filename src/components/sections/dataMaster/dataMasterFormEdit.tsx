"use client";

import z from "zod";
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
import { JenisDataMaster } from "@prisma/client";
import {
  useEditDataMaster,
  useGetDeltailDataMaster,
} from "@/hooks/api/useDataMaster";
import { dataMasterSchema } from "@/schema/dataMasterSchema";
import { Skeleton } from "../../ui/skeleton";

type DataMasterEditSchema = z.infer<typeof dataMasterSchema>;

export default function DataMasterFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetDeltailDataMaster(id);
  const { execute, loading } = useEditDataMaster();

  const detail = data?.data || [];

  const form = useForm<DataMasterEditSchema>({
    resolver: zodResolver(dataMasterSchema),
    defaultValues: {
      jenisData: undefined,
      namaAtribut: "",
      nilai: "",
      lokasiRt: "",
      lokasiRw: "",
    },
  });

  // Set default value setelah data didapat
  useEffect(() => {
    if (!detail || !detail.id) return;

    form.reset({
      jenisData: detail.jenisData,
      namaAtribut: detail.namaAtribut,
      nilai: detail.nilai,
      lokasiRt: detail.lokasiRt,
      lokasiRw: detail.lokasiRw,
    });
  }, [detail?.id]);

  // --- Handle Submit ---
  const onSubmit = async (formData: DataMasterEditSchema) => {
    const { data: res, error } = await execute(
      `/protected/data-master/${id}`,
      formData,
      { headers: { "Content-Type": "application/json" } },
      `/protected/data-master/${id}`,
    );

    if (error) {
      notifier.error(error);
      return;
    }

    notifier.success(res?.message || "Data master berhasil diperbarui");
    router.back();
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

        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          {/* Jenis Data */}
          <Controller
            control={form.control}
            name="jenisData"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Jenis Data</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading || loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis data" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(JenisDataMaster).map((val) => (
                      <SelectItem key={val} value={val}>
                        {val.replaceAll("_", " ")}
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

          {/* Nilai Kepentingan */}
          <Controller
            control={form.control}
            name="nilai"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nilai Kepentingan</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading || loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih nilai kepentingan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Tidak Penting</SelectItem>
                    <SelectItem value="2">2 - Kurang Penting</SelectItem>
                    <SelectItem value="3">3 - Cukup Penting</SelectItem>
                    <SelectItem value="4">4 - Penting</SelectItem>
                    <SelectItem value="5">5 - Sangat Penting</SelectItem>
                  </SelectContent>
                </Select>
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
                    {...field}
                    maxLength={3}
                    placeholder="001"
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
                    {...field}
                    maxLength={3}
                    placeholder="001"
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

          {/* Info Update */}
          {detail?.updatedBy && (
            <div className="text-sm text-muted-foreground border-t pt-4">
              <p>
                Diperbarui oleh:{" "}
                <Badge variant="outline">{detail.updatedBy?.name}</Badge>
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

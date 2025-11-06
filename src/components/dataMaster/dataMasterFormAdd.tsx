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
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { notifier } from "@/components/ToastNotifier";
import { dataMasterSchema } from "@/schema/dataMasterSchema";
import { JenisDataMaster } from "@prisma/client";
import { useCreateDataMaster } from "@/hooks/api/useDataMaster";

type CreateDataMasterInput = z.infer<typeof dataMasterSchema>;

export default function DataMasterFormAdd() {
  const router = useRouter();

  const { error, execute, loading } = useCreateDataMaster();

  const jenisDataList = Object.keys(JenisDataMaster);
  const nilaiOptions = [
    { label: "Tidak Penting", value: "1" },
    { label: "Kurang Penting", value: "2" },
    { label: "Cukup Penting", value: "3" },
    { label: "Penting", value: "4" },
    { label: "Sangat Penting", value: "5" },
  ];

  const form = useForm<CreateDataMasterInput>({
    resolver: zodResolver(dataMasterSchema),
    defaultValues: {
      jenisData: undefined,
      namaAtribut: "",
      nilai: "",
      lokasiRt: "",
      lokasiRw: "",
    },
  });

  async function onSubmit(data: CreateDataMasterInput) {
    const { data: res, error } = await execute(
      "/protected/data-master",
      data,
      { headers: { "Content-Type": "application/json" } },
      "/protected/data-master"
    );

    if (error) {
      notifier.error(error || "Gagal menambahkan data master");
      return;
    }
    notifier.success(res?.message);
    router.back();
  }

  return (
    <>
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
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Pilih jenis data" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisDataList.map((jenisData) => (
                      <SelectItem key={jenisData} value={jenisData}>
                        {jenisData}
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

          {/* Nilai */}
          <Controller
            control={form.control}
            name="nilai"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nilai</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Pilih jenis data" />
                  </SelectTrigger>
                  <SelectContent>
                    {nilaiOptions.map((nilai) => (
                      <SelectItem key={nilai.value} value={nilai.value}>
                        {nilai.label}
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

          {/* Lokasi RT */}
          <Controller
            control={form.control}
            name="lokasiRt"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Lokasi RT</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  readOnly={loading}
                  placeholder="Contoh: 01"
                  maxLength={3}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Lokasi RW */}
          <Controller
            control={form.control}
            name="lokasiRw"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Lokasi RW</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  readOnly={loading}
                  placeholder="Contoh: 05"
                  maxLength={3}
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

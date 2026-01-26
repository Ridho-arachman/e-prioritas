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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { updateUserPerangkatSchema } from "@/schema/userPerangkatSchema";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet, usePatch } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export function PerangkatFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, mutate } = useGet(
    `/protected/perangkat/${id}`,
  );
  console.log(data);

  const { patch, loading } = usePatch(`/protected/perangkat/${id}`);

  const form = useForm<z.infer<typeof updateUserPerangkatSchema>>({
    resolver: zodResolver(updateUserPerangkatSchema),
    defaultValues: {
      name: "",
      email: "",
      jabatan: "",
      phoneNumber: "",
      role: undefined,
      isActive: true,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name,
        email: data?.email,
        jabatan: data?.jabatan,
        phoneNumber: data?.phoneNumber,
        role: data?.role,
        isActive: data?.isActive,
      });
    }
  }, [data, form]);

  if (isLoading && !data) {
    return (
      <div className="space-y-4 animate-pulse">
        {/* Nama */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Nomor HP */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Jabatan */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Action */}
        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof updateUserPerangkatSchema>) => {
    try {
      const res = await patch(data);
      notifier.success(
        "Berhasil",
        res?.message || "Perangkat desa berhasil diperbarui",
      );
      router.back();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan pada server",
      );
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nama */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nama</FieldLabel>
              <Input {...field} readOnly={loading} placeholder="Nama lengkap" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                readOnly={loading}
                type="email"
                placeholder="contoh@email.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Nomor HP */}
        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nomor HP</FieldLabel>
              <Input {...field} readOnly={loading} placeholder="08xxxxxxxxxx" />
              <FieldDescription>Format: 08xxxx / +628xxxx</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Jabatan */}
        <Controller
          control={form.control}
          name="jabatan"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Jabatan</FieldLabel>
              <Input
                {...field}
                readOnly={loading}
                placeholder="Jabatan perangkat"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Role */}
        <Controller
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Role</FieldLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERANGKAT_DESA">Perangkat Desa</SelectItem>
                  <SelectItem value="LURAH">Lurah</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Status */}
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <Field className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <FieldLabel>Status Aktif</FieldLabel>
                <FieldDescription>Tentukan apakah user aktif</FieldDescription>
              </div>
              <FieldContent>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldContent>
            </Field>
          )}
        />

        {/* Action */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="cursor-pointer"
          >
            Reset
          </Button>

          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" /> Menyimpan...
              </span>
            ) : (
              "Simpan Perangkat"
            )}
          </Button>
        </div>
      </form>

      <p className="text-xs text-muted-foreground">
        Pastikan semua data terisi dengan benar sebelum disimpan.
      </p>
    </div>
  );
}

"use client";

import z from "zod";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { notifier } from "../ToastNotifier";
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
import {
  useEditPerangkat,
  useGetPerangkatById,
} from "@/hooks/api/usePerangkat";
import { Switch } from "@/components/ui/switch";

export function PerangkatFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetPerangkatById(id);
  const { execute, loading } = useEditPerangkat();
  const perangkat = data?.data;

  const form = useForm<z.infer<typeof updateUserPerangkatSchema>>({
    resolver: zodResolver(updateUserPerangkatSchema),
    defaultValues: {
      name: "",
      email: "",
      jabatan: "",
      isActive: true,
    },
  });

  // Saat data kategori sudah diambil, isi default value form
  useEffect(() => {
    if (perangkat) {
      form.reset({
        name: perangkat?.name,
        email: perangkat?.email,
        jabatan: perangkat?.jabatan,
        isActive: perangkat?.isActive,
      });
    }
  }, [perangkat, form]);

  const onSubmit = async (data: z.infer<typeof updateUserPerangkatSchema>) => {
    const { data: res, error } = await execute(
      `/protected/perangkat/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } },
      "/protected/perangkat/${id}"
    );

    if (error) {
      console.log(error);

      notifier.error(error);
      return;
    }

    notifier.success(res?.message || "Kategori berhasil diperbarui");
    router.back();
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          {/* Name */}
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nama</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  readOnly={loading}
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="contoh@email.com"
                  id={field.name}
                  readOnly={loading}
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Jabatan */}
          <Controller
            control={form.control}
            name="jabatan"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Jabatan</FieldLabel>
                <Input
                  autoComplete="off"
                  id={field.name}
                  readOnly={loading}
                  disabled={isLoading}
                  type="text"
                  placeholder="Masukkan jabatan"
                  {...field}
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
            render={({ field, fieldState }) => (
              <Field className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FieldLabel htmlFor={field.name}> Status Aktif</FieldLabel>
                  <FieldDescription>
                    Tentukan apakah user perangkat ini aktif.
                  </FieldDescription>
                </div>
                <FieldContent>
                  <Switch
                    id={field.name}
                    disabled={loading || isLoading}
                    aria-invalid={fieldState.invalid}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FieldContent>
              </Field>
            )}
          />

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
                "Simpan Kategori"
              )}
            </Button>
          </div>
        </div>
      </form>

      <p className="text-xs text-muted-foreground">
        Pastikan semua data terisi dengan benar sebelum disimpan.
      </p>
    </div>
  );
}

"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUserPerangkatSchema } from "@/schema/userPerangkatSchema";
import { useCreatePerangkat } from "@/hooks/api/usePerangkat";
import { notifier } from "../ToastNotifier";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";

export default function PerangkatFormAdd() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { execute, loading } = useCreatePerangkat();

  const form = useForm<z.infer<typeof createUserPerangkatSchema>>({
    resolver: zodResolver(createUserPerangkatSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jabatan: "",
      isActive: true,
    },
  });

  async function onSubmit(data: z.infer<typeof createUserPerangkatSchema>) {
    const { data: res, error } = await execute(
      "/protected/perangkat",
      data,
      { headers: { "Content-Type": "application/json" } },
      "/protected/kategori"
    );

    if (error) {
      notifier.error(error);
      return;
    }

    notifier.success(res?.message || "Perangkat desa berhasil ditambahkan");
    router.back();
  }

  return (
    <>
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

          {/* Password */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <div className="flex gap-3">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    id={field.name}
                    readOnly={loading}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="border-2 cursor-pointer"
                    variant="ghost"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
                <FieldDescription>
                  Minimal 8 karakter dan harus mengandung huruf besar, kecil,
                  angka, dan simbol.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Konfirmasi Password
                </FieldLabel>
                <div className="flex gap-3">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    id={field.name}
                    readOnly={loading}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    autoComplete="off"
                  />
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    className="border-2 cursor-pointer"
                    variant="ghost"
                  >
                    {showConfirmPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
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
                    disabled={loading}
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
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={loading} className="cursor-pointer">
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
    </>
  );
}

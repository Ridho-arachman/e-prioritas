"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createUserPerangkatSchema } from "@/schema/userPerangkatSchema";
import { notifier } from "../../../lib/ToastNotifier";
import { useRouter } from "next/navigation";
import { Spinner } from "../../ui/spinner";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";
import { usePost } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PerangkatFormAdd() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { post, loading } = usePost(`/protected/perangkat`);

  const form = useForm<z.infer<typeof createUserPerangkatSchema>>({
    resolver: zodResolver(createUserPerangkatSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jabatan: "",
      phoneNumber: "",
      role: undefined,
      isActive: true,
    },
  });

  const role = useWatch({ name: "role", control: form.control });

  useEffect(() => {
    form.setValue(
      "jabatan",
      role !== "PERANGKAT_DESA" ? "" : form.getValues("jabatan"),
    );
  }, [role, form]);

  async function onSubmit(data: z.infer<typeof createUserPerangkatSchema>) {
    try {
      const res = await post(data);
      notifier.success(
        "Berhasil",
        res?.message || "Perangkat desa berhasil ditambahkan",
      );
      router.back();
    } catch (err) {
      console.log(err);

      const error = err as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan pada server",
      );
    }
  }

  return (
    <>
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

        {/* Role */}
        <Controller
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Role</FieldLabel>
              <Select
                value={field.value}
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

        {/* Jabatan */}
        {role === "PERANGKAT_DESA" && (
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {/* Password */}
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password</FieldLabel>
              <div className="flex gap-2">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  readOnly={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              <FieldDescription>
                Minimal 8 karakter, huruf besar, kecil, angka & simbol
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Konfirmasi Password</FieldLabel>
              <div className="flex gap-2">
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  readOnly={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
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

      <p className="text-xs text-muted-foreground mt-3">
        Pastikan data sudah benar sebelum disimpan.
      </p>
    </>
  );
}

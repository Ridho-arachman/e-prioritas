"use client";

export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePost } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { PasswordResetSchema } from "@/schema/authSchema";
import { ApiError } from "@/types/ApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import axios, { AxiosError } from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type ResetPasswordForm = z.infer<typeof PasswordResetSchema>;

export default function ResetPasswordComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null); // null = loading

  const { post, loading } = usePost(`/auth/reset-password?token=${token}`);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      turnstileToken: "",
    },
  });

  // Cek validitas token saat halaman dimuat
  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `/api/auth/verify-reset-token?token=${token}`,
        );
        setIsTokenValid(res.data.valid);
      } catch {
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = async (values: ResetPasswordForm) => {
    if (!values.turnstileToken) {
      notifier.error("Login Gagal", "Captcha belum diverifikasi");
      return;
    }

    if (!token) {
      notifier.error(
        "Token tidak valid",
        "Silakan request ulang reset password",
      );
      return;
    }

    try {
      await post(values, {
        headers: {
          "x-captcha-response": values.turnstileToken,
        },
      });
      notifier.success("Berhasil", "Password berhasil direset");
      router.replace("/login");
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message ||
          "Token tidak valid atau sudah kedaluwarsa",
      );
    }
  };

  // Tampilan loading saat mengecek token
  if (isTokenValid === null) {
    return (
      <div className="flex items-center justify-center min-h-50">
        <p className="text-muted-foreground">Memverifikasi token...</p>
      </div>
    );
  }

  // Token tidak valid / tidak ada
  if (!isTokenValid || !token) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Token Tidak Valid
          </h1>
          <p className="text-muted-foreground mb-6">
            Link reset password sudah tidak berlaku atau sudah digunakan.
          </p>
          <Button
            onClick={() => router.push("/forgot-password")}
            className="w-full"
          >
            Minta Link Baru
          </Button>
        </div>
      </div>
    );
  }

  // Token valid → tampilkan form
  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Buat Password Baru</h1>
          <p className="text-muted-foreground text-sm">
            Masukkan password baru untuk akun Anda
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* PASSWORD BARU */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password Baru</FieldLabel>
                <div className="flex items-center gap-3">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password baru"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-0 w-10 h-10 shrink-0"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* KONFIRMASI PASSWORD */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Konfirmasi Password</FieldLabel>
                <div className="flex items-center gap-3">
                  <Input
                    {...field}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Ulangi password"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="p-0 w-10 h-10 shrink-0"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="turnstileToken"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Captcha</FieldLabel>
                <Turnstile
                  siteKey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
                  onSuccess={(token) => field.onChange(token)}
                  onExpire={() => field.onChange("")}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Reset Password"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Login
          </Button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { usePost } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { EmailSchema } from "@/schema/authSchema";
import { Turnstile } from "@marsidev/react-turnstile";

type ForgotPasswordForm = z.infer<typeof EmailSchema>;

export default function ForgotPasswordComponent() {
  const router = useRouter();
  const { post, loading } = usePost("/auth/request-password-reset");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
      turnstileToken: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordForm) => {
    try {
      if (!values.turnstileToken) {
        notifier.error("Login Gagal", "Captcha belum diverifikasi");
        return;
      }

      await post(values, {
        headers: {
          "x-captcha-response": values.turnstileToken,
        },
      });

      notifier.success(
        "Email terkirim",
        "Link reset password telah dikirim ke email Anda",
      );

      form.reset();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Terjadi kesalahan",
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Masukkan email Anda untuk menerima link reset password
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  aria-invalid={fieldState.invalid}
                />
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
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </Button>

          <Button
            type="button"
            variant="outline"
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

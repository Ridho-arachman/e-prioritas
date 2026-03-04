"use client";

import "dotenv/config";
import { Turnstile } from "@marsidev/react-turnstile";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/schema/login";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { notifier } from "../../../lib/ToastNotifier";
import { usePost } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { Checkbox } from "../../ui/checkbox";
import Link from "next/link";
import { motion } from "framer-motion";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [seePassword, setSeePassword] = useState(false);
  const router = useRouter();

  const { post, loading } = usePost("/auth/login");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      turnstileToken: "", // ⬅️ WAJIB ADA
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      if (!data.turnstileToken) {
        notifier.error("Login Gagal", "Captcha belum diverifikasi");
        return;
      }

      const res = await post(data, {
        headers: {
          "x-captcha-response": data.turnstileToken,
        },
      });

      notifier.success(
        res.message,
        `Selamat datang, ${res.data.user.name}!!!..`,
      );

      if (res.data.user.role === "ADMIN") router.push("/admin");
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      console.log(err);

      notifier.error(
        "Login Gagal",
        err.response?.data.message ?? "Terjadi kesalahan",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login Ke Akun Anda</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukkan email dan password anda untuk melanjutkan
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="m@example.com"
                    type="email"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type={seePassword ? "text" : "password"}
                      disabled={loading}
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setSeePassword((v) => !v)}
                    >
                      {seePassword ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TURNSTILE */}
          <FormField
            control={form.control}
            name="turnstileToken"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Turnstile
                    siteKey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
                    onSuccess={(token) => field.onChange(token)}
                    onExpire={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between mb-4">
            {/* REMEMBER ME */}
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                    />
                  </FormControl>
                  <FormLabel htmlFor="rememberMe" className="mb-0">
                    Remember Me
                  </FormLabel>
                </FormItem>
              )}
            />

            <Link
              href="/forgot-password"
              className="text-sm font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}

"use client";

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
import { notifier } from "./ToastNotifier";
import { useLogin } from "@/hooks/api/useAuth";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [seePassword, setSeePassword] = useState(false);
  const router = useRouter();
  const { execute, loading } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { data: res, error } = await execute(
      "/auth/login",
      data,
      { headers: { "Content-Type": "application/json" } },
      "/protected/kategori"
    );

    if (error) {
      notifier.error(error);
      return;
    }

    notifier.success(res?.message || "Kategori berhasil ditambahkan");
    router.push("/admin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login Ke Akun Anda</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukkan email dan password anda untuk melanjutkan
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Lupa password?
                  </a>
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
                      className="cursor-pointer"
                      aria-label="Toggle password visibility"
                      onClick={() => setSeePassword(!seePassword)}
                    >
                      {seePassword ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

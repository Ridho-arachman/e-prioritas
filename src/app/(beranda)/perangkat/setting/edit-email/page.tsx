"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, AlertTriangle, Send } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { UserUpdateEmailSchema } from "@/schema/authSchema";
import { useGet, usePatch } from "@/hooks/useApi";

import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { notifier } from "@/lib/ToastNotifier";

export default function ChangeEmailPage() {
  const router = useRouter();
  const { loading, patch } = usePatch("/auth/change-email");
  const { data } = useGet("/protected/user/getuser");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof UserUpdateEmailSchema>>({
    resolver: zodResolver(UserUpdateEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        email: data.email,
      });
    }
  }, [data, form]);

  const onSubmit = async (data: z.infer<typeof UserUpdateEmailSchema>) => {
    try {
      const res = await patch(data);
      notifier.success(
        "Berhasil",
        `Verifikasi ganti email telah dikirim ke ${res.data.email}`,
      );
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        err.response?.data.message || "Terjadi kesalahan",
      );
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
      {/* Tombol Kembali */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm cursor-pointer hover:pl-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </motion.div>

      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 rounded-xl shadow-sm">
            <Mail className="h-6 w-6 text-orange-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-orange-600 to-orange-700/70 bg-clip-text text-transparent">
            Ganti Email
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Mengubah email akan memerlukan verifikasi ulang.
        </p>
      </div>

      {/* Card Form */}
      <Card className="border shadow-lg shadow-orange-500/5 overflow-hidden">
        <CardContent className="p-4 md:p-6 space-y-6">
          {/* Warning */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800"
          >
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <p>
              Setelah email diubah, akun Anda harus melakukan{" "}
              <span className="font-semibold">verifikasi ulang</span>.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Baru
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                    placeholder="email@kominfo.go.id"
                    autoComplete="off"
                    className="w-full transition-shadow focus:ring-2 focus:ring-orange-500/50"
                  />
                  <FieldDescription className="text-xs text-muted-foreground">
                    Email ini akan digunakan sebagai akun login baru.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
                className="cursor-pointer w-full sm:w-auto"
              >
                Batal
              </Button>

              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="default"
                    disabled={loading}
                    className="cursor-pointer w-full sm:w-auto bg-orange-600 hover:bg-orange-700 shadow-sm hover:shadow-md transition-all"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Spinner className="mr-2 size-4" />
                        Memproses...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Verifikasi
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Ganti Email</AlertDialogTitle>
                    <AlertDialogDescription>
                      Email akan diubah dan Anda harus melakukan verifikasi
                      ulang. Pastikan email sudah benar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => form.handleSubmit(onSubmit)()}
                      className="bg-orange-600 hover:bg-orange-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <Spinner className="mr-2 size-4" />
                          Memproses...
                        </div>
                      ) : (
                        "Ya, Kirim Verifikasi"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
}

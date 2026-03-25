"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, KeyRound } from "lucide-react";

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

import { userUpdatePasswordSchema } from "@/schema/authSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

import { usePatch } from "@/hooks/useApi";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { notifier } from "@/lib/ToastNotifier";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { loading, patch } = usePatch("/auth/change-password");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof userUpdatePasswordSchema>>({
    resolver: zodResolver(userUpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof userUpdatePasswordSchema>) => {
    try {
      const res = await patch(data);
      notifier.success(
        "Berhasil",
        `Password ${res.data.name} berhasil diperbarui`,
      );
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error(
        "Gagal Mengubah Password",
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
          <div className="p-3 bg-destructive/10 rounded-xl shadow-sm">
            <Lock className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
            Ganti Password
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Aksi ini akan mengubah password akun Anda.
        </p>
      </div>

      {/* Card Form */}
      <Card className="border shadow-lg shadow-destructive/5 overflow-hidden">
        <CardContent className="p-4 md:p-6 space-y-6">
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            id="change-password-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Current Password */}
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    Password Saat Ini
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showCurrent ? "text" : "password"}
                      placeholder="Masukkan password saat ini"
                      className="pr-10 w-full transition-shadow focus:ring-2 focus:ring-destructive/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showCurrent ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* New Password */}
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    Password Baru
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showNew ? "text" : "password"}
                      placeholder="Masukkan password baru"
                      className="pr-10 w-full transition-shadow focus:ring-2 focus:ring-destructive/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showNew ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    Konfirmasi Password Baru
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Ulangi password baru"
                      className="pr-10 w-full transition-shadow focus:ring-2 focus:ring-destructive/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.error && (
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
                    variant="destructive"
                    disabled={loading}
                    className="cursor-pointer w-full sm:w-auto shadow-sm hover:shadow-md transition-all"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Spinner className="mr-2 size-4" />
                        Memproses...
                      </div>
                    ) : (
                      "Ubah Password"
                    )}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Konfirmasi Ganti Password
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin mengganti password?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive/90"
                      disabled={loading}
                      onClick={() => form.handleSubmit(onSubmit)()}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <Spinner className="mr-2 size-4" />
                          Memproses...
                        </div>
                      ) : (
                        "Ya, Ubah Password"
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

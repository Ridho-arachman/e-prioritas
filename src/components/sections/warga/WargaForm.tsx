// components/sections/warga/WargaForm.tsx
"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { useGet, usePost, usePut } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { wargaFormSchema, type WargaFormValues } from "@/schema/wargaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface WargaFormProps {
  id?: string; // jika ada -> mode edit
  role?: "admin" | "lurah" | "perangkat";
}

export function WargaForm({ id, role = "admin" }: WargaFormProps) {
  const router = useRouter();
  const isEdit = !!id;
  const basePath = `/${role}/kelola-warga`;

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: existingData, isLoading: isLoadingData } = useGet(
    isEdit ? `/protected/warga/${id}` : "",
  );
  const { post, loading: createLoading } = usePost("/protected/warga");

  const { put, loading: updateLoading } = usePut(
    isEdit ? `/protected/warga/${id}` : "",
  );

  const form = useForm<WargaFormValues>({
    resolver: zodResolver(wargaFormSchema),
    defaultValues: {
      nama: "",
      noHp: "",
      alamat: "",
    },
  });

  useEffect(() => {
    if (existingData) {
      form.reset({
        nama: existingData.nama,
        noHp: existingData.noHp,
        alamat: existingData.alamat || "",
      });
    }
  }, [existingData, form]);

  const onSubmit = (data: WargaFormValues) => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setShowConfirmDialog(false);
    const values = form.getValues();
    try {
      if (isEdit) {
        await put(values);
        notifier.success("Berhasil", "Data warga berhasil diperbarui");
      } else {
        await post(values);
        notifier.success("Berhasil", "Warga baru berhasil ditambahkan");
      }
      router.push(basePath);
    } catch (error: any) {
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan",
      );
    }
  };

  if (isEdit && isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isEdit ? "Perbarui Warga?" : "Simpan Warga?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isEdit
                ? "Perubahan akan disimpan ke database."
                : "Data warga baru akan ditambahkan ke database."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {isEdit ? "Perbarui" : "Simpan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {isEdit ? "Edit Warga" : "Tambah Warga Baru"}
            </h1>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nama">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input id="nama" {...form.register("nama")} />
                {form.formState.errors.nama && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.nama.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="noHp">
                  Nomor HP <span className="text-red-500">*</span>
                </Label>
                <Input id="noHp" {...form.register("noHp")} />
                {form.formState.errors.noHp && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.noHp.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Textarea id="alamat" rows={3} {...form.register("alamat")} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Batal
              </Button>
              <Button type="submit" disabled={createLoading || updateLoading}>
                {createLoading || updateLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

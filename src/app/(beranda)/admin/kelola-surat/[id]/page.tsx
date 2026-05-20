"use client";

import {
  SuratForm,
  SuratFormValues,
} from "@/components/sections/surat/SuratForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGet, usePut } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function EditSuratPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: surat, isLoading, error } = useGet(`/protected/surat/${id}`);
  const { put, loading: updateLoading } = usePut(`/protected/surat/${id}`);

  const onSubmit = async (data: SuratFormValues) => {
    try {
      const res = await put(data);
      notifier.success("Berhasil", res?.message || "Surat berhasil diperbarui");
      router.push("/admin/kelola-surat");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal memperbarui surat",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !surat) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Gagal memuat data surat.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.back()}
        >
          Kembali
        </Button>
      </div>
    );
  }

  // Map data dari API ke format form
  const initialData: SuratFormValues = {
    nama: surat.nama,
    deskripsi: surat.deskripsi,
    ikon: surat.ikon,
    persyaratan: surat.persyaratan,
    linkForm: surat.linkForm,
    isActive: surat.isActive,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Surat: {surat.nama}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Form Edit Surat</CardTitle>
        </CardHeader>
        <CardContent>
          <SuratForm
            initialData={initialData}
            onSubmit={onSubmit}
            isSubmitting={updateLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

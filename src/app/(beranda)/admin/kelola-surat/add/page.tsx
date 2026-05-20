"use client";

import {
  SuratForm,
  SuratFormValues,
} from "@/components/sections/surat/SuratForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePost } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddSuratPage() {
  const router = useRouter();
  const { post, loading } = usePost("/protected/surat");

  const onSubmit = async (data: SuratFormValues) => {
    try {
      const res = await post(data);
      notifier.success(
        "Berhasil",
        res?.message || "Surat berhasil ditambahkan",
      );
      router.push("/admin/kelola-surat");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal menambahkan surat",
      );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Tambah Surat Baru</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Form Surat</CardTitle>
        </CardHeader>
        <CardContent>
          <SuratForm onSubmit={onSubmit} isSubmitting={loading} />
        </CardContent>
      </Card>
    </div>
  );
}

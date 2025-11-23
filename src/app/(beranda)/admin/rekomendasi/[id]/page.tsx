"use client";

import { useParams } from "next/navigation";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { useGetRekomendasiById } from "@/hooks/api/useRekomendasi";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RekomendasiAccordion } from "@/components/rekomendasi/RekomendasiAccordion";
import { Skeleton } from "@/components/ui/skeleton";
import { MasukanTerlibatTable } from "@/components/rekomendasi/MasukanTerlibatTable";
import { MasukanTerlibatCardList } from "@/components/rekomendasi/MasukanTelibatCardList";

export default function RekomendasiDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetRekomendasiById(params.id);

  if (isLoading)
    return (
      <div className="p-8 space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Separator Placeholder */}
        <Skeleton className="h-px w-full" />

        {/* Rekomendasi Cards Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 shadow-sm space-y-3 animate-pulse"
            >
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          ))}
        </div>

        {/* Data Mentah Placeholder */}
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    );

  if (error || !data)
    return (
      <div className="p-8 text-center text-red-500">
        Gagal memuat data rekomendasi.
      </div>
    );

  const rekomendasi = data;
  const rekomendasiList = rekomendasi.laporanLengkap?.rekomendasi_prioritas;

  return (
    <div className="space-y-8 p-4 ">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {rekomendasi.judul}
        </h1>
        <p className="text-sm text-muted-foreground">
          Diproses oleh:{" "}
          <strong className="text-primary">
            {rekomendasi.processedBy?.name || "Tidak diketahui"}
          </strong>{" "}
          | Tanggal Analisis:{" "}
          {format(new Date(rekomendasi.tanggalProses), "dd MMMM yyyy, HH:mm", {
            locale: localeID,
          })}
        </p>
      </header>

      <Separator />

      {/* Bagian Rekomendasi */}
      <RekomendasiAccordion
        rekomendasiList={rekomendasiList}
        masukanWarga={rekomendasi.masukanWarga}
      />

      <Separator />

      {/* Data Mentah */}
      <MasukanTerlibatCardList masukanWarga={rekomendasi.masukanWarga} />
    </div>
  );
}

// components/sections/program-kelurahan/ProgramKelurahanDetail.tsx
"use client";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale"; // ✅ Import Indonesian locale
import { ArrowLeft, Calendar, Edit, Tag, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import DataError from "@/components/blocks/DataError";
import { useGet } from "@/hooks/useApi";
import { cn } from "@/lib/utils";

import { StatusProgram } from "@/app/generated/prisma";

interface ProgramKelurahanDetailProps {
  role: "admin" | "lurah" | "perangkat";
  id: string;
}

const statusBadgeMap: Record<StatusProgram, { label: string; color: string }> =
  {
    BERJALAN: {
      label: "Berjalan",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    SELESAI: {
      label: "Selesai",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    DITUNDA: {
      label: "Ditunda",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
  };

export default function ProgramKelurahanDetail({
  role,
  id,
}: ProgramKelurahanDetailProps) {
  const router = useRouter();
  const basePath = `/${role}/program-kelurahan`;
  const canEdit = role === "admin" || role === "lurah";

  const { data, error, isLoading } = useGet(
    `/protected/program-kelurahan/${id}`,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return <DataError message={error?.message || "Gagal memuat data"} />;
  }

  // Pastikan status adalah enum yang valid
  const status = data?.status as StatusProgram;

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Detail Program</h1>
          </div>
          {canEdit && (
            <Button onClick={() => router.push(`${basePath}/${id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{data?.judul}</h2>
          <Badge className={cn("mt-2 border", statusBadgeMap[status]?.color)}>
            {statusBadgeMap[status]?.label}
          </Badge>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">
              Deskripsi
            </h3>
            <p className="text-slate-700 whitespace-pre-line">
              {data?.deskripsi}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Penanggung Jawab (PIC)
                </p>
                <p className="text-slate-700">{data?.pic || "-"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Domain Isu</p>
                <p className="text-slate-700">{data?.domainIsu?.nama || "-"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Tanggal Mulai
                </p>
                <p className="text-slate-700">
                  {data?.tanggalMulai
                    ? format(new Date(data.tanggalMulai), "dd MMMM yyyy", {
                        locale: idLocale, // ✅ Use imported locale object
                      })
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Tanggal Selesai
                </p>
                <p className="text-slate-700">
                  {data?.tanggalSelesai
                    ? format(new Date(data.tanggalSelesai), "dd MMMM yyyy", {
                        locale: idLocale, // ✅ Use imported locale object
                      })
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 text-sm text-slate-500 border-t">
            <p>
              Dibuat:{" "}
              {format(new Date(data?.createdAt), "dd MMM yyyy, HH:mm", {
                locale: idLocale, // ✅ Use imported locale object
              })}
            </p>
            <p>
              Terakhir diperbarui:{" "}
              {format(new Date(data?.updatedAt), "dd MMM yyyy, HH:mm", {
                locale: idLocale, // ✅ Use imported locale object
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

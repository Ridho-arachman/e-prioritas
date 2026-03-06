// components/sections/dashboard/RekomendasiStatusCards.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useApi";
import {
  FileText,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Mapping ikon dan warna per status
const statusConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  Draft: {
    icon: <FileText className="w-5 h-5" />,
    color: "text-gray-700",
    bgColor: "bg-gray-100",
  },
  Diajukan: {
    icon: <Send className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  Disetujui: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  Ditolak: {
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
};

// Semua status rekomendasi berdasarkan enum
const ALL_STATUSES = ["Draft", "Diajukan", "Disetujui", "Ditolak"];

export default function RekomendasiStatusCards() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/rekomendasi-status",
  );

  if (isLoading) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Status Rekomendasi
          </CardTitle>
          <CardDescription>
            Jumlah rekomendasi berdasarkan status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm text-center text-red-600 p-6">
        <div className="flex flex-col items-center justify-center h-32 gap-3">
          <AlertCircle className="w-8 h-8" />
          <p className="font-medium">Gagal memuat data</p>
        </div>
      </Card>
    );
  }

  // Data dari API (hanya status yang memiliki data)
  const apiData = Array.isArray(data) ? data : [];

  // Buat map untuk memudahkan pencarian nilai berdasarkan nama status
  const dataMap = new Map(apiData.map((item) => [item.name, item.value]));

  // Gabungkan dengan semua status, isi nilai 0 jika tidak ada data
  const statusData = ALL_STATUSES.map((name) => ({
    name,
    value: dataMap.get(name) ?? 0,
  }));

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          Status Rekomendasi
        </CardTitle>
        <CardDescription>Jumlah rekomendasi berdasarkan status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statusData.map((item) => {
            const config = statusConfig[item.name] || {
              icon: <FileText className="w-5 h-5" />,
              color: "text-gray-700",
              bgColor: "bg-gray-100",
            };
            return (
              <div
                key={item.name}
                className={`flex flex-col items-center justify-center p-4 rounded-xl ${config.bgColor} ${config.color} transition-all hover:scale-105`}
              >
                <div className="mb-2">{config.icon}</div>
                <span className="text-2xl font-bold">{item.value}</span>
                <span className="text-xs font-medium mt-1">{item.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

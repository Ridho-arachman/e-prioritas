// components/sections/dashboard/ActivityStats.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useApi";
import { AlertCircle, PieChart as PieChartIcon } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Tambahkan enum StatusMasukan (sesuai schema)
export enum StatusMasukan {
  MENUNGGU = "MENUNGGU",
  DIVERIFIKASI = "DIVERIFIKASI",
  DITOLAK = "DITOLAK",
  DIPROSES = "DIPROSES",
  DISELESAIKAN = "DISELESAIKAN",
}

// Warna untuk setiap status: hijau (diterima), merah (ditolak), kuning (menunggu), biru (diproses), ungu (diselesaikan)
const COLORS = ["#16a34a", "#ef4444", "#facc15", "#3b82f6", "#a855f7"];

export default function ActivityStats() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/activities-stats",
  );

  if (isLoading) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-green-500" />
            Statistik Aktivitas
          </CardTitle>
          <CardDescription>Perbandingan jumlah masukan warga</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64">
            <Skeleton className="w-32 h-32 rounded-full mb-4" />
            <Skeleton className="w-3/4 h-4 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm text-center text-red-600 p-6">
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <AlertCircle className="w-8 h-8" />
          <p className="font-medium">Gagal memuat data statistik</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm text-center p-6">
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className="text-gray-500">Tidak ada data statistik tersedia</p>
        </div>
      </Card>
    );
  }

  // Data chart untuk semua status (asumsikan API mengembalikan properti yang sesuai)
  // Jika properti untuk Diproses dan Diselesaikan belum ada, beri nilai 0
  const chartData = [
    { name: "Diterima", value: data.masukanAccepted ?? 0 },
    { name: "Ditolak", value: data.masukanRejected ?? 0 },
    { name: "Menunggu", value: data.masukanWaiting ?? 0 },
    { name: "Diproses", value: data.masukanDiproses ?? 0 },
    { name: "Diselesaikan", value: data.masukanDiselesaikan ?? 0 },
  ];

  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-green-500" />
          Statistik Aktivitas
        </CardTitle>
        <CardDescription>Perbandingan jumlah masukan warga</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label={{
                  position: "outside",
                  offset: 10,
                }}
                labelLine={{ stroke: "#888", strokeWidth: 1 }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any) => {
                  const numericValue = Array.isArray(value)
                    ? value.reduce(
                        (sum: number, v: any) => sum + (Number(v) || 0),
                        0,
                      )
                    : Number(value) || 0;
                  const persen =
                    total > 0 ? ((numericValue / total) * 100).toFixed(1) : "0";
                  const label = name ?? "";
                  return [`${numericValue} (${persen}%)`, label];
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
          {/* Total di tengah */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-800">{total}</span>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

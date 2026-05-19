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

export enum StatusMasukan {
  MENUNGGU = "MENUNGGU",
  DIVERIFIKASI = "DIVERIFIKASI",
  DITOLAK = "DITOLAK",
  DIPROSES = "DIPROSES",
  DISELESAIKAN = "DISELESAIKAN",
}

const COLORS = ["#16a34a", "#ef4444", "#facc15", "#3b82f6", "#a855f7"];

export default function ActivityStats() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/activities-stats",
  );

  if (isLoading) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            Statistik Aktivitas
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Perbandingan jumlah masukan warga
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-48 sm:h-64">
            <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4" />
            <Skeleton className="w-3/4 h-4 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm h-full">
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 gap-3 p-4 text-center">
          <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          <p className="text-sm sm:text-base font-medium text-red-600">
            Gagal memuat data statistik
          </p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm h-full">
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 gap-3 p-4 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Tidak ada data statistik tersedia
          </p>
        </div>
      </Card>
    );
  }

  const chartData = [
    { name: "Diterima", value: data.masukanAccepted ?? 0 },
    { name: "Ditolak", value: data.masukanRejected ?? 0 },
    { name: "Menunggu", value: data.masukanWaiting ?? 0 },
    { name: "Diproses", value: data.masukanDiproses ?? 0 },
    { name: "Diselesaikan", value: data.masukanDiselesaikan ?? 0 },
  ];

  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm h-full">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          Statistik Aktivitas
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Perbandingan jumlah masukan warga
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 sm:pt-4 px-2 sm:px-6">
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                label={false}
                paddingAngle={2}
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
                  const numericValue = Number(value) || 0;
                  const persen =
                    total > 0 ? ((numericValue / total) * 100).toFixed(1) : "0";
                  return [`${numericValue} (${persen}%)`, name];
                }}
                contentStyle={{ fontSize: "12px" }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Total di tengah */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                {total}
              </span>
              <p className="text-[10px] sm:text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

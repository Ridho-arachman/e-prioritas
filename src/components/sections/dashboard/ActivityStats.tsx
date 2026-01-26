"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useApi";

export default function ActivityStats() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/activities-stats",
  );

  // === LOADING STATE (SKELETON) ===
  if (isLoading) {
    return (
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-green-500" />
            Statistik Aktivitas
          </CardTitle>
          <CardDescription>Perbandingan jumlah masukan warga</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 animate-pulse">
            <Skeleton className="w-32 h-32 rounded-full mb-4" />
            <Skeleton className="w-3/4 h-4 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // === ERROR STATE ===
  if (error) {
    return (
      <Card className="border border-gray-200 text-center text-red-600 p-6">
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <AlertCircle className="w-8 h-8" />
          <p className="font-medium">Gagal memuat data statistik</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200 text-center p-6">
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className="text-gray-500">Tidak ada data statistik tersedia</p>
        </div>
      </Card>
    );
  }

  // === NORMAL STATE ===
  const chartData = [
    { name: "Diterima", value: data.masukanAccepted },
    { name: "Ditolak", value: data.masukanRejected },
    { name: "Menunggu", value: data.masukanWaiting },
  ];

  const COLORS = ["#16a34a", "#ef4444", "#facc15"]; // hijau, merah, kuning

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-green-500" />
          Statistik Aktivitas
        </CardTitle>
        <CardDescription>Perbandingan jumlah masukan warga</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-64 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

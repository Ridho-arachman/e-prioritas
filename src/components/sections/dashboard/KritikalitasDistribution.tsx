// components/sections/dashboard/KritikalitasDistribution.tsx
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

// Warna untuk setiap tingkat kritikalitas
const COLORS = {
  KRITIS: "#dc2626", // red-600
  TINGGI: "#f97316", // orange-500
  SEDANG: "#eab308", // yellow-500
  RENDAH: "#22c55e", // green-500
};

// Semua kategori kritikalitas (berdasarkan enum NilaiKritikalitas)
const ALL_CATEGORIES = ["Kritis", "Tinggi", "Sedang", "Rendah"];

export default function KritikalitasDistribution() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/kritikalitas-distribution",
  );

  if (isLoading) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-purple-500" />
            Distribusi Kritikalitas
          </CardTitle>
          <CardDescription>
            Data master berdasarkan tingkat kritikalitas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="w-32 h-32 rounded-full" />
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
          <p className="font-medium">Gagal memuat data</p>
        </div>
      </Card>
    );
  }

  // Data dari API (hanya kategori yang memiliki data)
  const apiData = Array.isArray(data) ? data : [];

  // Buat map untuk memudahkan pencarian nilai berdasarkan nama kategori
  const dataMap = new Map(apiData.map((item) => [item.name, item.value]));

  // Gabungkan dengan semua kategori, isi nilai 0 jika tidak ada data
  const chartData = ALL_CATEGORIES.map((name) => ({
    name,
    value: dataMap.get(name) ?? 0,
  }));

  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-purple-500" />
          Distribusi Kritikalitas
        </CardTitle>
        <CardDescription>
          Data master berdasarkan tingkat kritikalitas
        </CardDescription>
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
                  offset: 15,
                  content: (props: any) => {
                    const { name, percent, value } = props;
                    if (value === 0) return null; // Jangan tampilkan label untuk nilai 0
                    const percentage = percent
                      ? (percent * 100).toFixed(0)
                      : "0";
                    return `${name} ${percentage}%`;
                  },
                }}
                labelLine={{ stroke: "#888", strokeWidth: 1 }}
              >
                {chartData.map((entry, index) => {
                  // Cari kunci warna yang cocok secara case-insensitive
                  const colorKey =
                    Object.keys(COLORS).find(
                      (key) => key.toLowerCase() === entry.name.toLowerCase(),
                    ) || entry.name.toUpperCase();
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[colorKey as keyof typeof COLORS] || "#888"}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  );
                })}
              </Pie>
              <Tooltip
                formatter={(value: any) => {
                  const val = typeof value === "number" ? value : 0;
                  return [`${val} data`, "Jumlah"];
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

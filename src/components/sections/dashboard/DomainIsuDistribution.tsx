// components/sections/dashboard/DomainIsuDistribution.tsx
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
import { AlertCircle, BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DomainIsuDistribution() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/domain-distribution",
  );

  if (isLoading) {
    return (
      <Card className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Distribusi per Domain Isu
          </CardTitle>
          <CardDescription>
            Jumlah masukan warga berdasarkan domain isu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="w-full h-full" />
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

  const chartData = Array.isArray(data) ? data : [];

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          Distribusi Masukan Warga
        </CardTitle>
        <CardDescription>
          Jumlah masukan warga berdasarkan kategori
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: any) => {
                  const val = typeof value === "number" ? value : 0;
                  return [`${val} masukan`, "Jumlah"];
                }}
              />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardCharts } from "@/hooks/api/useDashboardData";

export default function ChartsSection() {
  const { data, isLoading, error } = useDashboardCharts();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="border border-gray-200">
            <CardHeader>
              <Skeleton className="h-6 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Gagal memuat data chart
      </div>
    );

  const { monthlyData, dataMasterCategory } = data;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <Card className="border border-gray-200 hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Tren Masukan Warga (12 Bulan)
          </CardTitle>
          <CardDescription>
            Visualisasi data masukan diterima, menunggu, dan ditolak per bulan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  stroke="#16a34a"
                  strokeWidth={2}
                  className="cursor-pointer"
                />
                <Line
                  type="monotone"
                  dataKey="waiting"
                  stroke="#facc15"
                  strokeWidth={2}
                  className="cursor-pointer"
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                  className="cursor-pointer"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="border border-gray-200 hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Distribusi Data Master
          </CardTitle>
          <CardDescription>
            Jumlah data master berdasarkan kategori.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMasterCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

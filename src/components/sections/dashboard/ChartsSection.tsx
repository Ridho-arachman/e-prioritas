// components/sections/dashboard/ChartsSection.tsx
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ChartsSection() {
  const { data, isLoading, error } = useGet(
    "/protected/dashboard/admin/charts",
  );

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card
            key={i}
            className="border border-gray-200 shadow-sm rounded-xl bg-white/80 backdrop-blur-sm"
          >
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

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Gagal memuat data chart
      </div>
    );
  }

  const { monthlyData, dataMasterCategory } = data;

  // Pastikan data berupa array untuk menghindari error
  const safeMonthlyData = Array.isArray(monthlyData) ? monthlyData : [];
  const safeCategoryData = Array.isArray(dataMasterCategory)
    ? dataMasterCategory
    : [];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Line Chart Card */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Tren Masukan Warga (12 Bulan)
          </CardTitle>
          <CardDescription>
            Visualisasi data masukan diterima, menunggu, ditolak, diproses, dan
            selesai per bulan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={safeMonthlyData}>
                <defs>
                  <linearGradient
                    id="colorAccepted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWaiting" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorRejected"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorOnProcess"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorCompleted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />{" "}
                {/* Warna abu-abu normal */}
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: any, name: any) => {
                    const val = typeof value === "number" ? value : 0;
                    const label = name ?? "";
                    return [`${val} masukan`, label];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  name="Diterima"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#16a34a" }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorAccepted)"
                />
                <Line
                  type="monotone"
                  dataKey="waiting"
                  name="Menunggu"
                  stroke="#facc15"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#facc15" }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorWaiting)"
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  name="Ditolak"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444" }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorRejected)"
                />
                <Line
                  type="monotone"
                  dataKey="onProcess"
                  name="Diproses"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorOnProcess)"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  name="Selesai"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#a855f7" }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorCompleted)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart Card */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
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
              <BarChart data={safeCategoryData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: any, name: any) => {
                    const val = typeof value === "number" ? value : 0;
                    const label = name ?? "";
                    return [`${val} data`, label];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Bar
                  dataKey="value"
                  name="Jumlah"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// app/(beranda)/lurah/page.tsx
"use client";

import { useState } from "react";
import { useGet } from "@/hooks/useApi";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Calendar,
  FileText,
} from "lucide-react";
import DateRangeFilter from "@/components/sections/dashboard/lurah/DateRangeFilter";
import MasukanTerbaru from "@/components/sections/dashboard/lurah/MasukanTerbaru";
import KegiatanTerbaru from "@/components/sections/dashboard/lurah/KegiatanTerbaru";
import PrioritasTerbaru from "@/components/sections/dashboard/lurah/PrioritasTerbaru";
import KegiatanMenungguWidget from "@/components/sections/dashboard/lurah/KegiatanMenungguWidget";
import { useUser } from "@/hooks/useUser";

interface MonthlyData {
  month: string;
  count: number;
}

export default function LurahDashboardPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { user } = useUser();
  const {
    data: statsRes,
    isLoading: statsLoading,
    mutate,
  } = useGet(
    `/protected/dashboard/lurah/stats?startDate=${startDate}&endDate=${endDate}`,
  );
  const stats = statsRes || {};

  const handleExportLaporan = () => {
    window.open(
      `/api/protected/dashboard/lurah/laporan-sistem?startDate=${startDate}&endDate=${endDate}`,
      "_blank",
    );
  };

  const statCards = [
    {
      title: "Total Masukan",
      value: stats.totalMasukan,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Menunggu Verifikasi",
      value: stats.masukanMenunggu,
      icon: AlertCircle,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Terverifikasi",
      value: stats.masukanDiverifikasi,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Kegiatan Rapat",
      value: stats.totalKegiatan,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const monthlyMasukan: MonthlyData[] = stats.monthlyMasukan || [];
  const maxMonthlyCount = monthlyMasukan.length
    ? Math.max(...monthlyMasukan.map((m) => m.count))
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard Lurah
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Selamat datang, {user?.name || "Lurah Panggungjati"}. Berikut
              ringkasan data pembangunan kelurahan.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
              onApply={() => mutate()}
            />
            <Button onClick={handleExportLaporan} className="gap-2">
              <FileText className="h-4 w-4" /> Unduh Laporan Sistem
            </Button>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.title}
                      </p>
                      {/* ✅ Fix: gunakan div, bukan p, karena Skeleton menghasilkan div */}
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {statsLoading ? (
                          <Skeleton className="h-8 w-16 mt-1" />
                        ) : (
                          (item.value ?? 0)
                        )}
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-xl bg-linear-to-r ${item.color} text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Status Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Masukan Warga */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Status Masukan Warga</CardTitle>
              <CardDescription>
                Distribusi status masukan terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {
                      label: "Menunggu",
                      value: stats.masukanMenunggu || 0,
                      color: "bg-amber-500",
                    },
                    {
                      label: "Terverifikasi",
                      value: stats.masukanDiverifikasi || 0,
                      color: "bg-green-500",
                    },
                    {
                      label: "Ditolak",
                      value: stats.masukanDitolak || 0,
                      color: "bg-red-500",
                    },
                  ].map((item) => {
                    const totalValid =
                      (stats.masukanMenunggu || 0) +
                      (stats.masukanDiverifikasi || 0) +
                      (stats.masukanDitolak || 0);
                    const percent = totalValid
                      ? (item.value / totalValid) * 100
                      : 0;
                    return (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Rekomendasi */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Status Rekomendasi</CardTitle>
              <CardDescription>
                Rekomendasi yang diajukan dan disetujui
              </CardDescription>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {
                      label: "Diajukan",
                      value: stats.rekomendasiDiajukan || 0,
                      color: "bg-blue-500",
                    },
                    {
                      label: "Disetujui",
                      value: stats.rekomendasiDisetujui || 0,
                      color: "bg-emerald-500",
                    },
                  ].map((item) => {
                    const total =
                      (stats.rekomendasiDiajukan || 0) +
                      (stats.rekomendasiDisetujui || 0);
                    const percent = total ? (item.value / total) * 100 : 0;
                    return (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tren Masukan Warga */}
        {monthlyMasukan.length > 0 && (
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Tren Masukan Warga</CardTitle>
              <CardDescription>Jumlah masukan per bulan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Bulan
                      </th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Jumlah Masukan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyMasukan.map((item) => {
                      // Konversi format YYYY-MM ke nama bulan Indonesia
                      const [year, month] = item.month.split("-");
                      const monthNames = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mei",
                        "Jun",
                        "Jul",
                        "Agu",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Des",
                      ];
                      const monthName = monthNames[parseInt(month, 10) - 1];
                      return (
                        <tr
                          key={item.month}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                            {monthName} {year}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-blue-600 dark:text-blue-400">
                            {item.count}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MasukanTerbaru limit={5} />
          <KegiatanTerbaru limit={5} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PrioritasTerbaru limit={5} />
          <KegiatanMenungguWidget />
        </div>
      </div>
    </div>
  );
}

// components/sections/dashboard/StatsCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useApi";
import {
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  ClipboardList,
  Database,
  Clock,
  CheckCheck,
  Calendar,
} from "lucide-react";

export default function StatsCards() {
  const { data: stats, isLoading } = useGet("/protected/dashboard/admin/stats");

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const items = [
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Masukan Menunggu",
      value: stats.masukanWaiting,
      icon: <ClipboardList className="w-5 h-5 text-amber-500" />,
    },
    {
      title: "Masukan Diverifikasi",
      value: stats.masukanAccepted,
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: "Masukan Ditolak",
      value: stats.masukanRejected,
      icon: <FileText className="w-5 h-5 text-rose-500" />,
    },
    {
      title: "Masukan Diproses",
      value: stats.masukanOnProcess,
      icon: <Clock className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Masukan Selesai",
      value: stats.masukanCompleted,
      icon: <CheckCheck className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Data Master",
      value: stats.dataMasterCount,
      icon: <Database className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Kegiatan Rapat",
      value: stats.kegiatanCount,
      icon: <Calendar className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Card
          key={i}
          className="group border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 rounded-xl bg-white/80 backdrop-blur-sm"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {item.title}
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {item.value ?? 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">Data terkini</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

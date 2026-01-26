"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGet } from "@/hooks/useApi";

import {
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  ClipboardList,
  Database,
} from "lucide-react";

export default function StatsCards() {
  const { data: stats, isLoading } = useGet("/protected/dashboard/admin/stats");

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-28 bg-gray-100"></Card>
        ))}
      </div>
    );
  }

  const items = [
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      icon: <Users className="text-blue-500 w-5 h-5" />,
    },
    {
      title: "Masukan Menunggu",
      value: stats.masukanWaiting,
      icon: <ClipboardList className="text-yellow-500 w-5 h-5" />,
    },
    {
      title: "Masukan Diterima",
      value: stats.masukanAccepted,
      icon: <MessageSquare className="text-green-500 w-5 h-5" />,
    },
    {
      title: "Masukan Ditolak",
      value: stats.masukanRejected,
      icon: <FileText className="text-red-500 w-5 h-5" />,
    },
    {
      title: "Data Master",
      value: stats.dataMasterCount,
      icon: <Database className="text-purple-500 w-5 h-5" />,
    },
    {
      title: "Rekomendasi",
      value: stats.rekomendasiCount,
      icon: <BarChart3 className="text-indigo-500 w-5 h-5" />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
      {items.map((item, i) => (
        <Card
          key={i}
          className="shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 ">
            <CardTitle className="text-sm font-medium text-gray-600 cursor-text">
              {item.title}
            </CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 ">
              {item.value ?? 0}
            </div>
            <p className="text-xs text-gray-500 mt-1 cursor-text">
              Data terkini
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

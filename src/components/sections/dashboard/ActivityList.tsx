// components/sections/dashboard/ActivityList.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, ChevronRight, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useGet } from "@/hooks/useApi";
import Link from "next/link";

export default function ActivityList() {
  const {
    data: activities,
    isLoading,
    error,
  } = useGet("/protected/dashboard/admin/activities");

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            Aktivitas Terbaru
          </CardTitle>
          <CardDescription>Riwayat aktivitas terbaru sistem</CardDescription>
        </div>
        {activities?.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-1 text-blue-600"
          >
            <Link href="/admin/aktivitas">
              Lihat semua <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-gray-600">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-5 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </>
        ) : error ? (
          <p className="text-red-500 text-sm">Gagal memuat aktivitas.</p>
        ) : activities?.length ? (
          activities
            .slice(0, 5)
            .map((activity: { title: string; time: string }, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-gray-100 pb-2 hover:bg-blue-50/50 rounded-md px-2 py-1 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">{activity.title}</span>
                </div>
                <span className="text-gray-400 text-xs">
                  {formatDistanceToNow(new Date(activity.time), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Activity className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">Belum ada aktivitas.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

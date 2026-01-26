"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useGet } from "@/hooks/useApi";

export default function ActivityList() {
  const {
    data: activities,
    isLoading,
    error,
  } = useGet("/protected/dashboard/admin/activities");

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-500" />
          Aktivitas Terbaru
        </CardTitle>
        <CardDescription>Riwayat aktivitas terbaru sistem</CardDescription>
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
          activities.map(
            (activity: { title: string; time: string }, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-2 hover:bg-gray-50 rounded-md px-2 transition"
              >
                <span>{activity.title}</span>
                <span className="text-gray-400 text-xs">
                  {formatDistanceToNow(new Date(activity.time), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            ),
          )
        ) : (
          <p className="text-gray-400 text-sm">Belum ada aktivitas.</p>
        )}
      </CardContent>
    </Card>
  );
}

// components/sections/dashboard/ActivityList.tsx
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
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { ClipboardList, Dot } from "lucide-react";

interface Activity {
  title: string;
  time: string;
}

export default function ActivityList() {
  const {
    data: activities,
    isLoading,
    error,
  } = useGet("/protected/dashboard/admin/activities");

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <ClipboardList className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Riwayat aktivitas terbaru sistem
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading ? (
          // Loading state
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3 w-full">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
                <Skeleton className="h-3 w-16 ml-2" />
              </div>
            ))}
          </>
        ) : error ? (
          // Error state
          <div className="flex justify-center py-6">
            <p className="text-red-500 text-sm">Gagal memuat aktivitas.</p>
          </div>
        ) : activities && activities.length > 0 ? (
          // Data state
          activities.slice(0, 5).map((activity: Activity, idx: number) => (
            <div
              key={idx}
              className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1 py-2 px-2 -mx-2 rounded-lg hover:bg-blue-50/60 transition-colors"
            >
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <Dot className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                <p className="text-sm text-gray-700 whitespace-normal wrap-break-words leading-relaxed">
                  {activity.title}
                </p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap pt-0.5 shrink-0">
                {formatDistanceToNow(new Date(activity.time), {
                  addSuffix: true,
                  locale: id,
                })}
              </span>
            </div>
          ))
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <ClipboardList className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">Belum ada aktivitas.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

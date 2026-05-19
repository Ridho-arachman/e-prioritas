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
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white/80 backdrop-blur-sm h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
            <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg font-semibold truncate">
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription className="text-xs mt-0.5 truncate">
              Riwayat aktivitas terbaru sistem
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-4 sm:pb-6">
        {isLoading ? (
          // Loading state
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 py-1"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Skeleton className="h-2 w-2 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-full max-w-50 sm:max-w-none" />
                </div>
                <Skeleton className="h-3 w-16 shrink-0" />
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="flex justify-center py-6">
            <p className="text-red-500 text-sm text-center px-4">
              Gagal memuat aktivitas.
            </p>
          </div>
        ) : activities && activities.length > 0 ? (
          // Data state
          <div className="space-y-1">
            {activities.slice(0, 5).map((activity: Activity, idx: number) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 py-2 px-2 -mx-2 rounded-lg hover:bg-blue-50/60 transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <Dot className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700 wrap-break-word leading-relaxed">
                    {activity.title}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0 sm:ml-2 pl-5 sm:pl-0">
                  {formatDistanceToNow(new Date(activity.time), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <ClipboardList className="w-10 h-10 sm:w-12 sm:h-12 mb-2 opacity-30" />
            <p className="text-xs sm:text-sm text-center px-4">
              Belum ada aktivitas.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

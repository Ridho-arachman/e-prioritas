"use client";

import { useGet } from "@/hooks/useApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

interface KegiatanTerbaruProps {
  limit?: number;
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  DIAJUKAN:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  DISETUJUI:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  DITOLAK: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
};

const formatTanggal = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function KegiatanTerbaru({ limit = 5 }: KegiatanTerbaruProps) {
  const { data, isLoading } = useGet(
    `/protected/dashboard/lurah/kegiatan-terbaru?limit=${limit}`,
  );
  const kegiatanList = data || [];

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Kegiatan Rapat Terbaru
        </CardTitle>
        <CardDescription>{limit} kegiatan rapat terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : kegiatanList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Belum ada kegiatan rapat.
          </p>
        ) : (
          <div className="space-y-3">
            {kegiatanList.map((item: any) => (
              <div
                key={item.id}
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {item.judul}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTanggal(item.tanggal)}
                    </p>
                  </div>
                  <Badge
                    className={
                      statusColors[item.statusRekomendasi] || "bg-gray-100"
                    }
                  >
                    {item.statusRekomendasi}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

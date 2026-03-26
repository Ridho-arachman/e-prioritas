"use client";

import { useGet } from "@/hooks/useApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function KegiatanMenungguWidget() {
  const { data, isLoading } = useGet(
    "/protected/dashboard/lurah/kegiatan-menunggu?limit=3",
  );
  const kegiatanList = data || [];

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          Menunggu Persetujuan
        </CardTitle>
        <CardDescription>Kegiatan rapat yang telah diajukan</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : kegiatanList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Tidak ada kegiatan yang menunggu.
          </p>
        ) : (
          <div className="space-y-3">
            {kegiatanList.map((k: any) => (
              <div
                key={k.id}
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {k.judul}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(k.tanggal).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

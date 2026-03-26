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
import { MessageSquare } from "lucide-react";

interface MasukanTerbaruProps {
  limit?: number;
}

const statusColors: Record<string, string> = {
  MENUNGGU:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  DIVERIFIKASI:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  DITOLAK: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  DIPROSES: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  DISELESAIKAN:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
};

const formatTanggal = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function MasukanTerbaru({ limit = 5 }: MasukanTerbaruProps) {
  const { data, isLoading } = useGet(
    `/protected/dashboard/lurah/masukan-terbaru?limit=${limit}`,
  );
  const masukanList = data || [];

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Masukan Warga Terbaru
        </CardTitle>
        <CardDescription>{limit} masukan terakhir yang masuk</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : masukanList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Belum ada masukan warga.
          </p>
        ) : (
          <div className="space-y-3">
            {masukanList.map((item: any) => (
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
                      {item.namaPengirim ? `Dari: ${item.namaPengirim} • ` : ""}
                      {formatTanggal(item.createdAt)}
                    </p>
                  </div>
                  <Badge className={statusColors[item.status] || "bg-gray-100"}>
                    {item.status}
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

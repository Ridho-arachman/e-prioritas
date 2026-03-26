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
import { Target } from "lucide-react";

interface PrioritasTerbaruProps {
  limit?: number;
}

export default function PrioritasTerbaru({ limit = 5 }: PrioritasTerbaruProps) {
  const { data, isLoading } = useGet(
    `/protected/dashboard/lurah/prioritas-terbaru?limit=${limit}`,
  );
  const prioritasList = data || [];

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Prioritas Terbaru
        </CardTitle>
        <CardDescription>
          {limit} rekomendasi prioritas terbaru dari kegiatan rapat
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : prioritasList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Belum ada rekomendasi prioritas.
          </p>
        ) : (
          <div className="space-y-3">
            {prioritasList.map((item: any) => (
              <div
                key={item.id}
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                      {item.deskripsi}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Dari: {item.kegiatanRapatJudul}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    Skor: {item.skorPrioritas.toFixed(2)}
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

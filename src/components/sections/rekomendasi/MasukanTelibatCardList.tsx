"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MessageSquare, MapPin, Tag } from "lucide-react";

export function MasukanTerlibatCardList({
  masukanWarga,
}: {
  masukanWarga: any[];
}) {
  if (!masukanWarga || masukanWarga.length === 0)
    return (
      <p className="text-muted-foreground text-sm py-2">
        Tidak ada masukan warga terkait langsung dengan prioritas ini.
      </p>
    );

  return (
    <div className="space-y-4">
      {masukanWarga.map((item) => {
        const m = item.masukan;

        return (
          <Card
            key={m.id}
            className="border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Header */}
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Masukan #{m.id}</p>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>
                    RT {m.lokasiRt}/RW {m.lokasiRw}
                  </span>
                </div>
              </div>

              {/* Status */}
              <Badge
                variant={
                  m.status === "DITERIMA"
                    ? "default"
                    : m.status === "DIPROSES"
                      ? "secondary"
                      : "outline"
                }
                className="uppercase tracking-tight"
              >
                {m.status}
              </Badge>
            </CardHeader>

            {/* Isi */}
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed border-l-4 pl-4 py-1 border-primary/30 text-muted-foreground">
                {m.deskripsiMasukan}
              </p>

              {/* Kategori */}
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary" className="uppercase tracking-tight">
                  {m.kategoriId}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

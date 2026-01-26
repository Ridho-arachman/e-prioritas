"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MasukanTerlibatTable as MasukanTerlibatTable } from "./MasukanTerlibatTable";
import { ExternalLink, Star } from "lucide-react";

export function RekomendasiAccordion({
  rekomendasiList,
  masukanWarga,
}: {
  rekomendasiList: any[];
  masukanWarga: any[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold flex items-center">
        <Star className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" />5
        Rekomendasi Prioritas (Hasil Fusi Data AI)
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {rekomendasiList?.map((item, index) => (
          <Card
            key={item.prioritas_ke}
            className={`mb-3 ${
              index === 0 ? "border-4 border-primary shadow-lg" : ""
            }`}
          >
            <AccordionItem
              value={`item-${item.prioritas_ke}`}
              className="border-b-0"
            >
              <AccordionTrigger className="p-4 flex justify-between items-center hover:no-underline">
                <div className="flex items-center space-x-4 text-left">
                  <Badge
                    variant={index === 0 ? "default" : "secondary"}
                    className={`text-lg px-3 py-1 ${
                      index === 0 ? "bg-primary hover:bg-primary/90" : ""
                    }`}
                  >
                    P-{item.prioritas_ke}
                  </Badge>
                  <span
                    className={`font-bold ${
                      index === 0 ? "text-xl text-primary" : "text-lg"
                    }`}
                  >
                    {item.deskripsi}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  <span className="text-sm text-muted-foreground">Skor:</span>
                  <Badge
                    variant="outline"
                    className="text-base font-extrabold text-red-600"
                  >
                    {item.skor_prioritas.toFixed(2)}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              </AccordionTrigger>

              <AccordionContent className="p-4 pt-0">
                <div className="space-y-4">
                  <h3 className="text-md font-semibold mt-4">Analisis AI:</h3>
                  <p className="text-sm border-l-4 border-gray-200 pl-4 italic bg-gray-50 p-2 rounded">
                    {item.alasan_analisis}
                  </p>

                  <h3 className="text-md font-semibold">
                    Masukan Warga yang Mendukung:
                  </h3>
                  <MasukanTerlibatTable
                    masukanWarga={masukanWarga.filter((m: any) =>
                      item.masukan_terkait_ids.includes(m.masukan.id)
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </section>
  );
}

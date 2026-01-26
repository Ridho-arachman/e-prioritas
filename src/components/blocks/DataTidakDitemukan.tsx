"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PackageX } from "lucide-react";

interface DataTidakDitemukanProps {
  title?: string;
  description?: string;
}

export default function DataTidakDitemukan({
  title = "Tidak ditemukan",
  description = "Data tidak tersedia atau tidak sesuai pencarian.",
}: DataTidakDitemukanProps) {
  return (
    <Card className="w-full mx-auto border ">
      <CardContent className="flex flex-col items-center justify-center text-center p-10">
        <PackageX className="w-20 h-20 " />
        <h2 className="text-xl font-semibold ">{title}</h2>
        <p className="max-w-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PackageX } from "lucide-react";

interface DataKosongProps {
  title?: string;
  description?: string;
}

export default function DataKosong({
  title = "Data Kosong",
  description = "Belum ada data yang tersedia saat ini.",
}: DataKosongProps) {
  return (
    <Card className="w-full mx-auto bg-gray-50">
      <CardContent className="flex flex-col items-center justify-center text-center p-10">
        <PackageX className="w-20 h-20 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
        <p className="text-gray-500 max-w-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

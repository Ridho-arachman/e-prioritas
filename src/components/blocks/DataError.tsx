"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface DataErrorProps {
  message?: string;
}

export default function DataError({ message }: DataErrorProps) {
  return (
    <Card className="w-full mx-auto border-red-500">
      <CardContent className="flex flex-col items-center text-center p-10">
        <AlertCircle className="w-20 h-20 text-red-400 mb-4" />
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-red-500 max-w-sm">
          {message || "Gagal memuat data."}
        </p>
      </CardContent>
    </Card>
  );
}

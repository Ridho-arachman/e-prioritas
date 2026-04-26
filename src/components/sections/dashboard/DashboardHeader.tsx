// components/sections/dashboard/DashboardHeader.tsx
"use client";

import DateRangeFilter from "@/components/sections/dashboard/lurah/DateRangeFilter"; // pastikan path sesuai
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleExportLaporan = () => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    window.open(
      `/api/protected/dashboard/lurah/laporan-sistem?${params.toString()}`,
      "_blank",
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/30">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Dashboard Admin
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Pantau data dan aktivitas terbaru di sistem
        </p>
      </div>
      <div className="flex items-center gap-2">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          onApply={() => {}} // bisa kosong, karena unduh langsung di tombol
        />
        <Button
          onClick={handleExportLaporan}
          className="gap-2 shadow-sm hover:shadow-md transition-all bg-linear-to-r from-blue-600 to-indigo-600 text-white border-0"
        >
          <FileText className="w-4 h-4" />
          Lihat Laporan
        </Button>
      </div>
    </div>
  );
}

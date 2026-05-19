// components/sections/dashboard/DashboardHeader.tsx
"use client";

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
    <div className="flex flex-col items-start justify-between gap-4 bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-white/30 md:flex-row md:items-center relative z-0">
      <div className="w-full md:w-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
          Dashboard Admin
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Pantau data dan aktivitas terbaru di sistem
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        {/* Date range picker native */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center bg-white rounded-lg border border-gray-300 p-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="hidden sm:inline text-gray-400">—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          onClick={handleExportLaporan}
          className="gap-2 shadow-sm hover:shadow-md transition-all bg-linear-to-r from-blue-600 to-indigo-600 text-white border-0 w-full sm:w-auto justify-center"
        >
          <FileText className="w-4 h-4" />
          Lihat Laporan
        </Button>
      </div>
    </div>
  );
}

// components/sections/dashboard/DashboardHeader.tsx
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
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
      <Button
        asChild
        className="gap-2 shadow-sm hover:shadow-md transition-all bg-linear-to-r from-blue-600 to-indigo-600 text-white border-0"
      >
        <Link href="/admin/laporan">
          <FileText className="w-4 h-4" />
          Lihat Laporan
        </Link>
      </Button>
    </div>
  );
}

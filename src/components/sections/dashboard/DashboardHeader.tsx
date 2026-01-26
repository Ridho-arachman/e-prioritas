import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Dashboard Admin
        </h1>
        <p className="text-gray-500 text-sm">
          Pantau data dan aktivitas terbaru di sistem
        </p>
      </div>
      <Button className="gap-2 shadow-sm hover:shadow-md transition-all">
        Lihat Laporan <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

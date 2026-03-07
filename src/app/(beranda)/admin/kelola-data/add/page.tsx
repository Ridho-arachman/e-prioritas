// Halaman Create Data Master (create/page.tsx)
import DataMasterFormAdd from "@/components/sections/dataMaster/dataMasterFormAdd";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateDataMasterPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      {/* Tombol Kembali */}
      <Link href="/admin/kelola-data" className="inline-block mb-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 pl-0 hover:pl-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
      </Link>

      {/* Header dengan ikon dan gradien */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <span className="text-2xl md:text-3xl">📊</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Tambah Data Master
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Tambahkan data master baru untuk keperluan analisis desa.
        </p>
      </div>

      {/* Form (sudah memiliki card sendiri) */}
      <DataMasterFormAdd />
    </div>
  );
}

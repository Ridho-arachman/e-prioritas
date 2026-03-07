import { PerangkatFormEdit } from "@/components/sections/perangkat/perangkatFormEdit";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditKategoriPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl space-y-8">
      {/* Tombol Kembali dengan efek hover */}
      <Link
        href={"/admin/kelola-perangkat"}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        <span>Kembali ke Daftar Perangkat</span>
      </Link>

      {/* Header dengan ikon dan gradien */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <span className="text-2xl md:text-3xl">👤</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Edit Perangkat Desa
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Perbarui data perangkat desa sesuai kebutuhan. Pastikan data yang
          dimasukkan sudah benar.
        </p>
      </div>

      {/* Form dengan latar belakang dan bayangan */}
      <div className="bg-card rounded-xl shadow-lg shadow-primary/5 border border-border/50 p-4 md:p-6">
        <PerangkatFormEdit />
      </div>

      {/* Catatan kecil (opsional) */}
      <p className="text-xs text-muted-foreground text-center">
        Perubahan akan disimpan setelah mengklik tombol "Simpan Perubahan".
      </p>
    </div>
  );
}

import { PerangkatFormEdit } from "@/components/sections/perangkat/perangkatFormEdit";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditKategoriPage() {
  return (
    <div className="px-10 py-4 space-y-10">
      <Link
        href={"/admin/kelola-perangkat"}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="size-4" />
        Kembali
      </Link>
      <div>
        <h1 className="text-3xl font-bold mb-2">👤 Edit Perangkat Desa</h1>
        <p className="text-muted-foreground">
          Perbarui Data Perangkat Desa Sesuai Kebutuhan.
        </p>
      </div>
      {/* form kategori edit */}
      <PerangkatFormEdit />
    </div>
  );
}

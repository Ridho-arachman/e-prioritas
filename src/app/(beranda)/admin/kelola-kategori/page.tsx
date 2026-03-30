import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ListTableKategori from "@/components/sections/kategori/listTableKategori";
import { connection } from "next/server";

const page = async () => {
  await connection();
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header dengan ikon dan gradien */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <span className="text-2xl md:text-3xl">🏷️</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Kelola Kategori Masukan Warga
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-1 text-sm md:text-base">
          Kelola data kategori, tambah, edit, atau hapus kategori masukan warga.
        </p>
      </div>

      {/* Konten utama - ListTableKategori sudah memiliki card sendiri */}
      <div className="bg-card rounded-xl shadow-lg shadow-primary/5 overflow-hidden border border-border/50">
        <ListTableKategori />
      </div>
    </div>
  );
};

export default page;

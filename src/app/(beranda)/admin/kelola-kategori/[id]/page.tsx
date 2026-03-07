import { KategoriFormEdit } from "@/components/sections/kategori/kategoriFormEdit";

export default function EditKategoriPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl space-y-8">
      {/* Header dengan ikon dan gradien */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <span className="text-2xl md:text-3xl">✏️</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Edit Kategori
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Perbarui informasi kategori masukan warga sesuai kebutuhan.
        </p>
      </div>

      {/* Form edit kategori (sudah memiliki card sendiri) */}
      <KategoriFormEdit />
    </div>
  );
}

import { KategoriFormAdd } from "@/components/kategori/kategoriFormAdd";

export default function CreateKategoriPage() {
  return (
    <div className="px-10 py-4 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">🗂️ Tambah Kategori Baru</h1>
        <p className="text-muted-foreground">
          Buat kategori untuk mengelompokkan masukan warga berdasarkan tema.
        </p>
      </div>

      {/* <KategoriForm type="tambah"  */}
      <KategoriFormAdd />
    </div>
  );
}

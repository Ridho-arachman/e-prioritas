import { KategoriFormEdit } from "@/components/kategori/kategoriFormEdit";

export default function EditKategoriPage() {
  return (
    <div className="px-10 py-4 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">✏️ Edit Kategori</h1>
        <p className="text-muted-foreground">
          Perbarui informasi kategori masukan warga sesuai kebutuhan.
        </p>
      </div>

      <KategoriFormEdit />
    </div>
  );
}

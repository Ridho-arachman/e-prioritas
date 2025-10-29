import { PerangkatFormEdit } from "@/components/perangkat/perangkatFormEdit";

export default function EditKategoriPage() {
  return (
    <div className="px-10 py-4 space-y-10">
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

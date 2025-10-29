import PerangkatFormAdd from "@/components/perangkat/perangkatFormAdd";

const page = () => {
  return (
    <div className="px-10 py-4 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          👤 Tambah Perangkat Desa Baru
        </h1>
        <p className="text-muted-foreground">
          Buat perangkat desa untuk mengelola masukan warga.
        </p>
      </div>
      {/* form kategori tambah */}
      <PerangkatFormAdd />
    </div>
  );
};

export default page;

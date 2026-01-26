import PerangkatFormAdd from "@/components/sections/perangkat/perangkatFormAdd";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="px-10 md:py-0 space-y-10">
      <Link
        href={"/admin/kelola-perangkat"}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="size-4" />
        Kembali
      </Link>
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

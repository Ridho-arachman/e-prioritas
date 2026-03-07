import UserDetail from "@/components/sections/perangkat/UserDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailUserPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl space-y-6">
      {/* Tombol Kembali dengan efek hover */}
      <Link href="/admin/kelola-perangkat" className="inline-block">
        <Button
          variant="outline"
          className="cursor-pointer group transition-all hover:shadow-md hover:border-primary/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Daftar
        </Button>
      </Link>

      {/* Header halaman */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Detail Perangkat Desa
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Informasi lengkap akun perangkat desa.
        </p>
      </div>

      {/* Komponen detail user */}
      <UserDetail id={id} />

      {/* Footer tip (opsional) */}
      <p className="text-xs text-center text-muted-foreground pt-4">
        Gunakan tombol edit untuk mengubah data, atau hapus jika diperlukan.
      </p>
    </div>
  );
}

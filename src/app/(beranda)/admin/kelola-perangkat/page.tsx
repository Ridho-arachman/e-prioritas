import { Card } from "@/components/ui/card";
import ListTablePerangkat from "@/components/sections/perangkat/listTablePerangkat";
import ListPerangkatMobile from "@/components/sections/perangkat/listPerangkatMobile";
import { connection } from "next/server";

export default async function PerangkatListPage() {
  await connection();
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header dengan ikon dan gradien */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <span className="text-2xl md:text-3xl">👥</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Kelola Akun Perangkat Desa
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-1 text-sm md:text-base">
          Kelola data perangkat desa, tambah, edit, atau hapus akun.
        </p>
      </div>

      {/* Card utama dengan efek yang lebih modern */}
      <Card className="border-0 shadow-lg shadow-primary/5 overflow-hidden bg-card/50 backdrop-blur-sm">
        <ListTablePerangkat />
      </Card>

      {/* Untuk tampilan mobile, jika diperlukan */}
      {/* <Card className="md:hidden border-0 shadow-lg">
        <ListPerangkatMobile />
      </Card> */}
    </div>
  );
}

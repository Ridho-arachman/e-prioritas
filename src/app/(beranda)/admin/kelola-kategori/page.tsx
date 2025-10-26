import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ListTableKategori from "@/components/kategori/listTableKategori";

const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🏷️ Kelola Kategori Masukan Warga</span>
          <Link href="/admin/kelola-kategori/add">
            <Button variant="default" className="cursor-pointer">
              + Tambah Kategori
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <ListTableKategori />
    </Card>
  );
};

export default page;

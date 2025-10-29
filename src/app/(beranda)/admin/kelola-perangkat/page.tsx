import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ListTablePerangkat from "@/components/perangkat/listTablePerangkat";

export default function PerangkatListPage() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>👥 Kelola Akun Perangkat Desa</CardTitle>
          <Link href="/admin/kelola-perangkat/add">
            <Button className="cursor-pointer">Tambah Perangkat</Button>
          </Link>
        </CardHeader>
        <ListTablePerangkat />
      </Card>
    </div>
  );
}

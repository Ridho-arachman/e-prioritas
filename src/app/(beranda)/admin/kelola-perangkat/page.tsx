import { Card } from "@/components/ui/card";
import ListTablePerangkat from "@/components/sections/perangkat/listTablePerangkat";
import ListPerangkatMobile from "@/components/sections/perangkat/listPerangkatMobile";

export default function PerangkatListPage() {
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold font-sans flex items-center gap-2 mb-6">
        👥 Kelola Akun Perangkat Desa
      </h1>
      <Card className="hidden md:block min-w-0 overflow-hidden">
        <ListTablePerangkat />
      </Card>
      <Card className="md:hidden">
        <ListPerangkatMobile />
      </Card>
    </>
  );
}

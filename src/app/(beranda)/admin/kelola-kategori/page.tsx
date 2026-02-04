import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ListTableKategori from "@/components/sections/kategori/listTableKategori";

const page = () => {
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold font-sans flex items-center gap-2 mb-6">
        🏷️ Kelola Kategori Masukan Warga
      </h1>
      {/* <Card className="hidden md:block min-w-0 overflow-hidden">
        <ListTablePerangkat />
      </Card>
      <Card className="md:hidden">
        <ListPerangkatMobile />
      </Card> */}

      <Card>
        <ListTableKategori />
      </Card>
    </>
  );
};

export default page;

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
    <div>
      <Link href="/admin/kelola-perangkat">
        <Button variant="outline" className="mb-2 cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
      </Link>

      <UserDetail id={id} />
    </div>
  );
}

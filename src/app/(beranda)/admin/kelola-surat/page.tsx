import AdminSuratPage from "@/components/sections/surat/ListSurat";
import { Loader2 } from "lucide-react";
import { connection } from "next/server";
import { Suspense } from "react";

export default async function KelolaSuratPage() {
  await connection();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <AdminSuratPage />
    </Suspense>
  );
}

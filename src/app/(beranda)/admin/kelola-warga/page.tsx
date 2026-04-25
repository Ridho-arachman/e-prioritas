import { WargaList } from "@/components/sections/warga/WargaList";
import { connection } from "next/server";

export default async function AdminWargaPage() {
  await connection();
  return <WargaList role="admin" />;
}

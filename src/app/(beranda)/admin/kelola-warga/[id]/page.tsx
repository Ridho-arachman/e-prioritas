// app/(beranda)/admin/kelola-warga/[id]/page.tsx
import { WargaDetail } from "@/components/sections/warga/WargaDetail";

export default async function DetailWargaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <WargaDetail id={id} role="admin" />;
}

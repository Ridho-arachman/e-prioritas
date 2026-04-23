// app/(beranda)/admin/kelola-warga/[id]/edit/page.tsx
import { WargaForm } from "@/components/sections/warga/WargaForm";

export default async function EditWargaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WargaForm id={id} role="admin" />;
}

import ProgramKelurahanDetail from "@/components/sections/program-kelurahan/ProgramKelurahanDetail";

export default async function AdminProgramKelurahanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProgramKelurahanDetail role="lurah" id={id} />;
}

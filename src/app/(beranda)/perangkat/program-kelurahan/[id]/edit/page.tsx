import ProgramKelurahanForm from "@/components/sections/program-kelurahan/ProgramKelurahanForm";

export default async function AdminProgramKelurahanEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProgramKelurahanForm role="perangkat" id={id} />;
}

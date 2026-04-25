import ProgramKelurahanList from "@/components/sections/program-kelurahan/ProgramKelurahanList";
import { connection } from "next/server";

export default async function AdminProgramKelurahanPage() {
  await connection();
  return <ProgramKelurahanList role="admin" />;
}

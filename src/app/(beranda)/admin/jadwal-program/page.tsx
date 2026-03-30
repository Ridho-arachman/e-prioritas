import ListJadwalKegiatan from "@/components/sections/jadwalKegiatan/ListJadwalKegiatan";
import { connection } from "next/server";

const page = async () => {
  await connection();
  return (
    <>
      <ListJadwalKegiatan />
    </>
  );
};

export default page;

import ListJadwalKegiatan from "@/components/sections/jadwalKegiatan/perangkat/ListJadwalKegiatan";
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

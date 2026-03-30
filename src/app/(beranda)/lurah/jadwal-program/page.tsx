import ListJadwalKegiatan from "@/components/sections/jadwalKegiatan/lurah/ListJadwalKegiatan";
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

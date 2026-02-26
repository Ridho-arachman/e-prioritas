import prisma from "@/lib/prisma";

const DOMAIN_ISU_PRESET = [
  {
    code: "INFRASTRUKTUR",
    nama: "Infrastruktur & Pembangunan",
    deskripsi: "Jalan, drainase, jembatan, fasilitas umum",
  },
  {
    code: "KESEHATAN",
    nama: "Kesehatan Masyarakat",
    deskripsi: "Posyandu, puskesmas, sanitasi, gizi",
  },
  {
    code: "PENDIDIKAN",
    nama: "Pendidikan",
    deskripsi: "Sekolah, TPA, beasiswa, literasi",
  },
  {
    code: "EKONOMI",
    nama: "Ekonomi & UMKM",
    deskripsi: "Pelatihan usaha, modal, pasar warga",
  },
  {
    code: "KEAMANAN",
    nama: "Keamanan & Ketertiban",
    deskripsi: "Hansip, siskamling, konflik warga",
  },
  {
    code: "LINGKUNGAN",
    nama: "Lingkungan Hidup",
    deskripsi: "Sampah, penghijauan, banjir",
  },
];

export async function domainIsuFactory() {
  return await Promise.all(
    DOMAIN_ISU_PRESET.map((isu) =>
      prisma.domainIsu.upsert({
        where: { code: isu.code },
        update: {},
        create: {
          code: isu.code,
          nama: isu.nama,
          deskripsi: isu.deskripsi,
        },
      }),
    ),
  );
}

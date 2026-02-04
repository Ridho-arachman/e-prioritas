import { createKategori } from "./factories/kategori.factory";
import { createDataMaster } from "./factories/data-master.factory";
import { createMasukanWarga } from "./factories/masukan-warga.factory";
import { createRekomendasi } from "./factories/rekomendasi.factory";
import prisma from "@/lib/prisma";

async function main() {
  console.log("🌱 Seeding with faker...");

  // 1. Kategori
  const kategori = await createKategori();

  // 2. Data master (beberapa)
  await Promise.all(Array.from({ length: 5 }).map(() => createDataMaster()));

  // 3. Masukan warga
  const masukans = await Promise.all(
    Array.from({ length: 4 }).map(() => createMasukanWarga(kategori.id)),
  );

  // 4. Rekomendasi
  await createRekomendasi(masukans.map((m) => m.id));

  console.log("✅ Faker seed selesai");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

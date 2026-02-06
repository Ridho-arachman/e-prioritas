import "dotenv/config";
import prisma from "@/lib/prisma";
import {
  dataMasterFactory,
  domainIsuFactory,
  kegiatanRapatFactory,
  masukanWargaFactory,
  rekomendasiFactory,
} from "./factories";
async function main() {
  console.log("🌱 Seeding with faker...");

  const domains = await domainIsuFactory();
  const domainIds = domains.map((d) => d.id);

  const USER_ID = "y4YXDIOJLPSjG0H1zkg7QfW3AKUhBtWF";

  await dataMasterFactory(domainIds, USER_ID);
  await masukanWargaFactory(domainIds);

  const rapat = await kegiatanRapatFactory(USER_ID, domainIds[0]);
  await rekomendasiFactory(rapat.id, domainIds[0]);

  console.log("✅ Seed selesai");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

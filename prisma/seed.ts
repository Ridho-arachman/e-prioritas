import "dotenv/config";
import prisma from "@/lib/prisma";
import { fakerID_ID as faker } from "@faker-js/faker";
import {
  domainIsuFactory,
  dataMasterFactory,
  masukanWargaFactory,
  kegiatanRapatFactory,
} from "./factories";
import { Role } from "@/app/generated/prisma";

async function main() {
  console.log("🌱 Seeding with faker (JSON-only recommendation)...");

  // ═══════════════════════════════════════════════════════════════
  // 📌 STEP 0: Fetch valid user dari database
  // ═══════════════════════════════════════════════════════════════
  console.log("👥 Fetching valid user for relations...");

  const validUser = await prisma.user.findFirst({
    where: {
      isActive: true,
      OR: [{ role: Role.ADMIN }, { role: Role.PERANGKAT_DESA }],
    },
    orderBy: { createdAt: "asc" },
  });

  if (!validUser) {
    throw new Error(
      "❌ Tidak ada user aktif (ADMIN/PERANGKAT_DESA) di database!\n" +
        "   Pastikan kamu sudah membuat user terlebih dahulu sebelum menjalankan seeder.",
    );
  }

  const USER_ID = validUser.id;
  console.log(`   ✓ Using user: ${validUser.name} (${validUser.role})\n`);

  // ═══════════════════════════════════════════════════════════════
  // 🧹 CLEAN DATABASE (dalam transaction)
  // ═══════════════════════════════════════════════════════════════
  await prisma.$transaction(async (tx) => {
    // ✅ Urutan: hapus child dulu sebelum parent
    // ❌ TIDAK ADA: itemPrioritas.deleteMany() (sudah dihapus dari schema)
    await tx.kegiatanRapatMasukan.deleteMany();
    await tx.kegiatanRapat.deleteMany();
    await tx.masukanWarga.deleteMany();
    await tx.dataMaster.deleteMany();
    await tx.domainIsu.deleteMany();
    console.log("🧹 Database cleaned");
  });

  // ═══════════════════════════════════════════════════════════════
  // 1️⃣ CREATE DOMAIN ISU
  // ═══════════════════════════════════════════════════════════════
  console.log("📂 Creating domain isu...");
  const domains = await domainIsuFactory();
  const domainIds = domains.map((d) => d.id);
  console.log(`   ✓ Created ${domains.length} domain isu\n`);

  // ═══════════════════════════════════════════════════════════════
  // 2️⃣ CREATE DATA MASTER & MASUKAN WARGA
  // ═══════════════════════════════════════════════════════════════
  console.log("📊 Creating data master & masukan warga...");

  await dataMasterFactory(domainIds, USER_ID, { countPerDomain: 10 });
  console.log(`   ✓ Created ${domainIds.length * 10} data master`);

  await masukanWargaFactory(domainIds, {
    countPerDomain: 20,
    diverifikasiOlehId: USER_ID,
  });
  console.log(`   ✓ Created ${domainIds.length * 20} masukan warga\n`);

  // ═══════════════════════════════════════════════════════════════
  // 3️⃣ CREATE KEGIATAN RAPAT (dengan 5 prioritas di JSON)
  // ═══════════════════════════════════════════════════════════════
  console.log("📋 Creating kegiatan rapat with JSON rekomendasi...");

  let totalRapat = 0;
  let totalJunction = 0;

  for (const domainIsuId of domainIds) {
    const rapat = await kegiatanRapatFactory(USER_ID, domainIsuId, {
      statusRekomendasi: "DIAJUKAN",
    });

    // ✅ Validasi: pastikan rapat berhasil dibuat
    if (!rapat?.id) {
      console.error(`❌ Failed to create rapat for domain ${domainIsuId}`);
      continue;
    }

    totalRapat++;

    // ═══════════════════════════════════════════════════════════
    // 🔗 CREATE JUNCTION: Link masukan warga ke rapat (evidence)
    // ═══════════════════════════════════════════════════════════
    const masukanTersedia = await prisma.masukanWarga.findMany({
      where: { domainIsuId, status: "DIVERIFIKASI" },
      select: { id: true },
      take: 5,
    });

    for (const masukan of masukanTersedia) {
      // ✅ Defensive: skip jika ID tidak valid
      if (!rapat?.id || !masukan?.id) {
        console.warn("⚠️  Skip junction: invalid ID");
        continue;
      }

      try {
        // ✅ Gunakan upsert untuk hindari unique constraint violation
        await prisma.kegiatanRapatMasukan.upsert({
          where: {
            // Composite unique key sesuai schema terbaru
            kegiatanRapatId_masukanId: {
              kegiatanRapatId: rapat.id,
              masukanId: masukan.id,
            },
          },
          update: {},
          create: {
            kegiatanRapatId: rapat.id,
            masukanId: masukan.id,
            // ✅ TIDAK ADA itemPrioritasId lagi
          },
        });
        totalJunction++;
      } catch (error: any) {
        console.warn(`⚠️  Junction error: ${error?.message}`);
      }
    }

    console.log(
      `   ✓ ${domains.find((d) => d.id === domainIsuId)?.nama}: 1 rapat with 5 priorities in JSON`,
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ✅ SUMMARY
  // ═══════════════════════════════════════════════════════════════
  console.log("\n✅ Seed selesai!\n");
  console.log("📊 Summary:");
  console.log(`   • User: ${validUser.name} (${validUser.id})`);
  console.log(`   • Domain Isu: ${domainIds.length}`);
  console.log(`   • Data Master: ${domainIds.length * 10}`);
  console.log(`   • Masukan Warga: ${domainIds.length * 20}`);
  console.log(`   • Kegiatan Rapat: ${totalRapat}`);
  console.log(`   • Total Prioritas (in JSON): ${totalRapat * 5}`);
  console.log(`   • Junction Entries (evidence links): ${totalJunction}`);
  console.log("");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

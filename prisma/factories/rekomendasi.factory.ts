import "dotenv/config";
import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { config } from "@/config";

export async function createRekomendasi(masukanIds: string[]) {
  return prisma.rekomendasi.create({
    data: {
      judul: faker.lorem.sentence(),
      prioritas1Deskripsi: faker.lorem.paragraph(),
      prioritas1Skor: faker.number.float({
        min: 0,
        max: 100,
        fractionDigits: 2,
      }),
      laporanLengkap: {
        ringkasan: faker.lorem.paragraph(),
        dampak: faker.lorem.sentences(2),
      },
      processedByUserId: config.prisma.user.userId,
      masukanWarga: {
        createMany: {
          data: masukanIds.map((id) => ({ masukanId: id })),
        },
      },
    },
  });
}

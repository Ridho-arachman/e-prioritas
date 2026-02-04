import "dotenv/config";
import { faker } from "@faker-js/faker";
import { StatusKategori } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function createKategori() {
  // Generate 1 string unik dengan cara manual
  const namaKategori =
    faker.commerce.department() +
    " " +
    faker.number.int({ min: 1, max: 10000 });

  return prisma.kategori.create({
    data: {
      namaKategori, // string unik
      deskripsi: faker.lorem.sentence(),
      status: faker.helpers.arrayElement([
        StatusKategori.AKTIF,
        StatusKategori.NON_AKTIF,
      ]),
    },
  });
}

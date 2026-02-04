import "dotenv/config";
import { faker } from "@faker-js/faker";
import { MasukanStatus } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function createMasukanWarga(kategoriId: string) {
  return prisma.masukanWarga.create({
    data: {
      namaPengirim: faker.person.fullName(),
      emailPengirim: faker.internet.email(),
      lokasiRt: faker.number
        .int({ min: 1, max: 9 })
        .toString()
        .padStart(2, "0"),
      lokasiRw: faker.number
        .int({ min: 1, max: 9 })
        .toString()
        .padStart(2, "0"),
      deskripsiMasukan: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([
        MasukanStatus.MENUNGGU_VERIFIKASI,
        MasukanStatus.DITERIMA,
      ]),
      kategoriId,
    },
  });
}

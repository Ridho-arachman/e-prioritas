import { faker } from "@faker-js/faker";
import { StatusMasukan } from "../../src/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function masukanWargaFactory(domainIds: string[], count = 3) {
  const results = [];

  for (const domainId of domainIds) {
    for (let i = 0; i < count; i++) {
      results.push(
        prisma.masukanWarga.create({
          data: {
            judul: faker.lorem.sentence(5),
            deskripsi: faker.lorem.paragraph(),
            lokasiRt: faker.number.int({ min: 1, max: 10 }),
            lokasiRw: faker.number.int({ min: 1, max: 5 }),
            domainIsuId: domainId,
            status: faker.helpers.arrayElement([
              StatusMasukan.MENUNGGU,
              StatusMasukan.DIVERIFIKASI,
              StatusMasukan.DITOLAK,
            ]),
            // diverifikasiOlehId sengaja NULL
          },
        }),
      );
    }
  }

  return Promise.all(results);
}

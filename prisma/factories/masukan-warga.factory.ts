import { fakerID_ID as faker } from "@faker-js/faker";
import { StatusMasukan } from "../../src/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function masukanWargaFactory(domainIds: string[], count = 3) {
  const results = [];

  for (const domainId of domainIds) {
    for (let i = 0; i < count; i++) {
      results.push(
        prisma.masukanWarga.create({
          data: {
            judul: faker.lorem.sentence(5).slice(0, 255), // Batasi max 255 karakter
            deskripsi: faker.lorem.paragraph().slice(0, 2000), // Batasi jika perlu
            lokasiRt: faker.number
              .int({ min: 1, max: 10 })
              .toString()
              .padStart(3, "0"), // RT: 001-010
            lokasiRw: faker.number
              .int({ min: 1, max: 10 })
              .toString()
              .padStart(3, "0"), // RW: 001-010
            domainIsuId: domainId,
            nomorHp: faker.phone.number().slice(0, 15), // Batasi max 15 karakter
            namaPengirim: faker.person.fullName().slice(0, 255), // Batasi max 255
            status: faker.helpers.arrayElement([
              StatusMasukan.MENUNGGU,
              StatusMasukan.DIVERIFIKASI,
              StatusMasukan.DITOLAK,
            ]),
            // Jika ada field lain yang required, tambahkan di sini
            alasanPenolakan: faker.helpers.maybe(() => faker.lorem.sentence(), {
              probability: 0.3,
            }),
          },
        }),
      );
    }
  }

  return Promise.all(results);
}

import prisma from "@/lib/prisma";
import { fakerID_ID as faker } from "@faker-js/faker";

export async function dataMasterFactory(
  domainIds: string[],
  diprosesOlehId: string,
  count = 5,
) {
  const payload = [];

  for (const domainId of domainIds) {
    for (let i = 0; i < count; i++) {
      payload.push({
        domainIsuId: domainId,
        namaAtribut: faker.helpers.arrayElement([
          "Jumlah Penduduk",
          "Jumlah RT",
          "Jumlah RW",
          "Fasilitas Umum",
        ]),
        diprosesOlehId,
        nilai: faker.word.words(2),
        jumlah: faker.number.int({ min: 10, max: 500 }),
        lokasiRt: faker.number.int({ min: 1, max: 10 }),
        lokasiRw: faker.number.int({ min: 1, max: 5 }),
        sumberData: faker.helpers.arrayElement([
          "BPS",
          "Survey Internal",
          "Data Desa",
        ]),
      });
    }
  }

  return prisma.dataMaster.createMany({
    data: payload,
    skipDuplicates: true,
  });
}

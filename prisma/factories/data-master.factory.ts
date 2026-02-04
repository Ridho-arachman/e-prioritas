import "dotenv/config";
import { faker } from "@faker-js/faker";
import { JenisDataMaster } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { config } from "@/config";

export async function createDataMaster() {
  const jenis = faker.helpers.enumValue(JenisDataMaster);

  return prisma.dataMaster.create({
    data: {
      jenisData: jenis,
      namaAtribut: faker.word.words(2),
      nilai: faker.number.int({ min: 1, max: 100 }).toString(),
      jumlah: faker.number.int({ min: 1, max: 100 }),
      lokasiRt: faker.helpers.arrayElement(["01", "02", "03", null]),
      lokasiRw: faker.helpers.arrayElement(["01", "02", null]),
      updatedByUserId: config.prisma.user.userId,
    },
  });
}

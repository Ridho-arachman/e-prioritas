import { fakerID_ID as faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import type { Prisma, NilaiKritikalitas } from "@/app/generated/prisma";

interface DataMasterFactoryOptions {
  countPerDomain?: number;
}

export async function dataMasterFactory(
  domainIds: string[],
  userId: string,
  options?: DataMasterFactoryOptions,
) {
  const countPerDomain = options?.countPerDomain ?? 10;
  const kritikalitasOptions: NilaiKritikalitas[] = [
    "KRITIS",
    "TINGGI",
    "SEDANG",
    "RENDAH",
  ];
  const sumberOptions = ["Survey", "Sensus", "Laporan Desa", "BPS", "OPD"];

  const items: Prisma.DataMasterCreateManyInput[] = [];

  for (const domainIsuId of domainIds) {
    for (let i = 0; i < countPerDomain; i++) {
      items.push({
        domainIsuId,
        namaAtribut: faker.lorem.words(2).substring(0, 100),
        kritikalitas: faker.helpers.arrayElement(kritikalitasOptions),
        jumlah: faker.number.int({ min: 1, max: 100 }),
        isActive: true,
        tahunData: faker.number.int({ min: 2022, max: 2024 }),
        diprosesOlehId: userId || undefined,
      });
    }
  }

  return await prisma.dataMaster.createMany({ data: items });
}

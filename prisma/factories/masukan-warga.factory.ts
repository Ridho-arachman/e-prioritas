import { fakerID_ID as faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import type { Prisma, StatusMasukan } from "@/app/generated/prisma";

interface MasukanWargaFactoryOptions {
  countPerDomain?: number;
  diverifikasiOlehId?: string;
}

export async function masukanWargaFactory(
  domainIds: string[],
  options?: MasukanWargaFactoryOptions,
) {
  const countPerDomain = options?.countPerDomain ?? 20;
  const diverifikasiOlehId = options?.diverifikasiOlehId;

  const statusOptions: StatusMasukan[] = [
    "DIVERIFIKASI",
    "DIVERIFIKASI",
    "DIVERIFIKASI",
    "DIVERIFIKASI",
    "DIVERIFIKASI",
    "DIVERIFIKASI",
    "DIVERIFIKASI",
    "MENUNGGU",
    "MENUNGGU",
    "MENUNGGU",
    "MENUNGGU",
    "DIPROSES",
  ];

  const items: Prisma.MasukanWargaCreateManyInput[] = [];

  for (const domainIsuId of domainIds) {
    for (let i = 0; i < countPerDomain; i++) {
      const status = faker.helpers.arrayElement(statusOptions);
      const shouldSetVerifier =
        status === "DIVERIFIKASI" && !!diverifikasiOlehId;

      items.push({
        namaPengirim: faker.person.fullName().substring(0, 255),
        nomorHp: `08${faker.string.numeric(10)}`,
        judul: faker.lorem.sentence(5).substring(0, 255),
        deskripsi: faker.lorem.paragraphs(2),
        lokasiRt: faker.string.numeric(3).substring(0, 3),
        lokasiRw: faker.string.numeric(3).substring(0, 3),
        domainIsuId,
        status,
        diverifikasiOlehId: shouldSetVerifier ? diverifikasiOlehId : undefined,
      });
    }
  }

  return await prisma.masukanWarga.createMany({ data: items });
}

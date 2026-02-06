import { StatusRekomendasi } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

export async function rekomendasiFactory(
  kegiatanRapatId: string,
  domainIsuId: string,
) {
  return prisma.rekomendasi.create({
    data: {
      kegiatanRapatId,
      domainIsuId,
      judul: faker.lorem.sentence(6),
      ringkasan: faker.lorem.sentences(2),
      deskripsi: faker.lorem.paragraphs(3),
      skorPrioritas: faker.number.float({
        min: 0,
        max: 100,
        fractionDigits: 2,
      }),
      status: faker.helpers.arrayElement([
        StatusRekomendasi.DRAFT,
        StatusRekomendasi.DIAJUKAN,
      ]),
      laporanLengkap: {
        reasoning: faker.lorem.paragraph(),
        confidence: faker.number.float({
          min: 0,
          max: 1,
          fractionDigits: 2,
        }),
        source: "AI Engine",
      },
    },
  });
}

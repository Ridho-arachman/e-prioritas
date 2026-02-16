import prisma from "@/lib/prisma";
import { fakerID_ID as faker } from "@faker-js/faker";

export async function kegiatanRapatFactory(
  dibuatOlehId: string,
  domainIsuId?: string,
) {
  return prisma.kegiatanRapat.create({
    data: {
      judul: `Rapat ${faker.company.buzzNoun()}`,
      deskripsi: faker.lorem.paragraphs(2),
      tanggal: faker.date.recent({ days: 30 }),
      lokasi: faker.location.city(),
      domainIsuId,
      dibuatOlehId,
      aiModel: "gemini-1.5-pro",
      aiPromptHash: faker.string.uuid(),
      aiProcessedAt: new Date(),
    },
  });
}

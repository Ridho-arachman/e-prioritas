import { fakerID_ID as faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";
import type {
  ModeRekomendasi,
  StatusRekomendasi,
  NilaiKritikalitas,
} from "@/app/generated/prisma";

interface KegiatanRapatFactoryOptions {
  mode?: ModeRekomendasi;
  statusRekomendasi?: StatusRekomendasi;
  tanggal?: Date;
  lokasi?: string;
}

function generateFingerprint(content: string): string {
  return createHash("sha256").update(content).digest("hex").substring(0, 16);
}

function generatePrioritasItems(domainIsuId: string, kegiatanRapatId: string) {
  return Array.from({ length: 5 }).map((_, idx) => {
    const lokasiRt = faker.string.numeric(3);
    const lokasiRw = faker.string.numeric(3);

    return {
      prioritasKe: idx + 1,
      deskripsi: faker.lorem.sentence(10),
      skorPrioritas: faker.number.float({
        min: 0.6,
        max: 0.99,
        fractionDigits: 2,
      }),
      alasanAnalisis: faker.lorem.paragraph(),
      domainIsuId,
      lokasiRt,
      lokasiRw,
      fingerprint: generateFingerprint(
        `${kegiatanRapatId}-priority-${idx}-${faker.string.uuid()}`,
      ),
      evidence: {
        masukanWargaCount: faker.number.int({ min: 2, max: 5 }),
        dataMasterCount: faker.number.int({ min: 1, max: 3 }),
        kritikalitas: faker.helpers.arrayElement<NilaiKritikalitas>([
          "KRITIS",
          "TINGGI",
          "SEDANG",
        ]),
      },
    };
  });
}

export async function kegiatanRapatFactory(
  userId: string,
  domainIsuId: string,
  options?: KegiatanRapatFactoryOptions,
) {
  const fingerprint = generateFingerprint(
    `${domainIsuId}-${faker.string.uuid()}-${Date.now()}`,
  );

  const prioritasItems = generatePrioritasItems(domainIsuId, fingerprint);

  const rekomendasiItems = {
    meta: {
      generatedAt: new Date().toISOString(),
      aiModel: "gemini-1.5-flash",
      modeRekomendasi: options?.mode ?? "FUSI_DATA",
      domainIsuCode: domainIsuId,
      totalMasukanDianalisis: 20,
      totalDataMasterDianalisis: 10,
    },
    prioritas: prioritasItems,
  };

  return await prisma.kegiatanRapat.create({
    data: {
      domainIsuId,
      dibuatOlehId: userId,
      judul: faker.lorem.sentence(4).substring(0, 255),
      deskripsi: faker.lorem.paragraphs(2),
      tanggal: options?.tanggal ?? faker.date.future({ years: 1 }),
      lokasi:
        options?.lokasi ?? faker.location.streetAddress().substring(0, 100),
      mode: options?.mode ?? "FUSI_DATA",
      judulLaporan: `Laporan Rekomendasi - ${faker.lorem.words(3)}`.substring(
        0,
        255,
      ),
      rekomendasiItems,
      fingerprint,
      statusRekomendasi: options?.statusRekomendasi ?? "DRAFT",
      aiModel: "gemini-1.5-flash",
      aiProcessedAt: new Date(),
      diprosesOlehId: userId || undefined,
    },
  });
}

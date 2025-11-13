import { prisma } from "@/lib/prisma";

export const rekomendasiService = {
  getAll: async (judul?: string) => {
    return prisma.rekomendasi.findMany({
      where: judul ? { judul: { contains: judul, mode: "insensitive" } } : {},
      orderBy: { tanggalProses: "desc" }, // urut terbaru dulu
      select: {
        id: true,
        judul: true,
      },
    });
  },
  getById: async (id: string) => {
    return prisma.rekomendasi.findUniqueOrThrow({
      where: { id },
      include: {
        processedBy: { select: { name: true } },
        masukanWarga: { select: { masukan: true } },
      },
    });
  },
};

import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

type createDataSchema = Prisma.KategoriCreateInput;
type updateDataSchema = Prisma.KategoriUpdateInput;

export const kategoriService = {
  create: async (data: createDataSchema) => {
    return prisma.kategori.create({ data });
  },

  getAll: async (namaKategori?: string) => {
    return prisma.kategori.findMany({
      where: namaKategori
        ? { namaKategori: { contains: namaKategori, mode: "insensitive" } }
        : {},
      orderBy: { namaKategori: "asc" },
      include: { _count: { select: { masukanWarga: true } } },
    });
  },

  getById: async (kategoriId?: string) => {
    return prisma.kategori.findUniqueOrThrow({
      where: { id: kategoriId },
    });
  },

  update: async (kategoriId: string, data: updateDataSchema) => {
    return prisma.kategori.update({
      where: {
        id: kategoriId,
      },
      data,
    });
  },

  deleteById: async (kategoriId: string) => {
    return prisma.kategori.delete({
      where: {
        id: kategoriId,
      },
    });
  },
};

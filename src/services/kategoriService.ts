import { prisma } from "@/lib/prisma";
import { string } from "zod";

export const kategoriService = {
  create: async (data: { namaKategori: string; deskripsi?: string }) => {
    return prisma.kategori.create({ data });
  },

  getAll: async (namaKategori?: string) => {
    return prisma.kategori.findMany({
      where: namaKategori
        ? { namaKategori: { contains: namaKategori, mode: "insensitive" } }
        : {},
      orderBy: { namaKategori: "asc" },
    });
  },

  getById: async (kategoriId?: string) => {
    return prisma.kategori.findUniqueOrThrow({
      where: { id: kategoriId },
    });
  },

  update: async (
    kategoriId: string,
    data: {
      namaKategori: string;
      deskripsi: string;
    }
  ) => {
    return prisma.kategori.update({
      where: {
        id: kategoriId,
      },
      data,
    });
  },

  delete: async (kategoriId: string) => {
    return prisma.kategori.delete({
      where: {
        id: kategoriId,
      },
    });
  },
};

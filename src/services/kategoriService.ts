import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

type createDataSchema = Prisma.KategoriCreateInput;
type updateDataSchema = Prisma.KategoriUpdateInput;

type GetAllKategoriParams = {
  namaKategori?: string;
  page?: number;
  perPage?: number;
};

export const kategoriService = {
  create: async (data: createDataSchema) => {
    return prisma.kategori.create({ data });
  },

  getAll: async ({
    namaKategori,
    page = 1,
    perPage = 10,
  }: GetAllKategoriParams) => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    // Hitung total kategori sesuai filter
    const total = await prisma.kategori.count({
      where: namaKategori
        ? { namaKategori: { contains: namaKategori, mode: "insensitive" } }
        : {},
    });

    // Ambil data dengan pagination dan _count masukanWarga
    const data = await prisma.kategori.findMany({
      where: namaKategori
        ? { namaKategori: { contains: namaKategori, mode: "insensitive" } }
        : {},
      orderBy: { namaKategori: "asc" },
      skip,
      take,
      include: { _count: { select: { masukanWarga: true } } },
    });

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
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

import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

type createDataSchema = Prisma.DomainIsuCreateInput;
type updateDataSchema = Prisma.DomainIsuUpdateInput;

type GetAllKategoriParams = {
  nama?: string;
  page?: number;
  perPage?: number;
};

export const kategoriService = {
  create: async (data: createDataSchema) => {
    return prisma.domainIsu.create({ data });
  },

  getAll: async ({ nama, page = 1, perPage = 10 }: GetAllKategoriParams) => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    // Hitung total kategori sesuai filter
    const total = await prisma.domainIsu.count({
      where: nama ? { nama: { contains: nama, mode: "insensitive" } } : {},
    });

    // Ambil data dengan pagination dan _count masukanWarga
    const data = await prisma.domainIsu.findMany({
      where: nama ? { nama: { contains: nama, mode: "insensitive" } } : {},
      orderBy: { nama: "asc" },
      skip,
      take,
      include: { _count: { select: { masukan: true } } },
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
    return prisma.domainIsu.findUniqueOrThrow({
      where: { id: kategoriId },
    });
  },

  update: async (kategoriId: string, data: updateDataSchema) => {
    return prisma.domainIsu.update({
      where: {
        id: kategoriId,
      },
      data,
    });
  },

  deleteById: async (kategoriId: string) => {
    // Pertama, cek apakah ada data terkait di MasukanWarga
    const relatedData = await prisma.masukanWarga.findFirst({
      where: {
        domainIsuId: kategoriId,
      },
    });

    // Jika ada data terkait, lempar error khusus
    if (relatedData) {
      throw new Error("DATA_HAS_RELATIONS");
    }

    return prisma.domainIsu.delete({
      where: {
        id: kategoriId,
      },
    });
  },
};

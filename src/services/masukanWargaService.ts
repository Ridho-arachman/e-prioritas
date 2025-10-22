import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type whereQuerySchema = Prisma.MasukanWargaWhereInput;
type createDataSchema = Prisma.MasukanWargaCreateInput | any;

export const masukanWargaService = {
  create: async (data: createDataSchema) => {
    const { kategoriId, verifiedByUserId, ...rest } = data;

    return prisma.masukanWarga.create({
      data: {
        ...rest,
        ...(kategoriId && { kategori: { connect: { id: kategoriId } } }),
        ...(verifiedByUserId && {
          verifiedBy: { connect: { id: verifiedByUserId } },
        }),
      },
      include: {
        kategori: { select: { id: true, namaKategori: true } },
        verifiedBy: { select: { id: true, name: true } },
      },
    });
  },

  getAll: async (where?: whereQuerySchema) => {
    return prisma.masukanWarga.findMany({
      where,
      include: {
        kategori: { select: { id: true, namaKategori: true } },
        verifiedBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  getById: async () => {},

  update: async () => {},

  deleteById: async () => {},
};

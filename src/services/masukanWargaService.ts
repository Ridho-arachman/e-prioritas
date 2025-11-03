import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type whereQuerySchema = Prisma.MasukanWargaWhereInput;
type createDataSchema = Prisma.MasukanWargaCreateInput | any;
type updateDataSchema = Prisma.MasukanWargaUpdateInput | any;

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
    });
  },

  getAll: async (where?: whereQuerySchema) => {
    return prisma.masukanWarga.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },

  getById: async () => {},

  update: async (id: string, data: updateDataSchema) => {
    return prisma.masukanWarga.update({
      where: { id },
      data: {
        status: data.status,
      },
    });
  },
};

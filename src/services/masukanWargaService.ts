import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

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

  getById: async (id?: string) => {
    return prisma.masukanWarga.findUniqueOrThrow({
      where: { id },
      include: {
        kategori: { select: { id: true, namaKategori: true } },
        verifiedBy: { select: { id: true, name: true, email: true } },
      },
    });
  },

  update: async (id: string, data: updateDataSchema) => {
    return prisma.masukanWarga.update({
      where: { id },
      data: {
        alasanPenolakan:
          data.status === "DITOLAK" ? data.alasanPenolakan : null,
        status: data.status,
        verifiedByUserId: data.verifiedByUserId ? data.verifiedByUserId : null,
      },
    });
  },
};

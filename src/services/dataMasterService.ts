import { prisma } from "@/lib/prisma";
import { JenisDataMaster } from "@prisma/client";

type CreateDataInput = {
  jenisData: JenisDataMaster;
  namaAtribut: string;
  nilai: string;
  lokasiRt: string;
  lokasiRw: string;
  updatedByUserId: string;
};

type UpdateDataInput = {
  jenisData?: JenisDataMaster;
  namaAtribut?: string;
  nilai?: string;
  lokasiRt?: string;
  lokasiRw?: string;
  updatedByUserId?: string;
};

export const dataMasterService = {
  create: async (input: CreateDataInput) => {
    const { updatedByUserId, ...rest } = input;

    return prisma.dataMaster.create({
      data: {
        ...rest,
        updatedBy: {
          connect: {
            id: updatedByUserId, // ✅ ini bagian penting
          },
        },
      },
    });
  },

  getAll: async (where?: any) => {
    return prisma.dataMaster.findMany({
      where,
      include: { updatedBy: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
    });
  },

  getById: async (id?: string) => {
    return prisma.dataMaster.findUniqueOrThrow({
      where: { id },
    });
  },

  update: async (id: string, data: UpdateDataInput) => {
    return prisma.dataMaster.update({
      where: { id },
      data,
    });
  },

  deleteById: async (id: string) => {
    return prisma.dataMaster.delete({
      where: { id },
    });
  },
};

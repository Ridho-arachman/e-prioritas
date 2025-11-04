import { prisma } from "@/lib/prisma";

type CreateDataInput = {
  jenisData: string;
  namaAtribut: string;
  nilai: string;
  lokasiRt: string;
  lokasiRw: string;
  updatedByUserId: string;
};

type UpdateDataInput = {
  jenisData?: string;
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

  getAll: async (namaKategori?: string) => {
    // nanti bisa pakai prisma.dataMaster.findMany()
  },

  getById: async (kategoriId?: string) => {},

  update: async (kategoriId: string, data: UpdateDataInput) => {},

  deleteById: async (kategoriId: string) => {},
};

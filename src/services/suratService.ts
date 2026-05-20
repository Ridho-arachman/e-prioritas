import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export const suratService = {
  async create(data: {
    nama: string;
    deskripsi: string;
    ikon: string;
    persyaratan: string[];
    linkForm: string;
    isActive: boolean;
  }) {
    return prisma.surat.create({
      data,
    });
  },

  async getAll(options?: {
    isActive?: boolean;
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    const {
      isActive,
      limit = 100,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options || {};
    const skip = (page - 1) * limit;

    const where: Prisma.SuratWhereInput = {};
    if (isActive !== undefined) where.isActive = isActive;

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      prisma.surat.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.surat.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return prisma.surat.findUniqueOrThrow({
      where: { id },
    });
  },

  async update(
    id: string,
    data: Partial<{
      nama: string;
      deskripsi: string;
      ikon: string;
      persyaratan: string[];
      linkForm: string;
      isActive: boolean;
    }>,
  ) {
    return prisma.surat.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.surat.delete({
      where: { id },
    });
  },
};

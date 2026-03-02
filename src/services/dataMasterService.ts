import { NilaiKritikalitas, Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

const VALID_SORT_FIELDS = [
  "namaAtribut",
  "kritikalitas",
  "jumlah",
  "tahunData",
  "isActive",
  "createdAt",
  "updatedAt",
] as const;
type ValidSortField = (typeof VALID_SORT_FIELDS)[number];

export type DataMasterCreateInput = {
  domainIsuId: string;
  namaAtribut: string;
  kritikalitas: NilaiKritikalitas;
  jumlah?: number | null;
  tahunData?: number | null;
  isActive?: boolean;
  diprosesOlehId?: string | null;
};

export type DataMasterUpdateInput = Partial<DataMasterCreateInput>;

export type DataMasterGetAllParams = {
  domainIsuId?: string;
  kritikalitas?: NilaiKritikalitas;
  updatedAtFrom?: Date;
  updatedAtTo?: Date;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const dataMasterService = {
  create: async (input: DataMasterCreateInput) => {
    return prisma.dataMaster.create({
      data: input,
      include: {
        diprosesOleh: { select: { id: true, name: true, email: true } },
        domainIsu: { select: { id: true, nama: true, code: true } },
      },
    });
  },

  createMany: async (inputs: DataMasterCreateInput[]) => {
    return prisma.dataMaster.createMany({
      data: inputs,
      skipDuplicates: true,
    });
  },

  getAll: async (params?: DataMasterGetAllParams) => {
    const {
      domainIsuId,
      kritikalitas,
      updatedAtFrom,
      updatedAtTo,
      search,
      sortBy = "updatedAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = params || {};

    const safeSortBy: ValidSortField = VALID_SORT_FIELDS.includes(
      sortBy as ValidSortField,
    )
      ? (sortBy as ValidSortField)
      : "updatedAt";

    const where: Prisma.DataMasterWhereInput = {};

    if (domainIsuId) where.domainIsuId = domainIsuId;
    if (kritikalitas) where.kritikalitas = kritikalitas;

    if (updatedAtFrom || updatedAtTo) {
      where.updatedAt = {
        ...(updatedAtFrom && { gte: updatedAtFrom }),
        ...(updatedAtTo && { lte: updatedAtTo }),
      };
    }

    if (search) {
      where.OR = [{ namaAtribut: { contains: search, mode: "insensitive" } }];
    }

    const skip = (page - 1) * limit;
    const orderBy: Prisma.DataMasterOrderByWithRelationInput = {
      [safeSortBy]: sortOrder,
    };

    const [data, total] = await prisma.$transaction([
      prisma.dataMaster.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          diprosesOleh: { select: { id: true, name: true, email: true } },
          domainIsu: { select: { id: true, nama: true, code: true } },
        },
      }),
      prisma.dataMaster.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  getById: async (id: string) => {
    return prisma.dataMaster.findUniqueOrThrow({
      where: { id },
      include: {
        diprosesOleh: { select: { id: true, name: true, email: true } },
        domainIsu: { select: { id: true, nama: true, code: true } },
      },
    });
  },

  update: async (id: string, data: DataMasterUpdateInput) => {
    return prisma.dataMaster.update({
      where: { id },
      data,
      include: {
        diprosesOleh: { select: { id: true, name: true, email: true } },
        domainIsu: { select: { id: true, nama: true, code: true } },
      },
    });
  },

  deleteById: async (id: string) => {
    return prisma.dataMaster.delete({
      where: { id },
    });
  },

  // ✅ Tambahan: soft delete (jika diperlukan di masa depan)
  // softDelete: async (id: string) => {
  //   return prisma.dataMaster.update({
  //     where: { id },
  //     data: { isActive: false },
  //   });
  // },
};

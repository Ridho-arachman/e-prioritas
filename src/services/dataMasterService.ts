import { NilaiKritikalitas, Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

type CreateDataInput = {
  domainIsuId: string;
  namaAtribut: string;
  kritikalitas: NilaiKritikalitas;
  jumlah?: number | null;
  lokasiRt?: string | null;
  lokasiRw?: string | null;
  sumberData?: string | null;
  diprosesOlehId?: string | null;
};

type UpdateDataInput = Partial<CreateDataInput>;

export type DataMasterGetAllParams = {
  domainIsuId?: string;
  kritikalitas?: NilaiKritikalitas;
  lokasiRt?: string;
  lokasiRw?: string;
  updatedAtFrom?: Date;
  updatedAtTo?: Date;
  search?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;
};

export const dataMasterService = {
  create: async (input: CreateDataInput) => {
    return prisma.dataMaster.create({
      data: input,
      include: {
        diprosesOleh: { select: { name: true } },
        domainIsu: { select: { nama: true } },
      },
    });
  },

  createMany: async (inputs: CreateDataInput[]) => {
    return prisma.dataMaster.createMany({
      data: inputs,
    });
  },

  getAll: async (params?: DataMasterGetAllParams) => {
    const {
      domainIsuId,
      kritikalitas,
      lokasiRt,
      lokasiRw,
      updatedAtFrom,
      updatedAtTo,
      search,
      sortBy = "updatedAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = params || {};

    const where: Prisma.DataMasterWhereInput = {};

    if (domainIsuId) where.domainIsuId = domainIsuId;
    if (kritikalitas) where.kritikalitas = kritikalitas;
    if (lokasiRt) where.lokasiRt = lokasiRt;
    if (lokasiRw) where.lokasiRw = lokasiRw;

    if (updatedAtFrom || updatedAtTo) {
      where.updatedAt = {};
      if (updatedAtFrom) where.updatedAt.gte = updatedAtFrom;
      if (updatedAtTo) where.updatedAt.lte = updatedAtTo;
    }

    if (search) {
      where.OR = [
        { namaAtribut: { contains: search, mode: "insensitive" } },
        { sumberData: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [data, total] = await prisma.$transaction([
      prisma.dataMaster.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        include: {
          diprosesOleh: { select: { name: true } },
          domainIsu: { select: { nama: true } },
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
        diprosesOleh: { select: { name: true } },
        domainIsu: { select: { nama: true } },
      },
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

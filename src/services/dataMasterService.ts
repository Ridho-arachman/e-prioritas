import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

// Tipe input untuk create disesuaikan dengan model DataMaster
type CreateDataInput = {
  domainIsuId: string; // wajib, relasi ke DomainIsu
  namaAtribut: string;
  nilai: string;
  lokasiRt?: number | null; // opsional, Int di DB
  lokasiRw?: number | null; // opsional, Int di DB
  jumlah?: number | null; // opsional
  sumberData?: string | null; // opsional
  diprosesOlehId?: string | null; // opsional, relasi ke User (pemroses)
};

// Tipe input untuk update (semua opsional)
type UpdateDataInput = {
  domainIsuId?: string;
  namaAtribut?: string;
  nilai?: string;
  lokasiRt?: number | null;
  lokasiRw?: number | null;
  jumlah?: number | null;
  sumberData?: string | null;
  diprosesOlehId?: string | null;
};

export type DataMasterGetAllParams = {
  // Filter
  domainIsuId?: string;
  namaAtribut?: string;
  nilai?: string;
  jumlahMin?: number;
  jumlahMax?: number;
  lokasiRt?: number;
  lokasiRw?: number;
  sumberData?: string;
  diprosesOlehId?: string;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  updatedAtFrom?: Date;
  updatedAtTo?: Date;
  search?: string; // pencarian umum di namaAtribut, nilai, sumberData

  // Sorting
  sortBy?: string;
  sortOrder?: "asc" | "desc";

  // Pagination (gunakan page & limit atau skip & take)
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
};

export const dataMasterService = {
  create: async (input: CreateDataInput) => {
    const { diprosesOlehId, ...rest } = input;

    return prisma.dataMaster.create({
      data: {
        ...rest,
        diprosesOlehId: diprosesOlehId, // langsung isi foreign key
      },
      include: { diprosesOleh: { select: { name: true } } },
    });
  },

  createMany: async (inputs: CreateDataInput[]) => {
    // createMany tidak mendukung nested connect, jadi kita gunakan field langsung
    // Pastikan semua input sudah mengandung diprosesOlehId (bisa null) sebagai scalar
    const data = inputs.map(({ diprosesOlehId, ...rest }) => ({
      ...rest,
      diprosesOlehId: diprosesOlehId ?? null,
    }));

    return prisma.dataMaster.createMany({
      data,
    });
  },

  getAll: async (params?: DataMasterGetAllParams) => {
    const {
      // Filter
      domainIsuId,
      namaAtribut,
      nilai,
      jumlahMin,
      jumlahMax,
      lokasiRt,
      lokasiRw,
      sumberData,
      diprosesOlehId,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      search,
      // Sorting
      sortBy = "updatedAt",
      sortOrder = "desc",
      // Pagination
      page = 1,
      limit = 10,
      skip,
      take,
    } = params || {};

    // Bangun where clause
    const where: Prisma.DataMasterWhereInput = {};

    if (domainIsuId) {
      where.domainIsuId = domainIsuId;
    }

    if (namaAtribut) {
      where.namaAtribut = { contains: namaAtribut, mode: "insensitive" };
    }

    if (nilai) {
      where.nilai = { contains: nilai, mode: "insensitive" };
    }

    if (jumlahMin !== undefined || jumlahMax !== undefined) {
      where.jumlah = {};
      if (jumlahMin !== undefined) where.jumlah.gte = jumlahMin;
      if (jumlahMax !== undefined) where.jumlah.lte = jumlahMax;
    }

    if (lokasiRt !== undefined) {
      where.lokasiRt = lokasiRt;
    }

    if (lokasiRw !== undefined) {
      where.lokasiRw = lokasiRw;
    }

    if (sumberData) {
      where.sumberData = { contains: sumberData, mode: "insensitive" };
    }

    if (diprosesOlehId) {
      where.diprosesOlehId = diprosesOlehId;
    }

    if (createdAtFrom || createdAtTo) {
      where.createdAt = {};
      if (createdAtFrom) where.createdAt.gte = createdAtFrom;
      if (createdAtTo) where.createdAt.lte = createdAtTo;
    }

    if (updatedAtFrom || updatedAtTo) {
      where.updatedAt = {};
      if (updatedAtFrom) where.updatedAt.gte = updatedAtFrom;
      if (updatedAtTo) where.updatedAt.lte = updatedAtTo;
    }

    // Pencarian umum (OR)
    if (search) {
      where.OR = [
        { namaAtribut: { contains: search, mode: "insensitive" } },
        { nilai: { contains: search, mode: "insensitive" } },
        { sumberData: { contains: search, mode: "insensitive" } },
      ];
    }

    // Sorting
    const orderBy: Prisma.DataMasterOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Pagination: hitung skip & take
    const computedSkip = skip ?? (page - 1) * limit;
    const computedTake = take ?? limit;

    // Eksekusi query (data + total count)
    const [data, total] = await prisma.$transaction([
      prisma.dataMaster.findMany({
        where,
        orderBy,
        skip: computedSkip,
        take: computedTake,
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
      limit: computedTake,
      totalPages: Math.ceil(total / computedTake),
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
    // Untuk update, kita bisa langsung set field scalar, termasuk diprosesOlehId
    // Jika ingin mengganti user yang memproses, cukup berikan id baru
    return prisma.dataMaster.update({
      where: { id },
      data,
      include: { diprosesOleh: { select: { name: true } } },
    });
  },

  deleteById: async (id: string) => {
    return prisma.dataMaster.delete({
      where: { id },
    });
  },
};

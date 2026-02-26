import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

// ========================
// TIPE INPUT
// ========================

// Tipe input untuk create
export type CreateKegiatanRapatInput = {
  judul: string; // wajib
  deskripsi: string; // wajib
  tanggal: Date | string; // wajib, DateTime di DB
  lokasi?: string | null; // opsional
  domainIsuId?: string | null; // opsional, relasi ke DomainIsu
  dibuatOlehId: string; // wajib, relasi ke User
  aiModel?: string | null; // opsional
  aiPromptHash?: string | null; // opsional
  aiProcessedAt?: Date | string | null; // opsional
};

// Tipe input untuk update (semua opsional)
export type UpdateKegiatanRapatInput = {
  judul?: string;
  deskripsi?: string;
  tanggal?: Date | string;
  lokasi?: string | null;
  domainIsuId?: string | null;
  aiModel?: string | null;
  aiPromptHash?: string | null;
  aiProcessedAt?: Date | string | null;
};

// Tipe parameter untuk getAll
export type KegiatanRapatGetAllParams = {
  // Filter
  judul?: string;
  lokasi?: string;
  domainIsuId?: string | null;
  dibuatOlehId?: string;
  aiModel?: string;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  updatedAtFrom?: Date;
  updatedAtTo?: Date;
  tanggalFrom?: Date;
  tanggalTo?: Date;
  search?: string; // pencarian umum di judul, deskripsi, lokasi

  // Sorting
  sortBy?: string;
  sortOrder?: "asc" | "desc";

  // Pagination
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
};

// ========================
// SERVICE
// ========================

export const kegiatanRapatService = {
  // CREATE
  create: async (input: CreateKegiatanRapatInput) => {
    const { dibuatOlehId, ...rest } = input;

    return prisma.kegiatanRapat.create({
      data: {
        ...rest,
        dibuatOlehId: dibuatOlehId, // langsung isi foreign key
      },
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
      },
    });
  },

  // GET ALL
  getAll: async (params?: KegiatanRapatGetAllParams) => {
    const {
      // Filter
      judul,
      lokasi,
      domainIsuId,
      dibuatOlehId,
      aiModel,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      tanggalFrom,
      tanggalTo,
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
    const where: Prisma.KegiatanRapatWhereInput = {};

    if (judul) {
      where.judul = { contains: judul, mode: "insensitive" };
    }

    if (lokasi) {
      where.lokasi = { contains: lokasi, mode: "insensitive" };
    }

    if (domainIsuId !== undefined) {
      where.domainIsuId = domainIsuId;
    }

    if (dibuatOlehId) {
      where.dibuatOlehId = dibuatOlehId;
    }

    if (aiModel) {
      where.aiModel = { contains: aiModel, mode: "insensitive" };
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

    if (tanggalFrom || tanggalTo) {
      where.tanggal = {};
      if (tanggalFrom) where.tanggal.gte = tanggalFrom;
      if (tanggalTo) where.tanggal.lte = tanggalTo;
    }

    // Pencarian umum (OR)
    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
      ];
    }

    // Sorting
    const orderBy: Prisma.KegiatanRapatOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Pagination: hitung skip & take
    const computedSkip = skip ?? (page - 1) * limit;
    const computedTake = take ?? limit;

    // Eksekusi query (data + total count)
    const [data, total] = await prisma.$transaction([
      prisma.kegiatanRapat.findMany({
        where,
        orderBy,
        skip: computedSkip,
        take: computedTake,
        include: {
          dibuatOleh: { select: { name: true, jabatan: true } },
          domainIsu: { select: { nama: true, code: true } },
          rekomendasi: {
            select: {
              id: true,
              judul: true,
              status: true,
              skorPrioritas: true,
            },
          },
        },
      }),
      prisma.kegiatanRapat.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit: computedTake,
      totalPages: Math.ceil(total / computedTake),
    };
  },

  // GET BY ID
  getById: async (id: string) => {
    return prisma.kegiatanRapat.findUniqueOrThrow({
      where: { id },
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
        rekomendasi: {
          include: {
            domainIsu: { select: { nama: true } },
            masukanLinks: {
              include: {
                masukan: {
                  select: {
                    id: true,
                    judul: true,
                    deskripsi: true,
                    lokasiRt: true,
                    lokasiRw: true,
                    namaPengirim: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  // UPDATE
  update: async (id: string, data: UpdateKegiatanRapatInput) => {
    return prisma.kegiatanRapat.update({
      where: { id },
      data,
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
      },
    });
  },

  // DELETE
  deleteById: async (id: string) => {
    return prisma.kegiatanRapat.delete({
      where: { id },
    });
  },
};

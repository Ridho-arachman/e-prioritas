import { Prisma, StatusProgram } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export type ProgramKelurahanCreateInput = {
  judul: string;
  deskripsi: string;
  status?: StatusProgram;
  tanggalMulai?: Date | null;
  tanggalSelesai?: Date | null;
  pic?: string | null;
  domainIsuId?: string | null;
  lokasiRt?: string | null;
  lokasiRw?: string | null;
};

export type ProgramKelurahanUpdateInput = Partial<ProgramKelurahanCreateInput>;

export type ProgramKelurahanGetAllParams = {
  search?: string;
  status?: StatusProgram;
  domainIsuId?: string;
  page?: number;
  limit?: number;
  sortBy?: "judul" | "status" | "createdAt" | "updatedAt" | "tanggalMulai";
  sortOrder?: "asc" | "desc";
};

export const programKelurahanService = {
  create: async (data: ProgramKelurahanCreateInput) => {
    return prisma.programKelurahan.create({
      data: {
        judul: data.judul,
        deskripsi: data.deskripsi,
        status: data.status ?? StatusProgram.BERJALAN,
        tanggalMulai: data.tanggalMulai,
        tanggalSelesai: data.tanggalSelesai,
        pic: data.pic,
        domainIsuId: data.domainIsuId,
        lokasiRt: data.lokasiRt,
        lokasiRw: data.lokasiRw,
      },
      include: {
        domainIsu: { select: { id: true, nama: true, code: true } },
      },
    });
  },

  getAll: async (params?: ProgramKelurahanGetAllParams) => {
    const {
      search,
      status,
      domainIsuId,
      page = 1,
      limit = 10,
      sortBy = "updatedAt",
      sortOrder = "desc",
    } = params || {};

    const where: Prisma.ProgramKelurahanWhereInput = {};
    if (status) where.status = status;
    if (domainIsuId) where.domainIsuId = domainIsuId;
    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: Prisma.ProgramKelurahanOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const skip = (page - 1) * limit;

    const [data, total] = await prisma.$transaction([
      prisma.programKelurahan.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          domainIsu: { select: { id: true, nama: true, code: true } },
        },
      }),
      prisma.programKelurahan.count({ where }),
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
    return prisma.programKelurahan.findUniqueOrThrow({
      where: { id },
      include: {
        domainIsu: { select: { id: true, nama: true, code: true } },
      },
    });
  },

  update: async (id: string, data: ProgramKelurahanUpdateInput) => {
    return prisma.programKelurahan.update({
      where: { id },
      data: {
        judul: data.judul,
        deskripsi: data.deskripsi,
        status: data.status,
        tanggalMulai: data.tanggalMulai,
        tanggalSelesai: data.tanggalSelesai,
        pic: data.pic,
        domainIsuId: data.domainIsuId,
        lokasiRt: data.lokasiRt,
        lokasiRw: data.lokasiRw,
      },
      include: {
        domainIsu: { select: { id: true, nama: true, code: true } },
      },
    });
  },

  delete: async (id: string) => {
    return prisma.programKelurahan.delete({ where: { id } });
  },
};

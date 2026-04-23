import { Prisma, StatusMasukan } from "@/app/generated/prisma";
import { decrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { createMasukanWargaInternalSchema } from "@/schema/masukanWarga";

export const masukanWargaService = {
  create: async (data: {
    wargaId: string;
    judul: string;
    deskripsi: string;
    lokasi: string;
    domainIsuId: string;
  }) => {
    const parsed = createMasukanWargaInternalSchema.parse(data);
    return prisma.masukanWarga.create({
      data: {
        judul: parsed.judul,
        deskripsi: parsed.deskripsi,
        lokasi: parsed.lokasi,
        domainIsuId: parsed.domainIsuId,
        wargaId: parsed.wargaId,
        status: StatusMasukan.MENUNGGU,
      },
      include: {
        warga: {
          select: { id: true, nama: true, noHp: true, statusNoHp: true },
        },
        domainIsu: true,
      },
    });
  },

  getAllMasukan: async (params: {
    q?: string;
    status?: StatusMasukan;
    domainIsuId?: string;
    diverifikasiOlehId?: string;
    lokasi?: string;
    createdAt?: string;
    page?: number;
    perPage?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const {
      q,
      status,
      domainIsuId,
      diverifikasiOlehId,
      lokasi,
      createdAt,
      page = 1,
      perPage = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    // Bangun array kondisi untuk AND
    const andConditions: Prisma.MasukanWargaWhereInput[] = [];

    if (status) andConditions.push({ status });
    if (domainIsuId) andConditions.push({ domainIsuId });
    if (diverifikasiOlehId) andConditions.push({ diverifikasiOlehId });
    if (lokasi) {
      andConditions.push({
        lokasi: { contains: lokasi, mode: "insensitive" as Prisma.QueryMode },
      });
    }
    if (q) {
      andConditions.push({
        OR: [
          { judul: { contains: q, mode: "insensitive" as Prisma.QueryMode } },
          {
            deskripsi: { contains: q, mode: "insensitive" as Prisma.QueryMode },
          },
          {
            warga: {
              nama: { contains: q, mode: "insensitive" as Prisma.QueryMode },
            },
          },
        ],
      });
    }
    if (createdAt) {
      const startDate = new Date(createdAt);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(createdAt);
      endDate.setHours(23, 59, 59, 999);
      andConditions.push({
        createdAt: { gte: startDate, lte: endDate },
      });
    }

    const where: Prisma.MasukanWargaWhereInput = andConditions.length
      ? { AND: andConditions }
      : {};

    // Validasi sortBy
    const validSortFields = [
      "createdAt",
      "updatedAt",
      "judul",
      "status",
      "lokasi",
    ];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const orderBy: Prisma.MasukanWargaOrderByWithRelationInput = {
      [sortField]: sortOrder,
    };
    const skip = (page - 1) * perPage;

    const [total, data] = await prisma.$transaction([
      prisma.masukanWarga.count({ where }),
      prisma.masukanWarga.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
        include: {
          warga: {
            select: {
              id: true,
              nama: true,
              noHp: true,
              statusNoHp: true,
              alamat: true,
            },
          },
          domainIsu: { select: { id: true, nama: true } },
          diverifikasiOleh: { select: { id: true, name: true } },
        },
      }),
    ]);

    // Dekripsi nomor HP untuk response
    const dataWithDecrypted = data.map((item) => ({
      ...item,
      warga: item.warga
        ? {
            ...item.warga,
            noHp: item.warga.noHp ? decrypt(item.warga.noHp) : null,
          }
        : null,
    }));

    return {
      data: dataWithDecrypted,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };
  },

  getById: async (id: string) => {
    const masukan = await prisma.masukanWarga.findUniqueOrThrow({
      where: { id },
      include: {
        warga: {
          select: {
            id: true,
            nama: true,
            noHp: true,
            statusNoHp: true,
            alamat: true,
          },
        },
        domainIsu: true,
        gambarMasukan: true,
        diverifikasiOleh: { select: { id: true, name: true } },
        relasiRapat: true,
      },
    });
    return {
      ...masukan,
      warga: masukan.warga
        ? {
            ...masukan.warga,
            noHp: masukan.warga.noHp ? decrypt(masukan.warga.noHp) : null,
          }
        : null,
    };
  },

  updateStatus: async (
    id: string,
    data: {
      status: StatusMasukan;
      diverifikasiOlehId?: string | null;
      alasanPenolakan?: string | null;
    },
  ) => {
    if (data.status === StatusMasukan.DITOLAK && !data.alasanPenolakan) {
      throw new Error("Alasan penolakan wajib jika status DITOLAK");
    }
    return prisma.masukanWarga.update({
      where: { id },
      data: {
        status: data.status,
        diverifikasiOlehId:
          data.status === StatusMasukan.MENUNGGU
            ? null
            : data.diverifikasiOlehId,
        alasanPenolakan:
          data.status === StatusMasukan.DITOLAK ? data.alasanPenolakan : null,
      },
    });
  },
};

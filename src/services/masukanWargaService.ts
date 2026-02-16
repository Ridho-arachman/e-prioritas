import { Prisma, StatusMasukan } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export interface GetAllMasukanParams {
  q?: string;
  status?: StatusMasukan;
  domainIsuId?: string;
  diverifikasiOlehId?: string;
  createdAt?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

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

  getAllMasukan: async ({
    q,
    status,
    domainIsuId,
    diverifikasiOlehId,
    createdAt,
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  }: GetAllMasukanParams) => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    // Validasi dan mapping field sorting
    const validSortFields = [
      "id",
      "namaPengirim",
      "nomorHp",
      "judul",
      "deskripsi",
      "lokasiRt",
      "lokasiRw",
      "status",
      "createdAt",
      "updatedAt",
      "domainIsu.namaKategori", // Untuk sorting berdasarkan nama domain isu
    ];

    // Map frontend sort field ke field Prisma
    let sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const order = sortOrder === "desc" ? "desc" : "asc";

    // Handle nested sorting (domainIsu)
    let orderBy: any = {};
    if (sortField === "domainIsu.namaKategori") {
      orderBy = {
        domainIsu: {
          namaKategori: order,
        },
      };
    } else {
      orderBy = { [sortField]: order };
    }

    // Filter tanggal
    let createdAtFilter = {};
    if (createdAt) {
      const startDate = new Date(createdAt);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(createdAt);
      endDate.setHours(23, 59, 59, 999);

      createdAtFilter = {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    // Build where clause
    const where: any = {
      AND: [
        q
          ? {
              OR: [
                { namaPengirim: { contains: q, mode: "insensitive" } },
                { nomorHp: { contains: q, mode: "insensitive" } },
                { judul: { contains: q, mode: "insensitive" } },
                { deskripsi: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        status ? { status } : {},
        domainIsuId ? { domainIsuId } : {},
        diverifikasiOlehId ? { diverifikasiOlehId } : {},
        createdAtFilter,
      ].filter(Boolean), // Hapus empty objects
    };

    // Hitung total data
    const total = await prisma.masukanWarga.count({ where });

    // Ambil data dengan relations
    const data = await prisma.masukanWarga.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        domainIsu: {
          select: {
            id: true,
            nama: true,
          },
        },
        diverifikasiOleh: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
        sortBy: sortField,
        sortOrder: order,
      },
    };
  },

  getById: async (id?: string) => {
    return prisma.masukanWarga.findUniqueOrThrow({
      where: { id },
      include: {
        domainIsu: { select: { id: true, nama: true } },
        diverifikasiOleh: { select: { id: true, name: true, email: true } },
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
        diverifikasiOlehId: data.diverifikasiOlehId
          ? data.diverifikasiOlehId
          : null,
      },
    });
  },
};

import { Prisma, StatusMasukan } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

//////////////////////////////////////////////////////////////
// DOMAIN DTO (MANUAL TYPES)
//////////////////////////////////////////////////////////////

export interface CreateMasukanDTO {
  namaPengirim?: string | null;
  nomorHp?: string | null;
  judul: string;
  deskripsi: string;
  lokasiRt: string;
  lokasiRw: string;
  domainIsuId: string;
}

export interface UpdateStatusMasukanDTO {
  status: StatusMasukan;
  diverifikasiOlehId?: string | null;
  alasanPenolakan?: string | null;
}

export interface GetAllMasukanParams {
  q?: string;
  status?: StatusMasukan;
  domainIsuId?: string;
  diverifikasiOlehId?: string;
  lokasiRt?: string;
  lokasiRw?: string;
  createdAt?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

type WhereInput = Prisma.MasukanWargaWhereInput;

export const masukanWargaService = {
  ////////////////////////////////////////////////////////////
  // CREATE
  ////////////////////////////////////////////////////////////

  create: async (data: CreateMasukanDTO) => {
    return prisma.masukanWarga.create({
      data: {
        ...data,
        status: StatusMasukan.MENUNGGU,
      },
    });
  },

  ////////////////////////////////////////////////////////////
  // GET ALL (FILTER + PAGINATION + SORT)
  ////////////////////////////////////////////////////////////

  getAllMasukan: async ({
    q,
    status,
    domainIsuId,
    diverifikasiOlehId,
    lokasiRt,
    lokasiRw,
    createdAt,
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  }: GetAllMasukanParams) => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    ////////////////////////////////////////////////////////////
    // SORTING SAFETY
    ////////////////////////////////////////////////////////////

    const validSortFields = [
      "createdAt",
      "updatedAt",
      "judul",
      "status",
      "namaPengirim",
      "lokasiRt",
      "lokasiRw",
    ];

    const order = sortOrder === "asc" ? "asc" : "desc";
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

    const orderBy: Prisma.MasukanWargaOrderByWithRelationInput = {
      [sortField]: order,
    };

    ////////////////////////////////////////////////////////////
    // DATE FILTER
    ////////////////////////////////////////////////////////////

    let createdAtFilter: WhereInput = {};

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

    ////////////////////////////////////////////////////////////
    // WHERE CLAUSE s
    ////////////////////////////////////////////////////////////

    const where: WhereInput = {
      AND: [
        q
          ? {
              OR: [
                { id: { contains: q, mode: "insensitive" } },
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
        lokasiRt ? { lokasiRt } : {},
        lokasiRw ? { lokasiRw } : {},

        createdAtFilter,
      ],
    };

    ////////////////////////////////////////////////////////////
    // QUERY
    ////////////////////////////////////////////////////////////

    const [total, data] = await Promise.all([
      prisma.masukanWarga.count({ where }),

      prisma.masukanWarga.findMany({
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
      }),
    ]);

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

  ////////////////////////////////////////////////////////////
  // GET BY ID
  ////////////////////////////////////////////////////////////

  getById: async (id: string) => {
    return prisma.masukanWarga.findUniqueOrThrow({
      where: { id },

      include: {
        domainIsu: {
          select: { id: true, nama: true },
        },

        gambarMasukan: {
          select: {
            id: true,
            url: true,
            publicId: true,
          },
        },

        diverifikasiOleh: {
          select: { id: true, name: true, email: true },
        },

        relasiRapat: true,
      },
    });
  },

  ////////////////////////////////////////////////////////////
  // UPDATE STATUS
  ////////////////////////////////////////////////////////////

  updateStatus: async (id: string, data: UpdateStatusMasukanDTO) => {
    ////////////////////////////////////////////////////////////
    // BUSINESS RULE HARDENING
    ////////////////////////////////////////////////////////////

    if (data.status === StatusMasukan.DITOLAK && !data.alasanPenolakan) {
      throw new Error("Alasan penolakan wajib jika status DITOLAK");
    }

    return prisma.masukanWarga.update({
      where: { id },

      data: {
        status: data.status,

        ////////////////////////////////////////////////////////////
        // RELATION SAFE UPDATE (PRISMA WAY)
        ////////////////////////////////////////////////////////////

        diverifikasiOleh:
          data.status === StatusMasukan.MENUNGGU
            ? { disconnect: true }
            : data.diverifikasiOlehId
              ? { connect: { id: data.diverifikasiOlehId } }
              : undefined,

        ////////////////////////////////////////////////////////////
        // BUSINESS RULE
        ////////////////////////////////////////////////////////////

        alasanPenolakan:
          data.status === StatusMasukan.DITOLAK ? data.alasanPenolakan : null,
      },
    });
  },
};

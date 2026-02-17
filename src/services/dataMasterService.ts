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

export const dataMasterService = {
  create: async (input: CreateDataInput) => {
    const { diprosesOlehId, ...rest } = input;

    // Siapkan data dengan koneksi ke User jika diprosesOlehId diberikan
    const data: any = {
      ...rest,
    };

    if (diprosesOlehId) {
      data.diprosesOleh = {
        connect: { id: diprosesOlehId },
      };
    }

    return prisma.dataMaster.create({
      data,
      include: { diprosesOleh: { select: { name: true } } }, // opsional, untuk langsung mengambil relasi
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

  getAll: async (where?: any) => {
    return prisma.dataMaster.findMany({
      where,
      include: {
        diprosesOleh: { select: { name: true } }, // relasi ke pemroses
        domainIsu: { select: { nama: true } }, // opsional, tampilkan nama domain
      },
      orderBy: { updatedAt: "desc" },
    });
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

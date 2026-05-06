// services/wargaService.ts
import { Prisma, StatusNoHPWarga } from "@/app/generated/prisma";
import { decrypt, encrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";

// Normalisasi nomor HP: hapus semua karakter non-digit
function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

// Helper: hasilkan array enkripsi setiap prefix (awalan) nomor HP
function generateEncryptedPrefixes(phoneDigits: string): string[] {
  const MIN_LENGTH = 0; // sesuai threshold pencarian
  const prefixes: string[] = [];
  for (let i = MIN_LENGTH; i <= phoneDigits.length; i++) {
    prefixes.push(encrypt(phoneDigits.slice(0, i)));
  }
  return prefixes;
}

export type WargaGetAllParams = {
  q?: string;
  statusNoHp?: StatusNoHPWarga;
  page?: number;
  limit?: number;
  sortBy?: "nama" | "noHp" | "statusNoHp" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export const wargaService = {
  // Create (enkripsi + simpan prefix hashes)
  create: async (data: {
    nama: string;
    noHp: string;
    alamat?: string | null;
    statusNoHp?: StatusNoHPWarga;
  }) => {
    const normalizedNoHp = normalizePhoneNumber(data.noHp);
    const encryptedNoHp = encrypt(normalizedNoHp);
    const encryptedPrefixes = generateEncryptedPrefixes(normalizedNoHp);

    const created = await prisma.warga.create({
      data: {
        nama: data.nama,
        noHp: encryptedNoHp,
        noHpPrefixes: encryptedPrefixes,
        alamat: data.alamat ?? null,
        statusNoHp: data.statusNoHp ?? StatusNoHPWarga.BELUM_TERVERIFIKASI,
      },
    });

    // Hilangkan noHpPrefixes dari response, dekripsi noHp
    const { noHpPrefixes, ...rest } = created;
    return {
      ...rest,
      noHp: decrypt(rest.noHp),
    };
  },

  // Get All dengan pagination, filter, dan pencarian (prefix + exact match)
  getAll: async (params?: WargaGetAllParams) => {
    const {
      q,
      statusNoHp,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params || {};

    const where: Prisma.WargaWhereInput = {};
    if (statusNoHp) where.statusNoHp = statusNoHp;

    if (q && q.trim() !== "") {
      const trimmedQ = q.trim();
      const digitsOnly = normalizePhoneNumber(trimmedQ);
      const isPhoneQuery = digitsOnly.length >= 0; // threshold pencarian nomor

      if (isPhoneQuery) {
        const encryptedPrefix = encrypt(digitsOnly);
        where.OR = [
          // Pencarian prefix (awalan) melalui blind index
          { noHpPrefixes: { has: encryptedPrefix } },
          // Pencarian exact match (nomor lengkap)
          { noHp: encryptedPrefix },
          // Nama & alamat
          { nama: { contains: trimmedQ, mode: "insensitive" } },
          { alamat: { contains: trimmedQ, mode: "insensitive" } },
        ];
      } else {
        where.OR = [
          { nama: { contains: trimmedQ, mode: "insensitive" } },
          { alamat: { contains: trimmedQ, mode: "insensitive" } },
        ];
      }
    }

    const orderBy: Prisma.WargaOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const skip = (page - 1) * limit;

    const [data, total] = await prisma.$transaction([
      prisma.warga.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.warga.count({ where }),
    ]);

    // Dekripsi noHp & hilangkan field noHpPrefixes dari setiap item
    const decryptedData = data.map((item) => {
      const { noHpPrefixes, ...rest } = item;
      return {
        ...rest,
        noHp: rest.noHp ? decrypt(rest.noHp) : null,
      };
    });

    return {
      data: decryptedData,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  // Get by ID (tidak diubah)
  getById: async (id: string) => {
    const warga = await prisma.warga.findUniqueOrThrow({
      where: { id },
      include: {
        masukan: {
          select: { id: true, judul: true, status: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    const { noHpPrefixes, ...rest } = warga;
    return {
      ...rest,
      noHp: rest.noHp ? decrypt(rest.noHp) : null,
    };
  },

  // Update (perbarui noHpPrefixes jika noHp berubah)
  update: async (
    id: string,
    data: {
      nama?: string;
      noHp?: string;
      alamat?: string | null;
      statusNoHp?: StatusNoHPWarga;
    },
  ) => {
    const updatePayload: Prisma.WargaUpdateInput = {};
    if (data.nama !== undefined) updatePayload.nama = data.nama;
    if (data.alamat !== undefined) updatePayload.alamat = data.alamat;
    if (data.statusNoHp !== undefined)
      updatePayload.statusNoHp = data.statusNoHp;
    if (data.noHp !== undefined) {
      const normalized = normalizePhoneNumber(data.noHp);
      updatePayload.noHp = encrypt(normalized);
      updatePayload.noHpPrefixes = generateEncryptedPrefixes(normalized);
    }

    const updated = await prisma.warga.update({
      where: { id },
      data: updatePayload,
    });

    const { noHpPrefixes, ...rest } = updated;
    return {
      ...rest,
      noHp: rest.noHp ? decrypt(rest.noHp) : null,
    };
  },

  // Delete (tidak diubah)
  delete: async (id: string) => {
    return prisma.warga.delete({ where: { id } });
  },
};
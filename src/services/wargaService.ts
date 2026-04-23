// services/wargaService.ts
import { Prisma, StatusNoHPWarga } from "@/app/generated/prisma";
import { decrypt, encrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";

// Normalisasi nomor HP: hapus semua karakter non-digit
function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export type WargaGetAllParams = {
  q?: string; // query pencarian (bisa nama, alamat, atau nomor HP)
  statusNoHp?: StatusNoHPWarga;
  page?: number;
  limit?: number;
  sortBy?: "nama" | "noHp" | "statusNoHp" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export const wargaService = {
  // Create (enkripsi otomatis)
  create: async (data: {
    nama: string;
    noHp: string;
    alamat?: string | null;
    statusNoHp?: StatusNoHPWarga;
  }) => {
    const normalizedNoHp = normalizePhoneNumber(data.noHp);
    const encryptedNoHp = encrypt(normalizedNoHp);

    const created = await prisma.warga.create({
      data: {
        nama: data.nama,
        noHp: encryptedNoHp,
        alamat: data.alamat ?? null,
        statusNoHp: data.statusNoHp ?? StatusNoHPWarga.BELUM_TERVERIFIKASI,
      },
    });

    // Kembalikan dengan nomor HP yang sudah didekripsi (plain)
    return {
      ...created,
      noHp: decrypt(created.noHp),
    };
  },

  // Get All dengan pagination, filter, dan pencarian (termasuk nomor HP exact match)
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

    // Pencarian: jika q diisi
    if (q && q.trim() !== "") {
      const trimmedQ = q.trim();
      const digitsOnly = normalizePhoneNumber(trimmedQ);
      const isPhoneQuery = digitsOnly.length >= 6; // anggap nomor HP minimal 6 digit

      if (isPhoneQuery) {
        // Jika query terdeteksi sebagai nomor HP, lakukan exact match pada kolom terenkripsi
        const encryptedQuery = encrypt(digitsOnly);
        where.OR = [
          { noHp: encryptedQuery }, // exact match nomor HP
          { nama: { contains: trimmedQ, mode: "insensitive" } },
          { alamat: { contains: trimmedQ, mode: "insensitive" } },
        ];
      } else {
        // Pencarian biasa (nama/alamat)
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

    // Dekripsi nomor HP untuk setiap data sebelum dikembalikan
    const decryptedData = data.map((item) => ({
      ...item,
      noHp: item.noHp ? decrypt(item.noHp) : null,
    }));

    return {
      data: decryptedData,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  // Get by ID (detail)
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

    // Dekripsi nomor HP
    return {
      ...warga,
      noHp: warga.noHp ? decrypt(warga.noHp) : null,
    };
  },

  // Update
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
    }

    const updated = await prisma.warga.update({
      where: { id },
      data: updatePayload,
    });

    return {
      ...updated,
      noHp: updated.noHp ? decrypt(updated.noHp) : null,
    };
  },

  // Delete (dengan pengecekan relasi)
  delete: async (id: string) => {
    return prisma.warga.delete({ where: { id } });
  },
};

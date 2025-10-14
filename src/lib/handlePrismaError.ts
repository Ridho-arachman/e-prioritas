import { Prisma } from "@prisma/client";

interface PrismaErrorResponse {
  message: string;
  status: number;
  code?: string;
}

/**
 * Universal Prisma error handler
 * Menangani semua error code Prisma yang umum muncul di CRUD
 */
export function handlePrismaError(error: unknown): PrismaErrorResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // === Unique Constraint (duplikat data)
      case "P2002":
        return {
          code: error.code,
          message: "Data sudah ada atau melanggar unique constraint",
          status: 409,
        };

      // === Foreign Key Constraint (relasi tidak valid)
      case "P2003":
        return {
          code: error.code,
          message:
            "Relasi tidak valid, data masih digunakan atau referensi tidak ditemukan",
          status: 400,
        };

      // === Data terlalu panjang
      case "P2000":
        return {
          code: error.code,
          message: "Nilai field terlalu panjang untuk kolom database",
          status: 400,
        };

      // === Field wajib tidak diisi
      case "P2011":
      case "P2012":
        return {
          code: error.code,
          message: "Field wajib tidak boleh kosong atau null",
          status: 400,
        };

      // === Record tidak ditemukan
      case "P2015":
      case "P2025":
        return {
          code: error.code,
          message: "Data tidak ditemukan di database",
          status: 404,
        };

      // === Relasi tidak valid atau rusak
      case "P2016":
      case "P2017":
        return {
          code: error.code,
          message: "Relasi data tidak konsisten atau invalid",
          status: 400,
        };

      // === Struktur query salah
      case "P2008":
      case "P2009":
      case "P2010":
        return {
          code: error.code,
          message: "Kesalahan query database internal",
          status: 500,
        };

      // === Database schema mismatch
      case "P2021":
      case "P2022":
        return {
          code: error.code,
          message:
            "Skema Prisma tidak sinkron dengan database (tabel/kolom hilang)",
          status: 500,
        };

      // === Constraint umum lainnya
      case "P2004":
        return {
          code: error.code,
          message: "Terjadi pelanggaran constraint database",
          status: 400,
        };

      default:
        return {
          code: error.code,
          message: `Kesalahan database tidak dikenal (${error.code})`,
          status: 500,
        };
    }
  }

  // === Error input atau validasi prisma
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      message: "Input data tidak valid untuk operasi Prisma",
      status: 400,
    };
  }

  // === Error koneksi / inisialisasi Prisma
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      message: "Gagal menghubungkan ke database",
      status: 500,
    };
  }

  // === Prisma internal panic (jarang banget)
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      message: "Terjadi kesalahan fatal di Prisma Engine",
      status: 500,
    };
  }

  // === Fallback untuk error non-Prisma
  return {
    message: "Terjadi kesalahan internal server",
    status: 500,
  };
}

import { Prisma } from "../app/generated/prisma/client";

interface PrismaErrorResponse {
  status: number;
  message: string;
}

export function handlePrismaError(error: any): PrismaErrorResponse | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error);

    // Sekarang TypeScript tahu `error.code` valid
    switch (error.code) {
      case "P2002":
        return { status: 409, message: "Data sudah ada (unique constraint)" };
      case "P2003":
        return {
          status: 400,
          message: "Relasi foreign key tidak valid atau masih digunakan",
        };
      case "P2000":
        return { status: 400, message: "Nilai field terlalu panjang" };
      case "P2025":
        return {
          status: 404,
          message: "Parent ID tidak ditemukan (nested create)",
        };
      case "P2001":
        return {
          status: 404,
          message: "Record tidak ada / data tidak ditemukan",
        };
      case "P2018":
        return { status: 400, message: "Relasi wajib tidak lengkap" };
      case "P2011":
        return {
          status: 400,
          message: "Field wajib tidak boleh null saat update",
        };
      case "P1000":
        return {
          status: 500,
          message: "Authentication failed (DB credentials salah)",
        };
      case "P1001":
        return {
          status: 500,
          message: "Database tidak dapat dijangkau / host salah",
        };
      case "P1002":
        return { status: 500, message: "Connection timeout / DB lambat" };
      case "P1017":
        return {
          status: 500,
          message: "Server menutup koneksi secara tak terduga",
        };
      case "P2004":
        return {
          status: 400,
          message: "Failed constraint check (custom constraint gagal)",
        };
      default:
        return { status: 500, message: `Error Prisma (${error.code})` };
    }
  }
  if (error.message === "DATA_HAS_RELATIONS") {
    return {
      status: 400,
      message:
        "Data ini memiliki relasi dengan data lain. Hapus data terkait terlebih dahulu atau putuskan relasi sebelum menghapus",
    };
  }

  // Kalau bukan error Prisma
  return null;
}

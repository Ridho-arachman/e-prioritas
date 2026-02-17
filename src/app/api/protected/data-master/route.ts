import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import {
  dataMasterQuerySchema,
  dataMasterSchema,
} from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma"; // pastikan path sesuai
import { headers } from "next/headers";

dayjs.extend(utc);
dayjs.extend(timezone);

export const POST = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 403,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const body = await req.json();
    const parsed = dataMasterSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed);

    // Gabungkan data validasi dengan ID user yang memproses
    const data = {
      ...parsed.data,
      diprosesOlehId: session.user.id, // akan digunakan untuk connect ke User
    };

    const dataMaster = await dataMasterService.create(data);

    return handleResponse({
      success: true,
      message: "Data Berhasil Ditambahkan",
      data: dataMaster,
      status: 201,
    });
  } catch (err) {
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 403,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || undefined;
    const domainIsuId = searchParams.get("domainIsuId") || undefined;
    const lokasiRt = searchParams.get("lokasiRt") || undefined;
    const lokasiRw = searchParams.get("lokasiRw") || undefined;
    const nilai = searchParams.get("nilai") || undefined;
    const updatedAt = searchParams.get("updatedAt") || undefined;

    const parsed = dataMasterQuerySchema.safeParse({
      q,
      domainIsuId,
      lokasiRt,
      lokasiRw,
      nilai,
      updatedAt,
    });

    if (!parsed.success) return handleZodValidation(parsed);

    const data = parsed.data;

    // Filter berdasarkan tanggal (jika ada)
    let updatedAtFilter = {};
    if (data.updatedAt) {
      if (!dayjs(data.updatedAt, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Format tanggal tidak valid (harus YYYY-MM-DD)",
          status: 400,
        });
      }

      const start = dayjs
        .tz(`${data.updatedAt} 00:00:00`, "Asia/Jakarta")
        .utc()
        .toDate();
      const end = dayjs
        .tz(`${data.updatedAt} 23:59:59`, "Asia/Jakarta")
        .utc()
        .toDate();

      updatedAtFilter = {
        updatedAt: {
          gte: start,
          lte: end,
        },
      };
    }

    // Bangun where clause
    const where: any = {
      AND: [
        // Pencarian teks (case-insensitive) di namaAtribut
        data.q
          ? {
              namaAtribut: {
                contains: data.q,
                mode: "insensitive",
              },
            }
          : {},
        data.domainIsuId ? { domainIsuId: data.domainIsuId } : {},
        data.lokasiRt !== undefined ? { lokasiRt: data.lokasiRt } : {},
        data.lokasiRw !== undefined ? { lokasiRw: data.lokasiRw } : {},
        data.nilai
          ? { nilai: { contains: data.nilai, mode: "insensitive" } }
          : {},
        updatedAtFilter,
      ].filter((cond) => Object.keys(cond).length > 0), // hapus kondisi kosong
    };

    const dataMaster = await dataMasterService.getAll(where);

    if (dataMaster.length === 0) {
      return handleResponse({
        success: true,
        message: "Data Master Masih Kosong",
        status: 404,
      });
    }

    return handleResponse({
      success: true,
      message: "Data Berhasil Ditemukan",
      data: dataMaster,
      status: 200,
    });
  } catch (err) {
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

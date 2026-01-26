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
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";

dayjs.extend(utc);
dayjs.extend(timezone);

const POST = async (req: NextRequest) => {
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
    //VALIDASI REQ BODY
    const body = await req.json();
    const parsed = dataMasterSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed);

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = { ...parsed.data, updatedByUserId: session.user.id };

    //SIMPAN DATA MASTER KE DATABASE
    const dataMaster = await dataMasterService.create(data);

    //JIKA SIMPAN DATA MASTER BERHASIL
    return handleResponse({
      success: true,
      message: "Data Berhasil Ditambahkan",
      data: dataMaster,
      status: 201,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

const GET = async (req: NextRequest) => {
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
    const jenisData = searchParams.get("jenisData") || undefined;
    const lokasiRt = searchParams.get("lokasiRt") || undefined;
    const lokasiRw = searchParams.get("lokasiRw") || undefined;
    const nilai = searchParams.get("nilai") || undefined;
    const updatedAt = searchParams.get("updatedAt") || undefined;

    const parsed = dataMasterQuerySchema.safeParse({
      q,
      jenisData,
      lokasiRt,
      lokasiRw,
      nilai,
      updatedAt,
    });
    if (!parsed.success) return handleZodValidation(parsed);
    const data = parsed.data;

    let updatedAtFilter = {};
    if (data.updatedAt) {
      // Parsing WIB (UTC+7)
      const start = dayjs
        .tz(`${data.updatedAt} 00:00:00`, "Asia/Jakarta")
        .utc();
      const end = dayjs.tz(`${data.updatedAt} 23:59:59`, "Asia/Jakarta").utc();

      // Validasi biar gak bisa “2025-10-32”
      if (!dayjs(data.updatedAt, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Tanggal tidak valid",
          status: 400,
        });
      }

      updatedAtFilter = {
        updatedAt: {
          gte: start.toDate(),
          lte: end.toDate(),
        },
      };
    }

    const where: any = {
      AND: [
        data.q
          ? {
              OR: [{ namaAtribut: { contains: data.q, mode: "insensitive" } }],
            }
          : {},
        data.jenisData ? { jenisData: data.jenisData } : {},
        data.lokasiRt ? { lokasiRt: data.lokasiRt } : {},
        data.nilai ? { nilai: data.nilai } : {},
        data.lokasiRw ? { lokasiRw: data.lokasiRw } : {},
        updatedAtFilter,
      ],
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

export { POST, GET };

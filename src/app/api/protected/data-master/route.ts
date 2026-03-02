import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import {
  dataMasterCreateSchema,
  dataMasterQuerySchema,
} from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NextRequest } from "next/server";
import { NilaiKritikalitas, Prisma, Role } from "@/app/generated/prisma"; // pastikan path sesuai
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
      status: 401,
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
    const parsed = dataMasterCreateSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed);

    const data = {
      ...parsed.data,
      diprosesOlehId: session.user.id,
    };

    const dataMaster = await dataMasterService.create(data);

    return handleResponse({
      success: true,
      message: "Data Berhasil Ditambahkan",
      data: dataMaster,
      status: 201,
    });
  } catch (err) {
    console.error("[DATA_MASTER_POST]", err);
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
      status: 401,
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
    const kritikalitas = searchParams.get("kritikalitas") as
      | NilaiKritikalitas
      | undefined;
    const updatedAt = searchParams.get("updatedAt") || undefined;

    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // ✅ Validasi hanya field yang ada di schema
    const parsed = dataMasterQuerySchema.safeParse({
      q,
      domainIsuId,
      kritikalitas,
      updatedAt,
    });

    console.log("Parsed Query Params:", parsed);

    if (!parsed.success) return handleZodValidation(parsed);

    const data = parsed.data;

    let updatedAtFrom: Date | undefined;
    let updatedAtTo: Date | undefined;

    if (data.updatedAt) {
      if (!dayjs(data.updatedAt, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Format tanggal tidak valid (harus YYYY-MM-DD)",
          status: 400,
        });
      }
      updatedAtFrom = dayjs
        .tz(`${data.updatedAt} 00:00:00`, "Asia/Jakarta")
        .utc()
        .toDate();
      updatedAtTo = dayjs
        .tz(`${data.updatedAt} 23:59:59`, "Asia/Jakarta")
        .utc()
        .toDate();
    }

    const result = await dataMasterService.getAll({
      search: data.q,
      domainIsuId: data.domainIsuId,
      kritikalitas: data.kritikalitas,
      updatedAtFrom,
      updatedAtTo,
      sortBy: sortBy as keyof Prisma.DataMasterOrderByWithRelationInput,
      sortOrder,
      page,
      limit,
    });

    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data Master Masih Kosong",
        data: [],
        meta: {
          total: 0,
          page: result.page,
          limit: result.limit,
          totalPages: 0,
        },
        status: 200,
      });
    }

    return handleResponse({
      success: true,
      message:
        result.data.length === 0
          ? "Data Master Masih Kosong"
          : "Data Berhasil Ditemukan",
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
      status: 200,
    });
  } catch (err) {
    console.error("[DATA_MASTER_GET]", err);
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

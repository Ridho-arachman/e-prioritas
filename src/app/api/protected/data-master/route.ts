import { NilaiKritikalitas, Role } from "@/app/generated/prisma"; // pastikan path sesuai
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  dataMasterCreateSchema,
  dataMasterQuerySchema,
} from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

dayjs.extend(utc);
dayjs.extend(timezone);

export const POST = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];
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
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA", "LURAH"];
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
    const isActiveParam = searchParams.get("isActive");
    const diprosesOlehId = searchParams.get("diprosesOlehId") || undefined;
    const tahunDataParam = searchParams.get("tahunData") || undefined;
    const createdAtParam = searchParams.get("createdAt") || undefined;
    const updatedAtParam = searchParams.get("updatedAt") || undefined;

    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const parsed = dataMasterQuerySchema.safeParse({
      q,
      domainIsuId,
      kritikalitas,
      isActive: isActiveParam,
      diprosesOlehId,
      tahunData: tahunDataParam,
      createdAt: createdAtParam,
      updatedAt: updatedAtParam,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    if (!parsed.success) {
      console.error(
        "[DATA_MASTER_GET] Validation Error:",
        parsed.error.format(),
      );
      return handleZodValidation(parsed);
    }

    const data = parsed.data;

    // Konversi isActive ke boolean
    const isActive =
      data.isActive === "true"
        ? true
        : data.isActive === "false"
          ? false
          : undefined;

    // Konversi createdAt menjadi range satu hari
    let createdAtFrom: Date | undefined;
    let createdAtTo: Date | undefined;
    if (data.createdAt) {
      createdAtFrom = dayjs
        .tz(`${data.createdAt} 00:00:00`, "Asia/Jakarta")
        .utc()
        .toDate();
      createdAtTo = dayjs
        .tz(`${data.createdAt} 23:59:59`, "Asia/Jakarta")
        .utc()
        .toDate();
    }

    let updatedAtFrom: Date | undefined;
    let updatedAtTo: Date | undefined;
    if (data.updatedAt) {
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
      isActive,
      diprosesOlehId: data.diprosesOlehId,
      tahunData: data.tahunData,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
      page: data.page,
      limit: data.limit,
    });

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

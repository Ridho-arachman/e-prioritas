import { Role, StatusNoHPWarga } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { wargaCreateSchema, wargaQuerySchema } from "@/schema/wargaSchema";
import { wargaService } from "@/services/wargaService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN"];
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });

  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const searchParams = req.nextUrl.searchParams;

    // Ambil nilai statusNoHp, ubah null/""/"all" menjadi undefined
    const rawStatusNoHp = searchParams.get("statusNoHp");
    let statusNoHp: string | undefined = rawStatusNoHp ?? undefined;
    if (statusNoHp === "" || statusNoHp === "all") statusNoHp = undefined;

    const parsed = wargaQuerySchema.safeParse({
      q: searchParams.get("q") || undefined,
      statusNoHp: statusNoHp as StatusNoHPWarga | undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: searchParams.get("sortOrder") || "desc",
    });

    console.log("Parsed query params:", parsed);
    if (!parsed.success) return handleZodValidation(parsed);

    const result = await wargaService.getAll(parsed.data);
    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data warga tidak ditemukan",
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
      message: "Data warga berhasil diambil",
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
    console.error("[WARGA_GET] Error:", err);
    const prismaError = handlePrismaError(err);
    if (prismaError)
      return handleResponse({
        success: false,
        message: prismaError.message,
        status: prismaError.status,
      });
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH"];
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const body = await req.json();
    const parsed = wargaCreateSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed);

    const warga = await wargaService.create(parsed.data);
    return handleResponse({
      success: true,
      message: "Warga berhasil ditambahkan",
      data: warga,
      status: 201,
    });
  } catch (err) {
    const prismaError = handlePrismaError(err);
    if (prismaError)
      return handleResponse({
        success: false,
        message: prismaError.message,
        status: prismaError.status,
      });
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

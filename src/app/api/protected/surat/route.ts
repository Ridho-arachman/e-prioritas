import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { createSuratSchema, querySuratSchema } from "@/schema/suratSchema";
import { suratService } from "@/services/suratService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

// GET (admin) – semua surat
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit") || "100";
    const page = searchParams.get("page") || "1";
    const isActiveParam = searchParams.get("isActive");

    const parsed = querySuratSchema.safeParse({
      limit,
      page,
      isActive: isActiveParam,
    });

    if (!parsed.success) return handleZodValidation(parsed);

    const { limit: l, page: p, isActive } = parsed.data;
    const result = await suratService.getAll({
      limit: l,
      page: p,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    console.log("Parsed query params:", result);

    return handleResponse({
      success: true,
      message: "Data surat berhasil diambil",
      data: result.data,
      meta: result.meta,
    });
  } catch (err) {
    const prismaErr = handlePrismaError(err);
    if (prismaErr) {
      return handleResponse({
        success: false,
        message: prismaErr.message,
        status: prismaErr.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}

// POST (admin) – tambah surat
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const body = await req.json();
    const parsed = createSuratSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed);

    const surat = await suratService.create(parsed.data);
    return handleResponse({
      success: true,
      message: "Surat berhasil ditambahkan",
      data: surat,
      status: 201,
    });
  } catch (err) {
    const prismaErr = handlePrismaError(err);
    if (prismaErr) {
      return handleResponse({
        success: false,
        message: prismaErr.message,
        status: prismaErr.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}

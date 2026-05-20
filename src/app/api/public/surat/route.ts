import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { querySuratSchema } from "@/schema/suratSchema";
import { suratService } from "@/services/suratService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit") || "100";
    const page = searchParams.get("page") || "1";

    const parsed = querySuratSchema.safeParse({
      limit,
      page,
      isActive: "true",
    });
    if (!parsed.success) return handleZodValidation(parsed);

    const { limit: l, page: p } = parsed.data;
    const result = await suratService.getAll({
      isActive: true,
      limit: l,
      page: p,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data surat tidak ditemukan",
        data: [],
        meta: result.meta,
      });
    }

    if (!result.data) {
      return handleResponse({
        success: false,
        message: "Data surat tidak ditemukan",
        status: 404,
      });
    }

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

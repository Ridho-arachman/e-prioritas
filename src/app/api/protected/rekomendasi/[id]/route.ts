import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/responseHandler";
import { rekomendasiByIdSchema } from "@/schema/rekomendasiSchema";
import { rekomendasiService } from "@/services/rekomendasiService";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/rekomendasi/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //VERIFIKASI JWT
  const user = await verifyApiToken(req);

  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
      status: 403,
    });
  }

  // VALIDASI PARAM ID
  const { id } = await ctx.params;

  const parsedId = rekomendasiByIdSchema.safeParse({ id });
  if (!parsedId.success) return handleZodValidation(parsedId, headers);

  const rekomendasiId = parsedId.data.id;

  try {
    //AMBIL DATA perangkat desa DARI DATABASE BERDASARKAN ID
    const data = await rekomendasiService.getById(rekomendasiId);

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data Rekomendasi berhasil diambil",
      data,
      status: 200,
      headers,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

export { GET };

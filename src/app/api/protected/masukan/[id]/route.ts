import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/responseHandler";
import {
  editStatusMasukanWargaSchema,
  masukanWargaByIdSchema,
} from "@/schema/masukanWarga";
import { masukanWargaService } from "@/services/masukanWargaService";
import { NextRequest, NextResponse } from "next/server";

const PATCH = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/masukan/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VERIFIKASI JWT
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

  try {
    //AMBIL ID
    const { id } = await ctx.params;

    //AMBIL BODY
    const body = await req.json();

    //VALIDASI
    const parsed = editStatusMasukanWargaSchema.safeParse(body);
    const parsedId = masukanWargaByIdSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId, headers);
    if (!parsed.success) return handleZodValidation(parsed, headers);

    //JIKA VALIDASI BERHASIL
    const data = parsed.data;
    const masukanId = parsedId.data.id;

    //UPDATE
    const masukan = await masukanWargaService.update(masukanId, data);

    return handleResponse({
      success: true,
      message: "Status Masukan Berhasil Diubah",
      data: masukan,
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

export { PATCH };

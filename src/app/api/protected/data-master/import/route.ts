import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/responseHandler";
import { dataMasterArraySchema } from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
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
    //VALIDASI REQ BODY
    const body = await req.json();

    const parsed = dataMasterArraySchema.safeParse(body.data);

    if (!parsed.success) return handleZodValidation(parsed, headers);

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = parsed.data.map((item) => ({
      ...item,
      updatedByUserId: user.id,
    }));

    //SIMPAN DATA MASTER KE DATABASE
    const dataMaster = await dataMasterService.createMany(data);

    //JIKA SIMPAN DATA MASTER BERHASIL
    return handleResponse({
      success: true,
      message: "Data Berhasil Ditambahkan",
      data: dataMaster,
      status: 201,
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

export { POST };

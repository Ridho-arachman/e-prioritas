import { cors } from "@/lib/cors";
import { NextRequest, NextResponse } from "next/server";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { handleResponse } from "@/lib/responseHandler";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { masukanWargaService } from "@/services/masukanWargaService";

const POST = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  try {
    //NGGAMBIL REQ BODY
    const body = await req.json();

    // VALIDASI REQ BODY DENGAN ZOD
    const parsed = createMasukanWargaSchema.safeParse(body);
    if (!parsed.success) {
      return handleZodValidation(parsed, headers);
    }

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = parsed.data;

    //SIMPAN DATA MASUKAN WARGA KE DATABASE
    const masukanWarga = await masukanWargaService.create(data);

    //JIKA SIMPAN DATA MASUKAN WARGA BERHASIL
    return handleResponse({
      success: true,
      message: "Masukan Warga Berhasil Ditambahkan",
      data: masukanWarga,
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

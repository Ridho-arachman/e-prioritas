import { NextRequest, NextResponse } from "next/server";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { handleResponse } from "@/lib/handleResponse";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { masukanWargaService } from "@/services/masukanWargaService";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = createMasukanWargaSchema.safeParse(body);

    if (!parsed.success) {
      return handleZodValidation(parsed);
    }

    const data = parsed.data;

    const masukanWarga = await masukanWargaService.create(data);

    return handleResponse({
      success: true,
      message: "Masukan Warga Berhasil Ditambahkan",
      data: masukanWarga,
      status: 201,
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

export { POST };

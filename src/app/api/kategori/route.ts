import { handleResponse } from "@/lib/handleResponse";
import { NextRequest } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { kategoriService } from "@/services/kategoriService";

const GET = async (req: NextRequest) => {
  try {
    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await kategoriService.getAll();

    //JIKA DATA KOSONG
    if (data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data kategori masih kosong",
        status: 404,
      });
    }

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data kategori berhasil diambil",
      data,
      status: 200,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export { GET };

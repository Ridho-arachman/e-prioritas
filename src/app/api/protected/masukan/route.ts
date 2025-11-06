import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/responseHandler";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";
import { masukanWargaService } from "@/services/masukanWargaService";
import { NextRequest, NextResponse } from "next/server";

dayjs.extend(utc);
dayjs.extend(timezone);

const GET = async (req: NextRequest) => {
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  const user = await verifyApiToken(req);
  if (!user)
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });

  if (user.role !== "ADMIN")
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses terhadap data ini",
      status: 403,
    });

  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || undefined;
    const status = searchParams.get("status") || undefined;
    const kategoriId = searchParams.get("kategoriId") || undefined;
    const verifiedByUserId = searchParams.get("verifiedByUserId") || undefined;
    const createdAt = searchParams.get("createdAt") || undefined;

    const parsed = masukanWargaQuerySchema.safeParse({
      q,
      status,
      kategoriId,
      verifiedByUserId,
      createdAt,
    });
    if (!parsed.success) return handleZodValidation(parsed, headers);
    const data = parsed.data;

    let createdAtFilter = {};
    if (data.createdAt) {
      // Parsing WIB (UTC+7)
      const start = dayjs
        .tz(`${data.createdAt} 00:00:00`, "Asia/Jakarta")
        .utc();
      const end = dayjs.tz(`${data.createdAt} 23:59:59`, "Asia/Jakarta").utc();

      // Validasi biar gak bisa “2025-10-32”
      if (!dayjs(data.createdAt, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Tanggal tidak valid",
          status: 400,
          headers,
        });
      }

      createdAtFilter = {
        createdAt: {
          gte: start.toDate(),
          lte: end.toDate(),
        },
      };

      console.log("DEBUG createdAt filter:", {
        input: data.createdAt,
        gte: start.format(),
        lte: end.format(),
      });
    }

    const where: any = {
      AND: [
        data.q
          ? {
              OR: [
                { namaPengirim: { contains: data.q, mode: "insensitive" } },
                { emailPengirim: { contains: data.q, mode: "insensitive" } },
              ],
            }
          : {},
        data.status ? { status: data.status } : {},
        data.kategoriId ? { kategoriId: data.kategoriId } : {},
        data.verifiedByUserId
          ? { verifiedByUserId: data.verifiedByUserId }
          : {},
        createdAtFilter,
      ],
    };

    const masukan = await masukanWargaService.getAll(where);

    if (masukan.length === 0) {
      return handleResponse({
        success: true,
        message: "Data Masukan Masih Kosong",
        status: 404,
        headers,
      });
    }

    return handleResponse({
      success: true,
      message: "Masukan Warga Berhasil Ditemukan",
      data: masukan,
      status: 201,
      headers,
    });
  } catch (err) {
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

export { GET };

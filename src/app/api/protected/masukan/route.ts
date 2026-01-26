import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";
import { masukanWargaService } from "@/services/masukanWargaService";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

dayjs.extend(utc);
dayjs.extend(timezone);

const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 403,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

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
    if (!parsed.success) return handleZodValidation(parsed);
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
      });
    }

    return handleResponse({
      success: true,
      message: "Masukan Warga Berhasil Ditemukan",
      data: masukan,
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

export { GET };

import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import { dataMasterArraySchema } from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";

const POST = async (req: NextRequest) => {
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
    //VALIDASI REQ BODY
    const body = await req.json();

    const parsed = dataMasterArraySchema.safeParse(body.data);

    if (!parsed.success) return handleZodValidation(parsed);

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = parsed.data.map((item) => ({
      ...item,
      updatedByUserId: session.user.id,
    }));

    //SIMPAN DATA MASTER KE DATABASE
    const dataMaster = await dataMasterService.createMany(data);

    //JIKA SIMPAN DATA MASTER BERHASIL
    return handleResponse({
      success: true,
      message: "Data Berhasil Ditambahkan",
      data: dataMaster,
      status: 201,
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

export { POST };

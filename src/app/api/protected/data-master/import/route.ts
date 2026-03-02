import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import { dataMasterArraySchema } from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";

export const POST = async (req: NextRequest) => {
  // Cek autentikasi dan otorisasi
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  }

  const allowedRoles: Role[] = ["ADMIN"];
  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const body = await req.json();

    // Menerima format: langsung array atau { data: [...] }
    let items = body;
    if (
      body &&
      typeof body === "object" &&
      "data" in body &&
      Array.isArray(body.data)
    ) {
      items = body.data;
    }

    if (!Array.isArray(items)) {
      return handleResponse({
        success: false,
        message:
          "Request body harus berupa array atau object dengan properti 'data' berisi array",
        status: 400,
      });
    }

    const parsed = dataMasterArraySchema.safeParse(items);
    if (!parsed.success) return handleZodValidation(parsed);

    const data = parsed.data.map((item) => ({
      ...item,
      diprosesOlehId: session.user.id,
    }));

    const result = await dataMasterService.createMany(data);

    return handleResponse({
      success: true,
      message: `${result.count} data berhasil ditambahkan`,
      data: { count: result.count },
      status: 201,
    });
  } catch (err) {
    console.error("[IMPORT_DATA_MASTER_POST]", err);
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

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
    const body = await req.json();

    // Validasi array data
    const parsed = dataMasterArraySchema.safeParse(body.data);
    if (!parsed.success) return handleZodValidation(parsed);

    // Mapping: tambahkan diprosesOlehId dari session user (sebagai scalar)
    const data = parsed.data.map((item) => ({
      ...item,
      diprosesOlehId: session.user.id,
    }));

    // Simpan banyak data sekaligus
    const result = await dataMasterService.createMany(data);

    // createMany mengembalikan { count }
    return handleResponse({
      success: true,
      message: `${result.count} data berhasil ditambahkan`,
      data: { count: result.count },
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

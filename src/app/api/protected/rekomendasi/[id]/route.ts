import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import { rekomendasiByIdSchema } from "@/schema/rekomendasiSchema";
import { rekomendasiService } from "@/services/rekomendasiService";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GET = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/rekomendasi/[id]">,
) => {
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
    // VALIDASI PARAM ID
    const { id } = await ctx.params;

    const parsedId = rekomendasiByIdSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const rekomendasiId = parsedId.data.id;

    //AMBIL DATA perangkat desa DARI DATABASE BERDASARKAN ID
    const data = await rekomendasiService.getById(rekomendasiId);

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data Rekomendasi berhasil diambil",
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

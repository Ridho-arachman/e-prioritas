import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { userService } from "@/services/userService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA", "LURAH"];
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
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const perPage = searchParams.get("perPage")
      ? parseInt(searchParams.get("perPage")!)
      : 20;

    // Jika tidak ada parameter pencarian/pagination, gunakan getAll (all data)
    // Tapi untuk keperluan combobox, kita akan selalu pakai getAllPaginated
    const result = await userService.getAll({ q, page, perPage });

    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data user tidak ditemukan",
        status: 200,
        data: [],
        meta: result.meta,
      });
    }

    return handleResponse({
      success: true,
      message: "Data user berhasil diambil",
      data: result.data,
      meta: result.meta,
      status: 200,
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

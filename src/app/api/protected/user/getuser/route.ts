import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { userService } from "@/services/userService";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GET = async () => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
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
    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await userService.getById(session.user.id);

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil diambil",
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

import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import {
  createUserPerangkatSchema,
  queryUserPerangkatSchema,
} from "@/schema/userPerangkatSchema";
import { userService } from "@/services/userService";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";

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
    const q = searchParams.get("q") || "";
    const isActive = searchParams.get("isActive") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "10");

    const parsed = queryUserPerangkatSchema.safeParse({ q, isActive });
    if (!parsed.success) return handleZodValidation(parsed);

    const { isActive: isActiveParam, q: queryUser } = parsed.data;

    // Panggil service versi pagination
    const { data, meta } = await userService.getAllPerangkat({
      q: queryUser,
      isActive: isActiveParam,
      page,
      perPage,
    });

    if (data.length === 0) {
      return handleResponse({
        success: true,
        message: queryUser
          ? "Data perangkat desa tidak ditemukan"
          : "Data perangkat desa masih kosong",
        status: 200,
        data: [],
        meta,
      });
    }

    // JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil diambil",
      data,
      meta,
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
    const body = await req.json();
    const parsed = createUserPerangkatSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed);

    const { confirmPassword, ...data } = parsed.data;

    const user = await userService.create(data);

    return handleResponse({
      success: true,
      message: "User berhasil ditambahkan",
      data: user,
      status: 201,
    });
  } catch (error) {
    const betterAuthErr = handleBetterAuthError(error);
    console.log(betterAuthErr);

    if (betterAuthErr) {
      return handleResponse({
        success: false,
        message: betterAuthErr.message,
        status: betterAuthErr.status,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export { GET, POST };

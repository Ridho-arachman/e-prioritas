import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import {
  editStatusMasukanWargaSchema,
  masukanWargaByIdSchema,
} from "@/schema/masukanWarga";
import { masukanWargaService } from "@/services/masukanWargaService";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const POST = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/masukan/[id]">,
) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];
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
    //AMBIL ID
    const { id } = await ctx.params;

    //AMBIL BODY
    const body = await req.json();

    //VALIDASI
    const parsed = editStatusMasukanWargaSchema.safeParse({
      diverifikasiOlehId: session.user.id,
      ...body,
    });

    const parsedId = masukanWargaByIdSchema.safeParse({ id });

    console.log("parsed", parsed);
    console.log("parsedId", parsedId);

    if (!parsedId.success) return handleZodValidation(parsedId);
    if (!parsed.success) return handleZodValidation(parsed);

    //JIKA VALIDASI BERHASIL
    const data = parsed.data;
    const masukanId = parsedId.data.id;

    if (data.status === "MENUNGGU") {
      data.diverifikasiOlehId = "";
    }

    //UPDATE
    const masukan = await masukanWargaService.updateStatus(masukanId, data);

    return handleResponse({
      success: true,
      message: "Status Masukan Berhasil Diubah",
      data: masukan,
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

const GET = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/masukan/[id]">,
) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];
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
    //AMBIL ID
    const { id } = await ctx.params;

    //VALIDASI
    const parsedId = masukanWargaByIdSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    //JIKA VALIDASI BERHASIL
    const masukanId = parsedId.data.id;

    //UPDATE
    const masukan = await masukanWargaService.getById(masukanId);

    return handleResponse({
      success: true,
      message: "Detail Masukan Berhasil Diambil",
      data: masukan,
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

export { POST, GET };

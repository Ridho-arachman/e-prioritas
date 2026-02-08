import { userService } from "@/services/userService";
import { handleResponse } from "@/lib/handleResponse";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  deleteUserPerangkatSchema,
  detailUserPerangkatSchema,
  updateUserPerangkatSchema,
} from "@/schema/userPerangkatSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { api } from "@/lib/api";

const GET = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/perangkat/[id]">,
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
    const { id } = await ctx.params;
    console.log(id);

    const parsedId = detailUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const userId = parsedId.data.id;

    const data = await userService.getById(userId);

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

const PATCH = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/perangkat/[id]">,
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
    const { id } = await ctx.params;

    // ✅ Parse FormData (bukan JSON)
    const formData = await req.formData();

    // ✅ Ambil data dari FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as "PERANGKAT_DESA" | "LURAH";
    const jabatan = formData.get("jabatan") as string;
    const isActive = formData.get("isActive") === "true";
    const imageFile = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";

    // ✅ Validasi ID
    const parsedId = detailUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);
    const userId = parsedId.data.id;

    // ✅ Upload gambar ke Cloudinary jika ada
    let imageUrl: string | undefined;
    let shouldRemoveImage = false;

    if (removeImage) {
      shouldRemoveImage = true;
    } else if (imageFile) {
      try {
        // Baca file sebagai buffer
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload ke Cloudinary
        const uploadResult = await uploadToCloudinary(
          buffer,
          "perangkat-profiles",
          `perangkat_${userId}_${Date.now()}`,
        );

        imageUrl = uploadResult.url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return handleResponse({
          success: false,
          message: "Gagal mengupload gambar",
          status: 500,
        });
      }
    }

    // ✅ Prepare data untuk update
    const updateData: any = {
      name,
      email,
      role,
      jabatan,
      isActive,
    };

    // ✅ Tambahkan image jika ada perubahan
    if (shouldRemoveImage) {
      updateData.image = null;
    } else if (imageUrl) {
      updateData.image = imageUrl;
    }

    // ✅ Update user
    const user = await userService.update(updateData, userId);

    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil diupdate",
      data: user,
      status: 200,
    });
  } catch (err) {
    console.error("Update perangkat error:", err);

    // PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    // SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

const DELETE = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/perangkat/[id]">,
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
    // NGGAMBIL PARAM
    const { id } = await ctx.params;

    // VALIDASI REQ PARAM
    const parsedId = deleteUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const userId = parsedId.data.id;

    // HAPUS DATA perangkat desa KE DATABASE
    const kategori = await userService.deleteById(userId);

    // JIKA DATA perangkat desa TIDAK DITEMUKAN
    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil dihapus",
      data: kategori,
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

export { PATCH, DELETE, GET };

import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  createUserPerangkatSchema,
  queryUserPerangkatSchema,
} from "@/schema/userPerangkatSchema";
import { userService } from "@/services/userService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

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

    // ✅ Ambil parameter role dan pastikan hanya nilai yang valid yang diteruskan
    const roleParam = searchParams.get("role");
    const role =
      roleParam === "PERANGKAT_DESA" || roleParam === "LURAH"
        ? roleParam
        : undefined;

    const sortBy = searchParams.get("sortBy") || undefined;
    const sortOrder = searchParams.get("sortOrder") as "asc" | "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "10");

    const parsed = queryUserPerangkatSchema.safeParse({ q, isActive });
    if (!parsed.success) return handleZodValidation(parsed);

    const { isActive: isActiveParam, q: queryUser } = parsed.data;

    // Panggil service versi pagination
    const { data, meta } = await userService.getAllPerangkat({
      q: queryUser,
      isActive: isActiveParam,
      sortBy,
      sortOrder,
      page,
      perPage,
      role, // ✅ Sekarang bertipe "PERANGKAT_DESA" | "LURAH" | undefined
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

  let imageUrl: string | undefined;
  let cloudinaryPublicId: string | undefined;

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as "PERANGKAT_DESA" | "LURAH";
    const jabatan = formData.get("jabatan") as string | null;
    const isActive = formData.get("isActive") === "true";
    const imageFile = formData.get("image") as File | null;

    const parsed = createUserPerangkatSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
      role,
      jabatan: jabatan || undefined,
      isActive,
      image: imageFile || undefined,
    });

    if (!parsed.success) return handleZodValidation(parsed);

    if (imageFile) {
      try {
        // Baca file sebagai buffer
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload ke Cloudinary
        const uploadResult = await uploadToCloudinary(
          buffer,
          "perangkat-profiles",
          `perangkat_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        );

        imageUrl = uploadResult.url;
        cloudinaryPublicId = uploadResult.public_id;

        console.log(`Image uploaded successfully: ${cloudinaryPublicId}`);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return handleResponse({
          success: false,
          message: "Gagal mengupload gambar",
          status: 500,
        });
      }
    }

    const userData = {
      name,
      email,
      password,
      isActive,
      role,
      jabatan: jabatan || undefined,
      image: imageUrl,
    };

    const user = await userService.create(userData);

    return handleResponse({
      success: true,
      message: "User berhasil ditambahkan",
      data: user,
      status: 201,
    });
  } catch (error) {
    if (cloudinaryPublicId) {
      await deleteFromCloudinary(cloudinaryPublicId);
    }

    const betterAuthErr = handleBetterAuthError(error);
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

import { auth } from "@/lib/auth";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import prisma from "@/lib/prisma";
import { userUpdateNameSchema } from "@/schema/authSchema";
import {
  updateUserProfileImage,
  deleteCloudinaryImage,
} from "@/lib/cloudinaryCrudHelper";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";

export const PATCH = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA", "LURAH"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
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
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return handleResponse({
        success: false,
        message: "User belum login",
        status: 403,
      });
    }

    // Parse FormData
    const formData = await req.formData();
    const nameField = formData.get("name") as string | null;
    const imageFile = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";

    // Validasi nama
    if (!nameField) {
      return handleResponse({
        success: false,
        message: "Nama wajib diisi",
        status: 400,
      });
    }

    const nameValidation = userUpdateNameSchema.safeParse({ name: nameField });
    if (!nameValidation.success) {
      return handleZodValidation(nameValidation);
    }
    const { name } = nameValidation.data;

    // Ambil data user saat ini (untuk mendapatkan URL gambar lama)
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true },
    });

    // Siapkan data update
    const updateData: any = { name };

    // Kasus 1: Ada file gambar baru -> upload, hapus yang lama (otomatis oleh helper)
    if (imageFile) {
      // Validasi tipe file
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        return handleResponse({
          success: false,
          message: "Tipe file tidak didukung. Gunakan JPG, PNG, atau WEBP",
          status: 400,
        });
      }

      // Batasi ukuran file (maks 5MB)
      if (imageFile.size > 5 * 1024 * 1024) {
        return handleResponse({
          success: false,
          message: "Ukuran file maksimal 5MB",
          status: 400,
        });
      }

      // Konversi file ke Buffer
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Tentukan tipe user untuk folder Cloudinary
      const userType = session.user.role === "ADMIN" ? "admin" : "perangkat";

      // Upload gambar baru dan hapus otomatis gambar lama jika ada
      const uploadResult = await updateUserProfileImage(
        buffer,
        currentUser?.image, // URL gambar lama (bisa null)
        session.user.id, // identifier user
        userType,
      );

      updateData.image = uploadResult.newUrl;
    }

    // Kasus 2: Tidak ada file baru, tapi user meminta hapus gambar
    if (!imageFile && removeImage) {
      // Hapus gambar dari Cloudinary jika ada
      if (currentUser?.image) {
        await deleteCloudinaryImage(currentUser.image);
      }
      updateData.image = null; // set ke null di database
    }

    // Jika tidak ada kasus di atas, field image tidak diikutsertakan dalam updateData

    // Update database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    return handleResponse({
      success: true,
      message: "Profil berhasil diperbarui",
      data: updatedUser,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return handleResponse({
      success: false,
      message: "Terjadi kesalahan pada server",
      status: 500,
    });
  }
};

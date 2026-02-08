import { config } from "@/config";
import { auth } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

interface GetAllPerangkatParams {
  q?: string;
  isActive?: string;
  page?: number; // halaman saat ini
  perPage?: number; // jumlah item per halaman
}

export const userService = {
  create: async (data: {
    email: string;
    name: string;
    password: string;
    jabatan?: string;
    image?: string;
    rememberMe?: boolean;
    role?: string;
    isActive?: boolean;
  }) => {
    return auth.api.signUpEmail({
      body: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role || "PERANGKAT_DESA",
        jabatan: data.jabatan,
        image: data.image,
        isActive: data.isActive,
        callbackURL: `${config.appUrl}/verify-success`,
      },
    });
  },

  getAllPerangkat: async ({
    q,
    isActive,
    page = 1,
    perPage = 10,
    sortBy = "name", // default sort by name
    sortOrder = "asc", // default ascending order
  }: GetAllPerangkatParams & {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    // Validasi dan mapping field sorting
    const validSortFields = [
      "id",
      "name",
      "email",
      "jabatan",
      "createdAt",
      "updatedAt",
    ];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "name";
    const order = sortOrder === "desc" ? "desc" : "asc";

    // Hitung total data (optional, buat total halaman)
    const total = await prisma.user.count({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { id: { contains: q, mode: "insensitive" } },
                  { name: { contains: q, mode: "insensitive" } },
                  { email: { contains: q, mode: "insensitive" } },
                  { jabatan: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},
          {
            OR: [{ role: "PERANGKAT_DESA" }, { role: "LURAH" }],
          },
          isActive !== undefined ? { isActive: isActive === "true" } : {},
        ],
      },
    });

    const data = await prisma.user.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { id: { contains: q, mode: "insensitive" } },
                  { name: { contains: q, mode: "insensitive" } },
                  { email: { contains: q, mode: "insensitive" } },
                  { jabatan: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},
          {
            OR: [{ role: "PERANGKAT_DESA" }, { role: "LURAH" }],
          },
          isActive !== undefined ? { isActive: isActive === "true" } : {},
        ],
      },
      omit: { role: true },
      orderBy: { [sortField]: order },
      skip,
      take,
    });

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
        sortBy: sortField,
        sortOrder: order,
      },
    };
  },

  getAll: async () => {
    return prisma.user.findMany({
      omit: { role: true },
      orderBy: { name: "asc" },
    });
  },

  getById: async (userId: string) => {
    return prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  },

  update: async (data: any, userId: string) => {
    const { email, image, ...safeData } = data;

    // ✅ Ambil user lama untuk cek image lama
    const oldUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, image: true },
    });

    // ✅ Jika ada perubahan email, reset emailVerified
    if (email && email !== oldUser?.email) {
      safeData.emailVerified = false;
    }

    // ✅ Handle image deletion
    if (image === null && oldUser?.image) {
      // Hapus image lama dari Cloudinary
      try {
        // Extract public_id dari URL Cloudinary
        const publicIdMatch = oldUser.image.match(/\/([^\/]+)\.[^\/]+$/);
        if (publicIdMatch) {
          const publicId = `perangkat-profiles/${publicIdMatch[1]}`;
          await deleteFromCloudinary(publicId);
        }
      } catch (error) {
        console.error("Failed to delete old image from Cloudinary:", error);
        // Lanjutkan meskipun gagal delete, jangan block update
      }
    }

    return prisma.user.update({
      where: { id: userId },
      data: {
        ...safeData,
        image: image, // Bisa null (hapus) atau string (update)
      },
    });
  },

  deleteById: async (userId: string) => {
    return prisma.user.delete({
      where: {
        id: userId,
      },
      omit: { role: true },
    });
  },
};

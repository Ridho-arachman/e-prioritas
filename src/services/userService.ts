import { Prisma } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

interface GetAllPerangkatParams {
  q?: string;
  isActive?: string;
  page?: number; // halaman saat ini
  perPage?: number; // jumlah item per halaman
}
type updateDataSchema = Prisma.UserUpdateInput;

export const userService = {
  create: async (data: {
    email: string;
    name: string;
    password: string;
    jabatan: string;
    phoneNumber: string;
    rememberMe?: boolean;
    role?: string;
  }) => {
    return auth.api.signUpEmail({
      body: data,
    });
  },

  getAllPerangkat: async ({
    q,
    isActive,
    page = 1,
    perPage = 10,
  }: GetAllPerangkatParams) => {
    const skip = (page - 1) * perPage;
    const take = perPage;

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
          { role: "PERANGKAT_DESA" },
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
          { role: "PERANGKAT_DESA" },
          isActive !== undefined ? { isActive: isActive === "true" } : {},
        ],
      },
      omit: { role: true },
      orderBy: { name: "asc" },
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

  update: async (data: any) => {
    const { email, ...body } = data;

    const userUpdate = auth.api.updateUser({
      body,
      headers: await headers(),
    });
    const emailUpdate = auth.api.changeEmail({
      body: {
        newEmail: email,
      },
      headers: await headers(),
    });
    const res = { ...userUpdate, ...emailUpdate };

    return res;
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

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type createDataSchema = Prisma.UserCreateInput;
type updateDataSchema = Prisma.UserUpdateInput;

export const userService = {
  create: async (data: createDataSchema) => {
    return prisma.user.create({
      data,
      omit: { role: true, password: true },
    });
  },

  getAllPerangkat: async (q?: string, isActive?: string) => {
    return prisma.user.findMany({
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
      omit: { role: true, password: true },
      orderBy: { createdAt: "desc" },
    });
  },

  getAll: async () => {
    return prisma.user.findMany({
      omit: { role: true, password: true },
      orderBy: { name: "asc" },
    });
  },

  getById: async (userId: string) => {
    return prisma.user.findUniqueOrThrow({
      where: { id: userId },
      omit: { role: true, password: true },
    });
  },

  update: async (id: string, data: updateDataSchema) => {
    return prisma.user.update({
      where: { id },
      data,
      omit: { role: true, password: true },
    });
  },

  deleteById: async (userId: string) => {
    return prisma.user.delete({
      where: {
        id: userId,
      },
      omit: { role: true, password: true },
    });
  },
};

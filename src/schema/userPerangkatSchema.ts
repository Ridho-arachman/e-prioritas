import { Role } from "@/app/generated/prisma";
import { z } from "zod";

export const createUserPerangkatSchema = z
  .object({
    name: z
      .string("Nama wajib diisi")
      .trim()
      .min(3, "Nama minimal 3 karakter")
      .max(100, "Nama maksimal 100 karakter"),
    email: z
      .string("Email wajib diisi")
      .trim()
      .email("Format email tidak valid"),
    password: z
      .string("Password wajib diisi")
      .trim()
      .min(8, "Password minimal 8 karakter")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[0-9]/, "Password harus mengandung angka")
      .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),
    confirmPassword: z.string("Confirm Password wajib diisi").trim(),
    jabatan: z.string().trim().min(1, "Jabatan tidak boleh kosong"),
    isActive: z.boolean(),
    role: z.enum(Role),
    phoneNumber: z
      .string()
      .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Nomor HP tidak valid"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
  });

export const updateUserPerangkatSchema = z.object({
  name: z
    .string("Nama wajib diisi")
    .trim()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string("Email wajib diisi").trim().email("Format email tidak valid"),
  jabatan: z.string().min(1, "Jabatan tidak boleh kosong").trim(),
  isActive: z.boolean(),
  role: z.enum(Role),
  phoneNumber: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Nomor HP tidak valid"),
});

export const deleteUserPerangkatSchema = z.object({
  id: z.string("ID user wajib diisi"),
});

export const detailUserPerangkatSchema = z.object({
  id: z.string("ID user wajib diisi"),
});

export const queryUserPerangkatSchema = z.object({
  q: z.string().optional(),
  isActive: z.string().optional(), // string karena dari query param
});

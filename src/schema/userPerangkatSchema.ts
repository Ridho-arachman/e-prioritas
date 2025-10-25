import { z } from "zod";

// =============================
// CREATE SCHEMA
// =============================
export const createUserSchema = z.object({
  name: z
    .string("Nama wajib diisi")
    .trim()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string("Email wajib diisi").trim().email("Format email tidak valid"),
  password: z
    .string()
    .trim()
    .min(8, "Password minimal 8 karakter")
    .regex(/[a-z]/, "Password harus mengandung huruf kecil")
    .regex(/[A-Z]/, "Password harus mengandung huruf besar")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),
  jabatan: z.string().min(1, "Jabatan tidak boleh kosong").trim(),
  isActive: z.boolean().default(true),
});

// =============================
// UPDATE SCHEMA
// =============================
// Untuk update, semua field opsional kecuali id
export const updateUserSchema = z.object({
  id: z.string("ID user wajib diisi").cuid("ID user tidak valid"),
  name: z
    .string("Nama wajib diisi")
    .trim()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string("Email wajib diisi").trim().email("Format email tidak valid"),
  password: z
    .string()
    .trim()
    .min(8, "Password minimal 8 karakter")
    .regex(/[a-z]/, "Password harus mengandung huruf kecil")
    .regex(/[A-Z]/, "Password harus mengandung huruf besar")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),
  jabatan: z.string().min(1, "Jabatan tidak boleh kosong").trim(),
  isActive: z.boolean().default(true),
});

// =============================
// DELETE SCHEMA
// =============================
export const deleteUserSchema = z.object({
  id: z.string("ID user wajib diisi").cuid("ID user tidak valid"),
});

// =============================
// GET / DETAIL SCHEMA
// =============================
export const detailUserSchema = z.object({
  id: z.string("ID user wajib diisi").cuid("ID user tidak valid"),
});

// =============================
// GET / QUERY SCHEMA
// =============================
export const queryUserSchema = z.object({
  q: z.string().optional(),
  isActive: z.string().optional(), // string karena dari query param
});

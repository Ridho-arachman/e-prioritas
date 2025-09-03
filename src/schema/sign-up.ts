import z from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name tidak boleh kosong")
    .trim()
    .min(1, "Name tidak boleh hanya spasi"),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .trim()
    .email("Format email tidak valid"),
  password: z
    .string()
    .trim()
    .min(8, "Password minimal 8 karakter")
    .regex(/[a-z]/, "Password harus mengandung huruf kecil")
    .regex(/[A-Z]/, "Password harus mengandung huruf besar")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),
});

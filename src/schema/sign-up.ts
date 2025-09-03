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
    .min(1, "Password tidak boleh kosong")
    .trim()
    .min(6, "Password minimal 6 karakter"),
});

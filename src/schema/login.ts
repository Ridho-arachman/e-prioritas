import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid"),
  password: z
    .string()
    .trim()
    .min(8, "Password minimal 8 karakter")
    .regex(/[a-z]/, "Password harus mengandung huruf kecil")
    .regex(/[A-Z]/, "Password harus mengandung huruf besar")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),
  rememberMe: z.boolean("Remember me harus berupa boolean").optional(),
  turnstileToken: z.string().min(1, "Captcha wajib diisi"),
});

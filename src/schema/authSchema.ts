import z from "zod";

export const EmailSchema = z.object({
  email: z.string().email(),
});

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .trim()
      .nonempty("Password wajib diisi")
      .min(8, "Password minimal 8 karakter")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[0-9]/, "Password harus mengandung angka")
      .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),

    confirmPassword: z
      .string()
      .trim()
      .nonempty("Password wajib diisi")
      .min(8, "Password minimal 8 karakter")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[0-9]/, "Password harus mengandung angka")
      .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
  });

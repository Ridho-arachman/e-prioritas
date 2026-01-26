// lib/handleBetterAuthError.ts
interface BetterAuthErrorResponse {
  status: number;
  message: string;
}

export function handleBetterAuthError(
  error: unknown,
): BetterAuthErrorResponse | null {
  // Better Auth melempar object dengan statusCode & body
  const err = error as { statusCode?: number; body?: { message?: string } };

  if (!err.statusCode) return null;

  switch (err.statusCode) {
    case 422:
      const message = err.body?.message ?? "";

      if (message.includes("User already exists")) {
        return {
          status: 422,
          message: "Email sudah terdaftar, gunakan email lain",
        };
      }

      if (message.includes("Invalid email")) {
        return {
          status: 422,
          message: "Format email tidak valid",
        };
      }

      if (message.includes("Failed to create user")) {
        return {
          status: 422,
          message: "Gagal Membuat User",
        };
      }

      if (message.includes("Password")) {
        return {
          status: 422,
          message: "Password tidak memenuhi ketentuan",
        };
      }

      return {
        status: 422,
        message: message || "Validasi gagal",
      };

    case 401:
      return {
        status: 401,
        message: "Unauthorized / email atau password salah",
      };

    case 403:
      return {
        status: 403,
        message:
          "Email belum diverifikasi. Silakan cek inbox untuk email verifikasi.",
      };

    case 400:
      return { status: 400, message: err.body?.message || "Bad Request" };

    case 500:
      return {
        status: 500,
        message: err.body?.message || "Internal Server Error",
      };

    default:
      return {
        status: err.statusCode,
        message: err.body?.message || "Unknown error",
      };
  }
}

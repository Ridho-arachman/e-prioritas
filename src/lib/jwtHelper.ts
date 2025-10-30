import * as jose from "jose";

export type JwtUser = {
  id: string;
  email: string;
  role?: string;
};

// Pastikan env sudah ada
const ACCESS_SECRET = new TextEncoder().encode(
  process.env.ACCESS_SECRET || "fallback-access-secret"
);

const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_SECRET || "fallback-refresh-secret"
);

const VERIFY_SECRET = new TextEncoder().encode(
  process.env.VERIFY_SECRET || "fallback-refresh-secret"
);
/**
 * Generate Access Token (durasi pendek, misal 15 menit)
 */
export const generateAccessToken = async (user: JwtUser) => {
  return await new jose.SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(ACCESS_SECRET);
};

/**
 * Generate Refresh Token (durasi panjang, misal 7 hari)
 */
export const generateRefreshToken = async (user: JwtUser) => {
  return await new jose.SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(REFRESH_SECRET);
};

export const generateVerifyToken = async (user: JwtUser) => {
  return await new jose.SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(VERIFY_SECRET);
};

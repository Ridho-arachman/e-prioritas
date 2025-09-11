import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export type JwtUser = {
  id: string;
  email: string;
  role?: string;
};

export const generateAccessToken = (user: JwtUser) => {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: JwtUser) => {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

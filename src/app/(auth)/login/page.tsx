import { LoginForm } from "@/components/sections/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Masuk ke sistem prioritas pembangunan berbasis AI di Kelurahan Panggungjati.",
  openGraph: {
    title: "Login Sistem Prioritas Pembangunan",
    description:
      "Masuk ke sistem prioritas pembangunan berbasis AI di Kelurahan Panggungjati.",
    images: ["/og-login.jpg"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}

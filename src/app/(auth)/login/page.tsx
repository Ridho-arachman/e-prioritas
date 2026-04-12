import { LoginForm } from "@/components/sections/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}

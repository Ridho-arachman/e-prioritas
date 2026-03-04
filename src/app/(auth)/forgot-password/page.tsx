import ForgotPasswordComponent from "@/components/sections/auth/ForgotPasswordComponent";
import { SuspenseFallback } from "@/components/ui/suspense-fallback";
import type { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <SuspenseFallback>Loading reset password token...</SuspenseFallback>
      }
    >
      <ForgotPasswordComponent />
    </Suspense>
  );
}

import ResetPasswordComponent from "@/components/sections/auth/ResetPasswordComponent";
import { SuspenseFallback } from "@/components/ui/suspense-fallback";
import type { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
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
      <ResetPasswordComponent />
    </Suspense>
  );
}

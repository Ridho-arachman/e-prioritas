import ResetPasswordComponent from "@/components/sections/auth/ResetPasswordComponent";
import { SuspenseFallback } from "@/components/ui/suspense-fallback";

import { Suspense } from "react";

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

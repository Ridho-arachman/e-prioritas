"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as jose from "jose";

interface RoleGuardWrapperProps {
  children: ReactNode;
  allowedRoles: string[];
}

/**
 * RoleGuardWrapper
 * - Memastikan user hanya mengakses halaman sesuai role.
 * - Hanya melakukan redirect jika role/token tidak valid.
 * - Tidak menampilkan loading spinner → navigasi mulus.
 */
export default function RoleGuardWrapper({
  children,
  allowedRoles,
}: RoleGuardWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      // Decode payload JWT tanpa verifikasi signature
      const payload = jose.decodeJwt(token) as { role: string };

      if (!allowedRoles.includes(payload.role)) {
        // Redirect berdasarkan role
        if (payload.role === "ADMIN") router.replace("/admin");
        else if (payload.role === "PERANGKAT_DESA")
          router.replace("/perangkat");
        else router.replace("/login");
      }
    } catch (err) {
      // Token invalid → redirect ke login
      router.replace("/login");
    }
  }, [allowedRoles, router]);

  // Render children langsung → tidak ada flash loading
  return <>{children}</>;
}

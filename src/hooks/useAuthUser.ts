"use client";

import { useEffect, useState } from "react";
import { decodeJwt } from "jose";

export function useAuthUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("accessToken="))
        ?.split("=")[1];

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const payload = decodeJwt(token);

      setUser({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    } catch (error) {
      console.error("Invalid JWT", error);
      setUser(null);
    }

    setLoading(false);
  }, []);

  return { user, loading };
}

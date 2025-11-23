"use client";

import { useEffect, useState } from "react";
import { SWRConfig, Cache } from "swr";

function createLocalStorageCache(): Cache<any> {
  const json =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("app-cache")
      : null;

  const map = new Map<string, any>(json ? JSON.parse(json) : []);

  window.addEventListener("beforeunload", () => {
    const data = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", data);
  });

  return map as Cache<any>;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<Cache<any> | null>(null);

  // Hanya jalan di client
  useEffect(() => {
    setCache(createLocalStorageCache());
  }, []);

  if (!cache) return <>{children}</>;

  return (
    <SWRConfig
      value={{
        provider: () => cache,
        // 🟢 NONAKTIFKAN SEMUA REVALIDASI
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        dedupingInterval: Infinity,
      }}
    >
      {children}
    </SWRConfig>
  );
}

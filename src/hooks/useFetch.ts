"use client";

import useSWR from "swr";
import { api } from "@/lib/axios";
import { useMemo } from "react";

export const useFetch = (url: string, config: any = {}, swrConfig?: any) => {
  // FIX: key harus stabil agar SWR tidak anggap fetch baru
  const key = useMemo(() => {
    return [
      url,
      JSON.stringify(config.params ?? {}),
      JSON.stringify(config.headers ?? {}),
    ];
  }, [url, config.params, config.headers]);

  const fetcher = async () => {
    const res = await api.get(url, config);
    return res.data;
  };

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: Infinity,
    ...swrConfig,
  });

  return { data, error, isLoading, refresh: mutate };
};

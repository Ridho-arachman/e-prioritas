"use client";

import useSWR from "swr";
import { api } from "@/lib/axios";

export const useFetch = (url: string, config: any = {}, swrConfig?: any) => {
  const key = [
    url,
    JSON.stringify(config.params ?? {}),
    JSON.stringify(config.headers ?? {}),
  ];

  const fetcher = async () => {
    const res = await api.get(url, config);
    return res.data;
  };

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    // TIDAK PERNAH AUTO FETCH ULANG
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: Infinity,
    ...swrConfig,
  });

  return { data, error, isLoading, refresh: mutate };
};

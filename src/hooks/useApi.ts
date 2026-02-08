/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useSWR from "swr";

import { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { api } from "@/lib/api";
import { AxiosRequestConfig } from "axios";

export function useGet(url: string) {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data: data?.data,
    meta: data?.meta,
    message: data?.message,
    success: data?.success,
    isLoading,
    error,
    mutate,
  };
}

export function usePost<T = any>(url: string) {
  const [loading, setLoading] = useState(false);

  async function post(body: any, config?: AxiosRequestConfig): Promise<T> {
    setLoading(true);
    try {
      const res = await api.post(url, body, config);
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  return { post, loading };
}

export function usePut<T = any>(url: string) {
  const [loading, setLoading] = useState(false);

  async function put(body: any): Promise<T> {
    setLoading(true);
    try {
      const res = await api.put(url, body);
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  return { put, loading };
}

export function usePatch<T = any>(url: string) {
  const [loading, setLoading] = useState(false);

  async function patch(body: any, config?: AxiosRequestConfig): Promise<T> {
    setLoading(true);
    try {
      const res = await api.patch(url, body, config);
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  return { patch, loading };
}

export function useDelete<T = any>() {
  const [loading, setLoading] = useState(false);

  async function del(url: string): Promise<T> {
    setLoading(true);
    try {
      const res = await api.delete(url);
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  return { del, loading };
}

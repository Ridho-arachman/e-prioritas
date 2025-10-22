// lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import Router from "next/router"; // Tambahkan import Router dari next/router

// ----------------------------------------------------
// 1. DEFINISI INSTANCE AXIOS
// ----------------------------------------------------
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🛑 KOREKSI 1: WAJIB ditambahkan
});

const BASE_URL = api.defaults.baseURL; // Ambil base URL untuk hit refresh token

// ----------------------------------------------------
// 2. FUNGSI LOGOUT (signOut)
// ----------------------------------------------------
// Pindahkan atau definisikan fungsi signOut di sini atau impor dari file terpisah
export const signOut = async () => {
  try {
    await api.delete("/auth/logout");
  } catch (error) {
    console.error(
      "Logout API call failed, proceeding with client cleanup:",
      error
    );
  } finally {
    Cookies.remove("accessToken");
    Router.push("/login");
  }
};

// ----------------------------------------------------
// 3. LOGIKA ANTRIAN
// ----------------------------------------------------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // Resolve dengan token baru (kita pakai 'refreshed' saja karena token dari cookie)
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// ----------------------------------------------------
// 4. REQUEST INTERCEPTOR
// ----------------------------------------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ----------------------------------------------------
// 5. RESPONSE INTERCEPTOR (REFRESH LOGIC)
// ----------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 1. Tangani antrian request jika sedang refreshing
      if (isRefreshing) {
        return new Promise<void>(function (resolve, reject) {
          failedQueue.push({ resolve: () => resolve(undefined), reject });
        })
          .then(() => {
            // Ulangi request asli menggunakan instance 'api'
            return api(originalRequest); // 🛑 KOREKSI 3: Ganti axiosInstance menjadi api
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // 2. KUNCI: PANGGIL POST KOSONG ke endpoint refresh
        // Refresh Token akan otomatis terkirim melalui HttpOnly Cookie (karena withCredentials: true)
        await axios.post(`${BASE_URL}/auth/refresh`);

        // 3. Backend berhasil mengatur Access/Refresh Token BARU ke Cookie.
        processQueue(null, "refreshed");

        // Ulangi request asli.
        return api(originalRequest); // 🛑 KOREKSI 4: Ganti axiosInstance menjadi api
      } catch (refreshError) {
        // Jika Refresh Token gagal, panggil signOut
        processQueue(refreshError as AxiosError, null);
        await signOut();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

import { loginSchema } from "@/schema/login";
import { createUserSchema } from "@/schema/sign-up";
import { createDocument } from "zod-openapi";
import * as z from "zod/v4";

export const openApiDocument = createDocument({
  openapi: "3.0.0",
  info: {
    title: "API E-Prioritas",
    version: "1.0.0",
    contact: {
      name: "E-Prioritas",
      email: "ridho.arachman55@gmail.com",
      url: "http://localhost:3000/",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    description: "API E-Prioritas",
    termsOfService: "http://localhost:3000/",
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Authentication & Authorization"],
        description: "Api untuk register prangkat desa",
        summary: "Membuat user perangkat desa baru",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: createUserSchema.meta({
                title: "RegisterRequest",
              }),
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: createUserSchema.meta({ description: "User data" }),
                status: 201,
              },
            },
          },
          400: {
            description:
              "Validation user schema failed or email already exists",
            content: {
              "application/json": {
                example: [
                  {
                    success: false,
                    errors: [
                      {
                        field: "email",
                        message: "Format email tidak valid",
                      },
                      {
                        field: "password",
                        message: "Password harus mengandung huruf kecil",
                      },
                      {
                        field: "password",
                        message: "Password harus mengandung huruf besar",
                      },
                      {
                        field: "password",
                        message: "Password harus mengandung angka",
                      },
                    ],
                  },
                  { success: false, error: "Email sudah terdaftar" },
                ],
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "Terjadi Error Pada Server",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication & Authorization"],
        summary: "Login user perangkat desa & admin",
        description: "Api untuk prangkat desa & admin agar bisa login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: loginSchema,
            },
          },
        },
        responses: {
          200: {
            description: "User login successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Login Berhasil",
                },
              },
            },
          },
          400: {
            description: "Validation user schema failed",
            content: {
              "application/json": {
                example: {
                  success: false,
                  errors: [
                    {
                      field: "email",
                      message: "Format email tidak valid",
                    },
                    {
                      field: "password",
                      message: "Password harus mengandung huruf kecil",
                    },
                    {
                      field: "password",
                      message: "Password harus mengandung huruf besar",
                    },
                    {
                      field: "password",
                      message: "Password harus mengandung angka",
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: "User not found or invalid password",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message:
                    "User tidak ditemukan || Password Atau Email Yang Anda Masukkan Salah",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "Terjadi Error Pada Server",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/refresh": {
      post: {
        tags: ["Authentication & Authorization"],
        summary: "Refresh access token",
        description: "Api untuk mendapatkan access token baru",
        requestParams: {
          cookie: z.object({
            refreshToken: z.string().jwt("refreshToken"),
          }),
        },
        responses: {
          200: {
            description: "Access token refreshed successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Access token refreshed successfully",
                },
                status: 200,
              },
            },
          },
          401: {
            description: "Invalid or missing refresh token",
            content: {
              "application/json": {
                example: { success: false, message: "User belum login" },
                status: 401,
              },
            },
          },
          403: {
            description: "Forbidden access due to invalid token",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "User tidak mempunyai akses",
                },
                status: 403,
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "Terjadi Error Pada Server",
                },
                status: 500,
              },
            },
          },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Authentication & Authorization"],
        description: "Api untuk register prangkat desa",
        summary: "Membuat user perangkat desa baru",
        requestParams: {
          cookie: z.object({
            accessToken: z.string().jwt("accessToken"),
            refreshToken: z.string().jwt("refreshToken"),
          }),
        },
        responses: {
          200: {
            content: {
              "application/json": {
                example: {
                  succes: true,
                  message: "Logout Berhasil",
                },
              },
            },
          },
          401: {
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "User belum login",
                },
              },
            },
          },
          500: {
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "Terjadi Error Pada Server",
                },
              },
            },
          },
        },
      },
    },
    "/api/kelola-masukan-warga": {
      get: {
        tags: ["Masukan Warga"],
        summary: "Ambil semua masukan warga",
        description: "Api untuk mendapatkan semua masukan warga",
        requestParams: {
          cookie: z.object({
            accessToken: z.string().jwt("accessToken"),
            refreshToken: z.string().jwt("refreshToken"),
          }),
        },
        responses: {
          200: {
            description: "Masukan warga berhasil diambil",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Masukan warga retrieved successfully",
                  data: [
                    {
                      id: 1,
                      nama: "John Doe",
                      email: "FgD5w@example.com",
                      kategori: "Umum",
                      isi: "Ini adalah masukan dari warga.",
                      tanggalDibuat: "2023-10-01T12:34:56Z",
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Validation user schema failed",
            content: {
              "application/json": {
                example: {
                  success: false,
                  errors: [
                    {
                      field: "email",
                      message: "Format email tidak valid",
                    },
                    {
                      field: "password",
                      message: "Password harus mengandung huruf kecil",
                    },
                    {
                      field: "password",
                      message: "Password harus mengandung huruf besar",
                    },
                    {
                      field: "password",
                      message: "Password harus mengandung angka",
                    },
                  ],
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "Terjadi Error Pada Server",
                },
                status: 500,
              },
            },
          },
        },
      },
    },
  },
});

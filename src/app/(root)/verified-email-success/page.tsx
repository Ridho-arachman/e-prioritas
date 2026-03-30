"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { connection } from "next/server";

export default async function VerifiedEmailSuccess() {
  await connection();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <AlertCircle className="mx-auto text-yellow-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Halaman Tidak Valid
          </h1>
          <p className="text-gray-600 mb-6">
            Anda hanya dapat mengakses halaman ini setelah memverifikasi email.
          </p>
          <Button asChild>
            <Link href="/login">Kembali ke Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Email Berhasil Diverifikasi 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Akun Anda telah berhasil diverifikasi. Sekarang Anda dapat masuk ke
          sistem.
        </p>
        <Button asChild>
          <Link href="/login">Masuk Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}

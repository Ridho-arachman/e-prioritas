"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function VerifiedSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4">
      <Card className="max-w-md w-full shadow-lg border border-blue-100">
        <CardHeader className="text-center space-y-2">
          <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-2" />
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Verifikasi Berhasil 🎉
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">
            Akun Anda telah berhasil diverifikasi. Sekarang Anda dapat masuk ke
            sistem <b>E-Prioritas</b>.
          </p>

          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Masuk Sekarang
          </Button>

          <p className="text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} Desa Digital – Semua Hak Dilindungi
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

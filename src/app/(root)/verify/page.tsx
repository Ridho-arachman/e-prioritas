// app/verify/page.tsx
"use client";

import { Button } from "@/components/ui/button"; // ✅ import tombol dari shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ untuk navigasi
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Memverifikasi...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Link tidak lengkap.");
      return;
    }

    fetch(`/api/verify-warga?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Gagal memverifikasi.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Terjadi kesalahan jaringan.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6 pb-6 flex flex-col items-center text-center gap-4">
          {status === "loading" && (
            <>
              <Spinner className="h-8 w-8" />
              <p className="text-muted-foreground">Memproses verifikasi...</p>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="h-14 w-14 text-green-500" />
              <h2 className="text-xl font-bold text-green-700">
                Verifikasi Berhasil!
              </h2>
              <p className="text-muted-foreground">{message}</p>
              {/* ✅ Tombol Kembali */}
              <Button
                onClick={() => router.push("/masukan")}
                variant="outline"
                className="mt-2"
              >
                Kembali ke Beranda
              </Button>
            </>
          )}
          {status === "error" && (
            <>
              <XCircle className="h-14 w-14 text-red-500" />
              <h2 className="text-xl font-bold text-red-700">
                Gagal Verifikasi
              </h2>
              <p className="text-muted-foreground">{message}</p>
              {/* ✅ Tombol Kembali */}
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="mt-2"
              >
                Kembali ke Beranda
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

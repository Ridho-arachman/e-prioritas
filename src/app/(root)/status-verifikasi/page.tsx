// app/status-verifikasi/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { notifier } from "@/lib/ToastNotifier";
import { CheckCircle, Loader2, Send, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StatusVerifikasiPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [wargaId, setWargaId] = useState<string | null>(null);

  // Ambil draft dari localStorage
  useEffect(() => {
    const draftStr = localStorage.getItem("masukan_draft");
    if (draftStr) {
      try {
        const parsed = JSON.parse(draftStr);
        setDraft(parsed);
      } catch (e) {}
    }
  }, []);

  // Cek status verifikasi warga berdasarkan noHp di draft
  useEffect(() => {
    if (!draft?.noHp) {
      setChecking(false);
      return;
    }

    const checkVerification = async () => {
      try {
        // Panggil API untuk mencari warga berdasarkan noHp
        const res = await fetch("/api/warga/check-or-create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            noHp: draft.noHp,
            nama: draft.nama,
            alamat: draft.alamat || "",
          }),
        });
        const data = await res.json();
        if (data.success) {
          setWargaId(data.wargaId);
          setIsVerified(data.statusNoHp === "TERVERIFIKASI");
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error(error);
        setIsVerified(false);
      } finally {
        setChecking(false);
      }
    };

    checkVerification();
  }, [draft]);

  const handleKirimSekarang = async () => {
    if (!draft || !wargaId) {
      notifier.error("Gagal", "Data tidak lengkap. Silakan isi ulang form.");
      router.push("/");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("wargaId", wargaId);
      formData.append("judul", draft.judul);
      formData.append("deskripsi", draft.deskripsi);
      formData.append("lokasi", draft.lokasi);
      formData.append("domainIsuId", draft.domainIsuId);

      // Gambar: tidak disimpan di localStorage, jadi perlu upload ulang.
      // Tampilkan peringatan jika ada gambar
      if (draft.imagePreview) {
        notifier.warning(
          "Perhatian",
          "Gambar tidak tersimpan di draft. Silakan upload ulang gambar jika perlu.",
        );
      }

      const submitRes = await fetch("/api/masukan-warga", {
        method: "POST",
        body: formData,
      });
      const submitResult = await submitRes.json();
      if (!submitRes.ok)
        throw new Error(submitResult.message || "Gagal menyimpan masukan");

      notifier.success("Berhasil", "Masukan Anda telah dikirim");
      localStorage.removeItem("masukan_draft");
      router.push("/");
    } catch (err: any) {
      notifier.error("Gagal", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center py-10 gap-4">
            <Spinner className="h-8 w-8" />
            <p>Memeriksa status verifikasi...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Status Verifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!draft ? (
            <div className="text-center space-y-4">
              <XCircle className="h-14 w-14 text-red-500 mx-auto" />
              <p className="text-gray-600">
                Tidak ada data draft. Silakan isi form kembali.
              </p>
              <Button onClick={() => router.push("/")} className="w-full">
                Kembali ke Beranda
              </Button>
            </div>
          ) : isVerified ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto" />
              <p className="font-semibold text-green-700">
                Nomor HP telah terverifikasi!
              </p>
              <p className="text-gray-600">
                Anda dapat mengirimkan masukan yang telah Anda buat.
              </p>
              <div className="bg-gray-50 p-3 rounded text-left text-sm">
                <p className="font-medium">Ringkasan masukan:</p>
                <p>
                  <strong>Judul:</strong> {draft.judul}
                </p>
                <p>
                  <strong>Lokasi:</strong> {draft.lokasi}
                </p>
                <p>
                  <strong>Deskripsi:</strong>{" "}
                  {draft.deskripsi.substring(0, 100)}...
                </p>
              </div>
              <Button
                onClick={handleKirimSekarang}
                disabled={isSubmitting}
                className="w-full gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isSubmitting ? "Mengirim..." : "Kirim Masukan Sekarang"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <XCircle className="h-14 w-14 text-amber-500 mx-auto" />
              <p className="font-semibold text-amber-700">
                Nomor HP belum diverifikasi
              </p>
              <p className="text-gray-600">
                Kami telah mengirim link verifikasi ke WhatsApp Anda. Silakan
                klik link tersebut untuk verifikasi.
              </p>
              <p className="text-sm text-gray-500">
                Setelah verifikasi, kembali ke halaman ini dan klik tombol di
                bawah.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Cek status ulang
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

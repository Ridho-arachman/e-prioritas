// components/sections/warga/WargaDetail.tsx
"use client";

import { StatusNoHPWarga } from "@/app/generated/prisma";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDelete, useGet } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import {
  ArrowLeft,
  BadgeCheck,
  Edit,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Trash,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface WargaDetailProps {
  id: string;
  role?: "admin" | "lurah" | "perangkat";
}

export function WargaDetail({ id, role = "admin" }: WargaDetailProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false); // State loading tombol verifikasi
  const { data, isLoading, error } = useGet(`/protected/warga/${id}`);
  const { del: deleteWarga, loading: deleteLoading } = useDelete();

  const handleDelete = async () => {
    try {
      await deleteWarga(`/protected/warga/${id}`);
      notifier.success("Berhasil", "Warga berhasil dihapus");
      router.push(`/${role}/kelola-warga`);
    } catch (error: any) {
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan",
      );
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleSendVerifyLink = async () => {
    if (!data) return;
    setIsSendingLink(true);

    try {
      const res = await fetch("/api/warga/verification-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wargaId: data.id }),
      });

      if (!res.ok) throw new Error("Gagal membuat link");

      const { waLink } = await res.json();
      window.open(waLink, "_blank", "noopener,noreferrer");
      notifier.success("Berhasil", "Link verifikasi dikirim ke WhatsApp");
    } catch (error) {
      notifier.error("Gagal", "Tidak dapat mengirim link verifikasi");
    } finally {
      setIsSendingLink(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  if (error)
    return <div className="text-center text-red-500">Gagal memuat data</div>;
  if (!data) return null;

  const isVerified = data.statusNoHp === StatusNoHPWarga.TERVERIFIKASI;

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus warga?</AlertDialogTitle>
            <AlertDialogDescription>
              Data warga akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? <Spinner className="mr-2 h-4 w-4" /> : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Detail Warga</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/${role}/kelola-warga/${data.id}/edit`)
                }
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash className="h-4 w-4 mr-2" /> Hapus
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{data.nama}</h2>
            <Badge
              className={
                isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {isVerified ? (
                <BadgeCheck className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              {isVerified ? "Terverifikasi" : "Belum Terverifikasi"}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-slate-400" />
              <span className="font-medium">Nomor HP:</span> {data.noHp}
            </div>

            {/* Tombol Kirim Link Verifikasi - hanya jika belum terverifikasi */}
            {!isVerified && (
              <div className="flex items-center gap-3 pl-8">
                <Button
                  size="sm"
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleSendVerifyLink}
                  disabled={isSendingLink}
                >
                  {isSendingLink ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <MessageCircle className="h-4 w-4 mr-2" />
                  )}
                  {isSendingLink ? "Membuat Link..." : "Kirim Link Verifikasi"}
                </Button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-400" />
              <span className="font-medium">Alamat:</span> {data.alamat || "-"}
            </div>
          </div>

          <div className="border-t pt-4 text-sm text-slate-500">
            <p>Dibuat: {new Date(data.createdAt).toLocaleString()}</p>
            <p>Terakhir update: {new Date(data.updatedAt).toLocaleString()}</p>
          </div>

          {data.masukan && data.masukan.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">
                Riwayat Masukan (5 terbaru)
              </h3>
              <ul className="space-y-1">
                {data.masukan.map((m: any) => (
                  <li key={m.id} className="text-sm">
                    {m.judul} - Status: {m.status} -{" "}
                    {new Date(m.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

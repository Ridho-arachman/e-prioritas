"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  CheckCheck,
  Loader2,
} from "lucide-react";

import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../ui/skeleton";
import { useGet, usePost } from "@/hooks/useApi";
import { StatusMasukan } from "@/app/generated/prisma";
import { cn } from "@/lib/utils";
import { notifier } from "@/lib/ToastNotifier";

export default function CardDetailMasukanWarga() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<StatusMasukan | null>(
    null,
  );
  const [alasan, setAlasan] = useState("");

  const {
    data: masukan,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/masukan/${id}`);
  const { post, loading: updating } = usePost(`/protected/masukan/${id}`);

  // mapping status → warna badge dengan desain lebih modern
  const statusConfig: Record<
    StatusMasukan,
    { color: string; icon: React.ReactNode; label: string }
  > = {
    MENUNGGU: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Clock className="w-3 h-3 mr-1" />,
      label: "Menunggu",
    },
    DIVERIFIKASI: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <CheckCircle className="w-3 h-3 mr-1" />,
      label: "Diverifikasi",
    },
    DITOLAK: {
      color: "bg-rose-100 text-rose-800 border-rose-200",
      icon: <XCircle className="w-3 h-3 mr-1" />,
      label: "Ditolak",
    },
    DIPROSES: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Loader2 className="w-3 h-3 mr-1 animate-spin" />,
      label: "Diproses",
    },
    DISELESAIKAN: {
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <CheckCheck className="w-3 h-3 mr-1" />,
      label: "Selesai",
    },
  };

  const statusKey: StatusMasukan =
    (masukan?.status as StatusMasukan) ?? "MENUNGGU";
  const currentStatus = statusConfig[statusKey];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleChangeStatus(newStatus: StatusMasukan) {
    if (newStatus === "DITOLAK") {
      setPendingStatus("DITOLAK");
      setOpenRejectModal(true);
    } else {
      setPendingStatus(newStatus);
      setOpenConfirmModal(true);
    }
  }

  async function handleConfirmChange() {
    if (!pendingStatus || !id) return;

    if (pendingStatus === "DITOLAK" && alasan.trim() === "") {
      toast.error("Alasan penolakan wajib diisi");
      return;
    }

    try {
      await post({
        status: pendingStatus,
        alasanPenolakan:
          pendingStatus === "DITOLAK" ? alasan.trim() : undefined,
      });

      notifier.success(
        "Berhasil",
        `Status berhasil diubah menjadi ${pendingStatus}`,
      );
      mutate();
    } catch (err) {
      console.log(err);
      notifier.error("Gagal", "Gagal memperbarui status masukan");
    } finally {
      setOpenRejectModal(false);
      setOpenConfirmModal(false);
      setAlasan("");
      setPendingStatus(null);
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-52" />
              </div>
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
              <div className="col-span-full space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-36" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !masukan) {
    return (
      <div className="p-4 md:p-6 text-center text-red-600 py-12">
        <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <p className="text-lg">Terjadi kesalahan saat memuat data masukan.</p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header mobile */}
      <div className="flex items-center gap-2 sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Detail Masukan</h1>
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-linear-to-r from-slate-50 to-white border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl text-slate-800">
                Detail Masukan Warga
              </CardTitle>
              <CardDescription className="text-base text-slate-600">
                Informasi lengkap dan status verifikasi
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="hidden sm:flex items-center gap-2 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Header pengirim dengan status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                {masukan.namaPengirim}
                {masukan.nomorHp && (
                  <span className="text-sm font-normal text-slate-500">
                    ({masukan.nomorHp})
                  </span>
                )}
              </h3>
            </div>
            <Badge
              className={cn(
                currentStatus.color,
                "px-3 py-1.5 text-sm font-medium border flex items-center shadow-sm",
              )}
            >
              {currentStatus.icon}
              {currentStatus.label}
            </Badge>
          </div>

          <Separator className="bg-slate-200" />

          {/* Grid informasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem label="Lokasi RT" value={masukan.lokasiRt} />
            <InfoItem label="Lokasi RW" value={masukan.lokasiRw} />
            <InfoItem
              label="Kategori (Domain Isu)"
              value={masukan.domainIsu?.nama ?? "-"}
            />
            <InfoItem
              label="Diverifikasi Oleh"
              value={masukan.diverifikasiOleh?.name ?? "-"}
            />
            <InfoItem
              label="Dibuat Pada"
              value={formatDate(masukan.createdAt)}
            />
            <InfoItem
              label="Diperbarui Pada"
              value={formatDate(masukan.updatedAt)}
            />
            {masukan.nomorHp && (
              <InfoItem label="Nomor HP" value={masukan.nomorHp} />
            )}
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Deskripsi Masukan
            </Label>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap">
              {masukan.deskripsi}
            </div>
          </div>

          {/* Alasan penolakan jika ada */}
          {masukan.alasanPenolakan && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-rose-700">
                Alasan Penolakan
              </Label>
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200 text-rose-700">
                {masukan.alasanPenolakan}
              </div>
            </div>
          )}

          {/* Rekomendasi terkait */}
          {masukan.relasiRapat && masukan.relasiRapat.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                Rekomendasi Terkait
              </Label>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                {masukan.relasiRapat.map((relasi: any) => (
                  <div
                    key={relasi.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-md shadow-sm border border-slate-100"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {relasi.kegiatanRapat.judul}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {formatDate(relasi.kegiatanRapat.tanggal)}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {relasi.kegiatanRapat.statusRekomendasi}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tombol aksi - semua status dapat diubah manual */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
            {masukan.status !== "MENUNGGU" && (
              <Button
                variant="outline"
                onClick={() => handleChangeStatus("MENUNGGU")}
                disabled={updating}
                className="flex items-center gap-2"
              >
                {updating && pendingStatus === "MENUNGGU" ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Kembalikan ke Menunggu
              </Button>
            )}

            {masukan.status !== "DIVERIFIKASI" && (
              <Button
                variant="default"
                onClick={() => handleChangeStatus("DIVERIFIKASI")}
                disabled={updating}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                {updating && pendingStatus === "DIVERIFIKASI" ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                Verifikasi Diterima
              </Button>
            )}

            {masukan.status !== "DITOLAK" && (
              <Button
                variant="destructive"
                onClick={() => handleChangeStatus("DITOLAK")}
                disabled={updating}
                className="flex items-center gap-2"
              >
                {updating && pendingStatus === "DITOLAK" ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                Tolak Masukan
              </Button>
            )}

            {masukan.status !== "DIPROSES" && (
              <Button
                variant="secondary"
                onClick={() => handleChangeStatus("DIPROSES")}
                disabled={updating}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                {updating && pendingStatus === "DIPROSES" ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <Loader2 className="h-4 w-4" />
                )}
                Tandai Diproses
              </Button>
            )}

            {masukan.status !== "DISELESAIKAN" && (
              <Button
                className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => handleChangeStatus("DISELESAIKAN")}
                disabled={updating}
              >
                {updating && pendingStatus === "DISELESAIKAN" ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <CheckCheck className="h-4 w-4" />
                )}
                Tandai Selesai
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal Penolakan */}
      <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-500" />
              Alasan Penolakan
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="alasan" className="text-base">
                Tuliskan alasan penolakan
              </Label>
              <Textarea
                id="alasan"
                placeholder="Alasan penolakan akan terlihat oleh pengirim..."
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-slate-500">
                Alasan wajib diisi jika status ditolak.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setOpenRejectModal(false)}
              disabled={updating}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmChange}
              disabled={updating}
            >
              {updating && <Spinner className="mr-2 h-4 w-4" />}
              Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi */}
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Konfirmasi Perubahan</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-lg">
              Ubah status menjadi{" "}
              <span className="font-semibold text-primary">
                {pendingStatus}
              </span>
              ?
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmModal(false)}
              disabled={updating}
            >
              Batal
            </Button>
            <Button onClick={handleConfirmChange} disabled={updating}>
              {updating && <Spinner className="mr-2 h-4 w-4" />}
              Ya, Ubah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Komponen kecil untuk menampilkan item informasi
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-slate-500 font-medium">{label}</Label>
      <p className="text-sm md:text-base font-medium text-slate-800 wrap-break-words">
        {value}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="border shadow-lg overflow-hidden">
        <CardContent className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 w-full sm:w-auto">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-52" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    );
  }

  if (error || !masukan) {
    return (
      <div className="text-center text-red-600 py-12">
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
    <Card className="border shadow-lg shadow-primary/5 overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4 md:p-6 space-y-6">
        {/* Header pengirim dengan status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <h3 className="text-xl font-semibold text-foreground flex flex-wrap items-center gap-2">
              <span className="wrap-break-words">{masukan.namaPengirim}</span>
              {masukan.nomorHp && (
                <span className="text-sm font-normal text-muted-foreground break-all">
                  ({masukan.nomorHp})
                </span>
              )}
            </h3>
          </div>
          <Badge
            className={cn(
              currentStatus.color,
              "px-3 py-1.5 text-sm font-medium border flex items-center shadow-sm shrink-0",
            )}
          >
            {currentStatus.icon}
            {currentStatus.label}
          </Badge>
        </div>

        <Separator className="bg-border/50" />

        {/* Grid informasi dengan ikon */}
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
          <InfoItem label="Dibuat Pada" value={formatDate(masukan.createdAt)} />
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
          <Label className="text-sm font-medium text-foreground">
            Deskripsi Masukan
          </Label>
          <div className="bg-muted/30 p-4 rounded-lg border border-border/50 text-foreground whitespace-pre-wrap wrap-break-words">
            {masukan.deskripsi}
          </div>
        </div>

        {/* Alasan penolakan jika ada */}
        {masukan.alasanPenolakan && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-destructive">
              Alasan Penolakan
            </Label>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-destructive whitespace-pre-wrap wrap-break-words">
              {masukan.alasanPenolakan}
            </div>
          </div>
        )}

        {/* Rekomendasi terkait */}
        {masukan.relasiRapat && masukan.relasiRapat.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Rekomendasi Terkait
            </Label>
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50 space-y-3">
              {masukan.relasiRapat.map((relasi: any) => (
                <div
                  key={relasi.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-background rounded-md shadow-sm border border-border/50"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground wrap-wrap-break-words">
                      {relasi.kegiatanRapat.judul}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
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

        {/* Tombol aksi */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50 justify-center sm:justify-start">
          {masukan.status !== "MENUNGGU" && (
            <Button
              variant="outline"
              onClick={() => handleChangeStatus("MENUNGGU")}
              disabled={updating}
              className="flex w-full md:w-fit items-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              {updating && pendingStatus === "MENUNGGU" ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
              <span className="whitespace-nowrap">Kembalikan ke Menunggu</span>
            </Button>
          )}

          {masukan.status !== "DIVERIFIKASI" && (
            <Button
              variant="default"
              onClick={() => handleChangeStatus("DIVERIFIKASI")}
              disabled={updating}
              className="flex w-full md:w-fit items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all"
            >
              {updating && pendingStatus === "DIVERIFIKASI" ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <span className="whitespace-nowrap">Verifikasi Diterima</span>
            </Button>
          )}

          {masukan.status !== "DITOLAK" && (
            <Button
              variant="destructive"
              onClick={() => handleChangeStatus("DITOLAK")}
              disabled={updating}
              className="flex w-full md:w-fit items-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              {updating && pendingStatus === "DITOLAK" ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <span className="whitespace-nowrap">Tolak Masukan</span>
            </Button>
          )}

          {masukan.status !== "DIPROSES" && (
            <Button
              variant="secondary"
              onClick={() => handleChangeStatus("DIPROSES")}
              disabled={updating}
              className="flex w-full md:w-fit items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
            >
              {updating && pendingStatus === "DIPROSES" ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <Loader2 className="h-4 w-4" />
              )}
              <span className="whitespace-nowrap">Tandai Diproses</span>
            </Button>
          )}

          {masukan.status !== "DISELESAIKAN" && (
            <Button
              className="flex w-full md:w-fit items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 shadow-sm hover:shadow-md transition-all"
              onClick={() => handleChangeStatus("DISELESAIKAN")}
              disabled={updating}
            >
              {updating && pendingStatus === "DISELESAIKAN" ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <CheckCheck className="h-4 w-4" />
              )}
              <span className="whitespace-nowrap">Tandai Selesai</span>
            </Button>
          )}
        </div>
      </CardContent>

      {/* Modal Penolakan */}
      <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <DialogContent className="sm:max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
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
                className="resize-none focus:ring-2 focus:ring-primary/50 w-full"
              />
              <p className="text-xs text-muted-foreground">
                Alasan wajib diisi jika status ditolak.
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenRejectModal(false)}
              disabled={updating}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmChange}
              disabled={updating}
              className="w-full sm:w-auto"
            >
              {updating && <Spinner className="mr-2 h-4 w-4" />}
              Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi */}
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <DialogContent className="sm:max-w-md w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-xl">Konfirmasi Perubahan</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-lg wrap-wrap-break-words">
              Ubah status menjadi{" "}
              <span className="font-semibold text-primary">
                {pendingStatus}
              </span>
              ?
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmModal(false)}
              disabled={updating}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmChange}
              disabled={updating}
              className="w-full sm:w-auto"
            >
              {updating && <Spinner className="mr-2 h-4 w-4" />}
              Ya, Ubah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// Komponen kecil untuk menampilkan item informasi
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 min-w-0">
      <Label className="text-xs text-muted-foreground font-medium">
        {label}
      </Label>
      <p className="text-sm md:text-base font-medium text-foreground warp-wrap-break-words">
        {value}
      </p>
    </div>
  );
}

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
import { ArrowLeft } from "lucide-react";

import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../ui/skeleton";
import { useGet, usePost } from "@/hooks/useApi";
import { StatusMasukan } from "@/app/generated/prisma";
import { cn } from "@/lib/utils";

export default function CardDetailMasukanWarga() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "MENUNGGU" | "DIVERIFIKASI" | "DITOLAK" | null
  >(null);
  const [alasan, setAlasan] = useState("");

  const {
    data: masukan,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/masukan/${id}`);
  const { post, loading: updating } = usePost(`/protected/masukan/${id}`);

  console.log("masukan:", masukan);

  // mapping status → warna badge
  const statusColorMap: Record<StatusMasukan, string> = {
    MENUNGGU: "bg-yellow-500 text-white",
    DIVERIFIKASI: "bg-green-600 text-white",
    DITOLAK: "bg-red-600 text-white",
  };

  // pastikan status dari API dianggap MasukanStatus
  const statusKey: StatusMasukan =
    (masukan?.status as StatusMasukan) ?? "MENUNGGU";

  const statusColor = statusColorMap[statusKey];

  // Format tanggal Indonesia
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleChangeStatus(newStatus: typeof pendingStatus) {
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

      toast.success(`Status berhasil diubah menjadi ${pendingStatus}`);
      mutate();
    } catch (err) {
      console.log(err);
      toast.error("Gagal memperbarui status masukan");
    } finally {
      setOpenRejectModal(false);
      setOpenConfirmModal(false);
      setAlasan("");
      setPendingStatus(null);
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 md:w-48" />
              <Skeleton className="h-4 w-48 md:w-80" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Header User */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-2 w-full sm:w-auto">
                <Skeleton className="h-5 w-32 md:w-40" />
                <Skeleton className="h-4 w-40 md:w-60" />
              </div>
              <Skeleton className="h-6 w-20 md:w-24" />
            </div>

            <Separator />

            {/* Detail Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 md:w-32" />
                  <Skeleton className="h-4 w-32 md:w-48" />
                </div>
              ))}

              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Skeleton className="h-4 w-32 md:w-40" />
                <Skeleton className="h-16 md:h-20 w-full" />
              </div>

              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Skeleton className="h-4 w-32 md:w-40" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Skeleton className="h-10 w-full sm:w-40" />
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-52" />
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-10 w-20 md:w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !masukan) {
    return (
      <div className="p-4 md:p-6 text-center text-red-600">
        Terjadi kesalahan saat memuat data masukan.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Mobile Back Button - Hanya muncul di mobile */}
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

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-xl md:text-2xl">
              Detail Masukan Warga
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Data lengkap masukan dari warga berikut status verifikasi
            </CardDescription>
          </div>
          {/* Back Button Desktop */}
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="hidden sm:flex cursor-pointer items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Header User dengan Status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto">
              <h3 className="text-base md:text-lg font-semibold wrap-break-word">
                {masukan.namaPengirim}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground wrap-break-word">
                {masukan.emailPengirim}
              </p>
            </div>
            <Badge
              className={cn(
                statusColor,
                "text-xs md:text-sm whitespace-nowrap",
              )}
            >
              {masukan.status}
            </Badge>
          </div>

          <Separator />

          {/* Detail Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-1">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Lokasi RT
              </Label>
              <p className="text-sm md:text-base font-medium wrap-break-word">
                {masukan.lokasiRt}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Lokasi RW
              </Label>
              <p className="text-sm md:text-base font-medium wrap-break-word">
                {masukan.lokasiRw}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Kategori
              </Label>
              <p className="text-sm md:text-base font-medium wrap-break-word">
                {masukan.domainIsu?.nama ?? "-"}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Diverifikasi Oleh
              </Label>
              <p className="text-sm md:text-base font-medium wrap-break-word">
                {masukan.diverifikasiOleh?.name ?? "-"}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Dibuat Pada
              </Label>
              <p className="text-sm md:text-base font-medium wrap-break-word">
                {formatDate(masukan.createdAt)}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Diperbarui Pada
              </Label>
              <p className="text-sm md:text-base font-medium wrap-break-word">
                {formatDate(masukan.updatedAt)}
              </p>
            </div>

            {/* Deskripsi - Full Width */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-2">
              <Label className="text-xs md:text-sm text-muted-foreground">
                Deskripsi Masukan
              </Label>
              <p className="text-sm md:text-base whitespace-pre-wrap wrap-break-word bg-muted/50 p-3 md:p-4 rounded-lg">
                {masukan.deskripsiMasukan}
              </p>
            </div>

            {/* Alasan Penolakan - Jika Ada */}
            {masukan.alasanPenolakan && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-2">
                <Label className="text-xs md:text-sm text-muted-foreground">
                  Alasan Penolakan
                </Label>
                <p className="text-sm md:text-base text-red-600 bg-red-50 p-3 md:p-4 rounded-lg wrap-break-word">
                  {masukan.alasanPenolakan}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {masukan.status !== "DIVERIFIKASI" && (
                <Button
                  className="cursor-pointer w-full sm:w-auto"
                  onClick={() => handleChangeStatus("DIVERIFIKASI")}
                  disabled={updating}
                >
                  {updating && pendingStatus === "DIVERIFIKASI" ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Memproses...
                    </>
                  ) : (
                    "✓ Verifikasi Diterima"
                  )}
                </Button>
              )}

              {masukan.status !== "DITOLAK" && (
                <Button
                  className="cursor-pointer w-full sm:w-auto"
                  variant="destructive"
                  onClick={() => handleChangeStatus("DITOLAK")}
                  disabled={updating}
                >
                  {updating && pendingStatus === "DITOLAK" ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Memproses...
                    </>
                  ) : (
                    "✗ Tolak Masukan"
                  )}
                </Button>
              )}

              {masukan.status !== "MENUNGGU" && (
                <Button
                  className="cursor-pointer w-full sm:w-auto"
                  variant="outline"
                  onClick={() => handleChangeStatus("MENUNGGU")}
                  disabled={updating}
                >
                  {updating && pendingStatus === "MENUNGGU" ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Memproses...
                    </>
                  ) : (
                    "↺ Kembalikan ke Menunggu"
                  )}
                </Button>
              )}
            </div>

            {/* Back Button Mobile - Hanya muncul di mobile (sudah ada di header mobile) */}
            <Button
              className="cursor-pointer w-full sm:hidden"
              variant="outline"
              onClick={() => router.back()}
            >
              Kembali
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Penolakan */}
      <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <DialogContent className="sm:max-w-lg w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">
              Masukkan alasan penolakan
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="alasan" className="text-sm md:text-base">
                Alasan Penolakan
              </Label>
              <Textarea
                id="alasan"
                placeholder="Tuliskan alasan penolakan secara lengkap..."
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                rows={4}
                className="text-sm md:text-base"
              />
              <p className="text-xs text-muted-foreground">
                Alasan penolakan akan terlihat oleh pengirim masukan
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenRejectModal(false)}
              className="w-full sm:w-auto cursor-pointer"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmChange}
              disabled={updating}
              className="w-full sm:w-auto cursor-pointer"
            >
              {updating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Mengirim...
                </>
              ) : (
                "Kirim"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi */}
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <DialogContent className="sm:max-w-md w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">
              Konfirmasi Perubahan Status
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm md:text-base">
              Apakah Anda yakin ingin mengubah status menjadi{" "}
              <span className="font-semibold">{pendingStatus}</span>?
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmModal(false)}
              className="w-full sm:w-auto cursor-pointer"
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmChange}
              disabled={updating}
              className="w-full sm:w-auto cursor-pointer"
            >
              {updating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Menyimpan...
                </>
              ) : (
                "Ya, Ubah"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

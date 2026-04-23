// components/sections/masukan/CardDetailMasukanWarga.tsx
"use client";

import { StatusMasukan } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useGet, usePost } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: masukan,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/masukan/${id}`);
  const { post, loading: updating } = usePost(`/protected/masukan/${id}`);

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

  // Loading state
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

  // Error state
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

  const images = masukan.gambarMasukan || [];
  const warga = masukan.warga; // data warga dari relasi

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Back Button & Title */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="cursor-pointer shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Kembali</h1>
      </div>

      <Card className="border shadow-lg shadow-primary/5 overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6 space-y-6">
          {/* Header pengirim dengan status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {masukan.judul}
              </h2>
              <h3 className="text-xl font-semibold text-foreground flex flex-wrap items-center gap-2">
                <span className="wrap-">
                  {warga?.nama || "Tidak diketahui"}
                </span>
                {warga?.noHp && (
                  <span className="text-sm font-normal text-muted-foreground break-all">
                    ({warga.noHp})
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
            <InfoItem label="Lokasi" value={masukan.lokasi || "-"} />
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
            {warga?.noHp && <InfoItem label="Nomor HP" value={warga.noHp} />}
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Deskripsi Masukan
            </Label>
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50 text-foreground whitespace-pre-wrap wrap-">
              {masukan.deskripsi}
            </div>
          </div>

          {/* Alasan penolakan jika ada */}
          {masukan.alasanPenolakan && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-destructive">
                Alasan Penolakan
              </Label>
              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-destructive whitespace-pre-wrap wrap-">
                {masukan.alasanPenolakan}
              </div>
            </div>
          )}

          {/* Gambar */}
          {images.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Lampiran Gambar (
                {images.length})
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden border border-border bg-muted/20 hover:shadow-md transition-all"
                    onClick={() => {
                      setSelectedImage(img.url);
                      setCurrentImageIndex(idx);
                      setImageModalOpen(true);
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`Gambar ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 150px, 200px"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
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
                <span className="whitespace-nowrap">
                  Kembalikan ke Menunggu
                </span>
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
                {updating && <Spinner className="mr-2 h-4 w-4" />} Kirim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal Konfirmasi */}
        <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
          <DialogContent className="sm:max-w-md w-[95vw]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Konfirmasi Perubahan
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-lg wrap-break-words">
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
                {updating && <Spinner className="mr-2 h-4 w-4" />} Ya, Ubah
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      {/* Modal gambar besar dengan slider */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 bg-transparent border-none shadow-none">
          <div className="sr-only">
            <DialogTitle>Gambar Masukan</DialogTitle>
          </div>
          <div className="relative w-full h-full min-h-75 max-h-[80vh] bg-black/90 rounded-lg overflow-hidden">
            {selectedImage && (
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={`Gambar ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex =
                      (currentImageIndex - 1 + images.length) % images.length;
                    setCurrentImageIndex(newIndex);
                    setSelectedImage(images[newIndex].url);
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = (currentImageIndex + 1) % images.length;
                    setCurrentImageIndex(newIndex);
                    setSelectedImage(images[newIndex].url);
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={() => setImageModalOpen(false)}
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Komponen InfoItem
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 min-w-0">
      <Label className="text-xs text-muted-foreground font-medium">
        {label}
      </Label>
      <p className="text-sm md:text-base font-medium text-foreground wrap-">
        {value}
      </p>
    </div>
  );
}

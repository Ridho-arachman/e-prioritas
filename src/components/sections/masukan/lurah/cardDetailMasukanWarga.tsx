"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  CheckCheck,
  Loader2,
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  User,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../../ui/skeleton";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: masukan,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/masukan/${id}`);

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

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
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
      </div>
    );
  }

  // Error state
  if (error || !masukan) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
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
      </div>
    );
  }

  const images = masukan.gambarMasukan || [];

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

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Header section with linear background */}
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {masukan.judul}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{masukan.namaPengirim}</span>
                  {masukan.nomorHp && (
                    <>
                      <span className="mx-1">•</span>
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{masukan.nomorHp}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge
                className={cn(
                  currentStatus.color,
                  "px-4 py-2 text-sm font-semibold border shadow-sm",
                )}
              >
                {currentStatus.icon}
                {currentStatus.label}
              </Badge>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6 space-y-6">
            {/* Informasi detail dalam grid dengan ikon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <InfoItemWithIcon
                icon={MapPin}
                label="Lokasi RT"
                value={masukan.lokasiRt}
              />
              <InfoItemWithIcon
                icon={MapPin}
                label="Lokasi RW"
                value={masukan.lokasiRw}
              />
              <InfoItemWithIcon
                icon={FileText}
                label="Kategori (Domain Isu)"
                value={masukan.domainIsu?.nama ?? "-"}
              />
              <InfoItemWithIcon
                icon={User}
                label="Diverifikasi Oleh"
                value={masukan.diverifikasiOleh?.name ?? "-"}
              />
              <InfoItemWithIcon
                icon={Calendar}
                label="Dibuat Pada"
                value={formatDate(masukan.createdAt)}
              />
              <InfoItemWithIcon
                icon={Calendar}
                label="Diperbarui Pada"
                value={formatDate(masukan.updatedAt)}
              />
              {masukan.nomorHp && (
                <InfoItemWithIcon
                  icon={Phone}
                  label="Nomor HP"
                  value={masukan.nomorHp}
                />
              )}
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" /> Deskripsi Masukan
              </Label>
              <div className="bg-muted/40 p-4 rounded-xl border border-border/50 text-foreground whitespace-pre-wrap wrap-break-word">
                {masukan.deskripsi}
              </div>
            </div>

            {/* Alasan penolakan (jika ada) */}
            {masukan.alasanPenolakan && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <XCircle className="h-4 w-4" /> Alasan Penolakan
                </Label>
                <div className="bg-destructive/10 p-4 rounded-xl border border-destructive/20 text-destructive whitespace-pre-wrap wrap-break-word">
                  {masukan.alasanPenolakan}
                </div>
              </div>
            )}

            {/* Gambar Masukan */}
            {images.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
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
          </div>
        </CardContent>
      </Card>

      {/* Modal untuk gambar besar dengan slider */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 bg-transparent border-none shadow-none">
          {/* Hidden title for accessibility */}
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

            {/* Tombol navigasi hanya jika lebih dari satu gambar */}
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

            {/* Tombol tutup */}
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

// InfoItem with icon (tidak berubah)
function InfoItemWithIcon({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-medium text-foreground wrap-break-word">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  MapPinIcon,
  ArrowLeftIcon,
  EditIcon,
  UsersIcon,
  StarIcon,
  TargetIcon,
  FileTextIcon,
  ClockIcon,
  UserIcon,
  SparklesIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LightbulbIcon,
  ChevronRightIcon,
  TrashIcon,
  FileDownIcon,
  Loader2Icon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useGet, useDelete } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import DataError from "@/components/blocks/DataError";
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

// ========================
// ENUM (Sesuai Schema)
// ========================

export enum StatusMasukan {
  MENUNGGU = "MENUNGGU",
  DIVERIFIKASI = "DIVERIFIKASI",
  DITOLAK = "DITOLAK",
}

export enum StatusRekomendasi {
  DRAFT = "DRAFT",
  DIAJUKAN = "DIAJUKAN",
  DISETUJUI = "DISETUJUI",
  DITOLAK = "DITOLAK",
}

export enum Role {
  LURAH = "LURAH",
  PERANGKAT_DESA = "PERANGKAT_DESA",
  ADMIN = "ADMIN",
}

// ========================
// TIPE DATA (Sesuai Backend Response)
// ========================

export interface DomainIsu {
  id: string;
  code: string;
  nama: string;
  deskripsi?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  jabatan?: string | null;
  role: Role;
}

export interface MasukanWarga {
  id: string;
  namaPengirim: string | null;
  nomorHp: string | null;
  judul: string;
  deskripsi: string;
  lokasiRt: string;
  lokasiRw: string;
  domainIsuId: string;
  domainIsu?: DomainIsu;
  status: StatusMasukan;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MasukanLink {
  id: string;
  rekomendasiId: string;
  masukanId: string;
  masukan: MasukanWarga;
}

export interface Rekomendasi {
  id: string;
  kegiatanRapatId: string;
  domainIsuId: string;
  domainIsu?: DomainIsu;
  judul: string;
  ringkasan: string;
  deskripsi: string;
  skorPrioritas: number;
  status: StatusRekomendasi;
  masukanLinks?: MasukanLink[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface KegiatanRapat {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: Date | string;
  lokasi?: string | null;
  domainIsuId?: string | null;
  domainIsu?: DomainIsu | null;
  dibuatOlehId: string;
  dibuatOleh: User;
  aiModel?: string | null;
  aiProcessedAt?: Date | string | null;
  rekomendasi?: Rekomendasi[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ========================
// HELPER FUNCTIONS
// ========================

const formatTanggal = (iso: string) => {
  return format(new Date(iso), "EEEE, dd MMMM yyyy HH:mm", { locale: id });
};

const formatTanggalShort = (iso: string) => {
  return format(new Date(iso), "dd MMM yyyy", { locale: id });
};

const formatJam = (iso: string) => {
  return format(new Date(iso), "HH:mm", { locale: id });
};

const getStatusColor = (status: StatusRekomendasi | string) => {
  switch (status) {
    case "DISETUJUI":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "DIAJUKAN":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "DRAFT":
      return "bg-slate-50 text-slate-700 border-slate-200";
    case "DITOLAK":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const getPriorityColor = (index: number) => {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-violet-500 to-purple-500",
    "from-rose-500 to-pink-500",
  ];
  return colors[index % colors.length];
};

const getPriorityBadge = (index: number) => {
  const badges = [
    { label: "Prioritas Utama", color: "bg-blue-500" },
    { label: "Prioritas Tinggi", color: "bg-emerald-500" },
    { label: "Prioritas Sedang", color: "bg-amber-500" },
    { label: "Prioritas Rendah", color: "bg-violet-500" },
    { label: "Prioritas Tambahan", color: "bg-rose-500" },
  ];
  return badges[index % badges.length];
};

// ========================
// KOMPONEN UTAMA
// ========================

export default function KegiatanRapatDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // ✅ Fetch data dari API Backend
  const {
    data: kegiatan,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/kegiatan-rapat/${id}`);

  console.log(kegiatan);

  // ✅ Delete function
  const { del: deleteKegiatan } = useDelete();

  // Handle Delete
  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    setIsDeleting(true);
    try {
      const res = await deleteKegiatan(
        `/protected/kegiatan-rapat/${selectedDeleteId}`,
      );
      notifier.success("Berhasil", res?.message || "Kegiatan berhasil dihapus");
      router.push("/admin/jadwal-program");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal menghapus kegiatan",
      );
    } finally {
      setIsDeleting(false);
      setSelectedDeleteId(null);
    }
  };

  // Handle Export PDF
  const handleExportPDF = async () => {
    if (!id) return;
    setIsExporting(true);
    try {
      const response = await fetch(
        `/api/protected/kegiatan-rapat/${id}/export-pdf`,
      );

      if (!response.ok) {
        throw new Error("Gagal export PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Kegiatan_${kegiatan?.judul.replace(/[^a-zA-Z0-9]/g, "_") || "detail"}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      notifier.success("Berhasil", "PDF berhasil diunduh");
    } catch (error) {
      notifier.error("Gagal", "Gagal mengunduh PDF");
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Ajukan Rekomendasi
  const handleAjukanRekomendasi = async () => {
    // TODO: Implement API endpoint untuk submit rekomendasi
    notifier.info("Info", "Fitur ajukan rekomendasi akan segera tersedia");
  };

  // ✅ FIX: Use rekomendasi array directly instead of prioritas
  const rekomendasiList = kegiatan?.rekomendasi || [];
  const totalMasukan = rekomendasiList.reduce(
    (acc, rec) => acc + (rec.masukanLinks?.length || 0),
    0,
  );
  const maxScore =
    rekomendasiList.length > 0
      ? Math.max(...rekomendasiList.map((r) => r.skorPrioritas))
      : 0;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2Icon className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600 font-medium">
            Memuat detail kegiatan...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !kegiatan) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white rounded-2xl p-8 max-w-md">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
              <AlertCircleIcon className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Kegiatan Tidak Ditemukan
            </h2>
            <p className="text-slate-500">
              Data kegiatan yang Anda cari tidak tersedia.
            </p>
            <Button
              onClick={() => router.push("/admin/jadwal-program")}
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl"
            >
              Kembali ke Daftar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => {
          if (!open) setSelectedDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus kegiatan?</AlertDialogTitle>
            <AlertDialogDescription>
              Data kegiatan akan dihapus permanen. Tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header dengan Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Kembali</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Detail Kegiatan
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Informasi lengkap kegiatan dan rekomendasi prioritas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  router.push(`/admin/jadwal-program/${kegiatan.id}/edit`)
                }
                className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl"
              >
                <EditIcon className="h-4 w-4" />
                Edit Kegiatan
              </Button>
              <Button
                variant="destructive"
                onClick={() => setSelectedDeleteId(kegiatan.id)}
                className="gap-2 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 rounded-xl"
              >
                <TrashIcon className="h-4 w-4" />
                Hapus
              </Button>
            </div>
          </div>

          {/* Card Detail Kegiatan */}
          <Card className="mb-8 border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
            {/* Top linear Bar */}
            <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardContent className="p-0">
              {/* Header Section */}
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Date Badge */}
                  <div className="shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-20" />
                      <div className="relative bg-linear-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200 min-w-35 text-center shadow-sm">
                        <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-2 font-medium">
                          <ClockIcon className="h-3.5 w-3.5" />
                          <span>{formatTanggalShort(kegiatan.tanggal)}</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-800">
                          {formatJam(kegiatan.tanggal)}
                        </p>
                        <p className="text-slate-400 text-xs mt-1 font-medium">
                          WIB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                          {kegiatan.judul}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3">
                          {kegiatan.domainIsu && (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
                            >
                              {kegiatan.domainIsu.nama}
                            </Badge>
                          )}
                          {kegiatan.aiModel && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200">
                              <SparklesIcon className="h-3.5 w-3.5 text-purple-600" />
                              <span className="text-xs text-purple-700 font-medium">
                                AI Powered
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <MapPinIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="font-medium">
                          {kegiatan.lokasi || "Belum ditentukan"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">
                            {kegiatan.dibuatOleh.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {kegiatan.dibuatOleh.jabatan || "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {kegiatan.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50/50 border-t border-slate-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                      Tanggal Dibuat
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {formatTanggalShort(kegiatan.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                      Terakhir Update
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {formatTanggalShort(kegiatan.updatedAt)}
                    </p>
                  </div>
                  {kegiatan.aiProcessedAt && (
                    <>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                          AI Diproses
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {formatTanggalShort(kegiatan.aiProcessedAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                          Model AI
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {kegiatan.aiModel}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rekomendasi Section */}
          {rekomendasiList.length > 0 && (
            <div className="space-y-6">
              {/* Header Rekomendasi */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <LightbulbIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Rekomendasi Prioritas
                    </h2>
                    <p className="text-sm text-slate-500">
                      {rekomendasiList[0].ringkasan}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${getStatusColor(rekomendasiList[0].status)} font-medium px-4 py-2`}
                >
                  {rekomendasiList[0].status}
                </Badge>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-0 bg-linear-to-br from-blue-50 to-white rounded-xl shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <TargetIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                          Total Rekomendasi
                        </p>
                        <p className="text-2xl font-bold text-slate-800">
                          {rekomendasiList.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-linear-to-br from-emerald-50 to-white rounded-xl shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <StarIcon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                          Skor Tertinggi
                        </p>
                        <p className="text-2xl font-bold text-slate-800">
                          {maxScore.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-linear-to-br from-amber-50 to-white rounded-xl shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                          Masukan Warga
                        </p>
                        <p className="text-2xl font-bold text-slate-800">
                          {totalMasukan}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Prioritas List */}
              <div className="space-y-4">
                {rekomendasiList.map((item, idx) => {
                  const priorityBadge = getPriorityBadge(idx);
                  const priorityColor = getPriorityColor(idx);
                  const totalMasukan = item.masukanLinks?.length || 0;

                  return (
                    <Card
                      key={item.id}
                      className="group border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1"
                    >
                      {/* Top linear Bar */}
                      <div className={`h-2 bg-linear-to-r ${priorityColor}`} />
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Priority Number */}
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <div
                                className={`absolute inset-0 bg-linear-to-br ${priorityColor} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`}
                              />
                              <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-50 to-white border border-slate-200 flex items-center justify-center shadow-sm">
                                <span className="text-4xl font-bold bg-linear-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                  {idx + 1}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                  <h3 className="text-xl font-bold text-slate-800">
                                    {item.judul}
                                  </h3>
                                  {item.domainIsu && (
                                    <Badge
                                      variant="outline"
                                      className="bg-slate-50 text-slate-700 border-slate-200 font-medium"
                                    >
                                      {item.domainIsu.nama}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge
                                    className={`${priorityBadge.color} text-white text-xs font-medium px-3 py-1`}
                                  >
                                    {priorityBadge.label}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200 font-medium"
                                  >
                                    <StarIcon className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                    Skor: {item.skorPrioritas.toFixed(1)}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 mb-4">
                              <div className="flex items-start gap-2">
                                <CheckCircleIcon className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    Ringkasan
                                  </p>
                                  <p className="text-slate-600">
                                    {item.ringkasan}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <FileTextIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    Deskripsi Lengkap
                                  </p>
                                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                    {item.deskripsi}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Masukan Warga Section */}
                            {totalMasukan > 0 && (
                              <div className="mt-6 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                      <UsersIcon className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <h4 className="text-sm font-semibold text-slate-700">
                                      Masukan Warga Terkait ({totalMasukan})
                                    </h4>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="bg-slate-50 text-slate-600 border-slate-200"
                                  >
                                    {totalMasukan} masukan
                                  </Badge>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {item.masukanLinks?.map((link) => (
                                    <div
                                      key={link.masukan.id}
                                      className="group/masukan bg-linear-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
                                    >
                                      <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="flex-1 min-w-0">
                                          <p className="font-semibold text-slate-800 text-sm line-clamp-1">
                                            {link.masukan.judul}
                                          </p>
                                          <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                              variant="outline"
                                              className="bg-white text-slate-600 border-slate-200 text-xs font-medium"
                                            >
                                              RT {link.masukan.lokasiRt} / RW{" "}
                                              {link.masukan.lokasiRw}
                                            </Badge>
                                          </div>
                                        </div>
                                        <ChevronRightIcon className="h-4 w-4 text-slate-400 group-hover/masukan:text-amber-500 transition-colors" />
                                      </div>
                                      <p className="text-sm text-slate-600 line-clamp-2 mb-2 whitespace-pre-line">
                                        {link.masukan.deskripsi}
                                      </p>
                                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <UserIcon className="h-3 w-3" />
                                        <span>
                                          {link.masukan.namaPengirim ||
                                            "Anonim"}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* No Masukan Indicator */}
                            {totalMasukan === 0 && (
                              <div className="mt-6 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500">
                                  <AlertCircleIcon className="h-4 w-4" />
                                  <span className="text-sm">
                                    Tidak ada masukan warga terkait prioritas
                                    ini
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Rekomendasi State */}
          {rekomendasiList.length === 0 && (
            <Card className="border-0 bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center">
                <FileTextIcon className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-slate-500 text-lg font-medium">
                Belum ada rekomendasi prioritas untuk kegiatan ini
              </p>
            </Card>
          )}

          {/* Footer Actions */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <TrendingUpIcon className="h-4 w-4" />
                <span>
                  Dokumen ini dihasilkan oleh sistem AI dan memerlukan
                  verifikasi manual
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl gap-2"
                >
                  {isExporting ? (
                    <>
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileDownIcon className="h-4 w-4" />
                      Export PDF
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleAjukanRekomendasi}
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl"
                >
                  Ajukan Rekomendasi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDelete, useGet, usePatch } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  EditIcon,
  Eye,
  FileDownIcon,
  FileTextIcon,
  LightbulbIcon,
  Loader2Icon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
  TargetIcon,
  TrashIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ================================================================
// ENUMS
// ================================================================

export enum StatusMasukan {
  MENUNGGU = "MENUNGGU",
  DIVERIFIKASI = "DIVERIFIKASI",
  DITOLAK = "DITOLAK",
  DIPROSES = "DIPROSES",
  DISELESAIKAN = "DISELESAIKAN",
}

export enum StatusRekomendasi {
  DRAFT = "DRAFT",
  DIAJUKAN = "DIAJUKAN",
  DISETUJUI = "DISETUJUI",
  DITOLAK = "DITOLAK",
}

export enum ModeRekomendasi {
  FUSI_DATA = "FUSI_DATA",
  DATA_MASTER_SAJA = "DATA_MASTER_SAJA",
}

export enum Role {
  LURAH = "LURAH",
  PERANGKAT_DESA = "PERANGKAT_DESA",
  ADMIN = "ADMIN",
}

export enum NilaiKritikalitas {
  KRITIS = "KRITIS",
  TINGGI = "TINGGI",
  SEDANG = "SEDANG",
  RENDAH = "RENDAH",
}

// ================================================================
// BASE ENTITIES
// ================================================================

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

export interface RekomendasiEvidence {
  masukanWargaCount?: number;
  dataMasterCount?: number;
  kritikalitas?: NilaiKritikalitas;
}

export interface RekomendasiItem {
  prioritasKe: number;
  deskripsi: string;
  skorPrioritas: number;
  alasanAnalisis: string;
  domainIsuId: string;
  lokasi?: string; // ✅ single field
  fingerprint: string;
  evidence?: RekomendasiEvidence;
  usedMasukanIds?: string[];
  usedDataMasterIds?: string[];
  warning?: string | null; // ✅ tambahan
}

export interface RekomendasiMetadata {
  generatedAt: string;
  aiModel: string;
  modeRekomendasi: ModeRekomendasi;
  domainIsuCode: string;
  totalMasukanDianalisis: number;
  totalDataMasterDianalisis: number;
}

export interface RekomendasiSnapshot {
  metadata: RekomendasiMetadata;
  prioritas: RekomendasiItem[];
  inputData?: {
    masukan: Array<{
      id: string;
      judul: string;
      deskripsi: string;
      lokasi: string;
    }>;
    dataMaster: Array<{
      id: string;
      namaAtribut: string;
      kritikalitas: NilaiKritikalitas;
      jumlah: number | null;
    }>;
  };
}

export interface KegiatanRapat {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: Date | string;
  lokasi?: string | null;
  domainIsuId: string;
  domainIsu?: DomainIsu | null;
  dibuatOlehId: string;
  dibuatOleh: User;
  mode: ModeRekomendasi;
  judulLaporan: string;
  rekomendasiItems?: RekomendasiSnapshot | null;
  fingerprint: string;
  statusRekomendasi: StatusRekomendasi;
  aiModel?: string | null;
  aiProcessedAt?: Date | string | null;
  diprosesOlehId?: string | null;
  diprosesOleh?: User | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ================================================================
// HELPER FUNCTIONS
// ================================================================

const toDate = (val: Date | string): Date =>
  val instanceof Date ? val : new Date(val);

const formatTanggalShort = (iso: string) => {
  return format(toDate(iso), "dd MMM yyyy", { locale: id });
};

const formatJam = (val: Date | string) => {
  return format(toDate(val), "HH:mm", { locale: id });
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

const getModeBadgeColor = (mode: ModeRekomendasi) => {
  switch (mode) {
    case ModeRekomendasi.FUSI_DATA:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case ModeRekomendasi.DATA_MASTER_SAJA:
      return "bg-purple-50 text-purple-700 border-purple-200";
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

const parseRekomendasiItems = (items: any): RekomendasiSnapshot | null => {
  try {
    if (!items || typeof items !== "object") return null;
    if (!items.metadata || !Array.isArray(items.prioritas)) return null;
    return items as RekomendasiSnapshot;
  } catch (e) {
    console.error("Failed to parse rekomendasiItems:", e, items);
    return null;
  }
};

// ================================================================
// MAIN COMPONENT
// ================================================================

export default function KegiatanRapatDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedPriorities, setExpandedPriorities] = useState<
    Record<string, boolean>
  >({});

  const {
    data: kegiatan,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/kegiatan-rapat/${id}`);

  const { del: deleteKegiatan } = useDelete();
  const { patch: patchAjukan } = usePatch(
    `/protected/kegiatan-rapat/${id}/diajukan`,
  );
  const { patch: patchKembaliKeDraft } = usePatch(
    `/protected/kegiatan-rapat/${id}/kembali-ke-draft`,
  );

  const rekomendasiData = parseRekomendasiItems(kegiatan?.rekomendasiItems);
  const prioritasList = rekomendasiData?.prioritas || [];

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    setIsDeleting(true);
    try {
      const res = await deleteKegiatan(
        `/protected/kegiatan-rapat/${selectedDeleteId}`,
      );
      notifier.success("Berhasil", res?.message || "Kegiatan berhasil dihapus");
      router.push("/perangkat/jadwal-program");
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

  const handleExportPDF = async () => {
    if (!id) return;
    setIsExporting(true);
    try {
      const response = await fetch(
        `/api/protected/kegiatan-rapat/${id}/export-pdf`,
      );
      if (!response.ok) throw new Error("Gagal export PDF");
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

  const handleAjukanRekomendasi = async () => {
    try {
      const res = await patchAjukan({});
      notifier.success(
        "Berhasil",
        res?.message || "Kegiatan berhasil diajukan ke lurah",
      );
      mutate();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal mengajukan kegiatan",
      );
    }
  };

  const handleKembaliKeDraft = async () => {
    try {
      const res = await patchKembaliKeDraft({});
      notifier.success(
        "Berhasil",
        res?.message || "Kegiatan dikembalikan ke draft",
      );
      mutate();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal mengembalikan ke draft",
      );
    }
  };

  const toggleExpand = (fingerprint: string) => {
    setExpandedPriorities((prev) => ({
      ...prev,
      [fingerprint]: !prev[fingerprint],
    }));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
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
              onClick={() => router.push("/perangkat/jadwal-program")}
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
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => !open && setSelectedDeleteId(null)}
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Navigation */}
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
            {(kegiatan.statusRekomendasi === StatusRekomendasi.DRAFT ||
              kegiatan.statusRekomendasi === StatusRekomendasi.DIAJUKAN) && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() =>
                    router.push(`/perangkat/jadwal-program/${kegiatan.id}/edit`)
                  }
                  className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl"
                >
                  <EditIcon className="h-4 w-4" /> Edit Kegiatan
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setSelectedDeleteId(kegiatan.id)}
                  className="gap-2 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 rounded-xl"
                >
                  <TrashIcon className="h-4 w-4" /> Hapus
                </Button>
              </div>
            )}
          </div>

          {/* Card Detail Kegiatan */}
          <Card className="mb-8 border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardContent className="p-0">
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
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
                          <Badge
                            variant="outline"
                            className={`${getModeBadgeColor(kegiatan.mode)} font-medium`}
                          >
                            {kegiatan.mode === "FUSI_DATA"
                              ? "Fusi Data"
                              : "Data Master"}
                          </Badge>
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
                      <Badge
                        className={`${getStatusColor(kegiatan.statusRekomendasi)} font-medium px-4 py-2`}
                      >
                        {kegiatan.statusRekomendasi}
                      </Badge>
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
          {prioritasList.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <LightbulbIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Rekomendasi Prioritas AI
                    </h2>
                    <p className="text-sm text-slate-500">
                      {rekomendasiData?.metadata?.domainIsuCode} •{" "}
                      {rekomendasiData?.metadata?.modeRekomendasi}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-slate-50 text-slate-600 border-slate-200"
                  >
                    {prioritasList.length} Prioritas
                  </Badge>
                </div>
              </div>

              {/* Prioritas List */}
              <div className="space-y-4">
                {prioritasList.map((item, idx) => {
                  const priorityBadge = getPriorityBadge(idx);
                  const priorityColor = getPriorityColor(idx);
                  const isExpanded =
                    expandedPriorities[item.fingerprint] || false;

                  return (
                    <Card
                      key={item.fingerprint || idx}
                      className="group border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className={`h-2 bg-linear-to-r ${priorityColor}`} />
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="shrink-0">
                            <div className="relative">
                              <div
                                className={`absolute inset-0 bg-linear-to-br ${priorityColor} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`}
                              />
                              <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-50 to-white border border-slate-200 flex items-center justify-center shadow-sm">
                                <span className="text-4xl font-bold bg-linear-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                  {item.prioritasKe}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                  <h3 className="text-xl font-bold text-slate-800">
                                    {item.deskripsi}
                                  </h3>
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
                                    <StarIcon className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />{" "}
                                    Skor: {item.skorPrioritas.toFixed(2)}
                                  </Badge>
                                  {item.evidence?.kritikalitas && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {item.evidence.kritikalitas}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* ✅ Tampilkan warning jika ada */}
                            {item.warning && (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3 flex items-start gap-2">
                                <AlertCircleIcon className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800">
                                  {item.warning}
                                </p>
                              </div>
                            )}

                            <div className="space-y-3 mb-4">
                              <div className="flex items-start gap-2">
                                <CheckCircleIcon className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    Analisis
                                  </p>
                                  <p className="text-slate-600">
                                    {item.alasanAnalisis}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {item.evidence && (
                              <div className="mt-6 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                      <UsersIcon className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <h4 className="text-sm font-semibold text-slate-700">
                                      Evidence Data
                                    </h4>
                                  </div>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-slate-800">
                                      {item.evidence.masukanWargaCount || 0}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      Masukan Warga
                                    </p>
                                  </div>
                                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-slate-800">
                                      {item.evidence.dataMasterCount || 0}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      Data Master
                                    </p>
                                  </div>
                                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-slate-800">
                                      {item.evidence.kritikalitas || "-"}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      Kritikalitas
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Tombol Lihat Data Input */}
                            <div className="mt-4 flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpand(item.fingerprint)}
                                className="text-xs gap-1"
                              >
                                <Eye className="h-3 w-3" />{" "}
                                {isExpanded
                                  ? "Sembunyikan Data"
                                  : "Lihat Data Input"}
                              </Button>
                            </div>

                            {/* Panel Preview Data Input */}
                            {isExpanded && rekomendasiData?.inputData && (
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Masukan Warga */}
                                  {item.usedMasukanIds &&
                                    item.usedMasukanIds.length > 0 && (
                                      <div>
                                        <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                          <UsersIcon className="h-4 w-4" />{" "}
                                          Masukan Warga Terkait
                                        </h5>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                          {rekomendasiData.inputData.masukan
                                            .filter((m) =>
                                              item.usedMasukanIds?.includes(
                                                m.id,
                                              ),
                                            )
                                            .map((m, i) => (
                                              <div
                                                key={i}
                                                className="text-xs bg-slate-50 p-2 rounded border border-slate-100"
                                              >
                                                <p className="font-medium">
                                                  {m.judul}
                                                </p>
                                                <p className="text-slate-600 line-clamp-2">
                                                  {m.deskripsi}
                                                </p>
                                                <Badge
                                                  variant="outline"
                                                  className="mt-1"
                                                >
                                                  Lokasi: {m.lokasi}
                                                </Badge>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    )}
                                  {/* Data Master */}
                                  {item.usedDataMasterIds &&
                                    item.usedDataMasterIds.length > 0 && (
                                      <div>
                                        <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                          <TargetIcon className="h-4 w-4" />{" "}
                                          Data Master Terkait
                                        </h5>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                          {rekomendasiData.inputData.dataMaster
                                            .filter((d) =>
                                              item.usedDataMasterIds?.includes(
                                                d.id,
                                              ),
                                            )
                                            .map((d, i) => (
                                              <div
                                                key={i}
                                                className="text-xs bg-slate-50 p-2 rounded border border-slate-100"
                                              >
                                                <p className="font-medium">
                                                  {d.namaAtribut}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <Badge
                                                    className={`text-xs ${d.kritikalitas === "KRITIS" ? "bg-red-100 text-red-700" : d.kritikalitas === "TINGGI" ? "bg-orange-100 text-orange-700" : d.kritikalitas === "SEDANG" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                                                  >
                                                    {d.kritikalitas}
                                                  </Badge>
                                                  {d.jumlah !== null && (
                                                    <span>Jml: {d.jumlah}</span>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    )}
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

          {prioritasList.length === 0 && (
            <Card className="border-0 bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center">
                <FileTextIcon className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-slate-500 text-lg font-medium">
                Belum ada rekomendasi prioritas untuk kegiatan ini
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Generate rekomendasi AI untuk mendapatkan prioritas berbasis
                data
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
                {kegiatan.statusRekomendasi === StatusRekomendasi.DISETUJUI && (
                  <Button
                    variant="outline"
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl gap-2"
                  >
                    {isExporting ? (
                      <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />{" "}
                        Exporting...
                      </>
                    ) : (
                      <>
                        <FileDownIcon className="h-4 w-4" /> Export PDF
                      </>
                    )}
                  </Button>
                )}
                {kegiatan.statusRekomendasi === StatusRekomendasi.DRAFT && (
                  <Button
                    onClick={handleAjukanRekomendasi}
                    className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl"
                  >
                    Ajukan Rekomendasi
                  </Button>
                )}
                {kegiatan.statusRekomendasi === StatusRekomendasi.DIAJUKAN && (
                  <Button
                    onClick={handleKembaliKeDraft}
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-xl"
                  >
                    Kembalikan ke Draft
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

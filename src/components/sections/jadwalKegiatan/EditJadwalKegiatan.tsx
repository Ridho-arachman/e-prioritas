"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  BrainIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  Edit3Icon,
  EyeIcon,
  FileTextIcon,
  LightbulbIcon,
  Loader2Icon,
  MapPinIcon,
  SaveIcon,
  TargetIcon,
  Trash2Icon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDelete, useGet, usePut } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";

// ========================
// ENUMS & TYPES
// ========================

export enum StatusRekomendasi {
  DRAFT = "DRAFT",
  DIAJUKAN = "DIAJUKAN",
  DISETUJUI = "DISETUJUI",
  DITOLAK = "DITOLAK",
}

export interface DomainIsu {
  id: string;
  code: string;
  nama: string;
  deskripsi?: string | null;
}

export interface KegiatanRapat {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string | Date;
  lokasi?: string | null;
  domainIsuId: string;
  domainIsu?: DomainIsu | null;
  dibuatOleh: {
    name: string;
    jabatan?: string | null;
  };
  // mode sudah dihapus dari backend, tidak ada lagi
  judulLaporan: string;
  statusRekomendasi: StatusRekomendasi;
  aiModel?: string | null;
  aiProcessedAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// ========================
// ZOD SCHEMA (hanya lokasi dan tanggal yang akan diubah)
// ========================
const kegiatanRapatUpdateSchema = z.object({
  lokasi: z.string().optional().nullable(),
  tanggal: z.string().min(1, "Tanggal & waktu wajib diisi"),
});

type KegiatanRapatEditForm = z.infer<typeof kegiatanRapatUpdateSchema>;

export default function KegiatanRapatFormEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [kegiatanData, setKegiatanData] = useState<KegiatanRapat | null>(null);

  const {
    data: kegiatan,
    error: kegiatanError,
    isLoading: isLoadingKegiatan,
  } = useGet(`/protected/kegiatan-rapat/${id}`);

  const { data: domainIsuOptions, isLoading: isLoadingDomain } = useGet(
    "/protected/kategori",
  );

  const { put: updateKegiatan, loading: isUpdating } = usePut(
    `/protected/kegiatan-rapat/${id}`,
  );
  const { del: deleteKegiatan } = useDelete();

  const form = useForm<KegiatanRapatEditForm>({
    resolver: zodResolver(kegiatanRapatUpdateSchema),
    defaultValues: {
      lokasi: "",
      tanggal: "",
    },
  });

  // Set form values and store original data, and check if editable
  useEffect(() => {
    if (kegiatan) {
      // Jika status sudah DISETUJUI atau DITOLAK, redirect ke detail
      if (
        kegiatan.statusRekomendasi !== StatusRekomendasi.DRAFT &&
        kegiatan.statusRekomendasi !== StatusRekomendasi.DIAJUKAN
      ) {
        notifier.error(
          "Tidak dapat mengedit",
          "Kegiatan yang sudah disetujui atau ditolak tidak dapat diedit.",
        );
        router.push(`/admin/jadwal-program/${kegiatan.id}`);
        return;
      }

      setKegiatanData(kegiatan);
      const tanggalDate = new Date(kegiatan.tanggal);
      const isoDate = tanggalDate.toISOString().slice(0, 16);
      form.reset({
        lokasi: kegiatan.lokasi ?? "",
        tanggal: isoDate,
      });
    }
  }, [kegiatan, form, router]);

  const onSubmit = async (data: KegiatanRapatEditForm) => {
    if (!kegiatanData) return;
    try {
      const tanggalISO = new Date(data.tanggal).toISOString();

      // Kirim hanya field yang boleh diubah + data asli untuk field lainnya
      const payload = {
        ...kegiatanData,
        lokasi: data.lokasi || null,
        tanggal: tanggalISO,
        // pastikan tidak ada field mode yang tidak sengaja terkirim
      };

      const res = await updateKegiatan(payload);
      notifier.success(
        "Berhasil",
        res?.message || "Kegiatan berhasil diperbarui",
      );
      router.push(`/admin/jadwal-program/${id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal memperbarui kegiatan",
      );
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteKegiatan(`/protected/kegiatan-rapat/${id}`);
      notifier.success("Berhasil", "Kegiatan berhasil dihapus");
      router.push("/admin/jadwal-program");
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal menghapus kegiatan",
      );
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const selectedDomain = domainIsuOptions?.find(
    (d: DomainIsu) => d.id === kegiatanData?.domainIsuId,
  );

  // Loading & error states
  if (isLoadingKegiatan) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2Icon className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600 font-medium">Memuat data kegiatan...</p>
        </div>
      </div>
    );
  }

  if (kegiatanError || !kegiatanData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white rounded-2xl p-8 max-w-md">
          <div className="text-center space-y-4">
            <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-xl font-bold text-slate-800">
              Kegiatan Tidak Ditemukan
            </h2>
            <p className="text-slate-500">
              Data kegiatan yang ingin diedit tidak tersedia.
            </p>
            <Button
              onClick={() => router.back()}
              className="bg-blue-600 text-white rounded-xl"
            >
              Kembali
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Menghapus...
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
          {/* Header */}
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Edit3Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-linear-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    Edit Kegiatan
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Perbarui informasi kegiatan rapat
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-slate-100 text-slate-600 border-slate-200 font-medium"
              >
                <ClockIcon className="h-3 w-3 mr-1" />
                Terakhir update:{" "}
                {format(new Date(kegiatanData.updatedAt), "dd MMM yyyy", {
                  locale: localeId,
                })}
              </Badge>
            </div>
          </div>

          {/* Form Card */}
          <Card className="mb-8 border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardContent className="p-0">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Judul - Read Only */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold flex items-center gap-2">
                          <FileTextIcon className="h-4 w-4 text-blue-600" />
                          Nama Kegiatan *
                        </Label>
                        <Input
                          value={kegiatanData.judul}
                          readOnly
                          className="bg-slate-50 border-slate-200 rounded-xl text-slate-600 h-12"
                        />
                      </div>

                      {/* Deskripsi - Read Only */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold flex items-center gap-2">
                          <FileTextIcon className="h-4 w-4 text-blue-600" />
                          Deskripsi Kegiatan *
                        </Label>
                        <Textarea
                          value={kegiatanData.deskripsi}
                          readOnly
                          rows={5}
                          className="bg-slate-50 border-slate-200 rounded-xl text-slate-600 resize-none"
                        />
                      </div>

                      {/* Tanggal & Waktu - Editable */}
                      <Controller
                        control={form.control}
                        name="tanggal"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                              <CalendarIcon className="h-4 w-4 text-blue-600" />
                              Tanggal & Waktu *
                            </FieldLabel>
                            <Input
                              type="datetime-local"
                              {...field}
                              className="bg-white border-slate-200 rounded-xl h-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Lokasi - Editable */}
                      <Controller
                        control={form.control}
                        name="lokasi"
                        render={({ field }) => (
                          <Field>
                            <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                              <MapPinIcon className="h-4 w-4 text-blue-600" />
                              Lokasi Kegiatan
                            </FieldLabel>
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Contoh: Aula Kelurahan Panggungjati"
                              maxLength={100}
                              className="bg-white border-slate-200 rounded-xl h-12"
                            />
                            <p className="text-xs text-slate-500">
                              Opsional, maksimal 100 karakter
                            </p>
                          </Field>
                        )}
                      />

                      {/* Domain Isu - Read Only */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold flex items-center gap-2">
                          <TargetIcon className="h-4 w-4 text-blue-600" />
                          Domain Isu *
                        </Label>
                        <Select value={kegiatanData.domainIsuId} disabled>
                          <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl text-slate-600 h-12">
                            <SelectValue placeholder="Pilih domain isu" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-slate-200">
                            {domainIsuOptions?.map((d: DomainIsu) => (
                              <SelectItem key={d.id} value={d.id}>
                                {d.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedDomain && (
                          <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                            <LightbulbIcon className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-700">
                              {selectedDomain.deskripsi}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Mode Rekomendasi - Statis (Fusi Data) */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold flex items-center gap-2">
                          <TargetIcon className="h-4 w-4 text-blue-600" />
                          Mode Rekomendasi
                        </Label>
                        <p className="text-sm font-medium text-slate-700">
                          🔀 Fusi Data (Masukan Warga + Data Master)
                        </p>
                        <p className="text-xs text-slate-500">
                          Sistem menggunakan mode Fusi Data untuk menghasilkan
                          rekomendasi terbaik.
                        </p>
                      </div>

                      {/* Judul Laporan - Read Only */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold flex items-center gap-2">
                          <FileTextIcon className="h-4 w-4 text-blue-600" />
                          Judul Laporan *
                        </Label>
                        <Input
                          value={kegiatanData.judulLaporan}
                          readOnly
                          className="bg-slate-50 border-slate-200 rounded-xl text-slate-600 h-12"
                        />
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Info Card */}
                      <Card className="border-0 bg-linear-to-br from-blue-50 to-white rounded-2xl shadow-md overflow-hidden">
                        <div className="h-1.5 bg-linear-to-r from-blue-500 to-indigo-500" />
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                              <UserIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">
                                Info Kegiatan
                              </h3>
                              <p className="text-xs text-slate-500">
                                Detail pembuatan
                              </p>
                            </div>
                          </div>
                          <div className="space-y-3 pt-2 border-t border-blue-100">
                            <div>
                              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                                Dibuat Oleh
                              </p>
                              <p className="text-sm font-medium text-slate-800">
                                {kegiatanData.dibuatOleh.name}
                              </p>
                              {kegiatanData.dibuatOleh.jabatan && (
                                <p className="text-xs text-slate-500">
                                  {kegiatanData.dibuatOleh.jabatan}
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                                Tanggal Dibuat
                              </p>
                              <p className="text-sm font-medium text-slate-800">
                                {format(
                                  new Date(kegiatanData.createdAt),
                                  "dd MMM yyyy",
                                  { locale: localeId },
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                                ID Kegiatan
                              </p>
                              <p className="text-sm font-mono text-slate-600">
                                {kegiatanData.id}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* AI Options Card - Read Only */}
                      <Card className="border-0 bg-linear-to-br from-purple-50 to-white rounded-2xl shadow-md overflow-hidden">
                        <div className="h-1.5 bg-linear-to-r from-purple-500 to-pink-500" />
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                              <BrainIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">
                                AI Settings
                              </h3>
                              <p className="text-xs text-slate-500">
                                Konfigurasi pemrosesan
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <p className="text-sm font-medium text-slate-700">
                                Enable AI
                              </p>
                              <p className="text-xs text-slate-500">
                                Proses ulang dengan AI
                              </p>
                            </div>
                            <Switch
                              checked={true}
                              disabled={true}
                              className="data-[state=checked]:bg-purple-600 opacity-70"
                            />
                          </div>

                          <div className="space-y-2 pt-2 border-t border-purple-100">
                            <Label className="text-xs text-slate-600 font-medium">
                              AI Model
                            </Label>
                            <Select
                              value={kegiatanData.aiModel || "gemini-2.5-flash"}
                              disabled={true}
                            >
                              <SelectTrigger className="bg-white border-purple-200 rounded-lg text-slate-700 h-10 opacity-70">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-purple-200">
                                <SelectItem value="gemini-2.5-flash">
                                  Gemini 2.5 Flash (Rekomendasi)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {kegiatanData.aiProcessedAt && (
                              <div className="flex items-center gap-1.5 text-xs text-purple-600">
                                <CheckCircleIcon className="h-3 w-3" />
                                <span>
                                  Terakhir diproses:{" "}
                                  {format(
                                    new Date(kegiatanData.aiProcessedAt),
                                    "dd MMM yyyy",
                                    { locale: localeId },
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quick Preview Card */}
                      <Card className="border-0 bg-linear-to-br from-slate-50 to-white rounded-2xl shadow-md overflow-hidden">
                        <div className="h-1.5 bg-linear-to-r from-slate-400 to-slate-600" />
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-500/30">
                              <EyeIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">
                                Quick Preview
                              </h3>
                              <p className="text-xs text-slate-500">
                                Ringkasan kegiatan
                              </p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                                Judul
                              </p>
                              <p className="text-sm font-medium text-slate-800 line-clamp-2">
                                {kegiatanData.judul}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {form.watch("tanggal")
                                  ? format(
                                      new Date(form.watch("tanggal")),
                                      "dd MMM yyyy HH:mm",
                                      { locale: localeId },
                                    ) + " WIB"
                                  : "—"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="h-3.5 w-3.5 text-slate-400" />
                              <span className="text-sm text-slate-600 line-clamp-1">
                                {form.watch("lokasi") || "—"}
                              </span>
                            </div>
                            {selectedDomain && (
                              <div className="flex items-center gap-2">
                                <TargetIcon className="h-3.5 w-3.5 text-slate-400" />
                                <Badge
                                  variant="outline"
                                  className="bg-slate-100 text-slate-700 border-slate-200 text-xs"
                                >
                                  {selectedDomain.nama}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium"
                            onClick={() =>
                              router.push(`/admin/jadwal-program/${id}`)
                            }
                          >
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Lihat Detail Lengkap
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="px-6 sm:px-8 py-5 bg-slate-50/50 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <AlertCircleIcon className="h-4 w-4" />
                      <span>
                        Pastikan semua data sudah benar sebelum menyimpan
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium"
                      >
                        <XIcon className="h-4 w-4" />
                        Batal
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                        className="gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium"
                      >
                        <Trash2Icon className="h-4 w-4" />
                        Hapus
                      </Button>
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl font-medium px-6"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <SaveIcon className="h-4 w-4" />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

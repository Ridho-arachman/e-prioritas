"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftIcon,
  SaveIcon,
  XIcon,
  CalendarIcon,
  MapPinIcon,
  FileTextIcon,
  TargetIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LightbulbIcon,
  BrainIcon,
  SparklesIcon,
  Edit3Icon,
  Trash2Icon,
  EyeIcon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function KegiatanRapatFormEdit() {
  const router = useRouter();

  // Static data untuk tampilan
  const kegiatan = {
    id: "1",
    judul: "Musrenbang Kelurahan Panggungjati 2026",
    deskripsi:
      "Musyawarah perencanaan pembangunan untuk usulan warga tahun depan. Acara akan dihadiri oleh perangkat kelurahan, perwakilan RW, dan tokoh masyarakat untuk membahas prioritas pembangunan tahun anggaran 2027.",
    tanggal: "2026-02-20",
    waktu: "09:00",
    lokasi: "Aula Kelurahan Panggungjati",
    domainIsu: {
      id: "1",
      nama: "Infrastruktur",
      deskripsi: "Jalan, jembatan, drainase, fasilitas umum",
    },
    dibuatOleh: { name: "Admin Kelurahan", jabatan: "Staf Perencanaan" },
    aiModel: "gemini-1.5-pro",
    aiProcessedAt: new Date(2026, 1, 18).toISOString(),
    createdAt: new Date(2026, 1, 15).toISOString(),
    updatedAt: new Date(2026, 1, 18).toISOString(),
  };

  const domainIsuOptions = [
    {
      id: "1",
      nama: "Infrastruktur",
      deskripsi: "Jalan, jembatan, drainase, fasilitas umum",
    },
    {
      id: "2",
      nama: "Kesehatan",
      deskripsi: "Posyandu, stunting, sanitasi, layanan kesehatan",
    },
    {
      id: "3",
      nama: "Pendidikan",
      deskripsi: "PAUD, TPA, beasiswa, pelatihan keterampilan",
    },
    {
      id: "4",
      nama: "Ekonomi",
      deskripsi: "UMKM, pasar desa, pelatihan wirausaha",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
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
              {format(new Date(kegiatan.updatedAt), "dd MMM yyyy", {
                locale: id,
              })}
            </Badge>
          </div>
        </div>

        {/* Form Card */}
        <Card className="mb-8 border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <CardContent className="p-0">
            <form>
              {/* Form Content */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Form */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Judul */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="judul"
                        className="text-slate-700 font-semibold flex items-center gap-2"
                      >
                        <FileTextIcon className="h-4 w-4 text-blue-600" />
                        Nama Kegiatan *
                      </Label>
                      <Input
                        id="judul"
                        defaultValue={kegiatan.judul}
                        placeholder="Contoh: Musrenbang Kelurahan 2026"
                        className="bg-white border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12"
                      />
                      <p className="text-xs text-slate-500">
                        {kegiatan.judul.length}/100 karakter
                      </p>
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="deskripsi"
                        className="text-slate-700 font-semibold flex items-center gap-2"
                      >
                        <FileTextIcon className="h-4 w-4 text-blue-600" />
                        Deskripsi Kegiatan *
                      </Label>
                      <Textarea
                        id="deskripsi"
                        defaultValue={kegiatan.deskripsi}
                        placeholder="Jelaskan detail acara, tujuan, dan pihak-pihak yang terlibat..."
                        rows={5}
                        className="bg-white border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                      />
                      <p className="text-xs text-slate-500">
                        {kegiatan.deskripsi.length}/1000 karakter
                      </p>
                    </div>

                    {/* Tanggal & Waktu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="tanggal"
                          className="text-slate-700 font-semibold flex items-center gap-2"
                        >
                          <CalendarIcon className="h-4 w-4 text-blue-600" />
                          Tanggal *
                        </Label>
                        <Input
                          id="tanggal"
                          type="date"
                          defaultValue={kegiatan.tanggal}
                          className="bg-white border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="waktu"
                          className="text-slate-700 font-semibold flex items-center gap-2"
                        >
                          <ClockIcon className="h-4 w-4 text-blue-600" />
                          Waktu *
                        </Label>
                        <Input
                          id="waktu"
                          type="time"
                          defaultValue={kegiatan.waktu}
                          className="bg-white border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12"
                        />
                      </div>
                    </div>

                    {/* Lokasi */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="lokasi"
                        className="text-slate-700 font-semibold flex items-center gap-2"
                      >
                        <MapPinIcon className="h-4 w-4 text-blue-600" />
                        Lokasi Kegiatan *
                      </Label>
                      <Input
                        id="lokasi"
                        defaultValue={kegiatan.lokasi}
                        placeholder="Contoh: Aula Kelurahan Panggungjati"
                        className="bg-white border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12"
                      />
                    </div>

                    {/* Domain Isu */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="domainIsuId"
                        className="text-slate-700 font-semibold flex items-center gap-2"
                      >
                        <TargetIcon className="h-4 w-4 text-blue-600" />
                        Domain Isu
                      </Label>
                      <Select defaultValue={kegiatan.domainIsu?.id}>
                        <SelectTrigger className="bg-white border-slate-200 rounded-xl text-slate-700 h-12">
                          <SelectValue placeholder="Pilih domain isu (opsional)" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200">
                          <SelectItem
                            value="NONE"
                            className="text-slate-700 focus:bg-slate-50"
                          >
                            Tidak ada
                          </SelectItem>
                          {domainIsuOptions.map((d) => (
                            <SelectItem
                              key={d.id}
                              value={d.id}
                              className="text-slate-700 focus:bg-slate-50"
                            >
                              {d.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {kegiatan.domainIsu && (
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                          <LightbulbIcon className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-700">
                            {kegiatan.domainIsu.deskripsi}
                          </p>
                        </div>
                      )}
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
                              {kegiatan.dibuatOleh.name}
                            </p>
                            {kegiatan.dibuatOleh.jabatan && (
                              <p className="text-xs text-slate-500">
                                {kegiatan.dibuatOleh.jabatan}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                              Tanggal Dibuat
                            </p>
                            <p className="text-sm font-medium text-slate-800">
                              {format(
                                new Date(kegiatan.createdAt),
                                "dd MMM yyyy",
                                { locale: id },
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                              ID Kegiatan
                            </p>
                            <p className="text-sm font-mono text-slate-600">
                              {kegiatan.id}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Options Card */}
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
                            defaultChecked
                            className="data-[state=checked]:bg-purple-600"
                          />
                        </div>

                        <div className="space-y-2 pt-2 border-t border-purple-100">
                          <Label className="text-xs text-slate-600 font-medium">
                            AI Model
                          </Label>
                          <Select defaultValue={kegiatan.aiModel}>
                            <SelectTrigger className="bg-white border-purple-200 rounded-lg text-slate-700 h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-purple-200">
                              <SelectItem
                                value="gemini-1.5-pro"
                                className="text-slate-700 focus:bg-purple-50"
                              >
                                Gemini 1.5 Pro
                              </SelectItem>
                              <SelectItem
                                value="gemini-1.5-flash"
                                className="text-slate-700 focus:bg-purple-50"
                              >
                                Gemini 1.5 Flash
                              </SelectItem>
                              <SelectItem
                                value="gemini-2.0"
                                className="text-slate-700 focus:bg-purple-50"
                              >
                                Gemini 2.0 (Experimental)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-1.5 text-xs text-purple-600">
                            <CheckCircleIcon className="h-3 w-3" />
                            <span>
                              Terakhir diproses:{" "}
                              {format(
                                new Date(kegiatan.aiProcessedAt),
                                "dd MMM",
                                { locale: id },
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Preview Card */}
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
                              {kegiatan.judul}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm text-slate-600">
                              {format(
                                new Date(kegiatan.tanggal),
                                "dd MMM yyyy",
                                { locale: id },
                              )}{" "}
                              {kegiatan.waktu} WIB
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm text-slate-600 line-clamp-1">
                              {kegiatan.lokasi}
                            </span>
                          </div>
                          {kegiatan.domainIsu && (
                            <div className="flex items-center gap-2">
                              <TargetIcon className="h-3.5 w-3.5 text-slate-400" />
                              <Badge
                                variant="outline"
                                className="bg-slate-100 text-slate-700 border-slate-200 text-xs"
                              >
                                {kegiatan.domainIsu.nama}
                              </Badge>
                            </div>
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium"
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Lihat Preview Lengkap
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
                      className="gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      Hapus
                    </Button>
                    <Button
                      type="submit"
                      className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl font-medium px-6"
                    >
                      <SaveIcon className="h-4 w-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

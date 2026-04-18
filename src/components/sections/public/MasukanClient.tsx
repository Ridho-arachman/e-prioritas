"use client";
import MasukanWargaFormAdd from "@/components/sections/masukan/masukanFormAdd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  Loader2,
  MapPin,
  MapPinned,
  MessageSquare,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";

// Mapping status masukan
const statusConfig: Record<string, { color: string; label: string }> = {
  MENUNGGU: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Menunggu Verifikasi",
  },
  DIVERIFIKASI: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Terverifikasi",
  },
  DITOLAK: {
    color: "bg-red-100 text-red-800 border-red-200",
    label: "Ditolak",
  },
  DIPROSES: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Sedang Diproses",
  },
  DISELESAIKAN: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    label: "Selesai",
  },
};

// Mapping status rekomendasi
const statusRekomendasiConfig: Record<
  string,
  { color: string; label: string }
> = {
  DRAFT: {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    label: "Draft",
  },
  DIAJUKAN: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Diajukan",
  },
  DISETUJUI: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Disetujui",
  },
  DITOLAK: {
    color: "bg-red-100 text-red-800 border-red-200",
    label: "Ditolak",
  },
};

// Helper untuk parse rekomendasiItems
const parseRekomendasiItems = (items: any): { prioritas: any[] } | null => {
  try {
    if (!items || typeof items !== "object") return null;
    if (items.prioritas && Array.isArray(items.prioritas)) {
      return { prioritas: items.prioritas };
    }
    if (Array.isArray(items)) {
      return { prioritas: items };
    }
    return null;
  } catch (e) {
    console.error("Failed to parse rekomendasiItems:", e, items);
    return null;
  }
};

export default function MasukanClient() {
  const { data: agendaData, isLoading: agendaLoading } =
    useGet("/public/agenda");
  const agendas = agendaData ?? [];

  // State untuk dialog cek status
  const [open, setOpen] = useState(false);
  const [nomorHp, setNomorHp] = useState("");
  const [statusData, setStatusData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State untuk dialog detail agenda
  const [selectedAgenda, setSelectedAgenda] = useState<any>(null);
  const [agendaDetailOpen, setAgendaDetailOpen] = useState(false);
  const [agendaDetailLoading, setAgendaDetailLoading] = useState(false);
  const [agendaDetailError, setAgendaDetailError] = useState("");

  const handleCekStatus = async () => {
    const cleanNomorHp = nomorHp.trim();

    if (!cleanNomorHp) {
      setError("Nomor HP tidak boleh kosong.");
      setStatusData(null);
      return;
    }
    if (!/^[0-9]+$/.test(cleanNomorHp)) {
      setError("Nomor HP hanya boleh berisi angka.");
      setStatusData(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/public/cek-status/${cleanNomorHp}`);
      const result = await res.json();

      if (res.ok) {
        setStatusData(result.data);
        setError("");
      } else {
        setStatusData(null);
        if (res.status === 404) {
          setError(
            "Data dengan nomor HP tersebut tidak ditemukan. Pastikan nomor HP sudah benar.",
          );
        } else if (res.status === 400) {
          setError(result.message || "Nomor HP tidak valid.");
        } else {
          setError(
            result.message || "Terjadi kesalahan. Silakan coba lagi nanti.",
          );
        }
      }
    } catch (err) {
      console.error(err);
      setStatusData(null);
      setError(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNomorHp("");
    setStatusData(null);
    setError("");
  };

  const handleAgendaClick = async (agenda: any) => {
    setAgendaDetailOpen(true);
    setAgendaDetailLoading(true);
    setAgendaDetailError("");
    try {
      const res = await fetch(`/api/public/agenda/${agenda.id}`);
      const result = await res.json();
      if (res.ok) {
        setSelectedAgenda(result.data);
      } else {
        setAgendaDetailError(result.message || "Gagal mengambil detail agenda");
        setSelectedAgenda(null);
      }
    } catch (err) {
      console.error(err);
      setAgendaDetailError("Gagal menghubungi server");
      setSelectedAgenda(null);
    } finally {
      setAgendaDetailLoading(false);
    }
  };

  const rekomendasiData = selectedAgenda
    ? parseRekomendasiItems(selectedAgenda.rekomendasiItems)
    : null;
  const prioritasList = rekomendasiData?.prioritas || [];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-[calc(100vh-8rem)] gap-6 p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
        {/* Bagian Form - Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="text-center relative">
              <div className="relative inline-block mx-auto">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <MessageSquare className="relative w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              </div>
              <CardTitle className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Sampaikan Masukan Anda
              </CardTitle>
              <CardDescription className="text-md mt-2 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Masukan Anda akan diverifikasi oleh Perangkat Desa sebelum
                diproses. Setiap suara sangat berarti bagi kemajuan bersama.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <MasukanWargaFormAdd />
            </CardContent>
          </Card>
        </motion.div>

        {/* Bagian Aside - Kanan */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/3 space-y-6"
        >
          {/* Card Informasi Desa */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="p-2 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Informasi Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Nama Desa:</strong>{" "}
                  Panggungjati
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Kecamatan:</strong> Taktakan
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Kota:</strong> Serang
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Provinsi:</strong> Banten
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Kode Pos:</strong> 42415
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card Cek Status Masukan (dengan nomor HP) */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="p-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
                <Search className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Cek Status Masukan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 relative z-20"
                onClick={() => setOpen(true)}
              >
                <Search className="h-4 w-4" /> Cek Status
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Cek Status Masukan</DialogTitle>
                    <DialogDescription>
                      Masukkan nomor HP yang Anda gunakan saat mengirim masukan.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomorHp">Nomor HP</Label>
                      <Input
                        id="nomorHp"
                        placeholder="Contoh: 08123456789"
                        value={nomorHp}
                        onChange={(e) => setNomorHp(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={handleCekStatus}
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? "Memeriksa..." : "Cek Status"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleClear}
                        disabled={loading}
                        className="flex-1"
                      >
                        Clear
                      </Button>
                    </div>
                    {error && (
                      <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                        {error}
                      </div>
                    )}
                    {statusData && (
                      <div className="mt-4 p-4 rounded-lg border bg-muted/30 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{statusData.judul}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {statusData.deskripsi}
                            </p>
                            {statusData.namaPengirim && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Pengirim: {statusData.namaPengirim}
                              </p>
                            )}
                          </div>
                          <Badge
                            className={cn(
                              "text-xs",
                              statusConfig[statusData.status]?.color,
                            )}
                          >
                            {statusConfig[statusData.status]?.label}
                          </Badge>
                        </div>

                        {statusData.status === "DITOLAK" &&
                          statusData.alasanPenolakan && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                              <span className="font-semibold">
                                Alasan Penolakan:
                              </span>{" "}
                              {statusData.alasanPenolakan}
                            </p>
                          )}

                        <p className="text-xs text-muted-foreground">
                          Tanggal Kirim:{" "}
                          {new Date(statusData.createdAt).toLocaleDateString(
                            "id-ID",
                          )}
                        </p>
                        {statusData.domainIsu?.nama && (
                          <p className="text-xs text-muted-foreground">
                            Kategori: {statusData.domainIsu.nama}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Card Agenda Desa */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="p-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                <CalendarDays className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Agenda Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {agendaLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : agendas.length > 0 ? (
                <ul className="space-y-2">
                  {agendas.map((agenda: any, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all group/item cursor-pointer"
                      onClick={() => handleAgendaClick(agenda)}
                    >
                      <span className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform group-hover/item:translate-x-1" />
                        <span className="font-medium">{agenda.nama}</span>
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs bg-white/50 dark:bg-gray-900/50 border-purple-200 dark:border-purple-800"
                      >
                        {agenda.tanggal}
                      </Badge>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Tidak ada agenda terdekat.
                </p>
              )}
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <p>
                  Agenda akan diperbarui secara berkala oleh perangkat desa.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.aside>
      </div>

      {/* Dialog Detail Agenda */}
      <Dialog open={agendaDetailOpen} onOpenChange={setAgendaDetailOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-purple-600" />
              Detail Agenda
            </DialogTitle>
            <DialogDescription>
              Informasi lengkap kegiatan dan rekomendasi.
            </DialogDescription>
          </DialogHeader>

          {agendaDetailLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : agendaDetailError ? (
            <div className="text-center text-red-500 py-4">
              {agendaDetailError}
            </div>
          ) : selectedAgenda ? (
            <div className="space-y-6 py-2">
              {/* Judul */}
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedAgenda.judul}
                </h3>
                {selectedAgenda.judulLaporan && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Laporan: {selectedAgenda.judulLaporan}
                  </p>
                )}
              </div>

              {/* Info Dasar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Tanggal</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedAgenda.tanggal}
                    </p>
                  </div>
                </div>
                {selectedAgenda.lokasi && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Lokasi</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAgenda.lokasi}
                      </p>
                    </div>
                  </div>
                )}
                {selectedAgenda.domainIsu && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Domain Isu</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAgenda.domainIsu.nama}
                      </p>
                      {selectedAgenda.domainIsu.deskripsi && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedAgenda.domainIsu.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {selectedAgenda.dibuatOleh && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Dibuat Oleh</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAgenda.dibuatOleh}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Badge
                    className={cn(
                      "text-xs",
                      statusRekomendasiConfig[selectedAgenda.statusRekomendasi]
                        ?.color,
                    )}
                  >
                    {
                      statusRekomendasiConfig[selectedAgenda.statusRekomendasi]
                        ?.label
                    }
                  </Badge>
                </div>
              </div>

              {/* Deskripsi */}
              {selectedAgenda.deskripsi && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Deskripsi Kegiatan</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedAgenda.deskripsi}
                    </p>
                  </div>
                </div>
              )}

              {/* Rekomendasi Items */}
              {prioritasList.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-semibold">Rekomendasi Prioritas</h4>
                  </div>
                  <div className="space-y-3">
                    {prioritasList.map((item: any, idx: number) => (
                      <div
                        key={item.fingerprint || idx}
                        className="p-3 rounded-lg border bg-muted/20"
                      >
                        <p className="font-medium">
                          {item.prioritasKe
                            ? `Prioritas ${item.prioritasKe}`
                            : `Rekomendasi ${idx + 1}`}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.deskripsi}
                        </p>
                        {item.alasanAnalisis && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Analisis: {item.alasanAnalisis}
                          </p>
                        )}
                        {item.skorPrioritas && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            Skor: {item.skorPrioritas.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Masukan Terkait */}
              {selectedAgenda.masukan && selectedAgenda.masukan.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold">Masukan Warga Terkait</h4>
                  </div>
                  <div className="space-y-2">
                    {selectedAgenda.masukan.map((m: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg border bg-muted/10"
                      >
                        <p className="font-medium text-sm">{m.judul}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {m.deskripsi}
                        </p>
                        {m.namaPengirim && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Pengirim: {m.namaPengirim}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Master Terkait */}
              {selectedAgenda.dataMaster &&
                selectedAgenda.dataMaster.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold">Data Master Terkait</h4>
                    </div>
                    <div className="space-y-2">
                      {selectedAgenda.dataMaster.map((dm: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg border bg-muted/10"
                        >
                          <p className="font-medium text-sm">
                            {dm.namaAtribut}
                          </p>
                          <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                            <span>Kritikalitas: {dm.kritikalitas}</span>
                            {dm.jumlah && <span>Jumlah: {dm.jumlah}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

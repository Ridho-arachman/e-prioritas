"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Database,
  Download,
  Edit,
  Eye,
  GitMerge,
  HelpCircle,
  Layers,
  MessageSquare,
  Send,
  Sparkles,
  Target,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;
  return <>{children}</>;
};

export default function PerangkatHelpPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-600 to-orange-600 p-8 mb-8 shadow-xl"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10 flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Pusat Bantuan Perangkat Desa
              </h1>
              <p className="text-amber-100 mt-1 text-lg">
                Sistem Prioritas Program Kelurahan Panggungjati · AI-Powered
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ringkasan peran perangkat desa (sesuai dokumen usulan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  Verifikasi Masukan Warga
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ubah status masukan: <strong>MENUNGGU</strong> →{" "}
                  <strong>DIVERIFIKASI</strong> (layak AI) atau{" "}
                  <strong>DITOLAK</strong> (wajib alasan). Status{" "}
                  <strong>DIPROSES</strong>/<strong>DISELESAIKAN</strong> diatur
                  otomatis sistem.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  Kelola Data Master
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tambah, edit, hapus, atau impor Excel data master (indikator,
                  kritikalitas). Hanya data aktif yang digunakan AI sebagai
                  bobot penilaian.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Send className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  Buat & Ajukan Kegiatan
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Buat kegiatan rapat → sistem otomatis panggil AI (FUSI_DATA)
                  hasilkan 5 prioritas (status DRAFT). Anda dapat edit/hapus
                  selama DRAFT, lalu ajukan ke lurah.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Diagram alur perangkat desa (disesuaikan) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-white rounded-2xl mb-10 overflow-hidden">
            <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-2 text-xl text-amber-800">
                <GitMerge className="h-5 w-5 text-amber-600" />
                Alur Kerja Perangkat Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="hidden md:grid md:grid-cols-3 md:gap-y-8 md:gap-x-4 relative">
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2 shadow-md border-2 border-amber-200">
                    <MessageSquare className="h-8 w-8 text-amber-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 border-amber-200 text-amber-700"
                  >
                    Masukan Warga
                  </Badge>
                  <p className="text-xs mt-1">MENUNGGU</p>
                  <div className="absolute -right-4 top-1/2 text-2xl text-slate-300 hidden lg:block">
                    →
                  </div>
                </div>
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow-md border-2 border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 border-green-200 text-green-700"
                  >
                    Verifikasi
                  </Badge>
                  <p className="text-xs mt-1">DIVERIFIKASI / DITOLAK</p>
                  <div className="absolute -right-4 top-1/2 text-2xl text-slate-300 hidden lg:block">
                    →
                  </div>
                </div>
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md border-2 border-blue-200">
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 border-blue-200 text-blue-700"
                  >
                    Data Master
                  </Badge>
                  <p className="text-xs mt-1">Aturan & kriteria</p>
                </div>
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2 shadow-md border-2 border-purple-200">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 border-purple-200 text-purple-700"
                  >
                    AI Gemini
                  </Badge>
                  <p className="text-xs mt-1">Generate rekomendasi</p>
                  <div className="absolute -right-4 top-1/2 text-2xl text-slate-300 hidden lg:block">
                    →
                  </div>
                </div>
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2 shadow-md border-2 border-indigo-200">
                    <Layers className="h-8 w-8 text-indigo-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-indigo-50 border-indigo-200 text-indigo-700"
                  >
                    5 Prioritas
                  </Badge>
                  <p className="text-xs mt-1">DRAFT → DIAJUKAN</p>
                  <div className="absolute -right-4 top-1/2 text-2xl text-slate-300 hidden lg:block">
                    →
                  </div>
                </div>
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2 shadow-md border-2 border-emerald-200">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 border-emerald-200 text-emerald-700"
                  >
                    Persetujuan Lurah
                  </Badge>
                  <p className="text-xs mt-1">DISETUJUI / DITOLAK</p>
                </div>
              </div>
              <div className="md:hidden space-y-4">
                {[
                  {
                    icon: MessageSquare,
                    bg: "bg-amber-100",
                    border: "border-amber-200",
                    textColor: "text-amber-600",
                    label: "Masukan Warga",
                    status: "MENUNGGU",
                  },
                  {
                    icon: CheckCircle,
                    bg: "bg-green-100",
                    border: "border-green-200",
                    textColor: "text-green-600",
                    label: "Verifikasi",
                    status: "DIVERIFIKASI / DITOLAK",
                  },
                  {
                    icon: Database,
                    bg: "bg-blue-100",
                    border: "border-blue-200",
                    textColor: "text-blue-600",
                    label: "Data Master",
                    status: "Aturan & kriteria",
                  },
                  {
                    icon: Brain,
                    bg: "bg-purple-100",
                    border: "border-purple-200",
                    textColor: "text-purple-600",
                    label: "AI Gemini",
                    status: "Generate rekomendasi",
                  },
                  {
                    icon: Layers,
                    bg: "bg-indigo-100",
                    border: "border-indigo-200",
                    textColor: "text-indigo-600",
                    label: "5 Prioritas",
                    status: "DRAFT → DIAJUKAN",
                  },
                  {
                    icon: Target,
                    bg: "bg-emerald-100",
                    border: "border-emerald-200",
                    textColor: "text-emerald-600",
                    label: "Persetujuan Lurah",
                    status: "DISETUJUI / DITOLAK",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${step.bg} flex items-center justify-center shadow-sm border-2 ${step.border} shrink-0`}
                    >
                      <step.icon className={`h-6 w-6 ${step.textColor}`} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {step.label}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {step.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Panduan fungsional perangkat desa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-amber-600" /> Panduan Fungsional
            Perangkat Desa
          </h2>
          <ClientOnly>
            <Accordion type="single" collapsible className="space-y-3">
              {/* 1. Verifikasi Masukan */}
              <AccordionItem
                value="verifikasi"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-amber-600" />
                    </div>
                    <span>1. Verifikasi Masukan Warga</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Setiap masukan warga diawali status{" "}
                    <strong>MENUNGGU</strong>. Anda dapat:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200">
                      <Badge className="bg-green-600">DIVERIFIKASI</Badge>
                      <p className="text-sm mt-1">
                        Masukan layak, siap dianalisis AI.
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200">
                      <Badge className="bg-red-600">DITOLAK</Badge>
                      <p className="text-sm mt-1">
                        Tidak layak, wajib mengisi alasan penolakan.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    ⚠️ Status <strong>DIPROSES</strong> (sedang digunakan AI)
                    dan <strong>DISELESAIKAN</strong> (rekomendasi disetujui)
                    diatur otomatis sistem.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 2. Kelola Data Master */}
              <AccordionItem
                value="master-data"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Database className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>2. Kelola Data Master</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Data master berisi indikator dengan kritikalitas
                    (KRITIS=1.0, TINGGI=0.75, SEDANG=0.5, RENDAH=0.25).
                  </p>
                  <div className="bg-slate-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Fitur:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Tambah, edit, hapus data master</li>
                      <li>Impor data via Excel (template tersedia)</li>
                      <li>Aktif/nonaktifkan data (hanya aktif digunakan AI)</li>
                    </ul>
                  </div>
                  <p className="text-sm text-slate-500">
                    Data master menjadi bobot dalam perhitungan skor prioritas
                    AI.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 3. Buat Kegiatan Rapat & Generate Rekomendasi */}
              <AccordionItem
                value="buat-kegiatan"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>
                      3. Buat Kegiatan Rapat & Generate Rekomendasi AI
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Pilih menu "Atur Jadwal Program Mendatang" → "Buat Baru".
                    Isi data (judul, deskripsi, tanggal, lokasi, domain isu,
                    judul laporan).
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold flex items-center gap-1">
                      <Sparkles className="h-4 w-4" /> Proses AI (FUSI_DATA):
                    </h4>
                    <ul className="list-disc list-inside text-sm">
                      <li>
                        Mengambil max 50 masukan warga berstatus DIVERIFIKASI
                        sesuai domain isu
                      </li>
                      <li>Mengambil semua data master aktif</li>
                      <li>
                        Menyertakan konteks program kelurahan berjalan & selesai
                        21 hari (hindari duplikasi)
                      </li>
                      <li>
                        Gemini AI menghasilkan 5 prioritas dengan deskripsi,
                        skor (0-1), alasan analisis, evidence, fingerprint
                      </li>
                    </ul>
                  </div>
                  <p>
                    Hasil disimpan dengan status <strong>DRAFT</strong>. Anda
                    dapat mengedit kegiatan (judul, deskripsi, dll.) selama
                    status masih DRAFT.
                  </p>
                  <p className="text-sm italic">
                    Jika AI gagal, kegiatan tetap tersimpan tapi tanpa
                    rekomendasi. Coba generate ulang nanti.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 4. Lihat Snapshot Data Input */}
              <AccordionItem
                value="snapshot"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Eye className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span>4. Lihat Snapshot Data Input (Evidence)</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Di halaman detail kegiatan, setiap prioritas memiliki tombol{" "}
                    <strong>"Lihat Data Input"</strong> (hanya muncul jika ada
                    data terkait).
                  </p>
                  <p>Anda dapat melihat:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      Masukan warga spesifik (judul, deskripsi, lokasi) yang
                      digunakan
                    </li>
                    <li>
                      Data master spesifik (nama atribut, kritikalitas, jumlah)
                      yang digunakan
                    </li>
                  </ul>
                  <p>
                    Data ini diambil dari snapshot <code>inputData</code> saat
                    generate, sehingga tetap akurat meski data asli berubah.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 5. Edit / Hapus Kegiatan (hanya DRAFT) */}
              <AccordionItem
                value="edit-hapus"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Edit className="h-4 w-4 text-rose-600" />
                    </div>
                    <span>5. Edit / Hapus Kegiatan (Hanya Status DRAFT)</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p className="text-slate-700 dark:text-slate-300">
                    Selama kegiatan berstatus <strong>DRAFT</strong>, Anda dapat
                    mengedit data kegiatan (judul, deskripsi, tanggal, lokasi).
                    Admin dapat menghapus kegiatan, perangkat desa hanya edit.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                    <p className="font-medium">
                      ⚠️ Setelah kegiatan diajukan (status DIAJUKAN), edit &
                      hapus tidak tersedia lagi.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 6. Ajukan ke Lurah */}
              <AccordionItem
                value="ajukan"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Send className="h-4 w-4 text-orange-600" />
                    </div>
                    <span>6. Mengajukan Rekomendasi ke Lurah</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p>
                    Jika Anda yakin dengan rekomendasi, klik tombol{" "}
                    <strong>"Ajukan ke Lurah"</strong>. Status berubah menjadi{" "}
                    <strong>DIAJUKAN</strong>.
                  </p>
                  <p>
                    Lurah kemudian akan menyetujui atau menolak. Setelah
                    diajukan, kegiatan tidak dapat diubah lagi.
                  </p>
                  <p>
                    Jika ditolak, Anda dapat melihat alasan penolakan dari
                    lurah, memperbaiki data (misalnya perbarui data master),
                    lalu buat kegiatan baru.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 7. Ekspor Laporan PDF */}
              <AccordionItem
                value="export"
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Download className="h-4 w-4 text-teal-600" />
                    </div>
                    <span>7. Ekspor Laporan PDF</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                  <p>
                    Setiap kegiatan (DRAFT, DIAJUKAN, DISETUJUI, DITOLAK) dapat
                    diekspor ke PDF. Laporan memuat:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Informasi kegiatan</li>
                    <li>5 prioritas dengan skor, analisis, evidence</li>
                    <li>Snapshot data input terkait</li>
                    <li>Bagian pengesahan dan footer resmi</li>
                  </ul>
                  <p>Gunakan PDF untuk arsip, rapat, atau bahan koordinasi.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ClientOnly>
        </motion.div>

        {/* FAQ Perangkat Desa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mb-8">
            <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-2 text-xl text-amber-800">
                <HelpCircle className="h-5 w-5 text-amber-600" /> Pertanyaan
                yang Sering Diajukan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Apa yang
                    harus saya lakukan jika masukan tidak layak?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Gunakan status <strong>DITOLAK</strong> dan isi alasan
                    penolakan. Alasan akan terlihat oleh warga pengirim.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Bagaimana
                    cara mengubah bobot kritikalitas?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Edit data master pada menu "Kelola Data Master". Efeknya
                    langsung pada prompt AI saat generate ulang.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Apakah
                    saya bisa mengedit kegiatan yang sudah diajukan?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tidak. Setelah diajukan, kegiatan hanya bisa dilihat.
                    Pastikan data sudah benar sebelum mengajukan.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Bagaimana
                    cara melihat data mentah yang digunakan AI?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Di halaman detail kegiatan, klik "Lihat Data Input" pada
                    setiap prioritas. Data diambil dari snapshot{" "}
                    <code>inputData</code>.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Bisakah
                    saya mengimpor data master dari Excel?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Ya, tersedia fitur import. Pastikan format kolom sesuai
                    template (namaAtribut, kritikalitas, jumlah, tahunData,
                    dll.).
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Apa yang
                    terjadi jika AI gagal menghasilkan rekomendasi?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Kegiatan tetap tersimpan tanpa rekomendasi. Anda dapat
                    mengedit kegiatan (selama DRAFT) dan memicu generate ulang
                    melalui tombol "Generate Ulang" (jika ada).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-400 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} Kelurahan Panggungjati. All rights
            reserved.
          </p>
          <p className="mt-1">
            Dibangun dengan Next.js, Prisma, dan Google Gemini AI.
          </p>
        </div>
      </div>
    </div>
  );
}

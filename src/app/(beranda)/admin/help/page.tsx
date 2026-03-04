"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Settings,
  Users,
  Brain,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
  GitMerge,
  Database,
  MessageSquare,
  Calendar,
  Download,
  Eye,
  Target,
  Sparkles,
  Layers,
} from "lucide-react";

const AdminHelpPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER dengan background gradien */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 p-8 mb-8 shadow-xl">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10 flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Pusat Bantuan Administrator
              </h1>
              <p className="text-blue-100 mt-1 text-lg">
                Sistem Prioritas Program Kelurahan Panggungjati · AI-Powered
              </p>
            </div>
          </div>
        </div>

        {/* Ringkasan peran admin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Validasi Masukan</h3>
              <p className="text-sm text-slate-600">
                Periksa dan verifikasi masukan warga. Pastikan data lengkap dan
                sesuai sebelum digunakan AI.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Generate Rekomendasi
              </h3>
              <p className="text-sm text-slate-600">
                Jalankan AI untuk menghasilkan 5 prioritas program berdasarkan
                data terverifikasi dan data master.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Keputusan Akhir</h3>
              <p className="text-sm text-slate-600">
                Setujui atau tolak rekomendasi. Status masukan terkait akan
                menyesuaikan secara otomatis.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Diagram alur sederhana */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-10 overflow-hidden">
          <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
              <GitMerge className="h-5 w-5 text-blue-600" />
              Alur Kerja Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Desktop version - grid 3x2 dengan panah */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-y-8 md:gap-x-4 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2 shadow-md border-2 border-amber-200 z-10">
                  <MessageSquare className="h-8 w-8 text-amber-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-amber-50 border-amber-200 text-amber-700 font-medium px-3 py-1"
                >
                  Masukan Warga
                </Badge>
                <p className="text-xs mt-1 text-slate-500">MENUNGGU</p>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300 hidden lg:block">
                  →
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow-md border-2 border-green-200">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 border-green-200 text-green-700 font-medium px-3 py-1"
                >
                  Verifikasi Admin
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  DIVERIFIKASI / DITOLAK / DIPROSES / DISELESAIKAN
                </p>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300 hidden lg:block">
                  →
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md border-2 border-blue-200">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-700 font-medium px-3 py-1"
                >
                  Data Master
                </Badge>
                <p className="text-xs mt-1 text-slate-500">Aturan & kriteria</p>
              </div>

              {/* Step 4 (baris kedua) */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2 shadow-md border-2 border-purple-200">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-purple-50 border-purple-200 text-purple-700 font-medium px-3 py-1"
                >
                  AI Gemini
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  Generate rekomendasi
                </p>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300 hidden lg:block">
                  →
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2 shadow-md border-2 border-indigo-200">
                  <Layers className="h-8 w-8 text-indigo-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 border-indigo-200 text-indigo-700 font-medium px-3 py-1"
                >
                  5 Prioritas
                </Badge>
                <p className="text-xs mt-1 text-slate-500">DIAJUKAN</p>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300 hidden lg:block">
                  →
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2 shadow-md border-2 border-emerald-200">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 border-emerald-200 text-emerald-700 font-medium px-3 py-1"
                >
                  Persetujuan Lurah
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  DISETUJUI / DITOLAK
                </p>
              </div>
            </div>

            {/* Mobile version (stack) */}
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
                  label: "Verifikasi Admin",
                  status: "DIVERIFIKASI / DITOLAK / DIPROSES / DISELESAIKAN",
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
                  status: "DIAJUKAN",
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
                    <p className="font-medium text-slate-800">{step.label}</p>
                    <p className="text-xs text-slate-500">{step.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accordion panduan detail */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          Panduan Fungsional
        </h2>

        <Accordion type="single" collapsible className="space-y-3 mb-10">
          {/* 1. Data Master */}
          <AccordionItem
            value="master-data"
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
              <span className="flex items-center gap-3 text-lg font-medium">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-blue-600" />
                </div>
                <span>1. Pengelolaan Data Master</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
              <p className="text-slate-700">
                Data master berisi <strong>aturan penilaian AI</strong> seperti
                kritikalitas (KRITIS, TINGGI, SEDANG, RENDAH). Data ini menjadi
                bobot dalam perhitungan skor prioritas.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Struktur Data Master:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <code>namaAtribut</code> : Nama indikator (misal: "Jumlah
                    Rumah Tidak Layak Huni")
                  </li>
                  <li>
                    <code>kritikalitas</code> : Nilai bobot (KRITIS=1.0,
                    TINGGI=0.75, SEDANG=0.5, RENDAH=0.25)
                  </li>
                  <li>
                    <code>jumlah</code> : Data statistik pendukung (opsional)
                  </li>
                  <li>
                    <code>isActive</code> : Status aktif
                  </li>
                </ul>
              </div>
              <p>
                Data master digunakan oleh AI untuk menyesuaikan rekomendasi
                dengan kondisi aktual kelurahan.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* 2. Masukan Warga */}
          <AccordionItem
            value="masukan"
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
              <span className="flex items-center gap-3 text-lg font-medium">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-amber-600" />
                </div>
                <span>2. Verifikasi Masukan Warga</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
              <p className="text-slate-700">
                Admin bertugas memverifikasi setiap masukan warga. Status yang
                tersedia:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <Badge className="bg-yellow-500">MENUNGGU</Badge>
                  <p className="text-sm mt-1">Masukan baru, belum diproses.</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <Badge className="bg-green-600">DIVERIFIKASI</Badge>
                  <p className="text-sm mt-1">Layak, siap dianalisis AI.</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <Badge className="bg-red-600">DITOLAK</Badge>
                  <p className="text-sm mt-1">
                    Tidak layak, wajib memberi alasan.
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Badge className="bg-blue-500">DIPROSES</Badge>
                  <p className="text-sm mt-1">
                    Sedang digunakan dalam rekomendasi.
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 sm:col-span-2">
                  <Badge className="bg-purple-600">DISELESAIKAN</Badge>
                  <p className="text-sm mt-1">
                    Rekomendasi terkait telah disetujui.
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-500 italic">
                ⚠️ Status DIPROSES dan DISELESAIKAN diatur otomatis oleh sistem.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* 3. Kegiatan Rapat & Generate Rekomendasi */}
          <AccordionItem
            value="kegiatan"
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
              <span className="flex items-center gap-3 text-lg font-medium">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <span>3. Kegiatan Rapat & Generate Rekomendasi</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
              <p className="text-slate-700">
                Buat kegiatan rapat, pilih domain isu, dan jalankan AI untuk
                mendapatkan 5 rekomendasi prioritas.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-1">
                  <Sparkles className="h-4 w-4" /> Mode Rekomendasi:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>FUSI_DATA</strong> : Menggabungkan masukan warga dan
                    data master.
                  </li>
                  <li>
                    <strong>DATA_MASTER_SAJA</strong> : Hanya berdasarkan data
                    master (jika masukan tidak tersedia).
                  </li>
                </ul>
              </div>
              <p>Setelah generate, setiap prioritas akan memiliki:</p>
              <ul className="list-disc list-inside text-sm">
                <li>
                  <code>deskripsi</code> : Rencana aksi konkret
                </li>
                <li>
                  <code>skorPrioritas</code> : Nilai 0.00 - 1.00
                </li>
                <li>
                  <code>alasanAnalisis</code> : Penjelasan AI
                </li>
                <li>
                  <code>evidence</code> : Jumlah data pendukung
                </li>
                <li>
                  <code>usedMasukanIds / usedDataMasterIds</code> : ID data yang
                  digunakan
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* 4. Preview Data Input */}
          <AccordionItem
            value="preview"
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
              <span className="flex items-center gap-3 text-lg font-medium">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-emerald-600" />
                </div>
                <span>4. Preview Data Input (Snapshot)</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
              <p className="text-slate-700">
                Saat generate, sistem menyimpan snapshot 10 data pertama dari
                masukan warga dan data master yang dianalisis. Ini berguna untuk
                melihat contoh data yang mendasari rekomendasi.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-mono text-sm">
                  <code>rekomendasiItems.inputData</code> berisi array{" "}
                  <code>masukan</code> dan <code>dataMaster</code>.
                </p>
              </div>
              <p>
                Di halaman detail kegiatan, Anda dapat mengklik "Lihat Data
                Input" pada setiap prioritas untuk menampilkan data spesifik
                yang terkait (berdasarkan <code>usedMasukanIds</code>).
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* 5. Persetujuan & Status */}
          <AccordionItem
            value="approval"
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
              <span className="flex items-center gap-3 text-lg font-medium">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Target className="h-4 w-4 text-indigo-600" />
                </div>
                <span>5. Persetujuan Rekomendasi</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
              <p className="text-slate-700">
                Setelah rekomendasi dihasilkan, admin (atau lurah) dapat
                menyetujui atau menolaknya. Tindakan ini akan mengubah status
                masukan terkait:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Setujui</strong> → status rekomendasi menjadi{" "}
                  <code>DISETUJUI</code>, masukan terkait berubah dari{" "}
                  <code>DIPROSES</code> menjadi <code>DISELESAIKAN</code>.
                </li>
                <li>
                  <strong>Tolak</strong> → status rekomendasi menjadi{" "}
                  <code>DITOLAK</code>, masukan terkait kembali ke{" "}
                  <code>DIVERIFIKASI</code> (siap dipakai lagi).
                </li>
              </ul>
              <p className="text-sm text-slate-500 italic">
                ⚠️ Keputusan akhir ada di tangan lurah, AI hanya memberikan
                rekomendasi.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* 6. Ekspor PDF */}
          <AccordionItem
            value="export"
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
              <span className="flex items-center gap-3 text-lg font-medium">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <Download className="h-4 w-4 text-rose-600" />
                </div>
                <span>6. Ekspor Laporan PDF</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
              <p className="text-slate-700">
                Setiap kegiatan rapat dapat diekspor ke PDF. Dokumen mencakup:
              </p>
              <ul className="list-disc list-inside">
                <li>Informasi kegiatan</li>
                <li>
                  5 rekomendasi prioritas dengan skor, analisis, dan evidence
                </li>
                <li>
                  Preview data input terkait (dengan label [Masukan] / [Data
                  Master])
                </li>
                <li>Bagian pengesahan formal</li>
                <li>Footer dengan hak cipta</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* FAQ */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mb-8">
          <CardHeader className="bg-linear-to-r from-slate-100 to-white border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Pertanyaan yang Sering Diajukan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Mengapa skor prioritas bisa berbeda setiap generate?
                </p>
                <p className="text-sm text-slate-600">
                  AI generatif memiliki sedikit variasi. Gunakan skor yang
                  tersimpan di database sebagai nilai resmi.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bagaimana cara mengubah bobot kritikalitas?
                </p>
                <p className="text-sm text-slate-600">
                  Ubah melalui modul <strong>Data Master</strong>. Efeknya
                  langsung diterapkan pada prompt AI.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Apa bedanya DIPROSES dan DISELESAIKAN?
                </p>
                <p className="text-sm text-slate-600">
                  DIPROSES berarti masukan sedang digunakan dalam rekomendasi
                  yang diajukan. DISELESAIKAN berarti rekomendasi telah
                  disetujui.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bisakah saya melihat data yang digunakan AI?
                </p>
                <p className="text-sm text-slate-600">
                  Ya, di halaman detail kegiatan, klik "Lihat Data Input" pada
                  setiap prioritas. Data diambil dari snapshot{" "}
                  <code>inputData</code>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer kecil */}
        <div className="text-center text-sm text-slate-400">
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
};

export default AdminHelpPage;

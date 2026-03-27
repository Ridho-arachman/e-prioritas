"use client";

import React, { useEffect, useState } from "react";
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
  CheckCircle,
  XCircle,
  Target,
  Eye,
  Download,
  BarChart3,
  Users,
  Calendar,
  Send,
  Settings,
  Sparkles,
  Layers,
  HelpCircle,
  GitMerge,
  AlertCircle,
} from "lucide-react";

// Komponen untuk mencegah hidrasi error
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return <>{children}</>;
};

const LurahHelpPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-700 to-teal-700 p-8 mb-8 shadow-xl">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10 flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Pusat Bantuan Lurah
              </h1>
              <p className="text-emerald-100 mt-1 text-lg">
                Kelurahan Panggungjati · Prioritas Program Berbasis AI
              </p>
            </div>
          </div>
        </div>

        {/* Ringkasan peran lurah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Setujui / Tolak Kegiatan
              </h3>
              <p className="text-sm text-slate-600">
                Terima atau tolak usulan kegiatan yang diajukan oleh perangkat
                desa. Berikan catatan penolakan sebagai bahan perbaikan.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Pantau Prioritas Program
              </h3>
              <p className="text-sm text-slate-600">
                Lihat 5 prioritas utama hasil analisis AI, lengkap dengan skor,
                alasan, dan data pendukung.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Ekspor Laporan & Evaluasi
              </h3>
              <p className="text-sm text-slate-600">
                Unduh laporan kegiatan sebagai PDF untuk arsip, rapat, atau
                pelaporan ke kecamatan.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Diagram alur kerja lurah */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-10 overflow-hidden">
          <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl text-emerald-800">
              <GitMerge className="h-5 w-5 text-emerald-600" />
              Alur Kerja Lurah
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Desktop version */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-y-8 md:gap-x-16 relative">
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2 shadow-md border-2 border-amber-200 z-10">
                  <Send className="h-8 w-8 text-amber-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-amber-50 border-amber-200 text-amber-700 font-medium px-3 py-1"
                >
                  Pengajuan Perangkat
                </Badge>
                <p className="text-xs mt-1 text-slate-500">Status DIAJUKAN</p>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300">
                  →
                </div>
              </div>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md border-2 border-blue-200">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-700 font-medium px-3 py-1"
                >
                  Tinjau & Analisis
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  Lihat prioritas & data pendukung
                </p>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300">
                  →
                </div>
              </div>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow-md border-2 border-green-200">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 border-green-200 text-green-700 font-medium px-3 py-1"
                >
                  Setujui / Tolak
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  Status DISETUJUI / DITOLAK
                </p>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300">
                  →
                </div>
              </div>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2 shadow-md border-2 border-indigo-200">
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 border-indigo-200 text-indigo-700 font-medium px-3 py-1"
                >
                  Evaluasi & Arsip
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  Ekspor PDF, data historis
                </p>
              </div>
            </div>

            {/* Mobile version */}
            <div className="md:hidden space-y-4">
              {[
                {
                  icon: Send,
                  bg: "bg-amber-100",
                  border: "border-amber-200",
                  textColor: "text-amber-600",
                  label: "Pengajuan Perangkat",
                  status: "Status DIAJUKAN",
                },
                {
                  icon: Eye,
                  bg: "bg-blue-100",
                  border: "border-blue-200",
                  textColor: "text-blue-600",
                  label: "Tinjau & Analisis",
                  status: "Lihat prioritas & data pendukung",
                },
                {
                  icon: CheckCircle,
                  bg: "bg-green-100",
                  border: "border-green-200",
                  textColor: "text-green-600",
                  label: "Setujui / Tolak",
                  status: "Status DISETUJUI / DITOLAK",
                },
                {
                  icon: BarChart3,
                  bg: "bg-indigo-100",
                  border: "border-indigo-200",
                  textColor: "text-indigo-600",
                  label: "Evaluasi & Arsip",
                  status: "Ekspor PDF, data historis",
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

        {/* Panduan Fungsional Lurah */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-emerald-600" />
          Panduan untuk Lurah
        </h2>

        <ClientOnly>
          <Accordion type="single" collapsible className="space-y-3 mb-10">
            {/* 1. Daftar Kegiatan Diajukan */}
            <AccordionItem
              value="list-kegiatan"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Send className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>1. Melihat Daftar Kegiatan yang Diajukan</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setelah perangkat desa mengajukan kegiatan, kegiatan tersebut
                  akan muncul di halaman utama lurah dengan status{" "}
                  <strong>DIAJUKAN</strong>. Anda dapat melihat daftar semua
                  kegiatan yang menunggu keputusan.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm">
                    Setiap kegiatan menampilkan informasi:
                  </p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    <li>Judul & domain isu</li>
                    <li>Tanggal dibuat</li>
                    <li>Jumlah prioritas (5 rekomendasi utama)</li>
                    <li>Status saat ini</li>
                  </ul>
                </div>
                <p className="text-sm text-slate-500">
                  Klik pada kegiatan untuk melihat detail lengkap.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Tinjau Prioritas & Data Pendukung */}
            <AccordionItem
              value="tinjau-prioritas"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>2. Meninjau Prioritas & Data Pendukung</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setiap kegiatan yang diajukan berisi 5 rekomendasi prioritas
                  yang dihasilkan oleh AI Gemini. Anda dapat melihat:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Deskripsi prioritas</strong> – rencana aksi konkret.
                  </li>
                  <li>
                    <strong>Skor prioritas</strong> (0.00–1.00) – tingkat
                    urgensi.
                  </li>
                  <li>
                    <strong>Alasan analisis</strong> – penjelasan mengapa
                    prioritas ini dipilih.
                  </li>
                  <li>
                    <strong>Evidence</strong> – jumlah data pendukung (masukan
                    warga, data master) yang digunakan.
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold flex items-center gap-1">
                    <Eye className="h-4 w-4" /> Lihat Data Input
                  </p>
                  <p className="text-sm mt-1">
                    Klik tombol "Lihat Data Input" pada setiap prioritas untuk
                    melihat snapshot data spesifik (masukan warga dan/atau data
                    master) yang menjadi dasar rekomendasi. Data ditampilkan
                    dalam bentuk tabel.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Menyetujui atau Menolak Kegiatan */}
            <AccordionItem
              value="approve-reject"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span>3. Menyetujui atau Menolak Kegiatan</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setelah meninjau prioritas, Anda dapat mengambil keputusan:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <Badge className="bg-green-600">Setujui</Badge>
                    <p className="text-sm mt-2">
                      Klik tombol "Setujui" untuk menyetujui kegiatan. Status
                      akan berubah menjadi <strong>DISETUJUI</strong> dan semua
                      prioritas terkait akan otomatis ditandai sebagai{" "}
                      <strong>DISELESAIKAN</strong>.
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <Badge className="bg-red-600">Tolak</Badge>
                    <p className="text-sm mt-2">
                      Klik "Tolak", Anda akan diminta mengisi alasan penolakan.
                      Status menjadi <strong>DITOLAK</strong>. Perangkat desa
                      dapat melihat alasan untuk perbaikan.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 italic">
                  ⚠️ Keputusan bersifat final. Kegiatan yang sudah disetujui
                  tidak dapat diubah.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 4. Ekspor Laporan PDF */}
            <AccordionItem
              value="export-pdf"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Download className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>4. Ekspor Laporan PDF</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setiap kegiatan (baik yang masih DIAJUKAN, DISETUJUI, maupun
                  DITOLAK) dapat diekspor ke dalam format PDF.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-semibold">Isi dokumen PDF:</p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    <li>Informasi kegiatan (judul, domain, tanggal)</li>
                    <li>5 prioritas dengan skor, analisis, dan evidence</li>
                    <li>Snapshot data input terkait</li>
                    <li>Status keputusan dan catatan (jika ada)</li>
                    <li>Bagian pengesahan dan footer resmi</li>
                  </ul>
                </div>
                <p>
                  Tombol ekspor tersedia di halaman detail kegiatan. Gunakan
                  untuk arsip, rapat koordinasi, atau pelaporan ke kecamatan.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 5. Data Master (opsional) */}
            <AccordionItem
              value="master-data"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span>5. Melihat Data Master</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Data master berisi aturan penilaian (kritikalitas) yang
                  digunakan AI. Anda dapat melihat daftar data master yang
                  dikelola oleh perangkat desa, namun tidak dapat mengubahnya.
                </p>
                <p className="text-sm text-slate-500">
                  Untuk menjaga konsistensi, pengelolaan data master dilakukan
                  oleh perangkat desa. Jika ada perubahan yang diperlukan,
                  koordinasikan dengan perangkat.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 6. Statistik & Laporan Evaluasi */}
            <AccordionItem
              value="statistik"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-rose-600" />
                  </div>
                  <span>6. Statistik & Laporan Evaluasi</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Halaman dashboard lurah menyediakan ringkasan statistik:
                </p>
                <ul className="list-disc list-inside">
                  <li>Jumlah kegiatan DIAJUKAN, DISETUJUI, DITOLAK</li>
                  <li>Rata-rata skor prioritas tertinggi</li>
                  <li>Grafik tren pengajuan per bulan</li>
                  <li>Top 5 prioritas paling sering diusulkan</li>
                </ul>
                <p>
                  Data ini membantu Anda memantau kinerja program dan
                  mengidentifikasi isu yang paling mendesak.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ClientOnly>

        {/* FAQ untuk Lurah */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mb-8">
          <CardHeader className="bg-linear-to-r from-slate-100 to-white border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              Pertanyaan yang Sering Diajukan (Lurah)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Apakah saya bisa mengubah prioritas setelah disetujui?
                </p>
                <p className="text-sm text-slate-600">
                  Tidak. Setelah disetujui, kegiatan menjadi final. Jika ada
                  perubahan, perangkat desa perlu membuat kegiatan baru.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bagaimana jika saya salah menolak kegiatan?
                </p>
                <p className="text-sm text-slate-600">
                  Keputusan tidak dapat diubah. Namun perangkat desa dapat
                  mengajukan ulang dengan perbaikan berdasarkan alasan penolakan
                  yang Anda berikan.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Apakah AI bisa memberikan rekomendasi yang tidak sesuai?
                </p>
                <p className="text-sm text-slate-600">
                  AI bekerja berdasarkan data master dan masukan warga yang
                  diverifikasi. Jika data tidak akurat, rekomendasi bisa kurang
                  tepat. Pastikan perangkat desa selalu memperbarui data master
                  dan memverifikasi masukan dengan cermat.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bisakah saya melihat laporan tahunan?
                </p>
                <p className="text-sm text-slate-600">
                  Ya. Pada halaman laporan, Anda dapat memfilter berdasarkan
                  rentang tanggal dan mengekspor laporan lengkap beserta
                  ringkasan statistik.
                </p>
              </div>
              {/* Tambahan FAQ untuk akses masukan */}
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Apakah saya bisa melihat semua masukan warga?
                </p>
                <p className="text-sm text-slate-600">
                  Untuk menjaga fokus, lurah melihat masukan warga yang sudah
                  terintegrasi dalam rekomendasi prioritas melalui fitur "Lihat
                  Data Input". Statistik umum masukan (jumlah diverifikasi,
                  ditolak, dll.) tersedia di dashboard lurah. Untuk detail
                  setiap masukan, koordinasikan dengan perangkat desa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
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

export default LurahHelpPage;

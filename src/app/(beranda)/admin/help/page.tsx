"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Database,
  Download,
  Eye,
  FolderTree,
  GitMerge,
  HelpCircle,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// Komponen untuk mencegah hidrasi error
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return <>{children}</>;
};

const AdminHelpPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
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

        {/* Ringkasan peran Admin (sesuai 4.1.1.4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Manajemen Penuh</h3>
              <p className="text-sm text-slate-600">
                Admin memiliki akses ke seluruh fitur: kelola perangkat (user),
                kelola warga, kelola kategori/domain isu, serta seluruh data
                masukan, data master, kegiatan rapat, dan program kelurahan.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Generate Rekomendasi AI
              </h3>
              <p className="text-sm text-slate-600">
                Saat membuat kegiatan rapat, sistem otomatis memanggil Gemini AI
                untuk menghasilkan 5 prioritas program berdasarkan masukan warga
                terverifikasi dan data master aktif (Fusi Data).
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Laporan & Keputusan
              </h3>
              <p className="text-sm text-slate-600">
                Ekspor PDF setiap kegiatan rapat. Lurah dapat menyetujui atau
                menolak rekomendasi. Status masukan terkait otomatis
                menyesuaikan.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Diagram alur sederhana (sesuai 4.1.1.5 dan alur umum) */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-10 overflow-hidden">
          <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
              <GitMerge className="h-5 w-5 text-blue-600" />
              Alur Kerja Sistem (Fusi Data)
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
                  Verifikasi Admin / Perangkat
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
                <p className="text-xs mt-1 text-slate-500">Kriteria & bobot</p>
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
                  AI Gemini (Fusi Data)
                </Badge>
                <p className="text-xs mt-1 text-slate-500">
                  Generate 5 prioritas
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
                  5 Prioritas (DRAFT)
                </Badge>
                <p className="text-xs mt-1 text-slate-500">DIAJUKAN ke Lurah</p>
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
                  label: "Verifikasi Admin / Perangkat",
                  status: "DIVERIFIKASI / DITOLAK / DIPROSES / DISELESAIKAN",
                },
                {
                  icon: Database,
                  bg: "bg-blue-100",
                  border: "border-blue-200",
                  textColor: "text-blue-600",
                  label: "Data Master",
                  status: "Kriteria & bobot",
                },
                {
                  icon: Brain,
                  bg: "bg-purple-100",
                  border: "border-purple-200",
                  textColor: "text-purple-600",
                  label: "AI Gemini (Fusi Data)",
                  status: "Generate 5 prioritas",
                },
                {
                  icon: Layers,
                  bg: "bg-indigo-100",
                  border: "border-indigo-200",
                  textColor: "text-indigo-600",
                  label: "5 Prioritas (DRAFT)",
                  status: "DIAJUKAN ke Lurah",
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

        {/* Panduan detail dengan Accordion */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          Panduan Fungsional (Admin)
        </h2>

        <ClientOnly>
          <Accordion type="single" collapsible className="space-y-3 mb-10">
            {/* 1. Manajemen Perangkat & Warga */}
            <AccordionItem
              value="user-management"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <UserCog className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>1. Manajemen Perangkat (User) & Warga</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Admin dapat membuat, mengedit, mengaktifkan/nonaktifkan, dan
                  menghapus akun pengguna internal (
                  <strong>Perangkat Desa</strong> dan <strong>Lurah</strong>).
                  Setiap akun baru akan menerima email verifikasi untuk
                  mengaktifkan login.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Fitur:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Tambah user (nama, email, peran, jabatan)</li>
                    <li>Edit data user</li>
                    <li>Nonaktifkan / aktifkan akun (isActive)</li>
                    <li>Hapus akun</li>
                    <li>Kirim ulang email verifikasi</li>
                  </ul>
                </div>
                <p>
                  Selain itu, Admin juga dapat mengelola data warga (masyarakat)
                  yang terdaftar, termasuk melihat status verifikasi nomor HP,
                  mengedit data warga, atau menghapus warga (beserta seluruh
                  masukan terkait jika diperlukan).
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Kelola Kategori / Domain Isu */}
            <AccordionItem
              value="domain-isu"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <FolderTree className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span>2. Kelola Kategori / Domain Isu</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Domain Isu adalah kategori permasalahan (misal: Infrastruktur,
                  Kesehatan, Pendidikan). Admin dapat melakukan CRUD pada data
                  domain isu. Setiap masukan warga, data master, kegiatan rapat,
                  dan program kelurahan wajib terasosiasi dengan satu domain
                  isu.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      <code>kode</code> : Kode unik (misal: INFRA-01)
                    </li>
                    <li>
                      <code>nama</code> : Nama domain isu
                    </li>
                    <li>
                      <code>deskripsi</code> : Penjelasan (opsional)
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Verifikasi Masukan Warga */}
            <AccordionItem
              value="verifikasi-masukan"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>3. Verifikasi Masukan Warga</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setiap masukan dari warga memiliki status awal{" "}
                  <strong>MENUNGGU</strong>. Admin (atau Perangkat Desa) dapat
                  mengubah status:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <Badge className="bg-yellow-500">MENUNGGU</Badge>
                    <p className="text-sm mt-1">
                      Masukan baru, belum diproses.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <Badge className="bg-green-600">DIVERIFIKASI</Badge>
                    <p className="text-sm mt-1">Layak, siap dianalisis AI.</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <Badge className="bg-red-600">DITOLAK</Badge>
                    <p className="text-sm mt-1">
                      Tidak layak, wajib memberi alasan penolakan.
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
                  ⚠️ Status <strong>DIPROSES</strong> dan{" "}
                  <strong>DISELESAIKAN</strong> diatur otomatis oleh sistem saat
                  kegiatan rapat dibuat atau disetujui.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 4. Pengelolaan Data Master */}
            <AccordionItem
              value="data-master"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Database className="h-4 w-4 text-green-600" />
                  </div>
                  <span>4. Pengelolaan Data Master (Bobot Kritikalitas)</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Data master berisi indikator statistik kelurahan dengan
                  tingkat <strong>kritikalitas</strong> yang menjadi bobot dalam
                  perhitungan AI. Nilai bobot: KRITIS=1.0, TINGGI=0.75,
                  SEDANG=0.5, RENDAH=0.25.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Struktur Data Master:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      <code>namaAtribut</code> : Nama indikator (misal: "Jumlah
                      Rumah Tidak Layak Huni")
                    </li>
                    <li>
                      <code>kritikalitas</code> : Bobot (KRITIS, TINGGI, SEDANG,
                      RENDAH)
                    </li>
                    <li>
                      <code>jumlah</code> : Data numerik (opsional)
                    </li>
                    <li>
                      <code>tahunData</code> : Tahun data (opsional)
                    </li>
                    <li>
                      <code>isActive</code> : Status aktif (hanya data aktif
                      yang digunakan AI)
                    </li>
                  </ul>
                </div>
                <p>
                  Admin dan Perangkat Desa dapat menambah, mengedit, menghapus,
                  serta mengimpor data master via file Excel.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 5. Buat Kegiatan Rapat & Generate Rekomendasi AI */}
            <AccordionItem
              value="kegiatan-rapat"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>5. Buat Kegiatan Rapat & Generate Rekomendasi AI</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Admin atau Perangkat Desa dapat membuat kegiatan rapat baru.
                  Setelah mengisi data (judul, deskripsi, tanggal, lokasi,
                  domain isu, judul laporan), sistem secara otomatis memanggil{" "}
                  <strong>Google Gemini AI (gemini-2.5-flash)</strong> untuk
                  menghasilkan 5 prioritas rekomendasi dengan mode{" "}
                  <strong>FUSI_DATA</strong> (menggabungkan masukan warga
                  terverifikasi dan data master aktif).
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-1">
                    <Sparkles className="h-4 w-4" /> Proses AI:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      Mengambil maksimal 50 masukan warga berstatus DIVERIFIKASI
                      sesuai domain isu.
                    </li>
                    <li>Mengambil semua data master aktif.</li>
                    <li>
                      Menyertakan konteks program kelurahan yang sedang berjalan
                      (BERJALAN) dan program selesai dalam 21 hari terakhir
                      untuk menghindari duplikasi rekomendasi.
                    </li>
                    <li>
                      Menggunakan algoritma Levenshtein distance untuk
                      mendeteksi kemiripan dengan program yang sudah ada.
                    </li>
                    <li>
                      Menghasilkan 5 prioritas dengan deskripsi, skor (0-1),
                      alasan analisis, evidence (jumlah masukan/data master yang
                      digunakan), dan fingerprint unik.
                    </li>
                  </ul>
                </div>
                <p>
                  Hasil rekomendasi disimpan dalam kolom JSON{" "}
                  <code>rekomendasiItems</code> dengan status{" "}
                  <strong>DRAFT</strong>. Admin dapat mengedit kegiatan atau
                  menghapusnya selama status masih DRAFT.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 6. Snapshot Data Input & Evidence */}
            <AccordionItem
              value="snapshot"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span>6. Snapshot Data Input & Evidence</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Saat generate rekomendasi, sistem menyimpan snapshot 10 data
                  pertama dari masukan warga dan data master yang dianalisis
                  (dalam <code>rekomendasiItems.inputData</code>). Setiap item
                  prioritas juga menyimpan <code>usedMasukanIds</code> dan{" "}
                  <code>usedDataMasterIds</code> sebagai bukti (evidence).
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-mono text-sm">
                    <code>rekomendasiItems.prioritas[].evidence</code> berisi
                    jumlah masukan, jumlah data master, dan tingkat kritikalitas
                    yang mendasari prioritas tersebut.
                  </p>
                </div>
                <p>
                  Di halaman detail kegiatan, Anda dapat mengklik tombol{" "}
                  <strong>"Lihat Data Input"</strong> untuk menampilkan data
                  spesifik yang digunakan (hanya jika ada data terkait).
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 7. Pengajuan & Persetujuan Rekomendasi */}
            <AccordionItem
              value="approval"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-rose-600" />
                  </div>
                  <span>7. Pengajuan & Persetujuan Rekomendasi</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setelah rekomendasi siap, Admin atau Perangkat Desa dapat
                  mengajukannya ke Lurah (mengubah status menjadi{" "}
                  <strong>DIAJUKAN</strong>). Lurah kemudian akan melihat daftar
                  kegiatan yang diajukan, memilih satu, dan memutuskan:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Setujui</strong> → status rekomendasi menjadi{" "}
                    <code>DISETUJUI</code>. Masukan warga yang digunakan dalam
                    prioritas akan berubah dari <code>DIPROSES</code> menjadi{" "}
                    <code>DISELESAIKAN</code>.
                  </li>
                  <li>
                    <strong>Tolak</strong> → status menjadi <code>DITOLAK</code>
                    , wajib mengisi alasan penolakan. Masukan terkait kembali ke
                    status <code>DIVERIFIKASI</code>.
                  </li>
                </ul>
                <p className="text-sm text-slate-500 italic">
                  ⚠️ Hanya Lurah yang dapat menyetujui atau menolak rekomendasi.
                  Admin dapat mengembalikan kegiatan yang diajukan ke DRAFT jika
                  diperlukan.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 8. Ekspor Laporan PDF */}
            <AccordionItem
              value="export"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Download className="h-4 w-4 text-orange-600" />
                  </div>
                  <span>8. Ekspor Laporan PDF</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Setiap kegiatan rapat yang sudah memiliki rekomendasi dapat
                  diekspor ke PDF. Laporan mencakup:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Informasi kegiatan (judul, tanggal, lokasi, domain isu)
                  </li>
                  <li>
                    5 prioritas rekomendasi dengan skor, analisis, dan evidence
                  </li>
                  <li>
                    Preview data input terkait (jika ada, dengan label [Masukan]
                    / [Data Master])
                  </li>
                  <li>Bagian pengesahan formal</li>
                  <li>Footer hak cipta</li>
                </ul>
                <p>
                  Tombol ekspor PDF tersedia di halaman detail kegiatan untuk
                  pengguna dengan peran Admin, Perangkat Desa, dan Lurah.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 9. Program Kelurahan */}
            <AccordionItem
              value="program"
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                <span className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Target className="h-4 w-4 text-teal-600" />
                  </div>
                  <span>9. Pengelolaan Program Kelurahan</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                <p className="text-slate-700">
                  Admin dan Lurah dapat mengelola data program kelurahan
                  (tambah, edit, hapus). Program memiliki status:
                  <strong> BERJALAN, SELESAI, DITUNDA</strong>. Data program
                  digunakan oleh AI sebagai konteks eksklusi, mencegah
                  rekomendasi program yang sudah ada atau baru selesai (dalam 21
                  hari).
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      <code>judul</code> : Nama program
                    </li>
                    <li>
                      <code>deskripsi</code> : Penjelasan
                    </li>
                    <li>
                      <code>tanggalMulai / tanggalSelesai</code> : Periode
                    </li>
                    <li>
                      <code>lokasi</code> : Tempat pelaksanaan
                    </li>
                    <li>
                      <code>pic</code> : Penanggung jawab
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ClientOnly>

        {/* FAQ (Pertanyaan yang Sering Diajukan) */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mb-8">
          <CardHeader className="bg-linear-to-r from-slate-100 to-white border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Pertanyaan yang Sering Diajukan (FAQ)
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
                  AI generatif memiliki sedikit variasi. Skor yang tersimpan di
                  database adalah nilai resmi yang digunakan untuk keputusan.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bagaimana cara mengubah bobot kritikalitas?
                </p>
                <p className="text-sm text-slate-600">
                  Edit data master di menu "Kelola Data Master". Bobot akan
                  langsung berpengaruh pada prompt AI saat generate ulang.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Apa beda DIPROSES dan DISELESAIKAN?
                </p>
                <p className="text-sm text-slate-600">
                  DIPROSES berarti masukan sedang digunakan dalam rekomendasi
                  yang diajukan. DISELESAIKAN berarti rekomendasi telah
                  disetujui dan masukan tersebut telah ditindaklanjuti.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bisakah saya melihat data mentah yang digunakan AI?
                </p>
                <p className="text-sm text-slate-600">
                  Ya, di halaman detail kegiatan, klik "Lihat Data Input" pada
                  setiap prioritas. Data diambil dari snapshot{" "}
                  <code>inputData</code> yang tersimpan.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Bagaimana cara menghindari rekomendasi duplikat program?
                </p>
                <p className="text-sm text-slate-600">
                  AI secara otomatis menyertakan daftar program BERJALAN dan
                  program SELESAI dalam 21 hari terakhir sebagai konteks
                  eksklusi, sehingga tidak merekomendasikan program yang sudah
                  ada.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Apa yang terjadi jika AI gagal menghasilkan rekomendasi?
                </p>
                <p className="text-sm text-slate-600">
                  Kegiatan tetap tersimpan tetapi tanpa rekomendasi. Anda dapat
                  mengedit kegiatan (selama masih DRAFT) dan memicu generate
                  ulang melalui tombol "Generate Ulang" (jika disediakan).
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

export default AdminHelpPage;

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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
  Send,
} from "lucide-react";

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
        {/* Header with amber linear */}
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

        {/* Role summary cards with amber/orange theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: CheckCircle,
              title: "Verifikasi Masukan",
              desc: "Periksa dan verifikasi masukan warga. Status dapat diubah menjadi DIVERIFIKASI, DITOLAK, atau dibiarkan MENUNGGU.",
              iconBg: "bg-amber-100 dark:bg-amber-900/30",
              iconColor: "text-amber-600 dark:text-amber-400",
            },
            {
              icon: Database,
              title: "Kelola Data Master",
              desc: "Input dan kelola data master (indikator, kritikalitas) yang akan digunakan AI sebagai bobot penilaian.",
              iconBg: "bg-orange-100 dark:bg-orange-900/30",
              iconColor: "text-orange-600 dark:text-orange-400",
            },
            {
              icon: Send,
              title: "Buat & Ajukan Kegiatan",
              desc: "Buat kegiatan rapat, jalankan AI untuk menghasilkan rekomendasi, lalu ajukan ke lurah untuk disetujui.",
              iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
              iconColor: "text-yellow-600 dark:text-yellow-400",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Flow diagram - header with amber linear */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white rounded-2xl mb-10 overflow-hidden">
            <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-2 text-xl text-amber-800">
                <GitMerge className="h-5 w-5 text-amber-600" />
                Alur Kerja Perangkat Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Desktop version - unchanged steps, just the header color changed */}
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
                    Verifikasi Perangkat
                  </Badge>
                  <p className="text-xs mt-1 text-slate-500">
                    DIVERIFIKASI / DITOLAK
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
                  <p className="text-xs mt-1 text-slate-500">
                    Aturan & kriteria
                  </p>
                </div>

                {/* Step 4 */}
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

              {/* Mobile version (unchanged) */}
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
                    label: "Verifikasi Perangkat",
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

        {/* Accordion guide with amber/orange accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-amber-600" />
            Panduan Fungsional Perangkat Desa
          </h2>

          <ClientOnly>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "master-data",
                  icon: Settings,
                  bg: "bg-amber-100 dark:bg-amber-900/30",
                  color: "text-amber-600 dark:text-amber-400",
                  title: "1. Pengelolaan Data Master",
                  content: (
                    <>
                      <p className="text-slate-700 dark:text-slate-300">
                        Data master berisi <strong>aturan penilaian AI</strong>{" "}
                        seperti kritikalitas (KRITIS, TINGGI, SEDANG, RENDAH).
                        Data ini menjadi bobot dalam perhitungan skor prioritas.
                      </p>
                      <div className="bg-slate-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Struktur Data Master:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>
                            <code>namaAtribut</code> : Nama indikator (misal:
                            "Jumlah Rumah Tidak Layak Huni")
                          </li>
                          <li>
                            <code>kritikalitas</code> : Nilai bobot (KRITIS=1.0,
                            TINGGI=0.75, SEDANG=0.5, RENDAH=0.25)
                          </li>
                          <li>
                            <code>jumlah</code> : Data statistik pendukung
                            (opsional)
                          </li>
                          <li>
                            <code>isActive</code> : Status aktif
                          </li>
                        </ul>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        Data master digunakan oleh AI untuk menyesuaikan
                        rekomendasi dengan kondisi aktual kelurahan.
                      </p>
                    </>
                  ),
                },
                {
                  value: "masukan",
                  icon: Users,
                  bg: "bg-amber-100 dark:bg-amber-900/30",
                  color: "text-amber-600 dark:text-amber-400",
                  title: "2. Verifikasi Masukan Warga",
                  content: (
                    <>
                      <p className="text-slate-700 dark:text-slate-300">
                        Perangkat desa bertugas memverifikasi setiap masukan
                        warga. Status yang dapat diubah:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <Badge className="bg-yellow-500">MENUNGGU</Badge>
                          <p className="text-sm mt-1">
                            Masukan baru, belum diproses.
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                          <Badge className="bg-green-600">DIVERIFIKASI</Badge>
                          <p className="text-sm mt-1">
                            Layak, siap dianalisis AI.
                          </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-800">
                          <Badge className="bg-red-600">DITOLAK</Badge>
                          <p className="text-sm mt-1">
                            Tidak layak, wajib memberi alasan.
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                          <Badge className="bg-blue-500">DIPROSES</Badge>
                          <p className="text-sm mt-1">
                            (Otomatis) Sedang digunakan dalam rekomendasi.
                          </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800 sm:col-span-2">
                          <Badge className="bg-purple-600">DISELESAIKAN</Badge>
                          <p className="text-sm mt-1">
                            (Otomatis) Rekomendasi terkait telah disetujui
                            lurah.
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                        ⚠️ Status DIPROSES dan DISELESAIKAN diatur otomatis oleh
                        sistem.
                      </p>
                    </>
                  ),
                },
                {
                  value: "kegiatan",
                  icon: Calendar,
                  bg: "bg-orange-100 dark:bg-orange-900/30",
                  color: "text-orange-600 dark:text-orange-400",
                  title: "3. Kegiatan Rapat & Generate Rekomendasi",
                  content: (
                    <>
                      <p className="text-slate-700 dark:text-slate-300">
                        Buat kegiatan rapat, pilih domain isu, dan jalankan AI
                        untuk mendapatkan 5 rekomendasi prioritas. Hasilnya akan
                        tersimpan sebagai <strong>DRAFT</strong>.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-1">
                          <Sparkles className="h-4 w-4" /> Mode Rekomendasi:
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <strong>FUSI_DATA</strong> : Menggabungkan masukan
                            warga dan data master.
                          </li>
                          <li>
                            <strong>DATA_MASTER_SAJA</strong> : Hanya
                            berdasarkan data master (jika masukan tidak
                            tersedia).
                          </li>
                        </ul>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        Setelah generate, setiap prioritas akan memiliki:
                      </p>
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
                          <code>usedMasukanIds / usedDataMasterIds</code> : ID
                          data yang digunakan
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  value: "preview",
                  icon: Eye,
                  bg: "bg-yellow-100 dark:bg-yellow-900/30",
                  color: "text-yellow-600 dark:text-yellow-400",
                  title: "4. Preview Data Input (Snapshot)",
                  content: (
                    <>
                      <p className="text-slate-700 dark:text-slate-300">
                        Saat generate, sistem menyimpan snapshot 10 data pertama
                        dari masukan warga dan data master yang dianalisis. Ini
                        berguna untuk melihat contoh data yang mendasari
                        rekomendasi.
                      </p>
                      <div className="bg-slate-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <code>rekomendasiItems.inputData</code> berisi array{" "}
                          <code>masukan</code> und <code>dataMaster</code>.
                        </p>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        Di halaman detail kegiatan, Anda dapat mengklik "Lihat
                        Data Input" pada setiap prioritas untuk menampilkan data
                        spesifik yang terkait (berdasarkan{" "}
                        <code>usedMasukanIds</code>).
                      </p>
                    </>
                  ),
                },
                {
                  value: "pengajuan",
                  icon: Send,
                  bg: "bg-amber-100 dark:bg-amber-900/30",
                  color: "text-amber-600 dark:text-amber-400",
                  title: "5. Mengajukan Rekomendasi ke Lurah",
                  content: (
                    <>
                      <p className="text-slate-700 dark:text-slate-300">
                        Setelah rekomendasi dihasilkan dan Anda yakin, ajukan
                        kegiatan tersebut ke lurah. Dengan mengklik tombol
                        "Ajukan", status kegiatan berubah dari{" "}
                        <strong>DRAFT</strong> menjadi <strong>DIAJUKAN</strong>
                        . Lurah kemudian akan menyetujui atau menolaknya.
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                        ⚡ Kegiatan yang sudah diajukan tidak dapat diubah lagi.
                      </p>
                    </>
                  ),
                },
                {
                  value: "export",
                  icon: Download,
                  bg: "bg-rose-100 dark:bg-rose-900/30",
                  color: "text-rose-600 dark:text-rose-400",
                  title: "6. Ekspor Laporan PDF",
                  content: (
                    <>
                      <p className="text-slate-700 dark:text-slate-300">
                        Setiap kegiatan rapat dapat diekspor ke PDF. Dokumen
                        mencakup:
                      </p>
                      <ul className="list-disc list-inside">
                        <li>Informasi kegiatan</li>
                        <li>
                          5 rekomendasi prioritas dengan skor, analisis, dan
                          evidence
                        </li>
                        <li>
                          Preview data input terkait (dengan label [Masukan] /
                          [Data Master])
                        </li>
                        <li>Bagian pengesahan formal</li>
                        <li>Footer dengan hak cipta</li>
                      </ul>
                    </>
                  ),
                },
              ].map((item, idx) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-gray-800 hover:no-underline">
                    <span className="flex items-center gap-3 text-lg font-medium">
                      <div
                        className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}
                      >
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <span>{item.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 space-y-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ClientOnly>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mb-8">
            <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-2 text-xl text-amber-800">
                <HelpCircle className="h-5 w-5 text-amber-600" />
                Pertanyaan yang Sering Diajukan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Apa yang harus saya lakukan jika masukan tidak layak?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Gunakan status <strong>DITOLAK</strong> dan isi alasan
                    penolakan. Alasan ini akan terlihat oleh pengirim.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Bagaimana cara mengubah bobot kritikalitas?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Ubah melalui modul <strong>Data Master</strong>. Efeknya
                    langsung diterapkan pada prompt AI.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Apakah saya bisa mengedit kegiatan yang sudah diajukan?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tidak. Setelah diajukan, kegiatan hanya bisa dilihat; tidak
                    dapat diubah. Pastikan data sudah benar sebelum mengajukan.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Bagaimana cara melihat data yang digunakan AI?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Di halaman detail kegiatan, klik "Lihat Data Input" pada
                    setiap prioritas. Data diambil dari snapshot{" "}
                    <code>inputData</code>.
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

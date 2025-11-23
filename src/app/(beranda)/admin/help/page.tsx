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

import { BookOpen, Settings, Users, Brain, FileText } from "lucide-react";

const AdminHelpPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <BookOpen className="w-9 h-9 text-blue-600" />
          Panduan Bantuan Administrator
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          Sistem Prioritas Program Kelurahan Panggungjati · Next.js + Gemini AI
        </p>
      </div>

      <Separator className="my-6" />

      {/* SECTION 1 */}
      <Card className="shadow-lg rounded-3xl border border-gray-200">
        <CardHeader className="bg-blue-50 rounded-t-3xl">
          <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
            <Users className="w-5 h-5" />
            I. Tugas Utama & Peran Admin
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Anda berperan sebagai <strong>Penjamin Master Data AI</strong>.
            Admin bertanggung jawab memastikan data masuk benar, lengkap, dan
            sesuai sebelum digunakan oleh Gemini AI.
          </p>

          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1 bg-blue-100 text-blue-700"
          >
            Fokus Utama: Validasi Data & Aturan AI
          </Badge>
        </CardContent>
      </Card>

      {/* SECTION 2 */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        II. Panduan Modul Fungsional
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {/* MASTER DATA */}
        <AccordionItem value="master-data">
          <AccordionTrigger className="text-lg hover:text-blue-600 transition-all">
            <span className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              1. Pengelolaan Master Data (Logika AI)
            </span>
          </AccordionTrigger>

          <AccordionContent className="space-y-3">
            <p>
              Modul ini mengatur <strong>aturan penilaian AI</strong> seperti
              urgensi, visi digital, dan konteks lokal.
            </p>

            <h3 className="font-semibold mt-3">Tabel Kunci Master:</h3>

            <div className="overflow-hidden rounded-xl border shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="py-2 px-4 text-left">Model</th>
                    <th className="py-2 px-4 text-left">Fungsi</th>
                    <th className="py-2 px-4 text-left">Untuk Skripsi</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4 font-medium">DataMaster</td>
                    <td>Aturan penilaian AI</td>
                    <td>Menggantikan bobot matematis SPK</td>
                  </tr>

                  <tr className="border-t">
                    <td className="py-2 px-4 font-medium">Kategori</td>
                    <td>Klasifikasi jenis program</td>
                    <td>Standarisasi output AI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* INPUT WARGA */}
        <AccordionItem value="input-warga">
          <AccordionTrigger className="text-lg hover:text-blue-600 transition-all">
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              2. Pengelolaan Masukan Warga (Verifikasi)
            </span>
          </AccordionTrigger>

          <AccordionContent className="space-y-3">
            <h3 className="font-semibold">Alur Verifikasi:</h3>

            <ol className="list-decimal ml-5 space-y-1">
              <li>
                Cek status awal: <code>MENUNGGU_VERIFIKASI</code>.
              </li>
              <li>Periksa kelayakan administrasi.</li>
              <li>
                Jika layak → ubah status menjadi <code>DITERIMA</code>.
              </li>
              <li>
                Jika tidak layak → <code>DITOLAK</code> + wajib beri alasan.
              </li>
            </ol>

            <p className="text-red-600 font-medium">
              ⚠️ Admin tidak mengatur prioritas. Skor dihitung otomatis oleh AI.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* AI PROCESS */}
        <AccordionItem value="ai-process">
          <AccordionTrigger className="text-lg hover:text-blue-600 transition-all">
            <span className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              3. Modul Rekomendasi (Proses AI)
            </span>
          </AccordionTrigger>

          <AccordionContent className="space-y-3">
            <ul className="list-disc ml-5 space-y-2">
              <li>
                AI hanya menganalisis usulan dengan status <code>DITERIMA</code>
                .
              </li>
              <li>
                Tekan tombol <strong>Jalankan Analisis AI</strong> untuk
                menghasilkan skor.
              </li>
              <li>
                Hasil akan masuk ke tabel <strong>Rekomendasi</strong>.
              </li>
              <li>
                Skor AI (1.0–5.0) dapat digunakan untuk laporan akhir / skripsi.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* LAPORAN */}
        <AccordionItem value="laporan">
          <AccordionTrigger className="text-lg hover:text-blue-600 transition-all">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              4. Pelaporan & Keputusan
            </span>
          </AccordionTrigger>

          <AccordionContent>
            <p>
              Laporan otomatis diurutkan berdasarkan skor AI. Gunakan fitur
              ekspor untuk rapat, evaluasi kelurahan, dan dokumentasi resmi.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-8" />

      {/* FAQ */}
      <Card className="shadow-lg rounded-3xl border border-gray-200 mb-12">
        <CardHeader className="bg-blue-50 rounded-t-3xl">
          <CardTitle className="text-xl text-blue-700">
            III. Pertanyaan Sering Diajukan
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 space-y-6 text-gray-700">
          <div>
            <p className="font-semibold">
              Q: Mengapa skor AI bisa berubah sedikit?
            </p>
            <p className="text-gray-600 leading-relaxed">
              A: Karena AI generatif. Gunakan skor yang tersimpan di database
              sebagai nilai resmi.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Q: Bagaimana cara mengubah kriteria penilaian AI?
            </p>
            <p className="text-gray-600 leading-relaxed">
              A: Ubah melalui modul <strong>DataMaster</strong>. Efeknya
              langsung diterapkan pada prompt analisis AI.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHelpPage;

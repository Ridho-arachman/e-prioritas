"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Shield,
  Lock,
  Eye,
  Scale,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const termsSections = [
  {
    title: "Penerimaan Ketentuan",
    icon: FileText,
    content:
      "Dengan mengakses dan menggunakan Sistem Prioritas Pembangunan Kelurahan Panggungjati, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan, mohon untuk tidak menggunakan layanan ini.",
  },
  {
    title: "Penggunaan Layanan",
    icon: Globe,
    content:
      "Layanan ini disediakan untuk warga dan perangkat desa dalam rangka perencanaan pembangunan. Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan peraturan perundang-undangan yang berlaku.",
  },
  {
    title: "Akun Pengguna",
    icon: Shield,
    content:
      "Perangkat desa yang memiliki akun bertanggung jawab penuh atas keamanan kredensialnya. Setiap aktivitas yang terjadi dalam akun menjadi tanggung jawab pemilik akun. Segera laporkan jika terjadi penyalahgunaan.",
  },
  {
    title: "Data Pribadi",
    icon: Lock,
    content:
      "Pengumpulan dan penggunaan data pribadi Anda diatur dalam Kebijakan Privasi terpisah. Dengan menggunakan layanan ini, Anda menyetujui pemrosesan data sesuai kebijakan tersebut.",
  },
  {
    title: "Hak Kekayaan Intelektual",
    icon: Eye,
    content:
      "Seluruh konten, fitur, dan fungsionalitas sistem dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. Dilarang menyalin, memodifikasi, atau mendistribusikan tanpa izin tertulis.",
  },
  {
    title: "Pembatasan Tanggung Jawab",
    icon: Scale,
    content:
      "Sistem disediakan 'sebagaimana adanya'. Kelurahan tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan ini, termasuk namun tidak terbatas pada keakuratan rekomendasi AI.",
  },
  {
    title: "Perubahan Ketentuan",
    icon: Clock,
    content:
      "Kami dapat memperbarui Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diumumkan melalui situs ini. Penggunaan berkelanjutan setelah perubahan berarti menyetujui ketentuan baru.",
  },
  {
    title: "Hukum yang Berlaku",
    icon: Scale,
    content:
      "Syarat dan Ketentuan ini tunduk pada hukum Republik Indonesia. Setiap sengketa akan diselesaikan di Pengadilan Negeri Serang.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SyaratKetentuanClient() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg mb-6"
          >
            <FileText className="h-8 w-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
          >
            Syarat dan Ketentuan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Ketentuan penggunaan Sistem Prioritas Pembangunan Kelurahan
            Panggungjati
          </motion.p>
        </div>
      </section>

      {/* Pendahuluan */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Pendahuluan
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Selamat datang di Sistem Prioritas Pembangunan Kelurahan
            Panggungjati. Dengan mengakses dan menggunakan layanan ini, Anda
            dianggap telah membaca, memahami, dan menyetujui seluruh Syarat dan
            Ketentuan yang berlaku. Mohon baca dengan seksama sebelum
            menggunakan layanan kami.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            >
              Berlaku sejak: 1 Maret 2026
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
            >
              Versi 2.0
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* Grid Pasal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {termsSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

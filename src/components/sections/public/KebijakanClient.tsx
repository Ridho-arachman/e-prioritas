// app/kebijakan-privasi/page.tsx
"use client";

import { motion } from "framer-motion";
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
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
  Mail,
  Cookie,
  Clock,
  Scale,
  Server,
  Globe,
} from "lucide-react";

const privacySections = [
  {
    title: "Pengumpulan Data",
    icon: Database,
    content:
      "Kami mengumpulkan data pribadi yang Anda berikan secara sukarela saat menggunakan layanan kami, seperti nama, alamat email, nomor telepon, dan aspirasi pembangunan. Data ini digunakan untuk memproses masukan Anda dan menghasilkan rekomendasi prioritas pembangunan.",
  },
  {
    title: "Penggunaan Data",
    icon: Eye,
    content:
      "Data yang dikumpulkan digunakan untuk: (1) Memverifikasi dan memproses masukan warga, (2) Menganalisis kebutuhan pembangunan, (3) Menghasilkan rekomendasi prioritas melalui AI, (4) Menyusun laporan untuk perangkat desa, dan (5) Meningkatkan kualitas layanan kami.",
  },
  {
    title: "Perlindungan Data",
    icon: Lock,
    content:
      "Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. Data disimpan di server aman dengan enkripsi dan akses terbatas.",
  },
  {
    title: "Hak Pengguna",
    icon: UserCheck,
    content:
      "Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda. Jika ingin menggunakan hak ini, silakan hubungi perangkat desa melalui kontak yang tersedia. Kami akan merespons permintaan Anda sesuai dengan peraturan yang berlaku.",
  },
  {
    title: "Penggunaan Cookie",
    icon: Cookie,
    content:
      "Kami menggunakan cookie untuk meningkatkan pengalaman pengguna, menyimpan preferensi, dan menganalisis lalu lintas situs. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.",
  },
  {
    title: "Pembagian Data",
    icon: Server,
    content:
      "Data pribadi Anda tidak akan dijual, disewakan, atau dibagikan kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum atau untuk kepentingan publik dalam rangka pembangunan kelurahan.",
  },
  {
    title: "Retensi Data",
    icon: Clock,
    content:
      "Kami menyimpan data Anda selama diperlukan untuk memenuhi tujuan pengumpulan data atau sesuai dengan ketentuan peraturan perundang-undangan. Data yang tidak lagi diperlukan akan dihapus atau dianonimkan.",
  },
  {
    title: "Kepatuhan Hukum",
    icon: Scale,
    content:
      "Kami mematuhi Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan peraturan terkait lainnya. Kebijakan ini dapat diperbarui secara berkala untuk mencerminkan perubahan praktik atau regulasi.",
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

export default function KebijakanClient() {
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
            <Shield className="h-8 w-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
          >
            Kebijakan Privasi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Komitmen kami dalam melindungi data pribadi Anda
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
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Pendahuluan
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Kebijakan Privasi ini menjelaskan bagaimana Kelurahan Panggungjati
            ("kami", "kita", atau "kelurahan") mengumpulkan, menggunakan, dan
            melindungi informasi pribadi Anda saat menggunakan Sistem Prioritas
            Pembangunan. Kami berkomitmen untuk menjaga kerahasiaan dan keamanan
            data pribadi Anda sesuai dengan peraturan perundang-undangan yang
            berlaku, termasuk Undang-Undang Nomor 27 Tahun 2022 tentang
            Pelindungan Data Pribadi.
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

      {/* Grid Kebijakan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {privacySections.map((section, idx) => {
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

      {/* Informasi Kontak */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 shadow-xl text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <Mail className="h-8 w-8 mx-auto md:mx-0" />
              <h3 className="text-2xl font-bold">
                Ada pertanyaan tentang privasi?
              </h3>
              <p className="text-blue-100">
                Hubungi kami untuk informasi lebih lanjut mengenai kebijakan
                privasi.
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a
                  href="mailto:desa.panggungjati@example.com"
                  className="hover:underline"
                >
                  desa.panggungjati@example.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>Jl. Raya Panggungjati No. 1, Kota Cimahi</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Separator className="mb-4" />
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Kelurahan Panggungjati. Hak Cipta
          Dilindungi.
        </p>
      </footer>
    </div>
  );
}

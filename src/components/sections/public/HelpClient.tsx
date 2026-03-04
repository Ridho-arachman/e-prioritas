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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Users,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const faqItems = [
  {
    question: "Bagaimana cara menyampaikan masukan?",
    answer:
      "Anda dapat menyampaikan masukan melalui halaman 'Masukan Warga'. Isi formulir dengan data diri dan masukan Anda, lalu kirim. Masukan akan diverifikasi oleh perangkat desa sebelum diproses lebih lanjut.",
  },
  {
    question: "Apakah masukan saya dijamin kerahasiaannya?",
    answer:
      "Ya, data pribadi Anda akan dijaga kerahasiaannya sesuai dengan Kebijakan Privasi yang berlaku. Data hanya digunakan untuk keperluan pembangunan kelurahan.",
  },
  {
    question: "Bagaimana cara mengetahui status masukan saya?",
    answer:
      "Saat ini, status masukan dapat ditanyakan langsung ke kantor kelurahan atau melalui kontak yang tersedia. Kami sedang mengembangkan fitur pelacakan online.",
  },
  {
    question: "Apa yang dimaksud dengan 'Prioritas per Rapat'?",
    answer:
      "Setiap kegiatan rapat akan menghasilkan 5 rekomendasi prioritas yang dihasilkan oleh AI. Ini membantu perangkat desa fokus pada program yang paling mendesak.",
  },
  {
    question: "Apakah saya perlu login untuk melihat rekomendasi?",
    answer:
      "Halaman rekomendasi dan detail kegiatan hanya dapat diakses oleh perangkat desa yang memiliki akun. Untuk warga, informasi umum tersedia di halaman 'Tentang'.",
  },
];

export default function HelpClient() {
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
            <HelpCircle className="h-8 w-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
          >
            Pusat Bantuan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Temukan jawaban atas pertanyaan Anda tentang sistem prioritas
            pembangunan Kelurahan Panggungjati.
          </motion.p>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Layanan yang Tersedia
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: MessageSquare,
              title: "Sampaikan Masukan",
              desc: "Isi formulir untuk menyampaikan aspirasi pembangunan.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: FileText,
              title: "Lihat Prioritas",
              desc: "Informasi umum tentang prioritas pembangunan terkini.",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Users,
              title: "Konsultasi Langsung",
              desc: "Hubungi perangkat desa untuk pertanyaan lebih lanjut.",
              color: "from-purple-500 to-pink-500",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-full bg-linear-to-r ${item.color} text-white mb-4`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Pertanyaan Umum
        </motion.h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <AccordionItem
                value={`item-${idx}`}
                className="border rounded-lg overflow-hidden shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <span className="text-left font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

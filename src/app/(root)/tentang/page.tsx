"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Brain,
  MessageSquare,
  Users,
  Building,
  Activity,
  User,
  Leaf,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useGet } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";

// Tipe data dari API
interface MasukanPerDomain {
  domain: string;
  count: number;
}

interface ApiResponse {
  data: {
    totalMasukan: number;
    masukanPerDomain: MasukanPerDomain[];
    prioritas: string[];
    kelurahan: {
      totalPenduduk: number;
      totalKepalaKeluarga: number;
      sebaranPekerjaan: {
        petani: number;
        wirausaha: number;
        pegawaiSwasta: number;
        lainnya: number;
      };
      jumlahFasilitasPublik: number;
    };
  };
}

// Komponen untuk animasi counter
const Counter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function TentangPage() {
  const { data: apiData, isLoading } = useGet("/public/tentang-stats");
  const typedData = apiData;

  const totalMasukan = typedData?.totalMasukan ?? 0;
  const masukanPerDomain = typedData?.masukanPerDomain ?? [];
  const prioritas = typedData?.prioritas ?? [];
  const kelurahan = typedData?.kelurahan ?? {
    totalPenduduk: 0,
    totalKepalaKeluarga: 0,
    sebaranPekerjaan: { petani: 0, wirausaha: 0, pegawaiSwasta: 0, lainnya: 0 },
    jumlahFasilitasPublik: 0,
  };

  // Urutkan domain berdasarkan jumlah masukan (terbanyak ke terkecil)
  const sortedDomains = [...masukanPerDomain].sort((a, b) => b.count - a.count);
  // Ambil maksimal 5 domain teratas (atau semua jika kurang)
  const topDomains = sortedDomains.slice(0, 5);
  // Warna untuk progress bar
  const domainColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
          >
            Tentang Sistem Prioritas Pembangunan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Sistem ini dirancang untuk membantu Kelurahan Panggungjati dalam
            mengambil keputusan strategis terkait pembangunan, dengan
            mengintegrasikan aspirasi warga dan data riil lapangan.
          </motion.p>
        </div>
      </section>

      {/* Gambaran Umum Kelurahan dengan statistik animasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Gambaran Umum Kelurahan Panggungjati
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              label: "Total Penduduk",
              value: kelurahan.totalPenduduk,
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: User,
              label: "Kepala Keluarga",
              value: kelurahan.totalKepalaKeluarga,
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Leaf,
              label: "Warga Petani",
              value: kelurahan.sebaranPekerjaan.petani,
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Briefcase,
              label: "Warga Non-Petani",
              value:
                kelurahan.sebaranPekerjaan.pegawaiSwasta +
                kelurahan.sebaranPekerjaan.wirausaha +
                kelurahan.sebaranPekerjaan.lainnya,
              color: "from-orange-500 to-red-500",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                <div
                  className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-full bg-linear-to-r ${item.color} text-white mb-4`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">
                    {isLoading ? (
                      <Skeleton className="h-8 w-20 mx-auto" />
                    ) : (
                      <Counter value={item.value} />
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {item.label}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prioritas & Analisis dengan bar progress animasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Prioritas Pembangunan Berdasarkan Data
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Masukan Warga */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Masukan Warga Terbanyak
                </CardTitle>
                <CardDescription>
                  Berdasarkan domain isu yang paling sering disampaikan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : topDomains.length > 0 ? (
                  <div className="space-y-4">
                    {topDomains.map((item, idx) => {
                      const percentage =
                        totalMasukan > 0
                          ? (item.count / totalMasukan) * 100
                          : 0;
                      const color = domainColors[idx % domainColors.length];
                      return (
                        <div
                          key={item.domain}
                          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.domain}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className={`h-full ${color}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Belum ada data masukan warga.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* 5 Prioritas Utama */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  5 Rekomendasi Prioritas Utama
                </CardTitle>
                <CardDescription>
                  Dihasilkan oleh kecerdasan buatan berdasarkan data yang ada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {prioritas.length > 0 ? (
                      prioritas.map((item: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </motion.li>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        Belum ada rekomendasi prioritas.
                      </p>
                    )}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Lokasi Kelurahan Panggungjati
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10525.24507717553!2d106.12355801789452!3d-6.11530055437781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418ae26af8c891%3A0xf4d482e29cf682f1!2sPanggungjati%2C%20Kec.%20Taktakan%2C%20Kota%20Serang%2C%20Banten!5e0!3m2!1sid!2sid!4v1772262400387!5m2!1sid!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Kelurahan Panggungjati"
            className="w-full h-80 md:h-96"
          ></iframe>
        </motion.div>
      </section>

      {/* Cara Kerja */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50"
        >
          Bagaimana Sistem Ini Bekerja?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Users,
              title: "1. Warga Berpartisipasi",
              desc: "Warga menyampaikan masukan melalui formulir yang tersedia.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Activity,
              title: "2. Data Terkumpul",
              desc: "Perangkat desa mengumpulkan dan memverifikasi data lapangan.",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Brain,
              title: "3. Analisis AI",
              desc: "Google Gemini AI menganalisis seluruh data untuk memberikan rekomendasi.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Building,
              title: "4. Keputusan Tepat",
              desc: "Rekomendasi membantu perangkat desa membuat keputusan yang terarah.",
              color: "from-orange-500 to-red-500",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div
                  className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full bg-linear-to-r ${item.color} text-white mb-4 shadow-lg`}
                  >
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quotes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-linear-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10 rounded-3xl" />
          <div className="relative z-10 text-center text-white">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <p className="text-xl md:text-2xl font-medium italic">
              "Dengan sistem ini, pembangunan di kelurahan kami menjadi lebih
              terarah dan sesuai dengan kebutuhan warga."
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Ibu Lurah Panggungjati</p>
                <p className="text-sm opacity-80">Kepala Kelurahan</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

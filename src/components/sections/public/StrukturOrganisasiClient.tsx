"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Crown,
  Users,
  Shield,
  HeartHandshake,
  BookOpen,
  Users2,
  Handshake,
  Building2,
  Briefcase,
  ChevronRight,
  Star,
  MapPin,
  Database,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";

export default function StrukturOrganisasiClient() {
  // Data Struktur Pemerintahan (berdasarkan dokumen tahun 2026)
  const pemerintahan = {
    lurah: {
      nama: "Heruji, S.Pd.I., M.Si",
      jabatan: "Kepala Kelurahan Panggungjati",
    },
    sekretaris: {
      nama: "Rohmawati, S.Tr.Keb",
      jabatan: "Sekretaris Kelurahan",
    },
    kasi: [
      { nama: "Ipah Satariyah, S.Pd", bidang: "Kasi Pemerintahan" },
      { nama: "Diana, S.ST", bidang: "Kasi PMK" },
    ],
    operator: [
      { nama: "Aas Astari", bidang: "Operator Lampid" },
      { nama: "Ahmad Fariz", bidang: "Operator Prodeskel" },
      { nama: "Amiyah / Aas Astari", bidang: "Operator DTKS" },
    ],
    staff: [
      { nama: "Muhamad Nurhadi", bidang: "Tenaga Administrasi" },
      { nama: "Ijah Faizah", bidang: "Pramubakti" },
      { nama: "Mukhlas", bidang: "Penjaga Kantor" },
    ],
  };

  // Data LPM (Lembaga Pemberdayaan Masyarakat)
  const lpm = {
    ketua: "Bahrun",
    bendahara: "Saiman",
    sekretaris: "Rosyid, ST",
    anggota: [
      "Eri Supriyadi",
      "H. Mistar",
      "Sanari",
      "Sutrisno",
      "Udin",
      "Abdullah",
    ],
  };

  // Data Lembaga Kemasyarakatan Lainnya (berdasarkan dokumen)
  const lembagaKemasyarakatan = [
    {
      nama: "LPM",
      jumlah: 3,
      icon: Handshake,
      desc: "Lembaga Pemberdayaan Masyarakat",
    },
    {
      nama: "PKK",
      jumlah: 7,
      icon: BookOpen,
      desc: "Pembinaan Kesejahteraan Keluarga",
    },
    {
      nama: "Posyandu",
      jumlah: 33,
      icon: HeartHandshake,
      desc: "Pelayanan Kesehatan Ibu dan Anak",
    },
    {
      nama: "Karang Taruna",
      jumlah: 1,
      icon: Users2,
      desc: "Organisasi Kepemudaan",
    },
    {
      nama: "Kelompok Pengajian",
      jumlah: 15,
      icon: Users,
      desc: "Kegiatan Keagamaan",
    },
    {
      nama: "Kelompok Arisan",
      jumlah: 17,
      icon: Users,
      desc: "Simpan Pinjam Sosial",
    },
    {
      nama: "Simpan Pinjam",
      jumlah: 81,
      icon: TrendingUp,
      desc: "Lembaga Keuangan Mikro",
    },
    {
      nama: "Kelompok Tani / Gapoktan",
      jumlah: 6,
      icon: Award,
      desc: "Kelompok Tani dan Gapoktan",
    },
    {
      nama: "Ormas/LSM",
      jumlah: 4,
      icon: Shield,
      desc: "Organisasi Masyarakat",
    },
  ];

  // Data Rukun Kampung (RW)
  const rwList = [
    { rw: "RW 01", kampung: "Umbul Kapuk", ketua: "Rohani", jmlRt: 3 },
    { rw: "RW 02", kampung: "Kelanggaran", ketua: "Isparudin", jmlRt: 5 },
    { rw: "RW 03", kampung: "Panggung Jati", ketua: "Saiman", jmlRt: 4 },
    { rw: "RW 04", kampung: "Panggung Jati Timur", ketua: "Tohir", jmlRt: 4 },
    { rw: "RW 05", kampung: "Kamalaka", ketua: "Udin", jmlRt: 7 },
    { rw: "RW 06", kampung: "Pantogan", ketua: "Faizudin", jmlRt: 5 },
    { rw: "RW 07", kampung: "Long Jaha", ketua: "Sutrisno", jmlRt: 4 },
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
            Struktur Organisasi Tahun 2026
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Struktur organisasi ini disusun berdasarkan kebutuhan pelayanan dan
            pemberdayaan masyarakat Kelurahan Panggungjati.
          </motion.p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>Data Tahun 2026</span>
          </div>
        </div>
      </section>

      {/* Struktur Pemerintahan Kelurahan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Struktur Pemerintahan Kelurahan
        </motion.h2>
        <div className="relative">
          {/* Lurah dengan Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                    <Image
                      src="/home/lurah.png"
                      alt="Foto Kepala Kelurahan Panggungjati"
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="inline-flex p-3 rounded-full bg-linear-to-r from-yellow-500 to-amber-500 text-white mb-4">
                  <Crown className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  {pemerintahan.lurah.jabatan}
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
                  {pemerintahan.lurah.nama}
                </CardDescription>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Penanggung Jawab Umum
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Garis penghubung */}
          <div className="relative flex justify-center">
            <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Sekretaris dan Kasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Sekretaris dengan Foto */}
            <div>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Briefcase className="w-6 h-6" />
                    <CardTitle className="text-xl">Sekretaris Lurah</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-md shrink-0 bg-gray-200">
                      <Image
                        src="/home/sekertaris_lurah.png"
                        alt="Foto Sekretaris Kelurahan Panggungjati"
                        fill
                        className="object-cover object-top"
                        unoptimized
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {pemerintahan.sekretaris.nama}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Koordinasi administrasi & kesekretariatan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Kasi Pemerintahan dan Kasi PMK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pemerintahan.kasi.map((item, idx) => (
                <Card key={idx} className="border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Building2 className="w-5 h-5" />
                      <CardTitle className="text-lg">{item.bidang}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.nama}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Operator & Staff */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Database className="w-5 h-5" />
                    Operator Sistem & Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pemerintahan.operator.map((op, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <div>
                          <span className="font-medium">{op.nama}</span>
                          <span className="text-gray-500 text-sm block">
                            {op.bidang}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Users className="w-5 h-5" />
                    Staff Administrasi & Penunjang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pemerintahan.staff.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <div>
                          <span className="font-medium">{st.nama}</span>
                          <span className="text-gray-500 text-sm block">
                            {st.bidang}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LPM (Lembaga Pemberdayaan Masyarakat) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Lembaga Pemberdayaan Masyarakat (LPM)
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="w-6 h-6 text-blue-600" />
                Pengurus LPM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-semibold">Ketua:</span>
                  <span>{lpm.ketua}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Sekretaris:</span>
                  <span>{lpm.sekretaris}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Bendahara:</span>
                  <span>{lpm.bendahara}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                Anggota LPM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {lpm.anggota.map((anggota, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span>{anggota}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Lembaga Kemasyarakatan Lainnya */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Lembaga Kemasyarakatan Lainnya
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lembagaKemasyarakatan.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-4 text-center">
                  <div className="inline-flex p-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white mb-3">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{item.nama}</CardTitle>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 my-1">
                    {item.jumlah}
                  </p>
                  <CardDescription className="text-xs">
                    {item.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pembagian Wilayah (Rukun Kampung) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50"
        >
          Pembagian Wilayah (Rukun Kampung)
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rwList.map((rw, idx) => (
            <Card
              key={idx}
              className="border-0 shadow-lg hover:shadow-xl transition-all"
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-600">
                  <MapPin className="w-5 h-5" />
                  <CardTitle>
                    {rw.rw} – {rw.kampung}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ketua: <span className="font-semibold">{rw.ketua}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Jumlah RT: {rw.jmlRt}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Quote / Penutup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-linear-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10 rounded-3xl" />
          <div className="relative z-10 text-center text-white">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <p className="text-xl md:text-2xl font-medium italic">
              “Struktur organisasi ini adalah hasil musyawarah bersama seluruh
              elemen masyarakat untuk mewujudkan tata kelola pemerintahan yang
              partisipatif dan akuntabel.”
            </p>
            <div className="mt-6">
              <p className="font-semibold">Heruji, S.Pd.I., M.Si</p>
              <p className="text-sm opacity-80">
                Kepala Kelurahan Panggungjati
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

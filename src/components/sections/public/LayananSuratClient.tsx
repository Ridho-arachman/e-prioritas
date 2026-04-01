"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Home,
  Briefcase,
  MapPin,
  Users,
  Heart,
  FileCheck,
  Shield,
  Building,
  DollarSign,
  User,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

// Data surat: nama, deskripsi, ikon, daftar persyaratan, link Google Form
const letters = [
  {
    id: "sktm",
    name: "SKTM (Surat Keterangan Tidak Mampu)",
    description:
      "Untuk keringanan biaya sekolah, berobat, atau bantuan sosial.",
    icon: Heart,
    requirements: [
      "Fotokopi KTP (suami & istri jika sudah menikah)",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Surat pernyataan tidak mampu bermaterai Rp10.000",
      "Foto rumah (tampak depan/keseluruhan) – opsional",
      "Fotokopi KIP/PKH jika ada",
    ],
    formUrl: "https://docs.google.com/forms/d/e/your-sktm-form-id/viewform", // ganti dengan link SKTM
  },
  {
    id: "domisili",
    name: "Surat Keterangan Domisili",
    description: "Untuk pembukaan rekening bank, syarat melamar kerja, dll.",
    icon: MapPin,
    requirements: [
      "Fotokopi KTP (bagi pendatang: KTP asli daerah asal)",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Surat pernyataan domisili bermaterai (jika KTP bukan alamat setempat)",
    ],
    formUrl: "https://docs.google.com/forms/d/e/your-domisili-form-id/viewform",
  },
  {
    id: "sku",
    name: "SKU (Surat Keterangan Usaha)",
    description: "Untuk pengajuan kredit bank atau legalitas usaha kecil.",
    icon: Briefcase,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Foto tempat usaha / kegiatan usaha",
      "Surat pernyataan memiliki usaha bermaterai",
      "Fotokopi bukti lunas PBB tahun berjalan",
    ],
    formUrl: "https://docs.google.com/forms/d/e/your-sku-form-id/viewform",
  },
  {
    id: "pindah",
    name: "Surat Keterangan Pindah (SKP)",
    description: "Untuk warga yang pindah domisili secara permanen.",
    icon: Home,
    requirements: [
      "Kartu Keluarga (KK) asli (wajib diserahkan)",
      "Fotokopi KTP",
      "Surat pengantar dari RT/RW",
      "Alamat lengkap tujuan pindah (hingga kelurahan/kecamatan)",
      "Alasan pindah (tertulis)",
    ],
    formUrl: "https://docs.google.com/forms/d/e/your-pindah-form-id/viewform",
  },
  {
    id: "nikah",
    name: "Surat Pengantar Nikah (N1, N2, N4)",
    description: "Syarat utama untuk mendaftar ke KUA.",
    icon: Users,
    requirements: [
      "Fotokopi KTP (calon suami & istri)",
      "Fotokopi KK",
      "Fotokopi akta kelahiran",
      "Fotokopi ijazah terakhir",
      "Fotokopi KTP orang tua",
      "Fotokopi KTP dua orang saksi",
      "Pas foto 2x3 dan 4x6 (latar sesuai instruksi KUA)",
      "Surat pengantar dari RT/RW",
    ],
    formUrl: "https://docs.google.com/forms/d/e/your-nikah-form-id/viewform",
  },
  {
    id: "ktp",
    name: "Surat Pengantar Pembuatan KTP/KK",
    description: "Untuk warga baru, ganti status, atau KTP hilang.",
    icon: FileCheck,
    requirements: [
      "Fotokopi KTP (jika ada)",
      "Fotokopi KK (jika ada)",
      "Surat pengantar dari RT/RW",
      "Untuk KK baru (pecah KK): lampirkan fotokopi buku nikah",
      "Untuk KTP hilang: surat keterangan hilang dari kepolisian",
    ],
    formUrl: "https://docs.google.com/forms/d/e/your-ktp-form-id/viewform",
  },
  {
    id: "belum_menikah",
    name: "Surat Keterangan Belum Menikah",
    description: "Dibutuhkan instansi kerja atau syarat TNI/Polri.",
    icon: User,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Surat pernyataan belum pernah menikah bermaterai Rp10.000, diketahui saksi (ketua RT)",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-belum-menikah-form-id/viewform",
  },
  {
    id: "ahli_waris",
    name: "Surat Keterangan Ahli Waris",
    description:
      "Untuk pengurusan tabungan bank atau balik nama sertifikat tanah.",
    icon: Shield,
    requirements: [
      "Surat kematian dari kelurahan/RS",
      "Fotokopi KTP seluruh ahli waris",
      "Surat pernyataan ahli waris bermaterai, ditandatangani seluruh ahli waris dan disaksikan",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-ahli-waris-form-id/viewform",
  },
  {
    id: "belum_rumah",
    name: "Surat Keterangan Belum Memiliki Rumah",
    description: "Syarat pengajuan KPR bersubsidi.",
    icon: Building,
    requirements: [
      "Fotokopi KTP (suami & istri jika sudah menikah)",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Surat pernyataan bermaterai bahwa belum memiliki aset rumah",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-belum-rumah-form-id/viewform",
  },
  {
    id: "sudah_bekerja",
    name: "Surat Keterangan Sudah Bekerja",
    description: "Untuk keperluan administrasi di luar lingkungan kerja.",
    icon: Briefcase,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Fotokopi ID Card karyawan atau surat keterangan kerja (paklaring) dari perusahaan",
      "Surat pengantar dari RT/RW",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-sudah-bekerja-form-id/viewform",
  },
  {
    id: "belum_penghasilan",
    name: "Surat Keterangan Belum Memiliki Penghasilan",
    description: "Syarat beasiswa anak atau keringanan biaya.",
    icon: DollarSign,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Surat pernyataan tidak bekerja/belum berpenghasilan tetap bermaterai",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-belum-penghasilan-form-id/viewform",
  },
  {
    id: "janda_duda",
    name: "Surat Keterangan Janda/Duda",
    description: "Untuk tunjangan pensiun atau syarat menikah kembali.",
    icon: Heart,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Akta cerai asli (jika cerai hidup) atau surat kematian suami/istri (jika cerai mati)",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-janda-duda-form-id/viewform",
  },
  {
    id: "penghasilan_wiraswasta",
    name: "Surat Keterangan Penghasilan (Wiraswasta)",
    description: "Untuk warga yang tidak memiliki slip gaji formal.",
    icon: DollarSign,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Surat pernyataan jumlah penghasilan rata-rata per bulan bermaterai",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-penghasilan-wiraswasta-form-id/viewform",
  },
  {
    id: "sudah_menikah",
    name: "Surat Keterangan Sudah Menikah",
    description: "Jika buku nikah hilang atau sedang proses perbaikan.",
    icon: Heart,
    requirements: [
      "Fotokopi KTP (suami & istri)",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Fotokopi buku nikah yang ada (jika masih ada) atau surat keterangan dari KUA",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-sudah-menikah-form-id/viewform",
  },
  {
    id: "beda_nama",
    name: "Surat Keterangan Beda Nama",
    description:
      "Jika ada perbedaan penulisan nama di KTP, KK, ijazah, atau paspor.",
    icon: AlertCircle,
    requirements: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Surat pengantar dari RT/RW",
      "Dokumen asli yang menunjukkan perbedaan nama (ijazah, akta kelahiran, dll) sebagai bukti",
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/your-beda-nama-form-id/viewform",
  },
];

export default function LayananSuratClient() {
  const [selectedLetter, setSelectedLetter] = useState<
    (typeof letters)[0] | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (letter: (typeof letters)[0]) => {
    setSelectedLetter(letter);
    setModalOpen(true);
  };

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
            Layanan Surat Menyurat
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Ajukan surat keterangan secara online. Pilih jenis surat, lengkapi
            persyaratan, dan kirim melalui Google Form.
          </motion.p>
        </div>
      </section>

      {/* Daftar Surat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {letters.map((letter, idx) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openModal(letter)}
              className="cursor-pointer"
            >
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                    <letter.icon className="w-6 h-6" />
                    <CardTitle className="text-lg">{letter.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {letter.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal Persyaratan */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLetter && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <selectedLetter.icon className="w-6 h-6 text-blue-600" />
                  {selectedLetter.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedLetter.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Persyaratan:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {selectedLetter.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() =>
                      window.open(selectedLetter.formUrl, "_blank")
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ajukan via Google Form
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

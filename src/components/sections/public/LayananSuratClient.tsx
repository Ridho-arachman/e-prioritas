"use client";

import { Button } from "@/components/ui/button";
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
import { notifier } from "@/lib/ToastNotifier";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Mapping nama ikon ke komponen Lucide
const getIcon = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? (
    <IconComponent className="w-6 h-6" />
  ) : (
    <Icons.FileText className="w-6 h-6" />
  );
};

interface Surat {
  id: string;
  nama: string;
  deskripsi: string;
  ikon: string;
  persyaratan: string[];
  linkForm: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function LayananSuratClient() {
  const [suratList, setSuratList] = useState<Surat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/public/surat");
        const result = await response.json();
        if (result.success) {
          setSuratList(result.data);
        } else {
          setError(result.message || "Gagal memuat data surat");
          notifier.error("Gagal", result.message);
        }
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat menghubungi server");
        notifier.error("Gagal", "Terjadi kesalahan saat menghubungi server");
      } finally {
        setLoading(false);
      }
    };

    fetchSurat();
  }, []);

  const openModal = (surat: Surat) => {
    setSelectedSurat(surat);
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Memuat data surat...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </Button>
          </div>
        ) : suratList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Belum ada layanan surat tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {suratList.map((surat, idx) => (
              <motion.div
                key={surat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openModal(surat)}
                className="cursor-pointer"
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                      {getIcon(surat.ikon)}
                      <CardTitle className="text-lg">{surat.nama}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {surat.deskripsi}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Modal Persyaratan */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSurat && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  {getIcon(selectedSurat.ikon)}
                  {selectedSurat.nama}
                </DialogTitle>
                <DialogDescription>{selectedSurat.deskripsi}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Persyaratan:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {selectedSurat.persyaratan.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() =>
                      window.open(selectedSurat.linkForm, "_blank")
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

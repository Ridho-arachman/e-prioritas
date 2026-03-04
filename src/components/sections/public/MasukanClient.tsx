"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  Building2,
  CalendarDays,
  MapPinned,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MasukanWargaFormAdd from "@/components/sections/masukan/masukanFormAdd";
import { motion } from "framer-motion";
import { useGet } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function MasukanClient() {
  const { data: agendaData, isLoading } = useGet("/public/agenda");
  const agendas = agendaData ?? [];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-[calc(100vh-8rem)] gap-6 p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
        {/* Bagian Form - Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <CardHeader className="text-center relative">
              <div className="relative inline-block mx-auto">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <MessageSquare className="relative w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              </div>
              <CardTitle className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Sampaikan Masukan Anda
              </CardTitle>
              <CardDescription className="text-md mt-2 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Masukan Anda akan diverifikasi oleh Perangkat Desa sebelum
                diproses. Setiap suara sangat berarti bagi kemajuan bersama.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <MasukanWargaFormAdd />
            </CardContent>
          </Card>
        </motion.div>

        {/* Bagian Aside - Kanan */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/3 space-y-6"
        >
          {/* Card Informasi Desa (tetap hardcode karena statis) */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity" />
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="p-2 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Informasi Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Nama Desa:</strong>{" "}
                  Panggungjati
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Kecamatan:</strong> Taktakan
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Kabupaten:</strong> Serang
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Provinsi:</strong> Banten
                </p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPinned className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p>
                  <strong className="font-medium">Kode Pos:</strong> 42415
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card Agenda Desa (dinamis dari API) */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="p-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                <CalendarDays className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Agenda Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : agendas.length > 0 ? (
                <ul className="space-y-2">
                  {agendas.map(
                    (
                      agenda: { nama: string; tanggal: string },
                      idx: number,
                    ) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all group/item"
                      >
                        <span className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform group-hover/item:translate-x-1" />
                          <span className="font-medium">{agenda.nama}</span>
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs bg-white/50 dark:bg-gray-900/50 border-purple-200 dark:border-purple-800"
                        >
                          {agenda.tanggal}
                        </Badge>
                      </motion.li>
                    ),
                  )}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Tidak ada agenda terdekat.
                </p>
              )}
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <p>
                  Agenda akan diperbarui secara berkala oleh perangkat desa.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </div>
  );
}

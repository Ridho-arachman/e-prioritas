// app/tentang/page.tsx
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
  MapPin,
  Leaf, // Ikon untuk pertanian
  Briefcase, // Ikon untuk pekerjaan
} from "lucide-react";
import Image from "next/image";

// --- Dummy Data (Ganti dengan data dari API Anda) ---
const dummyStats = {
  totalMasukan: 350,
  masukanInfrastruktur: 180,
  masukanSosial: 90,
  masukanEkonomi: 50,
  masukanLainnya: 30,
};

// Data yang lebih relevan untuk statistik kelurahan
const dummyDataKelurahan = {
  totalPenduduk: 5500,
  totalKepalaKeluarga: 1250,
  sebaranPekerjaan: {
    petani: 1500,
    wirausaha: 900,
    pegawaiSwasta: 1800,
    lainnya: 1300,
  },
  jumlahFasilitasPublik: 12,
};

const dummyPrioritas = [
  "Peningkatan kualitas jalan",
  "Pembangunan posyandu baru",
  "Pengadaan fasilitas air bersih",
  "Perbaikan drainase lingkungan",
  "Penyediaan tempat sampah di fasilitas umum",
];

export default function TentangPage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      {/* Bagian Header dan Pengantar */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          Tentang Sistem Prioritas Pembangunan
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Sistem ini dirancang untuk membantu Kelurahan Panggungjati dalam
          mengambil keputusan strategis terkait pembangunan, dengan
          mengintegrasikan aspirasi warga dan data riil lapangan.
        </p>
      </div>

      {/* Bagian Statistik dan Data Kelurahan */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Gambaran Umum Kelurahan Panggungjati
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <CardTitle className="text-4xl font-bold">
              {dummyDataKelurahan.totalPenduduk}
            </CardTitle>
            <CardDescription>Total Penduduk</CardDescription>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <User className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
            <CardTitle className="text-4xl font-bold">
              {dummyDataKelurahan.totalKepalaKeluarga}
            </CardTitle>
            <CardDescription>Kepala Keluarga</CardDescription>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Leaf className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <CardTitle className="text-4xl font-bold">
              {dummyDataKelurahan.sebaranPekerjaan.petani}
            </CardTitle>
            <CardDescription>Warga Petani</CardDescription>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Briefcase className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
            <CardTitle className="text-4xl font-bold">
              {dummyDataKelurahan.sebaranPekerjaan.pegawaiSwasta +
                dummyDataKelurahan.sebaranPekerjaan.wirausaha +
                dummyDataKelurahan.sebaranPekerjaan.lainnya}
            </CardTitle>
            <CardDescription>Warga Non-Petani</CardDescription>
          </Card>
        </div>
      </section>

      {/* Bagian Prioritas & Analisis */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Prioritas Pembangunan Berdasarkan Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Masukan Warga Terbanyak
              </CardTitle>
              <CardDescription>
                Berdasarkan kategori masukan yang paling sering disampaikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    Infrastruktur
                  </span>
                  <div
                    className="h-2 bg-blue-500 rounded-full mt-2"
                    style={{
                      width: `${
                        (dummyStats.masukanInfrastruktur /
                          dummyStats.totalMasukan) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    Sosial & Keamanan
                  </span>
                  <div
                    className="h-2 bg-green-500 rounded-full mt-2"
                    style={{
                      width: `${
                        (dummyStats.masukanSosial / dummyStats.totalMasukan) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    Ekonomi
                  </span>
                  <div
                    className="h-2 bg-purple-500 rounded-full mt-2"
                    style={{
                      width: `${
                        (dummyStats.masukanEkonomi / dummyStats.totalMasukan) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
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
              <ul className="list-decimal list-inside space-y-2">
                {dummyPrioritas.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bagian Peta Lokasi */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Lokasi Kelurahan Panggungjati
        </h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.576856006567!2d106.12643537452654!3d-6.18789316060372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e422f28b497f541%3A0x6a0f44e78a63583b!2sKantor%20Kelurahan%20Panggungjati!5e0!3m2!1sid!2sid!4v1701389270557!5m2!1sid!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kelurahan Panggungjati"
              className="rounded-lg w-full h-80 md:h-96"
            ></iframe>
          </CardContent>
        </Card>
      </section>

      {/* Bagian Cara Kerja */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Bagaimana Sistem Ini Bekerja?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              1. Warga Berpartisipasi
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Warga menyampaikan masukan melalui formulir yang tersedia.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Data Terkumpul</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Perangkat desa mengumpulkan dan memverifikasi data lapangan.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Analisis AI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              OpenAI menganalisis seluruh data untuk memberikan rekomendasi.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Keputusan Tepat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rekomendasi membantu perangkat desa membuat keputusan yang
              terarah.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

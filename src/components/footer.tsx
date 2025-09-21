// components/layout/footer.tsx

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"; // Menggunakan ikon untuk informasi kontak
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-inner  dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 ">
      <div className="container mx-auto px-4">
        {/* Konten Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Logo Kelurahan"
                width={50}
                height={50}
                className="dark:invert"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
                Sistem Pembangunan
              </span>
            </Link>
            <p className="text-sm max-w-sm">
              Platform berbasis Next.js dan OpenAI untuk memprioritaskan
              pembangunan fasilitas umum secara akurat dan transparan.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Tautan Cepat
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/masukan-warga"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Sampaikan Masukan
                </Link>
              </li>
              <li>
                <Link
                  href="/login-perangkat-desa"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Login Perangkat Desa
                </Link>
              </li>
              <li>
                <Link
                  href="/kebijakan-privasi"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Kami */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                <span className="flex-1">info@panggungjati.go.id</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                <span className="flex-1">(021) 1234-5678</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span className="flex-1">
                  Jl. Raya Panggungjati No. 123, Kel. Panggungjati, Kec.
                  Taktakan, Kota Serang
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial atau Informasi Tambahan */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Ikuti Kami
            </h3>
            {/* Anda bisa menambahkan ikon media sosial di sini */}
            <div className="flex space-x-4 justify-start">
              <Badge
                variant="secondary"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex cursor-pointer"
              >
                {/* Tambahkan ikon SVG atau komponen dari lucide-react */}
                <Facebook className="w-6 h-6" />
                Facebook
              </Badge>
              <Badge
                variant="secondary"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex cursor-pointer"
              >
                <Instagram className="w-6 h-6" />
                Instagram
              </Badge>
            </div>
          </div>
        </div>

        {/* Garis Pemisah dan Hak Cipta */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Kelurahan Panggungjati. Hak Cipta
          Dilindungi.
        </div>
      </div>
    </footer>
  );
}

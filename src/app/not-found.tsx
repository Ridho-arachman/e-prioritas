import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      {/* Container utama untuk centering */}
      <div className="max-w-md mx-auto">
        {/* Ikon besar sebagai penanda */}
        <div className="mb-6">
          <Ghost className="w-24 h-24 mx-auto text-blue-500 dark:text-blue-400" />
        </div>

        {/* Kode dan pesan error */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
          Maaf, sepertinya halaman yang Anda cari tidak ada. Mungkin URL-nya
          salah atau halaman sudah dipindahkan.
        </p>

        {/* Tombol untuk kembali ke beranda */}
        <Link href="/" className="">
          <Button className="mt-4 cursor-pointer">Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}

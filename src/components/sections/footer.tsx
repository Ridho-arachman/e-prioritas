"use client";
import { motion } from "framer-motion";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const footerLinks = [
  {
    title: "Tautan Cepat",
    links: [
      { name: "Beranda", href: "/" },
      { name: "Sampaikan Masukan", href: "/masukan" },
      { name: "Login Perangkat Desa", href: "/login" },
      { name: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { name: "Tentang", href: "/tentang" },
      { name: "Pusat Bantuan", href: "/help" },
      { name: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { name: "Kontak", href: "/kontak" },
    ],
  },
];

const socialMedia = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/kelurahan_panggungjati/",
    label: "Instagram",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@kanjengdalemtv",
    label: "Tiktok",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-x-clip bg-linear-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Background blob dinamis - tidak menyebabkan overflow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      {/* Ganti container dengan w-full + padding agar full width */}
      <div className="w-full px-4 py-12 md:py-16 mx-auto">
        {/* Grid 1 kolom hingga lg (iPad tetap seperti mobile) */}
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-5 gap-x-8 lg:gap-10 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Logo Kelurahan"
                  width={60}
                  height={60}
                  className="w-14 h-14 sm:w-16 sm:h-16 dark:brightness-0 dark:invert"
                />
              </motion.div>
              <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                E - Prioritas
              </span>
            </Link>
            <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
              Platform AI untuk prioritas pembantu keputusan kegiatan kelurahan
              yang akurat & transparan. Wujudkan Panggungjati lebih baik.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              {socialMedia.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="bg-gray-800/50 p-2 rounded-full hover:bg-blue-600/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white relative inline-block">
                {column.title}
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full" />
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                      <span className="truncate">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <motion.li
                className="flex items-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:panggungjatikelurahan@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  panggungjatikelurahan@gmail.com
                </a>
              </motion.li>
              <motion.li
                className="flex items-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <a
                  href="tel:+622112345678"
                  className="hover:text-white transition-colors"
                >
                  (021) 1234-5678
                </a>
              </motion.li>
              <motion.li
                className="flex items-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="flex-1">
                  Jl. Kibuyut Kanjeng Dalem No. 36 B, RT/RW 001/005
                </span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Divider dengan icon Heart */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-linear-to-r from-blue-500 to-cyan-500 p-2 rounded-full">
              <Heart className="w-4 h-4 text-white" />
            </span>
          </div>
        </div>

        {/* Copyright dan kredit */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-y-3 md:gap-y-0">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <p>© {currentYear} Kelurahan Panggungjati. All rights reserved.</p>
            <p className="text-xs text-gray-500 flex flex-wrap items-center justify-center md:justify-start gap-x-1">
              <span>Hak Kekayaan Intelektual telah didaftarkan</span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-500 mx-1" />
              <span className="block sm:inline">
                No. Pencatatan: EC00202512345
              </span>
            </p>
          </div>
          <p className="text-sm text-gray-400 text-center md:text-right">
            Dikembangkan oleh{" "}
            <span className="font-medium text-gray-300">
              MUHAMMAD RIDHO ARACHMAN
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

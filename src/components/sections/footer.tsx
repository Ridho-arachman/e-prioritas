// components/layout/footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

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
    icon: Facebook,
    href: "https://facebook.com/desapanggungjati",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/desapanggungjati",
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/desapanggungjati",
    label: "Twitter",
  },
  {
    icon: Github,
    href: "https://github.com/desapanggungjati",
    label: "GitHub",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-linear-to-b from-gray-900 to-gray-950 text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
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
                  className="dark:brightness-0 dark:invert"
                />
              </motion.div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Sistem Prioritas
              </span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Platform berbasis AI untuk memprioritaskan pembangunan fasilitas
              umum secara akurat dan transparan. Bersama wujudkan Panggungjati
              yang lebih baik.
            </p>
            <div className="flex items-center space-x-4 pt-4">
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

          {/* Dynamic Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white relative inline-block">
                {column.title}
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <motion.li
                className="flex items-start gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:info@panggungjati.go.id"
                  className="hover:text-white transition-colors"
                >
                  info@panggungjati.go.id
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
                  Jl. Raya Panggungjati No. 123, Kel. Panggungjati, Kec.
                  Taktakan, Kota Serang
                </span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-linear-to-r from-blue-500 to-cyan-500 p-2 rounded-full">
              <Heart className="w-4 h-4 text-white" />
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>© {currentYear} Kelurahan Panggungjati. All rights reserved.</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span>Hak Kekayaan Intelektual telah didaftarkan</span>
              <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mx-1" />
              <span>No. Pencatatan: EC00202512345</span>
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
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

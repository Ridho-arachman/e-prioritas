"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
// Ikon umum dari Lucide
import { Clock, Globe, Mail, MapPin, Phone, Users } from "lucide-react";
// Ikon brand dari React Icons (Font Awesome)
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function KontakPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat Kantor",
      details: [
        "Jl. Raya Panggungjati No. 123",
        "Kel. Panggungjati, Kec. Taktakan",
        "Kota Serang, Banten 42165",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "info@panggungjati.go.id",
        "pembangunan@panggungjati.go.id",
        "admin@panggungjati.go.id",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Phone,
      title: "Telepon",
      details: [
        "(021) 1234-5678",
        "(021) 8765-4321",
        "0812-3456-7890 (WhatsApp)",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: [
        "Senin - Kamis: 08.00 - 16.00 WIB",
        "Jumat: 08.00 - 16.30 WIB",
        "Sabtu - Minggu: Tutup",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  const socialMedia = [
    {
      icon: FaFacebook, // Ganti menjadi FaFacebook
      href: "https://facebook.com",
      label: "Facebook",
      color: "bg-blue-600",
    },
    {
      icon: FaInstagram, // Ganti menjadi FaInstagram
      href: "https://instagram.com",
      label: "Instagram",
      color: "bg-pink-600",
    },
    {
      icon: FaTwitter, // Ganti menjadi FaTwitter
      href: "https://twitter.com",
      label: "Twitter",
      color: "bg-sky-500",
    },
    {
      icon: FaYoutube, // Ganti menjadi FaYoutube
      href: "https://youtube.com",
      label: "YouTube",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg mb-6"
          >
            <Globe className="h-8 w-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Silakan hubungi kami melalui kontak di bawah ini untuk informasi
            lebih lanjut.
          </motion.p>
        </div>
      </section>

      {/* Informasi Kontak Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Informasi Kontak
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl bg-linear-to-r ${item.color} text-white`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.details.map((detail, i) => (
                        <li
                          key={i}
                          className="text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Peta Lokasi
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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

      {/* Media Sosial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Media Sosial
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {socialMedia.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`p-4 rounded-xl ${social.color} text-white shadow-lg hover:shadow-xl transition-all`}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Tim Kontak */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Tim Pelayanan
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Budi Santoso",
              role: "Sekretaris Desa",
              contact: "budi@panggungjati.go.id",
              icon: Users,
            },
            {
              name: "Siti Aminah",
              role: "Kasi Pembangunan",
              contact: "siti@panggungjati.go.id",
              icon: Users,
            },
            {
              name: "Ahmad Hidayat",
              role: "Staf IT",
              contact: "ahmad@panggungjati.go.id",
              icon: Users,
            },
          ].map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white mb-4">
                    <person.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold mb-1">
                    {person.name}
                  </CardTitle>
                  <CardDescription className="mb-2">
                    {person.role}
                  </CardDescription>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {person.contact}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

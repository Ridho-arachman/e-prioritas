// components/layout/navbar.tsx
"use client"; // Ini adalah Client Component karena ada interaksi state untuk menu mobile

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Layers, MessageSquare, Settings } from "lucide-react"; // Ikon untuk navigasi
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/tentang", label: "Tentang", icon: Layers }, // Contoh tautan tambahan
  { href: "/masukan-warga", label: "Masukan Warga", icon: MessageSquare },
  { href: "/login-perangkat-desa", label: "Perangkat Desa", icon: Settings },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Nama Sistem */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo Kelurahan"
            width={50}
            height={50}
            className="dark:invert"
          />
          <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
            E-Prioritas
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                    onClick={() => setIsOpen(false)} // Tutup menu setelah klik
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

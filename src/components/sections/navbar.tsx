"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGet } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  GitBranch,
  Home,
  Layers,
  LayoutDashboard,
  LogIn,
  MailOpen,
  Menu,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Tautan navigasi statis (tanpa login/dashboard)
const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/tentang", label: "Tentang", icon: Layers },
  {
    href: "/struktur-organisasi",
    label: "Struktur Organisasi",
    icon: GitBranch,
  },
  { href: "/masukan", label: "Masukan Warga", icon: MessageSquare },
  { href: "/surat", label: "Surat Menyurat", icon: MailOpen },
];

export default function Navbar() {
  const pathName = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // Ambil data user dari API – hanya berhasil jika sudah login
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    mutate,
  } = useGet("/protected/user/getuser");

  useEffect(() => {
    mutate("/protected/user/getuser");
  }, [pathName, mutate]);

  // --------------------------------------------------
  // Tentukan tautan autentikasi berdasarkan status fetch
  // --------------------------------------------------
  // Default: arahkan ke login
  const authLink = {
    href: "/login",
    label: "Login",
    icon: LogIn,
  };

  // Jika loading, tunjukkan "Memuat..." (link tidak aktif)
  if (userLoading) {
    authLink.label = "Memuat...";
    authLink.href = "#";
  }
  // Jika berhasil, sesuaikan dengan role
  else if (userData && userData.role) {
    const role = userData.role; // "ADMIN" | "PERANGKAT_DESA" | "LURAH"
    const dashboardPaths: Record<string, string> = {
      ADMIN: "/admin",
      PERANGKAT_DESA: "/perangkat",
      LURAH: "/lurah",
    };
    authLink.href = dashboardPaths[role] || "/";
    authLink.label = "Dashboard";
    authLink.icon = LayoutDashboard;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo Kelurahan"
              width={45}
              height={45}
              className="dark:invert"
            />
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              E-Prioritas
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathName === link.href;
            return (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Tautan Login / Dashboard (Desktop) */}
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              href={userLoading ? "#" : authLink.href}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300",
                pathName === authLink.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
              )}
              aria-disabled={userLoading}
              onClick={(e) => userLoading && e.preventDefault()}
            >
              <authLink.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{authLink.label}</span>
            </Link>
            {!userLoading && pathName === authLink.href && (
              <motion.div
                layoutId="activeNav"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle navigation menu"
                  className="rounded-full"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100 p-0">
              <SheetHeader className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Menu Navigasi
                  </SheetTitle>
                </div>
              </SheetHeader>
              <nav className="flex flex-col py-6 px-4">
                <AnimatePresence>
                  {navLinks.map((link, index) => {
                    const isActive = pathName === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all",
                            isActive
                              ? "bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <link.icon
                            className={cn(
                              "w-5 h-5",
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "",
                            )}
                          />
                          <span className="text-base">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Tautan Login / Dashboard (Mobile) */}
                  <motion.div
                    key="auth-mobile"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link
                      href={userLoading ? "#" : authLink.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all",
                        pathName === authLink.href
                          ? "bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                      )}
                      onClick={(e) => {
                        if (userLoading) e.preventDefault();
                        else setIsOpen(false);
                      }}
                    >
                      <authLink.icon
                        className={cn(
                          "w-5 h-5",
                          pathName === authLink.href
                            ? "text-blue-600 dark:text-blue-400"
                            : "",
                        )}
                      />
                      <span className="text-base">{authLink.label}</span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

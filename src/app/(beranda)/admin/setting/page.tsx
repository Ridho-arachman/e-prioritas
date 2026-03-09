"use client";

import { motion, Transition } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock, Mail, User, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminSettingPage() {
  const springTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 24,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: springTransition,
    },
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      {/* Header dengan ikon dan gradien */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Pengaturan Akun
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Kelola informasi akun dan keamanan Anda
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* PROFILE SECTION */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center gap-4 relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">
                  Informasi Profil
                </CardTitle>
                <CardDescription>Ubah nama tampilan akun</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end relative">
              <Link href="/admin/setting/edit-profile">
                <Button
                  variant="outline"
                  className="cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  Edit Profil
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* PASSWORD SECTION */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center gap-4 relative">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">
                  Keamanan Akun
                </CardTitle>
                <CardDescription>Ganti password akun Anda</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end relative">
              <Link href="/admin/setting/edit-password">
                <Button
                  variant="destructive"
                  className="cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  Ganti Password
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* EMAIL SECTION */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center gap-4 relative">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">Email Akun</CardTitle>
                <CardDescription>
                  Mengubah email memerlukan verifikasi ulang
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end relative">
              <Link href="/admin/setting/edit-email">
                <Button
                  variant="secondary"
                  className="cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  Ganti Email
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Separator className="my-6" />

      {/* INFO */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-muted-foreground text-center"
      >
        Demi keamanan, beberapa perubahan memerlukan verifikasi tambahan.
      </motion.p>
    </div>
  );
}

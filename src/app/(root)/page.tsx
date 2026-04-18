"use client";

import InfiniteLogoSlider from "@/components/blocks/logo-slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRightIcon,
  BarChart3,
  Bot,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Komponen Counter
const Counter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

// Komponen partikel
const Particles = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    setIsMounted(true);
    setParticles(
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
      })),
    );
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-blue-500/20 dark:bg-blue-400/20 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Komponen kartu dengan efek tilt (3D)
const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background parallax (bergerak lebih lambat)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const { data: statsData, isLoading } = useGet("/public/stats");

  const mainCards = [
    {
      title: "Untuk Perangkat Desa",
      description:
        "Kelola data, proses masukan warga, dan hasilkan rekomendasi dengan kecerdasan buatan.",
      imageSrc: "/home/1.png",
      imageAlt: "Dashboard Admin",
      linkHref: "/login",
      buttonText: "Masuk Sekarang",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-500",
      icon: Users,
    },
    {
      title: "Untuk Warga",
      description:
        "Berpartisipasi aktif dalam proses pembangunan dengan memberikan saran atau keluhan.",
      imageSrc: "/home/2.png",
      imageAlt: "Formulir Masukan Warga",
      linkHref: "/masukan",
      buttonText: "Sampaikan Masukan",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-500",
      icon: MessageSquare,
    },
  ];

  const features = [
    {
      title: "Partisipasi Aktif Warga",
      description:
        "Sistem memungkinkan warga untuk menyampaikan aspirasi dan masukan secara langsung, memastikan setiap suara didengar.",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Rekomendasi Berbasis AI",
      description:
        "Memanfaatkan kecerdasan buatan dari Google Gemini AI untuk menganalisis data dan memberikan rekomendasi yang objektif.",
      icon: Bot,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Keputusan Cerdas",
      description:
        "Membantu perangkat desa dalam memprioritaskan pembangunan berdasarkan data dan kebutuhan riil masyarakat.",
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Warga",
      role: "Panggungjati",
      content:
        "Saya senang bisa memberikan masukan langsung. Jalan di lingkungan saya sekarang sudah diperbaiki.",
      avatar: "👨",
    },
    {
      name: "Warga",
      role: "Panggungjati",
      content:
        "Aplikasinya mudah digunakan. Aspirasi kami tentang posyandu akhirnya didengar.",
      avatar: "👩",
    },
    {
      name: "Warga",
      role: "Panggungjati",
      content:
        "Transparan dan cepat. Prioritas pembangunan jadi jelas dan tidak asal-asalan.",
      avatar: "👴",
    },
  ];

  const totalMasukan = statsData?.totalMasukan ?? 0;
  const totalKegiatan = statsData?.totalKegiatan ?? 0;

  const stats = [
    {
      value: isLoading ? (
        <Skeleton className="h-8 w-16 mx-auto" />
      ) : (
        <Counter value={totalMasukan} />
      ),
      label: "Masukan Warga",
      icon: Star,
    },
    {
      value: isLoading ? (
        <Skeleton className="h-8 w-16 mx-auto" />
      ) : (
        <Counter value={totalKegiatan} />
      ),
      label: "Kegiatan Rapat",
      icon: BarChart3,
    },
    {
      value: <Counter value={5} />,
      label: "Prioritas per Rapat",
      icon: Sparkles,
    },
    {
      value: "24/7",
      label: "AI Siap Membantu",
      icon: Bot,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950"
    >
      {/* LAYER BACKGROUND PARALLAX */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-linear-to-br from-indigo-100/40 via-blue-50/30 to-cyan-100/40 dark:from-indigo-950/40 dark:via-blue-900/30 dark:to-cyan-950/40" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' width=\'100\' height=\'100\'%3E%3Cpath fill=\'none\' stroke=\'rgba(0,0,0,0.05)\' stroke-width=\'1\' d=\'M10 0 L10 100 M20 0 L20 100 ...\'/%3E%3C/svg%3E')] bg-repeat opacity-30 dark:opacity-10" />
      </motion.div>

      {/* Animated background blobs (tetap, tanpa scroll effect) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <Particles />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        {/* Hero section (tetap, tanpa animasi masuk/keluar karena di awal) */}
        <div className="text-center space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sistem Cerdas untuk Pembangunan Kelurahan
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sistem layanan digital untuk membantu menentukan prioritas pembantu
            keputusan kegiatan kelurahan secara tepat dan terbuka di Kelurahan
            Panggungjati.
          </motion.p>
        </div>

        {/* Stats dengan efek masuk/keluar saat scroll */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo Slider dengan efek masuk/keluar */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <InfiniteLogoSlider />
        </motion.div>

        {/* Main Cards dengan efek masuk/keluar */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          {mainCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={card.linkHref}>
                <TiltCard className="relative overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 rounded-2xl">
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500 bg-linear-to-r",
                      card.gradientFrom,
                      card.gradientTo,
                    )}
                  />
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg bg-linear-to-r text-white",
                          card.gradientFrom,
                          card.gradientTo,
                        )}
                      >
                        <card.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {card.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center p-6">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end p-6">
                    <Button
                      className={cn(
                        "group/btn relative overflow-hidden transition-all duration-300",
                        `bg-linear-to-r ${card.gradientFrom} ${card.gradientTo} text-white border-0`,
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {card.buttonText}
                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </CardFooter>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section dengan efek masuk/keluar */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mengapa Sistem Ini Penting?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Dibangun untuk menjembatani aspirasi warga dan pengambilan keputusan
            yang lebih baik.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 text-left border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                  <CardContent className="p-0 space-y-4">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl bg-linear-to-r flex items-center justify-center",
                        feature.gradient,
                      )}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section dengan efek masuk/keluar */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Testimoni dari warga dan perangkat desa yang telah menggunakan
            sistem ini.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }} // sama seperti features card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                className="flex"
              >
                <Card className="p-6 text-left border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full flex flex-col rounded-2xl">
                  <CardContent className="p-0 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar dengan gradien tema utama (biru ke cyan) */}
                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
                          {testimonial.avatar || testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </div>
                    {/* Garis pemisah dan rating */}
                    <div className="flex text-yellow-400 mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action dengan efek masuk/keluar */}
        <motion.div
          className="mt-32 text-center bg-linear-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Siap Membangun Bersama?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan platform kami untuk mewujudkan pembangunan yang
            lebih terarah dan partisipatif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50 group"
              asChild
            >
              <Link href="/masukan">
                Sampaikan Masukan
                <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:text-white hover:bg-white/10 group"
              asChild
            >
              <Link href="/login">
                Login Perangkat Desa
                <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

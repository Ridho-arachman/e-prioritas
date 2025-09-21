// app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  BarChart3,
  Bot,
  Users,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import InfiniteLogoSlider from "@/components/logo-slider";

// Definisikan tipe data untuk setiap kartu utama (MainCard)
interface MainCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  buttonText: string;
  variant?: "default" | "outline";
  borderColor: string;
  textColor: string;
}

// Data array untuk kartu utama
const mainCards: MainCard[] = [
  {
    title: "Masuk sebagai Perangkat Desa",
    description:
      "Kelola data, proses masukan warga, dan hasilkan rekomendasi dengan kecerdasan buatan.",
    imageSrc: "/home/1.png",
    imageAlt: "Dashboard Admin",
    linkHref: "/login",
    buttonText: "Masuk Sekarang",
    borderColor: "blue",
    textColor: "blue",
  },
  {
    title: "Sampaikan Masukan Anda",
    description:
      "Berpartisipasi aktif dalam proses pembangunan dengan memberikan saran atau keluhan.",
    imageSrc: "/home/2.png",
    imageAlt: "Formulir Masukan Warga",
    linkHref: "/masukan-warga",
    buttonText: "Sampaikan Masukan",
    variant: "outline",
    borderColor: "green",
    textColor: "green",
  },
];

// Definisikan tipe data untuk setiap fitur (FeatureCard)
interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// Data array untuk fitur
const features: Feature[] = [
  {
    title: "Partisipasi Aktif Warga",
    description:
      "Sistem memungkinkan warga untuk menyampaikan aspirasi dan masukan secara langsung, memastikan setiap suara didengar.",
    icon: Users,
    color: "blue",
  },
  {
    title: "Rekomendasi Berbasis AI",
    description:
      "Memanfaatkan kecerdasan buatan dari OpenAI untuk menganalisis data dan memberikan rekomendasi yang objektif.",
    icon: Bot,
    color: "green",
  },
  {
    title: "Pengambilan Keputusan Cerdas",
    description:
      "Membantu perangkat desa dalam memprioritaskan pembangunan berdasarkan data dan kebutuhan riil masyarakat.",
    icon: BarChart3,
    color: "purple",
  },
];

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-6 sm:p-24 overflow-hidden">
      {/* Latar Belakang Gradien Animasi */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-blue-950 animate-pulse-slow opacity-50"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Header Utama */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-50">
            Sistem Cerdas untuk Pembangunan Kelurahan
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Platform berbasis Next.js dan OpenAI untuk memprioritaskan
            pembangunan fasilitas umum secara akurat dan transparan di Kelurahan
            Panggungjati.
          </p>
        </div>

        <div className="w-full max-w-5xl my-24">
          <InfiniteLogoSlider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full mb-24">
          {mainCards.map((card) => (
            <Link key={card.title} href={card.linkHref}>
              <Card
                className={`flex flex-col h-full hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-${card.borderColor}-500 dark:hover:border-${card.borderColor}-700`}
              >
                <CardHeader>
                  <CardTitle
                    className={`text-2xl font-semibold text-${card.textColor}-600 dark:text-${card.textColor}-400`}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={250}
                    height={250}
                    className="rounded-lg object-cover"
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant={card.variant}
                    className="flex items-center gap-2"
                  >
                    {card.buttonText}{" "}
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="w-full max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-50">
            Mengapa Sistem Ini Penting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 text-left">
                <CardContent className="flex flex-col items-center p-0">
                  <feature.icon
                    className={`w-12 h-12 text-${feature.color}-600 dark:text-${feature.color}-400 mb-4`}
                  />
                  <CardTitle className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

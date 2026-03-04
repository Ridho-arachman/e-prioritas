import type { Metadata } from "next";
import KebijakanClient from "@/components/sections/public/KebijakanClient";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description:
    "Pusat bantuan untuk Sistem Prioritas Pembangunan di Kelurahan Panggungjati, menjelaskan berbagai pertanyaan umum, panduan penggunaan, dan informasi penting lainnya untuk membantu pengguna memahami dan memanfaatkan sistem dengan baik.",
  openGraph: {
    title: "Pusat Bantuan",
    description:
      "Pusat bantuan untuk Sistem Prioritas Pembangunan di Kelurahan Panggungjati, menjelaskan berbagai pertanyaan umum, panduan penggunaan, dan informasi penting lainnya untuk membantu pengguna memahami dan memanfaatkan sistem dengan baik.",
    images: ["/og-help.jpg"],
  },
};

export default function Page() {
  return <KebijakanClient />;
}

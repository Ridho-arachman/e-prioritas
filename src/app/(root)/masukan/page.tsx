import type { Metadata } from "next";
import MasukanClient from "@/components/sections/public/MasukanClient";

export const metadata: Metadata = {
  title: "Masukan",
  description:
    "Berikan masukan Anda tentang sistem prioritas pembangunan berbasis AI di Kelurahan Panggungjati.",
  openGraph: {
    title: "Masukan Sistem Prioritas Pembangunan",
    description:
      "Berikan masukan Anda tentang sistem prioritas pembangunan berbasis AI di Kelurahan Panggungjati.",
    images: ["/og-masukan.jpg"],
  },
};

export default function Page() {
  return <MasukanClient />;
}

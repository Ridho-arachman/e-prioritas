import type { Metadata } from "next";
import KontakClient from "@/components/sections/public/KontakClient";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi kami untuk informasi lebih lanjut tentang Sistem Prioritas Pembangunan di Kelurahan Panggungjati.",
  openGraph: {
    title: "Hubungi Kami",
    description:
      "Hubungi kami untuk informasi lebih lanjut tentang Sistem Prioritas Pembangunan di Kelurahan Panggungjati.",
    images: ["/og-kontak.jpg"],
  },
};

export default function Page() {
  return <KontakClient />;
}

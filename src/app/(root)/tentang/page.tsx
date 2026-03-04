import type { Metadata } from "next";
import TentangClient from "@/components/sections/public/TentangClient";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Pelajari lebih lanjut tentang sistem prioritas pembangunan berbasis AI di Kelurahan Panggungjati.",
  openGraph: {
    title: "Tentang Sistem Prioritas",
    description:
      "Pelajari lebih lanjut tentang sistem prioritas pembangunan berbasis AI.",
    images: ["/og-tentang.jpg"],
  },
};

export default function Page() {
  return <TentangClient />;
}

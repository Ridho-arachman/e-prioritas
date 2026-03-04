import type { Metadata } from "next";
import SyaratKetentuanClient from "@/components/sections/public/SyaratKetentuanClient";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan Sistem Prioritas Pembangunan di Kelurahan Panggungjati, menjelaskan berbagai ketentuan dan aturan yang berlaku untuk penggunaan sistem.",
  openGraph: {
    title: "Syarat dan Ketentuan",
    description:
      "Syarat dan ketentuan penggunaan Sistem Prioritas Pembangunan di Kelurahan Panggungjati, menjelaskan berbagai ketentuan dan aturan yang berlaku untuk penggunaan sistem.",
    images: ["/og-syarat-ketentuan.jpg"],
  },
};

export default function Page() {
  return <SyaratKetentuanClient />;
}

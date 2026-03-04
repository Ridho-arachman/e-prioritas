import type { Metadata } from "next";
import KebijakanClient from "@/components/sections/public/KebijakanClient";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi untuk Sistem Prioritas Pembangunan di Kelurahan Panggungjati, menjelaskan bagaimana data pengguna dikumpulkan, digunakan, dan dilindungi.",
  openGraph: {
    title: "Kebijakan Privasi",
    description:
      "Kebijakan privasi untuk Sistem Prioritas Pembangunan di Kelurahan Panggungjati, menjelaskan bagaimana data pengguna dikumpulkan, digunakan, dan dilindungi.",
    images: ["/og-kebijakan.jpg"],
  },
};

export default function Page() {
  return <KebijakanClient />;
}

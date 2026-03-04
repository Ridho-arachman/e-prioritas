// app/lib/metadata.ts
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sistem Prioritas Pembangunan Kelurahan Panggungjati",
    template: "%s | Kelurahan Panggungjati",
  },
  description:
    "Sistem berbasis AI untuk memprioritaskan pembangunan fasilitas umum di Kelurahan Panggungjati.",
  openGraph: {
    title: "Sistem Prioritas Pembangunan",
    description:
      "Sistem berbasis AI untuk memprioritaskan pembangunan fasilitas umum.",
    images: ["/og-image.jpg"], // Gambar default untuk OG
    siteName: "Kelurahan Panggungjati",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistem Prioritas Pembangunan",
    description:
      "Sistem berbasis AI untuk memprioritaskan pembangunan fasilitas umum.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "theme-color": "#317EFB",
  },
};

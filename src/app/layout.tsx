import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // ganti dengan domainmu
  title: {
    default: "HOME",
    template: "%s | E - Prioritas",
  },
  description:
    "Sistem rekomendasi pembangunan fasilitas desa Panggungjati untuk membantu perangkat desa agar bisa mendaptkan output prioritas pembangunan fasilitas desa.",
  keywords: [
    "Desa Panggungjati",
    "E - Prioritas",
    "Masukan Warga",
    "Rekomendasi Desa",
    "Pelayanan Masyarakat",
  ],
  authors: [
    {
      name: "MUHAMMAD RIDHO ARACHMAN",
      url: "https://www.instagram.com/ridho_arachman/",
    },
  ],
  creator: "Tim IT Desa Panggungjati",
  publisher: "Desa Panggungjati",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "http://localhost:3000",
    title: "E - Prioritas",
    description:
      "Sistem rekomendasi pembangunan fasilitas desa Panggungjati untuk membantu perangkat desa agar bisa mendaptkan output prioritas pembangunan fasilitas desa.",
    siteName: "Desa Panggungjati",
    images: [
      {
        url: "http://localhost:3000/logo-full.svg",
        width: 1200,
        height: 630,
        alt: "Desa Panggungjati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E - Prioritas",
    description:
      "Sistem rekomendasi pembangunan fasilitas desa Panggungjati untuk membantu perangkat desa agar bisa mendaptkan output prioritas pembangunan fasilitas desa.",
    images: ["http://localhost:3000/logo-full.svg"],
    creator: "@desapanggungjati",
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}

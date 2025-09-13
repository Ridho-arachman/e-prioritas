// app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HomePage() {
  const hasilTerbaru = [
    { nama: "Perbaikan Jalan Lingkungan", skor: 0.89, ranking: 1 },
    { nama: "Pembangunan Posyandu", skor: 0.75, ranking: 2 },
    { nama: "Renovasi Balai Warga", skor: 0.62, ranking: 3 },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 bg-gray-500  bg-center bg-cover text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
          Sistem Pendukung Keputusan Prioritas Pembangunan Fasilitas Umum
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-90">
          Kelurahan Panggungjati, Kecamatan Taktakan
        </p>
        <div className="mt-8">
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-full bg-white text-blue-700 hover:bg-gray-100 cursor-pointer"
            >
              Masuk
            </Button>
          </Link>
        </div>
      </section>

      {/* Tentang Aplikasi */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Tentang Aplikasi</h2>
          <Separator className="my-4 w-20 mx-auto bg-blue-600" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aplikasi ini dirancang untuk membantu perangkat desa dalam
            menentukan prioritas pembangunan fasilitas umum. Dengan metode{" "}
            <b>AHP–TOPSIS</b>, sistem dapat memberikan rekomendasi yang
            objektif, transparan, dan akurat.
          </p>
        </div>
      </section>

      {/* Hasil Terbaru */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Hasil Prioritas Terbaru
          </h2>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Top 3 Prioritas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Ranking</TableHead>
                    <TableHead>Alternatif</TableHead>
                    <TableHead className="w-32">Skor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasilTerbaru.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold text-blue-600">
                        #{item.ranking}
                      </TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.skor.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white border-t text-center text-sm text-gray-600">
        © 2025 – Sistem Pendukung Keputusan | Universitas Bina Bangsa
      </footer>
    </main>
  );
}

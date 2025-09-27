import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Send,
  MapPin,
  MessageSquare,
  User,
  Mail,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function MasukanPage() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-6 sm:p-24">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <CardTitle className="text-3xl font-bold">
              Sampaikan Masukan Anda
            </CardTitle>
            <CardDescription className="text-md mt-2">
              Berpartisipasi aktif dalam pembangunan kelurahan dengan memberikan
              saran, aspirasi, atau keluhan Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              {/* Field Nama */}
              <div className="space-y-2">
                <Label htmlFor="nama" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" /> Nama Lengkap
                </Label>
                <Input id="nama" placeholder="Masukkan nama Anda (Opsional)" />
              </div>

              {/* Field Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda (Opsional)"
                />
              </div>

              {/* Field Kategori */}
              <div className="space-y-2">
                <Label htmlFor="kategori" className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" /> Kategori Masukan
                </Label>
                <Input
                  id="kategori"
                  placeholder="Contoh: Infrastruktur, Sosial, Keamanan"
                />
              </div>

              {/* Field RT */}
              <div className="space-y-2">
                <Label htmlFor="rt" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" /> Lokasi (RT/RW)
                </Label>
                <Input id="rt" placeholder="Contoh: RT 03 / RW 01" />
              </div>

              {/* Field Deskripsi */}
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" /> Deskripsi
                  Masukan
                </Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Jelaskan masukan Anda secara rinci..."
                  rows={5}
                />
              </div>

              {/* Tombol Submit */}
              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  Kirim Masukan
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

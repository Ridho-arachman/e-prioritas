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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Send, MapPin, MessageSquare, User, Mail, Tag, AlertTriangle } from "lucide-react";

// Data Dummy untuk Select
const rtrwOptions = ["Pilih RT/RW", "RT 01 / RW 01", "RT 02 / RW 01", "RT 03 / RW 02", "RT 04 / RW 02", "Lainnya"];
const kategoriOptions = ["Infrastruktur", "Sosial & Budaya", "Kesehatan", "Pendidikan", "Keamanan & Ketertiban"];

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
              Masukan Anda akan diverifikasi oleh Perangkat Desa sebelum diproses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              
              {/* Field Nama */}
              <div className="space-y-2">
                <Label htmlFor="nama" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" /> Nama Lengkap (Opsional)
                </Label>
                <Input id="nama" placeholder="Masukkan nama Anda" />
              </div>

              {/* Field Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Email (Opsional)
                </Label>
                <Input id="email" type="email" placeholder="Untuk keperluan verifikasi jika dibutuhkan" />
              </div>

              {/* Field Kategori (Wajib) */}
              <div className="space-y-2">
                <Label htmlFor="kategori" className="flex items-center gap-2 font-semibold">
                  <Tag className="w-4 h-4 text-red-500" /> Kategori Masukan <span className="text-red-500">* Wajib</span>
                </Label>
                <Select required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kategori Masukan" />
                  </SelectTrigger>
                  <SelectContent>
                    {kategoriOptions.map((kategori) => (
                      <SelectItem key={kategori} value={kategori}>
                        {kategori}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Field RT/RW (Wajib) */}
              <div className="space-y-2">
                <Label htmlFor="rtrw" className="flex items-center gap-2 font-semibold">
                  <MapPin className="w-4 h-4 text-red-500" /> Lokasi (RT/RW) <span className="text-red-500">* Wajib</span>
                </Label>
                <Select required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Lokasi RT/RW Anda" />
                  </SelectTrigger>
                  <SelectContent>
                    {rtrwOptions.map((lokasi) => (
                      <SelectItem key={lokasi} value={lokasi}>
                        {lokasi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Field Deskripsi */}
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" /> Deskripsi Masukan
                </Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Jelaskan masukan Anda secara rinci..."
                  rows={5}
                  required
                />
              </div>

              {/* Peringatan Verifikasi */}
              <div className="flex items-center p-3 text-sm rounded-md bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                Masukan yang tidak lengkap atau di luar cakupan Kelurahan Panggungjati akan ditolak.
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
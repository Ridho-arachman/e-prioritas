import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  Building2,
  CalendarDays,
  MapPinned,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MasukanWargaFormAdd from "@/components/masukan/masukanFormAdd";

const agendaDesa = [
  { nama: "Musyawarah Dusun", tanggal: "5 Nov 2025" },
  { nama: "Gotong Royong Bersama", tanggal: "10 Nov 2025" },
  { nama: "Rapat Evaluasi Program", tanggal: "15 Nov 2025" },
];

export default function MasukanPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-8rem)] gap-6 p-6 sm:p-10 md:p-16">
      {/* Bagian Form */}
      <div className="flex-1">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <MessageSquare className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <CardTitle className="text-3xl font-bold tracking-tight">
              Sampaikan Masukan Anda
            </CardTitle>
            <CardDescription className="text-md mt-2 text-muted-foreground">
              Masukan Anda akan diverifikasi oleh Perangkat Desa sebelum
              diproses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <MasukanWargaFormAdd />
          </CardContent>
        </Card>
      </div>

      {/* Bagian Aside */}
      <aside className="w-full md:w-1/3 space-y-4">
        {/* Card Informasi Desa */}
        <Card className="hover:shadow-md transition-all duration-300 border-blue-100 dark:border-blue-900">
          <CardHeader className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <CardTitle>Informasi Desa</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <MapPinned className="w-4 h-4 text-gray-500" />
              <p>
                <strong>Nama Desa:</strong> Panggungjati
              </p>
            </div>
            <p>
              <strong>Kecamatan:</strong> Taktakan
            </p>
            <p>
              <strong>Kabupaten:</strong> Serang
            </p>
            <p>
              <strong>Provinsi:</strong> Banten
            </p>
            <p>
              <strong>Kode Pos:</strong> 42415
            </p>
          </CardContent>
        </Card>

        {/* Card Agenda Desa */}
        <Card className="hover:shadow-md transition-all duration-300 border-green-100 dark:border-green-900">
          <CardHeader className="flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-green-600 dark:text-green-400" />
            <CardTitle>Agenda Desa</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <ul className="space-y-2">
              {agendaDesa.map((agenda) => (
                <li
                  key={agenda.nama}
                  className="flex items-center justify-between p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    {agenda.nama}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {agenda.tanggal}
                  </Badge>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-3 text-xs italic">
              Agenda akan diperbarui secara berkala oleh perangkat desa.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

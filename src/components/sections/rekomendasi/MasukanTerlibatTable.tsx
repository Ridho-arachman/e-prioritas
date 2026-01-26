"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const truncate = (text: string, length: number) =>
  text.length > length ? text.substring(0, length) + "..." : text;

export function MasukanTerlibatTable({
  masukanWarga,
}: {
  masukanWarga: any[];
}) {
  if (!masukanWarga || masukanWarga.length === 0)
    return (
      <p className="text-muted-foreground text-sm py-2">
        Tidak ada masukan warga terkait langsung dengan prioritas ini.
      </p>
    );

  return (
    <Table className="w-full overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>ID Masukan</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Lokasi</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {masukanWarga.map((item) => (
          <Dialog key={item.masukan.id}>
            <DialogTrigger asChild>
              <TableRow className="cursor-pointer hover:bg-muted/50">
                <TableCell>{item.masukan.id}</TableCell>

                <TableCell className="max-w-[400px] text-sm truncate">
                  {truncate(item.masukan.deskripsiMasukan, 80)}
                </TableCell>

                <TableCell>
                  RT {item.masukan.lokasiRt}/RW {item.masukan.lokasiRw}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{item.masukan.kategoriId}</Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      item.masukan.status === "DITERIMA" ? "default" : "outline"
                    }
                  >
                    {item.masukan.status}
                  </Badge>
                </TableCell>
              </TableRow>
            </DialogTrigger>

            {/* MODAL DETAIL */}
            <DialogContent
              className="
    max-w-lg w-full rounded-2xl border bg-white/95 backdrop-blur-md shadow-2xl 
    animate-in fade-in-0 zoom-in-95 duration-200 p-0 overflow-hidden
  "
            >
              {/* HEADER */}
              <div className="border-b px-6 py-4 relative">
                <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-md"></div>

                <DialogTitle className="font-semibold text-lg tracking-tight">
                  Detail Masukan #{item.masukan.id}
                </DialogTitle>

                <p className="text-xs text-muted-foreground">
                  Informasi lengkap berdasarkan masukan warga
                </p>
              </div>

              {/* BODY */}
              <div className="px-6 py-5 space-y-6">
                {/* DESKRIPSI (full width) */}
                <div className="space-y-1.5">
                  <p className="text-[0.75rem] font-medium text-muted-foreground uppercase tracking-wide">
                    Deskripsi Masukan
                  </p>
                  <p className="text-[0.95rem] leading-relaxed text-gray-700">
                    {item.masukan.deskripsiMasukan}
                  </p>
                </div>

                <div className="border-t"></div>

                {/* GRID 2 KOLOM UNTUK FIELD PENDEK */}
                <div className="grid grid-cols-2 gap-5">
                  {/* LOKASI */}
                  <div className="space-y-1.5">
                    <p className="text-[0.75rem] font-medium text-muted-foreground uppercase tracking-wide">
                      Lokasi
                    </p>
                    <p className="text-[0.95rem] text-gray-700">
                      RT {item.masukan.lokasiRt} / RW {item.masukan.lokasiRw}
                    </p>
                  </div>

                  {/* KATEGORI */}
                  <div className="space-y-1.5">
                    <p className="text-[0.75rem] font-medium text-muted-foreground uppercase tracking-wide">
                      Kategori
                    </p>
                    <Badge className="px-3 py-1 text-[0.75rem] rounded-md bg-indigo-100 text-indigo-700">
                      {item.masukan.kategoriId}
                    </Badge>
                  </div>
                </div>

                <div className="border-t"></div>

                {/* STATUS (sendiri, karena penting) */}
                <div className="space-y-1.5">
                  <p className="text-[0.75rem] font-medium text-muted-foreground uppercase tracking-wide">
                    Status
                  </p>
                  <Badge
                    className={`
          px-3 py-1 text-[0.75rem] rounded-md
          ${
            item.masukan.status === "DITERIMA"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }
        `}
                  >
                    {item.masukan.status}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}

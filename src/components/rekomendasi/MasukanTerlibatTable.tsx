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
    <Table>
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
          <TableRow key={item.masukan.id}>
            <TableCell>{item.masukan.id}</TableCell>
            <TableCell className="max-w-[400px] text-sm">
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
        ))}
      </TableBody>
    </Table>
  );
}

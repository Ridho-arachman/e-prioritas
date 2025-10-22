"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useKategoriAll } from "@/hooks/api/kategoriHooks";
import { useDeleteKategori } from "@/hooks/api/kategoriHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams, useRouter } from "next/navigation";
import { XIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { notifier } from "../ToastNotifier";

export default function ListTableKategori() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const { data: response, error, isLoading, refresh } = useKategoriAll(search);
  const {
    execute: deleteKategori,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteKategori();

  const [value] = useDebounce(search, 500);

  const data: any = response?.data ?? [];

  // Debounce search
  useEffect(() => {
    router.replace(`?q=${encodeURIComponent(value)}`);
    refresh();
  }, [value]);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Kelola Kategori Masukan Warga</span>
            <Link href="/admin/kelola-kategori/add">
              <Button variant="default">+ Tambah Kategori</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <Input
                placeholder="Cari kategori..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="default" onClick={() => setSearch("")}>
                <XIcon />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jumlah Masukan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500">
                    {error.response?.status === 403
                      ? "Anda tidak memiliki akses untuk melihat data ini."
                      : data.message || "Terjadi kesalahan saat memuat data."}
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((item: any, i: number) => (
                  <TableRow key={item.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.namaKategori}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.deskripsi}
                    </TableCell>
                    <TableCell>{item._count.masukanWarga}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "AKTIF" ? "default" : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        onClick={() =>
                          router.push(`/admin/kelola-kategori/${item.id}`)
                        }
                        variant="outline"
                        size="sm"
                        disabled={deleteLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleteLoading}
                        onClick={async () => {
                          const res = await deleteKategori(
                            `/protected/kategori/${item.id}`,
                            {},
                            {},
                            `/protected/kategori/${item.id}`
                          );
                          if (res) {
                            notifier.success(
                              res.message || "Kategori berhasil dihapus"
                            );
                            refresh();
                          }
                          notifier.error(
                            res.message || "Gagal menghapus kategori"
                          );
                        }}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    Tidak ada kategori ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useGetAllKategori } from "@/hooks/api/useKategori";
import { useDeleteKategori } from "@/hooks/api/useKategori";
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
import { notifier } from "../../../lib/ToastNotifier";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListTableKategori() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const {
    data: response,
    error,
    isLoading,
    refresh,
  } = useGetAllKategori(search);
  const { execute: deleteKategori, loading: deleteLoading } =
    useDeleteKategori();

  const [value] = useDebounce(search, 500);
  const data: any = response?.data ?? [];

  // Debounce search
  useEffect(() => {
    router.replace(`?q=${encodeURIComponent(value)}`);
    refresh();
  }, [value]);

  return (
    <>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button
              variant="default"
              onClick={() => setSearch("")}
              className="cursor-pointer"
            >
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
              // ============================
              // ⭐ Skeleton Loading Rows
              // ============================
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  {error.response?.status === 403
                    ? "Anda tidak memiliki akses untuk melihat data ini."
                    : error.response?.data?.message ||
                      "Terjadi kesalahan saat memuat data."}
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
                    <Link href={`/admin/kelola-kategori/${item.id}`} prefetch>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={deleteLoading}
                        className="cursor-pointer"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleteLoading}
                      onClick={async () => {
                        const { data: res, error } = await deleteKategori(
                          `/protected/kategori/${item.id}`,
                          {},
                          {},
                          `/protected/kategori/${item.id}`,
                        );
                        if (error) {
                          notifier.error(error);
                          return;
                        }

                        notifier.success(
                          res?.message || "Kategori Berhasil Dihapus",
                        );
                        refresh();
                      }}
                      className="cursor-pointer"
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
    </>
  );
}

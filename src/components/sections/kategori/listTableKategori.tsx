"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useQueryState } from "nuqs";
import { AxiosError } from "axios";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableSkeleton from "@/components/blocks/tableSkeleton";
import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";

import { useDelete, useGet } from "@/hooks/useApi";
import { buildQuery } from "@/utils/query";
import { notifier } from "../../../lib/ToastNotifier";
import { ApiError } from "@/types/ApiError";

export default function ListTableKategori() {
  const router = useRouter();

  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage] = useQueryState("perPage", { defaultValue: "10" });

  const [debouncedQ] = useDebounce(q, 500);

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const queryString = buildQuery({
    q: debouncedQ,
    page: pageNumber,
    perPage: perPageNumber,
  });

  const { data, error, isLoading, mutate, meta } = useGet(
    `/protected/kategori${queryString}`,
  );

  const { del, loading: deleteLoading } = useDelete();

  const handleDelete = async (id: string) => {
    try {
      const res = await del(`/protected/kategori/${id}`);
      notifier.success("Berhasil", res?.message);
      mutate(`/protected/kategori${queryString}`);
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  return (
    <>
      <CardHeader className="space-y-4">
        <div className="mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
          <div className="flex justify-start">
            <Link href="/admin/kelola-kategori/add">
              <Button variant="default" className="cursor-pointer">
                + Tambah Kategori
              </Button>
            </Link>
          </div>
          <div className="flex gap-2 flex-1 max-w-sm">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari kategori..."
              className="flex-1"
            />
            <Button
              variant="default"
              onClick={() => setQ("")}
              className="cursor-pointer"
            >
              <XIcon />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-160">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Nama Kategori</TableHead>
                <TableHead className="text-center">Deskripsi</TableHead>
                <TableHead className="text-center">Jumlah Masukan</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading */}
              {isLoading && !data && <TableSkeleton rows={5} />}

              {/* Error */}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <DataError message={error?.message} />
                  </TableCell>
                </TableRow>
              )}

              {/* Data tidak ditemukan */}
              {data?.length === 0 && queryString && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <DataTidakDitemukan />
                  </TableCell>
                </TableRow>
              )}

              {/* Data kosong */}
              {data?.length === 0 && !queryString && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <DataKosong />
                  </TableCell>
                </TableRow>
              )}

              {/* Data */}
              {data?.length > 0 &&
                data.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center font-medium">
                      {item.namaKategori}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {item.deskripsi}
                    </TableCell>
                    <TableCell className="text-center">
                      {item._count.masukanWarga}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          item.status === "AKTIF" ? "default" : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <Link href={`/admin/kelola-kategori/${item.id}`} prefetch>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={deleteLoading}
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deleteLoading}
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage(String(pageNumber - 1))}
            disabled={pageNumber === 1}
          >
            <ChevronLeft /> Prev
          </Button>
          <span className="px-2">
            {pageNumber} / {meta?.totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage(String(pageNumber + 1))}
            disabled={pageNumber === meta?.totalPages}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useQueryState } from "nuqs";
import { AxiosError } from "axios";
import {
  ChevronLeft,
  ChevronRight,
  XIcon,
  Pencil,
  Trash2,
  Search,
  Plus,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import TableSkeleton from "@/components/blocks/tableSkeleton";
import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";

import { useDelete, useGet } from "@/hooks/useApi";
import { buildQuery } from "@/utils/query";
import { notifier } from "../../../lib/ToastNotifier";
import { ApiError } from "@/types/ApiError";
import { useState } from "react";

export default function ListTableKategori() {
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    nama: string;
  } | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
      setOpenDeleteDialog(false);
      setItemToDelete(null);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  const confirmDelete = (id: string, nama: string) => {
    setItemToDelete({ id, nama });
    setOpenDeleteDialog(true);
  };

  return (
    <>
      {/* Single Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kategori{" "}
              <span className="font-semibold">"{itemToDelete?.nama}"</span>?
              Tindakan ini tidak dapat dibatalkan dan data akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setItemToDelete(null);
                setOpenDeleteDialog(false);
              }}
            >
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => itemToDelete && handleDelete(itemToDelete.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CardHeader className="space-y-4 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          {/* Title and Add Button */}
          <div className="flex items-center justify-between md:justify-start gap-2">
            <h2 className="text-lg md:text-xl font-semibold">Kategori</h2>
            <Link href="/admin/kelola-kategori/add" className="md:hidden">
              <Button size="sm" className="h-8">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari kategori..."
                className="pl-10 pr-10 w-full"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <XIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Add Button - Desktop */}
            <Link href="/admin/kelola-kategori/add" className="hidden md:block">
              <Button className="cursor-pointer whitespace-nowrap">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kategori
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">No</TableHead>
                <TableHead className="text-center">Code</TableHead>
                <TableHead className="text-center">Nama Kategori</TableHead>
                <TableHead className="text-center">Deskripsi</TableHead>
                <TableHead className="w-32 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading */}
              {isLoading && !data && <TableSkeleton rows={5} />}

              {/* Error */}
              {error && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <DataError message={error?.message} />
                  </TableCell>
                </TableRow>
              )}

              {/* Data tidak ditemukan */}
              {data?.length === 0 && queryString && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <DataTidakDitemukan />
                  </TableCell>
                </TableRow>
              )}

              {/* Data kosong */}
              {data?.length === 0 && !queryString && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <DataKosong />
                  </TableCell>
                </TableRow>
              )}

              {/* Data */}
              {data?.length > 0 &&
                data.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      {(pageNumber - 1) * perPageNumber + index + 1}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      <span className="px-2 py-1 bg-muted rounded-md text-xs">
                        {item.code}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {item.nama}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground line-clamp-1 max-w-xs">
                      {item.deskripsi || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/kelola-kategori/${item.id}`}
                          prefetch
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={deleteLoading}
                            className="h-8 px-3"
                          >
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </Link>

                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={deleteLoading}
                          className="h-8 px-3"
                          onClick={() => confirmDelete(item.id, item.nama)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {/* Loading */}
          {isLoading && !data && (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-muted rounded-lg h-24"
                ></div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4">
              <DataError message={error?.message} />
            </div>
          )}

          {/* Data kosong */}
          {data?.length === 0 && !queryString && (
            <div className="p-4">
              <DataKosong />
            </div>
          )}

          {/* Data tidak ditemukan */}
          {data?.length === 0 && queryString && (
            <div className="p-4">
              <DataTidakDitemukan />
            </div>
          )}

          {/* Data - Mobile Cards */}
          {data?.length > 0 &&
            data.map((item: any, index: number) => (
              <div
                key={item.id}
                className="bg-card border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        #{item.code}
                      </Badge>
                      <span className="text-sm font-medium">
                        {(pageNumber - 1) * perPageNumber + index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base">{item.nama}</h3>
                  </div>

                  {/* Mobile Action Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/kelola-kategori/${item.id}`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => confirmDelete(item.id, item.nama)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {item.deskripsi && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.deskripsi}
                  </p>
                )}

                {/* Action Buttons - Alternative for Mobile */}
                <div className="flex gap-2 pt-2 md:hidden">
                  <Link
                    href={`/admin/kelola-kategori/${item.id}`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full justify-center"
                      disabled={deleteLoading}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 justify-center"
                    disabled={deleteLoading}
                    onClick={() => confirmDelete(item.id, item.nama)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {(data?.length > 0 || isLoading) && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Pagination Info */}
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              {meta?.total ? (
                <>
                  Menampilkan{" "}
                  <span className="font-medium">
                    {(pageNumber - 1) * perPageNumber + 1}-
                    {Math.min(pageNumber * perPageNumber, meta?.total)}
                  </span>{" "}
                  dari <span className="font-medium">{meta?.total}</span> data
                </>
              ) : (
                "Memuat data..."
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(String(Math.max(1, pageNumber - 1)))}
                disabled={pageNumber === 1 || isLoading}
                className="h-8 px-3"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-1">
                  Sebelumnya
                </span>
              </Button>

              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{pageNumber}</span>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm text-muted-foreground">
                  {meta?.totalPages || 1}
                </span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(String(pageNumber + 1))}
                disabled={
                  pageNumber === meta?.totalPages ||
                  isLoading ||
                  !meta?.totalPages
                }
                className="h-8 px-3"
              >
                <span className="sr-only sm:not-sr-only sm:mr-1">
                  Berikutnya
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </>
  );
}

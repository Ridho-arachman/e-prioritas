"use client";

import { AxiosError } from "axios";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
import TableSkeleton from "@/components/blocks/tableSkeleton";

import { useDelete, useGet } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { ApiError } from "@/types/ApiError";
import { buildQuery } from "@/utils/query";
import * as Icons from "lucide-react";
import { useState } from "react";

const getIcon = (iconName: string) => {
  const Icon = (Icons as any)[iconName];
  return Icon ? (
    <Icon className="h-4 w-4" />
  ) : (
    <Icons.FileText className="h-4 w-4" />
  );
};

export default function AdminSuratPage() {
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
    `/protected/surat${queryString}`,
  );
  console.log("Fetched surat data:", { data, error, isLoading, meta });
  const { del, loading: deleteLoading } = useDelete();

  const handleDelete = async (id: string) => {
    try {
      const res = await del(`/protected/surat/${id}`);
      notifier.success("Berhasil", res?.message || "Surat berhasil dihapus");
      mutate(`/protected/surat${queryString}`);
      setOpenDeleteDialog(false);
      setItemToDelete(null);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ApiError>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Gagal menghapus surat",
      );
    }
  };

  const confirmDelete = (id: string, nama: string) => {
    setItemToDelete({ id, nama });
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus surat{" "}
              <span className="font-semibold">"{itemToDelete?.nama}"</span>?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
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

      <CardHeader className="space-y-4 p-4 md:p-6 border-b bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between md:justify-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shadow-sm">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Kelola Surat
            </h2>
            <Link href="/admin/kelola-surat/add" className="md:hidden">
              <Button size="sm" className="h-8 shadow-sm">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-62.5">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari surat..."
                className="pl-10 pr-10 w-full transition-shadow focus:ring-2 focus:ring-primary/50"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <Link href="/admin/kelola-surat/add" className="hidden md:block">
              <Button className="cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md transition-all">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Surat
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16 text-center">No</TableHead>
                <TableHead className="text-center">Nama Surat</TableHead>
                <TableHead className="text-center">Ikon</TableHead>
                <TableHead className="text-center">Deskripsi</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-32 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !data && <TableSkeleton rows={5} />}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <DataError message={error?.message} />
                  </TableCell>
                </TableRow>
              )}
              {data?.length === 0 && queryString && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <DataTidakDitemukan />
                  </TableCell>
                </TableRow>
              )}
              {data?.length === 0 && !queryString && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <DataKosong />
                  </TableCell>
                </TableRow>
              )}
              {data?.length > 0 &&
                data.map((item: any, index: number) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="text-center">
                      {(pageNumber - 1) * perPageNumber + index + 1}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {item.nama}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {getIcon(item.ikon)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground line-clamp-1 max-w-xs">
                      {item.deskripsi}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={item.isActive ? "default" : "secondary"}>
                        {item.isActive ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/admin/kelola-surat/${item.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3"
                          >
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="destructive"
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
          {isLoading && !data && (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-muted rounded-lg h-32"
                ></div>
              ))}
            </div>
          )}
          {error && (
            <div className="p-4">
              <DataError message={error?.message} />
            </div>
          )}
          {data?.length === 0 && !queryString && (
            <div className="p-4">
              <DataKosong />
            </div>
          )}
          {data?.length === 0 && queryString && (
            <div className="p-4">
              <DataTidakDitemukan />
            </div>
          )}
          {data?.length > 0 &&
            data.map((item: any, index: number) => (
              <div
                key={item.id}
                className="bg-card border rounded-lg p-4 space-y-3 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getIcon(item.ikon)}
                    <h3 className="font-semibold">{item.nama}</h3>
                  </div>
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
                        <Link href={`/admin/kelola-surat/${item.id}`}>
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
                <p className="text-sm text-muted-foreground">
                  {item.deskripsi}
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant={item.isActive ? "default" : "secondary"}>
                    {item.isActive ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {(data?.length > 0 || isLoading) && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {meta?.total ? (
                <>
                  Menampilkan {(pageNumber - 1) * perPageNumber + 1} -{" "}
                  {Math.min(pageNumber * perPageNumber, meta.total)} dari{" "}
                  {meta.total} data
                </>
              ) : (
                "Memuat data..."
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(String(Math.max(1, pageNumber - 1)))}
                disabled={pageNumber === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Sebelumnya</span>
              </Button>
              <div className="bg-muted/50 px-3 py-1 rounded-lg">
                <span className="text-sm font-medium">{pageNumber}</span>
                <span className="text-sm text-muted-foreground">
                  {" "}
                  / {meta?.totalPages || 1}
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
              >
                <span className="mr-1 hidden sm:inline">Berikutnya</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </>
  );
}

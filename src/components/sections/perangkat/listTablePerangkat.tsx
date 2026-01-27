"use client";

import {
  Plus,
  Send,
  XIcon,
  ChevronLeft,
  ChevronRight,
  Verified,
  X,
  Trash,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { notifier } from "../../../lib/ToastNotifier";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDelete, useGet, usePost } from "@/hooks/useApi";
import DataKosong from "../../blocks/DataKosong";
import DataTidakDitemukan from "../../blocks/DataTidakDitemukan";
import DataError from "../../blocks/DataError";
import TableSkeleton from "../../blocks/tableSkeleton";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { buildQuery } from "@/utils/query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiError } from "@google/genai";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ListTablePerangkat() {
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [active, setActive] = useQueryState("isActive", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage] = useQueryState("perPage", { defaultValue: "10" });

  const [debouncedQ] = useDebounce(q, 500);

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const queryString = buildQuery({
    q: debouncedQ,
    isActive: active,
    page: pageNumber,
    perPage: perPageNumber,
  });

  const { data, meta, error, isLoading, mutate } = useGet(
    `/protected/perangkat${queryString}`,
  );

  const { del: deletePerangkat, loading: deleteLoading } = useDelete();
  const { post, loading: verifyLoading } = usePost("/auth/send-verify-email");

  const cellCenter = "text-center align-middle truncate max-w-[150px]";

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deletePerangkat(
        `/protected/perangkat/${selectedDeleteId}`,
      );
      notifier.success("Berhasil", res?.message);
      mutate();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    } finally {
      setSelectedDeleteId(null);
    }
  };

  const handleVerify = async (email: string) => {
    try {
      const res = await post({ email });
      notifier.success(
        "Berhasil",
        res?.message || "Verifikasi email berhasil dikirim",
      );
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };
  return (
    <>
      <CardHeader className="space-y-4">
        <div className="flex justify-between">
          <Link href="/admin/kelola-perangkat/add">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Tambah Perangkat
            </Button>
          </Link>

          <div className="flex gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari Nama / Jabatan / Email"
              className="cursor-pointer"
            />
            <Button
              variant="outline"
              onClick={() => setQ("")}
              className="cursor-pointer"
            >
              <XIcon />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center">Nama</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Jabatan</TableHead>
              <TableHead className="text-center">Aktif</TableHead>
              <TableHead className="text-center">Email Verified</TableHead>
              <TableHead className="text-center">Tanggal Dibuat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && !data && <TableSkeleton rows={5} />}
            {error && <DataError message={error?.message} />}

            {data?.length === 0 && queryString && (
              <TableRow>
                <TableCell colSpan={8}>
                  <DataTidakDitemukan />
                </TableCell>
              </TableRow>
            )}

            {data?.length === 0 && !queryString && (
              <TableRow>
                <TableCell colSpan={8}>
                  <DataKosong />
                </TableCell>
              </TableRow>
            )}

            {data?.length > 0 &&
              data?.map((item: any, index: number) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() =>
                    router.push(`/admin/kelola-perangkat/${item.id}`)
                  }
                >
                  <TableCell className={cellCenter}>
                    {(pageNumber - 1) * perPageNumber + index + 1}
                  </TableCell>
                  <TableCell className={cellCenter}>{item.name}</TableCell>
                  <TableCell className={cellCenter}>{item.email}</TableCell>
                  <TableCell className={cellCenter}>{item.jabatan}</TableCell>
                  <TableCell className="align-middle">
                    <div className="flex items-center justify-center">
                      {item.isActive ? (
                        <Verified className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="align-middle">
                    <div className="flex items-center justify-center">
                      {item.emailVerified ? (
                        <Verified className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell className={cellCenter}>
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>

                  {/* 🔥 AKSI — EVENT DIPUTUS DI SINI */}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/kelola-perangkat/${item.id}/edit`)
                        }
                        className="cursor-pointer"
                      >
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setSelectedDeleteId(item.id)}
                            className="cursor-pointer"
                          >
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Hapus perangkat desa?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Data <b>{item.name}</b> akan dihapus permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={handleDelete}
                              disabled={deleteLoading}
                              className="cursor-pointer"
                            >
                              {deleteLoading ? (
                                <>
                                  <Spinner /> Menghapus...
                                </>
                              ) : (
                                "Hapus"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={item.emailVerified || verifyLoading}
                        onClick={() => handleVerify(item.email)}
                        className="cursor-pointer"
                      >
                        <Send className="mr-1 h-4 w-4" /> Verify
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage(String(pageNumber - 1))}
            disabled={pageNumber === 1}
            className="cursor-pointer"
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
            className="cursor-pointer"
          >
            Next <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </>
  );
}

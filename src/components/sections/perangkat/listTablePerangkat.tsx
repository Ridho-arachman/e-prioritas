"use client";

import {
  Plus,
  Send,
  XIcon,
  ChevronLeft,
  ChevronRight,
  Verified,
  X,
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
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { ApiError } from "@google/genai";

export default function ListTablePerangkat() {
  const router = useRouter();

  // QUERY STATE
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [active, setActive] = useQueryState("isActive", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage, setPerPage] = useQueryState("perPage", {
    defaultValue: "10",
  });

  const [debouncedQ] = useDebounce(q, 500);

  // Konversi page dan perPage ke number
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
  const { post, loading } = usePost("/auth/send-verify-email");

  const cellCenter = "text-center align-middle truncate max-w-[150px]";

  const handleDelete = async (id: string) => {
    try {
      const res = await deletePerangkat(`/protected/perangkat/${id}`);
      notifier.success(
        "Berhasil",
        res?.message || "Perangkat berhasil dihapus",
      );
      mutate();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
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

  const handlePrev = () => setPage(String(Math.max(1, pageNumber - 1)));
  const handleNext = () =>
    setPage(String(Math.min(meta?.totalPages || 1, pageNumber + 1)));

  return (
    <>
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href="/admin/kelola-perangkat/add">
            <Button className="w-full md:w-auto cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Tambah Perangkat
            </Button>
          </Link>

          {/* SEARCH */}
          <div className="flex w-full gap-2 md:max-w-md">
            <Input
              placeholder="Cari Nama / Jabatan / Email"
              value={q}
              onChange={(e) => setQ(e.target.value)}
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

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant={active === "true" ? "default" : "outline"}
            onClick={() => setActive(active === "true" ? "" : "true")}
            className="w-full sm:w-auto cursor-pointer"
          >
            Aktif
          </Button>
          <Button
            variant={active === "false" ? "default" : "outline"}
            onClick={() => setActive(active === "false" ? "" : "false")}
            className="w-full sm:w-auto cursor-pointer"
          >
            Tidak Aktif
          </Button>
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
              <TableHead className="text-center">Verifikasi Email</TableHead>
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
                  <TableCell className="text-center align-middle">
                    <div className="flex items-center justify-center">
                      {item.isActive ? (
                        <Verified color="green" />
                      ) : (
                        <X color="red" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-middle">
                    <div className="flex items-center justify-center">
                      {item.emailVerified ? (
                        <Verified color="green" />
                      ) : (
                        <X color="red" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell className={cellCenter}>
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        disabled={deleteLoading}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/admin/kelola-perangkat/${item.id}/edit`,
                          );
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deleteLoading}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                      >
                        Hapus
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={item.emailVerified || deleteLoading}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify(item.email);
                        }}
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
            onClick={handlePrev}
            disabled={pageNumber === 1}
            className="cursor-pointer"
          >
            <ChevronLeft /> Prev
          </Button>
          <span className="flex items-center px-2">
            {pageNumber} / {meta?.totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleNext}
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

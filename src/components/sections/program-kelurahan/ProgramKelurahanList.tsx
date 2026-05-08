// components/sections/program-kelurahan/ProgramKelurahanList.tsx
"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  Plus,
  SlidersHorizontal,
  Trash,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDelete, useGet } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { cn } from "@/lib/utils";
import { buildQuery } from "@/utils/query";

import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
import TableSkeleton from "@/components/blocks/tableSkeleton";
import { Spinner } from "@/components/ui/spinner";

import { DomainIsu, StatusProgram } from "@/app/generated/prisma";

interface ProgramKelurahanListProps {
  role: "admin" | "lurah" | "perangkat";
}

const statusBadgeMap: Record<StatusProgram, { label: string; color: string }> =
  {
    BERJALAN: {
      label: "Berjalan",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    SELESAI: {
      label: "Selesai",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    DITUNDA: {
      label: "Ditunda",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
  };

export default function ProgramKelurahanList({
  role,
}: ProgramKelurahanListProps) {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  // Query states
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "" });
  const [domainIsuId, setDomainIsuId] = useQueryState("domainIsuId", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [limit] = useQueryState("limit", { defaultValue: "10" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "updatedAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const [debouncedQ] = useDebounce(q, 500);
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const queryString = buildQuery({
    q: debouncedQ || undefined,
    status: status || undefined,
    domainIsuId: domainIsuId || undefined,
    page: pageNumber,
    limit: limitNumber,
    sortBy,
    sortOrder,
  });

  const { data, meta, error, isLoading, mutate } = useGet(
    `/protected/program-kelurahan${queryString}`,
  );
  const { del: deleteProgram, loading: deleteLoading } = useDelete();

  const { data: domainIsuOptions } = useGet("/protected/kategori");

  const programList = data || [];

  useEffect(() => {
    setPage("1");
  }, [debouncedQ, status, domainIsuId, sortBy, sortOrder]);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deleteProgram(
        `/protected/program-kelurahan/${selectedDeleteId}`,
      );
      notifier.success("Berhasil", res?.message || "Program berhasil dihapus");
      mutate();
    } catch (error: any) {
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan",
      );
    } finally {
      setSelectedDeleteId(null);
    }
  };

  const clearFilters = () => {
    setStatus("");
    setDomainIsuId("");
    setSortBy("updatedAt");
    setSortOrder("desc");
    setIsFilterOpen(false);
  };

  const hasActiveFilters =
    status !== "" ||
    domainIsuId !== "" ||
    sortBy !== "updatedAt" ||
    sortOrder !== "desc";

  const sortOptions = [
    { value: "judul", label: "Judul" },
    { value: "status", label: "Status" },
    { value: "lokasi", label: "Lokasi" },
    { value: "tanggalMulai", label: "Tanggal Mulai" },
    { value: "createdAt", label: "Tanggal Dibuat" },
    { value: "updatedAt", label: "Terakhir Update" },
  ];

  const canEdit = role === "admin" || role === "lurah";
  const basePath = `/${role}/program-kelurahan`;

  return (
    <>
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => !open && setSelectedDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus program?</AlertDialogTitle>
            <AlertDialogDescription>
              Program akan dihapus permanen. Tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full mx-auto">
        <CardHeader className="space-y-4 p-4 md:p-6 border-b">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {canEdit && (
                <Button onClick={() => router.push(`${basePath}/add`)}>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Program
                </Button>
              )}

              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
                  <Filter className="mr-2 h-4 w-4" /> Filter & Sort
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      {hasActiveFilters ? 1 : 0}
                    </Badge>
                  )}
                </Button>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" /> Filter &
                      Pengurutan
                    </DialogTitle>
                    <DialogDescription>
                      Atur filter dan urutan data program
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Status</Label>
                      <Select
                        value={status || "all"}
                        onValueChange={(v) => setStatus(v === "all" ? "" : v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Semua status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua</SelectItem>
                          <SelectItem value="BERJALAN">Berjalan</SelectItem>
                          <SelectItem value="SELESAI">Selesai</SelectItem>
                          <SelectItem value="DITUNDA">Ditunda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Domain Isu</Label>
                      <Select
                        value={domainIsuId || "all"}
                        onValueChange={(v) =>
                          setDomainIsuId(v === "all" ? "" : v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Semua domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Domain</SelectItem>
                          {domainIsuOptions?.map((d: DomainIsu) => (
                            <SelectItem key={d.id} value={d.id}>
                              {d.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                      <Label>Urutkan Berdasarkan</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sortOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button
                          variant={sortOrder === "asc" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setSortOrder("asc")}
                        >
                          <ArrowUp className="mr-2 h-4 w-4" /> Asc
                        </Button>
                        <Button
                          variant={sortOrder === "desc" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setSortOrder("desc")}
                        >
                          <ArrowDown className="mr-2 h-4 w-4" /> Desc
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={clearFilters}>
                      Reset
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)}>
                      Terapkan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative flex-1 max-w-md">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari judul / lokasi / PIC..."
                className="pr-10"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Filter badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {status && (
                <Badge variant="secondary" className="gap-2">
                  Status:{" "}
                  {statusBadgeMap[status as StatusProgram]?.label || status}
                  <button onClick={() => setStatus("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {domainIsuId && (
                <Badge variant="secondary" className="gap-2">
                  Domain:{" "}
                  {domainIsuOptions?.find(
                    (d: DomainIsu) => d.id === domainIsuId,
                  )?.nama || domainIsuId}
                  <button onClick={() => setDomainIsuId("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(sortBy !== "updatedAt" || sortOrder !== "desc") && (
                <Badge variant="secondary" className="gap-2">
                  Sort: {sortOptions.find((o) => o.value === sortBy)?.label}{" "}
                  {sortOrder === "asc" ? "↑" : "↓"}
                  <button
                    onClick={() => {
                      setSortBy("updatedAt");
                      setSortOrder("desc");
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0 md:p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">No</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>PIC</TableHead>
                  <TableHead>Domain Isu</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Tgl Mulai</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <TableSkeleton rows={5} />}
                {error && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <DataError message={error?.message} />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  programList.length === 0 &&
                  !debouncedQ &&
                  !hasActiveFilters && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        <DataKosong title="Belum ada program kelurahan" />
                      </TableCell>
                    </TableRow>
                  )}
                {!isLoading &&
                  programList.length === 0 &&
                  (debouncedQ || hasActiveFilters) && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        <DataTidakDitemukan />
                      </TableCell>
                    </TableRow>
                  )}
                {programList.map((item: any, idx: number) => {
                  const statusKey = item.status as StatusProgram;
                  return (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`${basePath}/${item.id}`)}
                    >
                      <TableCell className="text-center">
                        {(pageNumber - 1) * limitNumber + idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.judul}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "border",
                            statusBadgeMap[statusKey]?.color,
                          )}
                        >
                          {statusBadgeMap[statusKey]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.pic || "-"}</TableCell>
                      <TableCell>
                        {item.domainIsu ? (
                          <Badge variant="outline">{item.domainIsu.nama}</Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>{item.lokasi || "-"}</TableCell>
                      <TableCell>
                        {item.tanggalMulai
                          ? format(new Date(item.tanggalMulai), "dd MMM yyyy", {
                              locale: id,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.push(`${basePath}/${item.id}`)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canEdit && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  router.push(`${basePath}/${item.id}/edit`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setSelectedDeleteId(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {meta && programList.length > 0 && (
            <div className="flex items-center justify-between mt-4 py-2">
              <div className="text-sm text-muted-foreground">
                Menampilkan {(pageNumber - 1) * limitNumber + 1} -{" "}
                {Math.min(pageNumber * limitNumber, meta.total)} dari{" "}
                {meta.total}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage(String(pageNumber - 1))}
                  disabled={pageNumber === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 py-1 bg-muted rounded-md text-sm">
                  Halaman {pageNumber} dari {meta.totalPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage(String(pageNumber + 1))}
                  disabled={pageNumber >= meta.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

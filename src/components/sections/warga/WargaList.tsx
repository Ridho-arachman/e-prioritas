// components/sections/warga/WargaList.tsx
"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  Loader2,
  MessageCircle,
  Plus,
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
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatusNoHPWarga } from "@/app/generated/prisma";
import { useDelete, useGet } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { buildQuery } from "@/utils/query";

// Import komponen baru
import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
import TableSkeleton from "@/components/blocks/tableSkeleton";

const statusBadgeMap: Record<
  StatusNoHPWarga,
  { label: string; color: string }
> = {
  TERVERIFIKASI: {
    label: "Terverifikasi",
    color: "bg-green-100 text-green-700",
  },
  BELUM_TERVERIFIKASI: {
    label: "Belum Terverifikasi",
    color: "bg-yellow-100 text-yellow-700",
  },
};

interface WargaListProps {
  role?: "admin" | "lurah" | "perangkat";
}

export function WargaList({ role = "admin" }: WargaListProps) {
  const router = useRouter();
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [statusNoHp, setStatusNoHp] = useQueryState("statusNoHp", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [limit] = useQueryState("limit", { defaultValue: "10" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null); // State loading tombol verifikasi

  const [debouncedQ] = useDebounce(q, 500);
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const queryString = buildQuery({
    q: debouncedQ || undefined,
    statusNoHp: statusNoHp || undefined,
    page: pageNumber,
    limit: limitNumber,
    sortBy,
    sortOrder,
  });

  const { data, meta, isLoading, error, mutate } = useGet(
    `/protected/warga${queryString}`,
  );

  const { del: deleteWarga, loading: deleteLoading } = useDelete();

  const wargaList = data || [];

  useEffect(() => {
    setPage("1");
  }, [debouncedQ, statusNoHp, sortBy, sortOrder]);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deleteWarga(`/protected/warga/${selectedDeleteId}`);
      notifier.success("Berhasil", res?.message || "Warga berhasil dihapus");
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

  const handleSendVerifyLink = async (e: React.MouseEvent, warga: any) => {
    e.stopPropagation(); // Mencegah navigasi ke detail saat klik tombol
    setVerifyingId(warga.id);

    try {
      const res = await fetch("/api/protected/warga/verification-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wargaId: warga.id }),
      });

      if (!res.ok) throw new Error("Gagal membuat link");

      const { waLink } = await res.json();
      window.open(waLink, "_blank", "noopener,noreferrer");
      notifier.success("Berhasil", "Link verifikasi dikirim ke WhatsApp");
    } catch (error) {
      console.error("Error sending verification link:", error);
      notifier.error("Gagal", "Tidak dapat mengirim link verifikasi");
    } finally {
      setVerifyingId(null);
    }
  };

  const clearFilters = () => {
    setStatusNoHp("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setIsFilterOpen(false);
  };

  const hasActiveFilters =
    statusNoHp !== "" || sortBy !== "createdAt" || sortOrder !== "desc";

  return (
    <>
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => !open && setSelectedDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus warga?</AlertDialogTitle>
            <AlertDialogDescription>
              Warga akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
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
              <Button onClick={() => router.push(`/${role}/kelola-warga/add`)}>
                <Plus className="mr-2 h-4 w-4" /> Tambah Warga
              </Button>
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
                  <Filter className="mr-2 h-4 w-4" /> Filter & Sort
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      1
                    </Badge>
                  )}
                </Button>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filter & Pengurutan</DialogTitle>
                    <DialogDescription>
                      Atur filter dan urutan data warga
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Status Verifikasi</Label>
                      <Select
                        value={statusNoHp || "all"}
                        onValueChange={(v) =>
                          setStatusNoHp(v === "all" ? "" : v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Semua status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua</SelectItem>
                          <SelectItem value="TERVERIFIKASI">
                            Terverifikasi
                          </SelectItem>
                          <SelectItem value="BELUM_TERVERIFIKASI">
                            Belum Terverifikasi
                          </SelectItem>
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
                          <SelectItem value="nama">Nama</SelectItem>
                          <SelectItem value="noHp">Nomor HP</SelectItem>
                          <SelectItem value="statusNoHp">
                            Status Verifikasi
                          </SelectItem>
                          <SelectItem value="createdAt">
                            Tanggal Dibuat
                          </SelectItem>
                          <SelectItem value="updatedAt">
                            Terakhir Update
                          </SelectItem>
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
                placeholder="Cari nama atau nomor HP..."
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
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {statusNoHp && (
                <Badge variant="secondary" className="gap-2">
                  Status:{" "}
                  {statusNoHp === "TERVERIFIKASI"
                    ? "Terverifikasi"
                    : "Belum Terverifikasi"}
                  <button onClick={() => setStatusNoHp("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(sortBy !== "createdAt" || sortOrder !== "desc") && (
                <Badge variant="secondary" className="gap-2">
                  Sort: {sortBy} {sortOrder === "asc" ? "↑" : "↓"}
                  <button
                    onClick={() => {
                      setSortBy("createdAt");
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
                  <TableHead>Nama</TableHead>
                  <TableHead>Nomor HP</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <TableSkeleton rows={5} />}
                {error && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <DataError message={error?.message} />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  !error &&
                  wargaList.length === 0 &&
                  !debouncedQ &&
                  !hasActiveFilters && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <DataKosong title="Belum ada data warga" />
                      </TableCell>
                    </TableRow>
                  )}
                {!isLoading &&
                  !error &&
                  wargaList.length === 0 &&
                  (debouncedQ || hasActiveFilters) && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <DataTidakDitemukan />
                      </TableCell>
                    </TableRow>
                  )}
                {wargaList.map((item: any, idx: number) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      router.push(`/${role}/kelola-warga/${item.id}`)
                    }
                  >
                    <TableCell className="text-center">
                      {(pageNumber - 1) * limitNumber + idx + 1}
                    </TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>{item.noHp}</TableCell>
                    <TableCell>{item.alamat || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusBadgeMap[item.statusNoHp as StatusNoHPWarga]
                            ?.color
                        }
                      >
                        {
                          statusBadgeMap[item.statusNoHp as StatusNoHPWarga]
                            ?.label
                        }
                      </Badge>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(`/${role}/kelola-warga/${item.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(`/${role}/kelola-warga/${item.id}/edit`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {/* Tombol Kirim Link Verifikasi - hanya muncul jika belum terverifikasi */}
                        {item.statusNoHp === "BELUM_TERVERIFIKASI" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={(e) => handleSendVerifyLink(e, item)}
                            disabled={verifyingId === item.id}
                            title="Kirim Link Verifikasi WhatsApp"
                          >
                            {verifyingId === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setSelectedDeleteId(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {meta && wargaList.length > 0 && (
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

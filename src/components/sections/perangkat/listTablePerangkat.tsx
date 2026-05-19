"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
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
import { useDelete, useGet, usePost } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { buildQuery } from "@/utils/query";
import { AxiosError } from "axios";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Send,
  SlidersHorizontal,
  Trash,
  Verified,
  X,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { notifier } from "../../../lib/ToastNotifier";
import DataError from "../../blocks/DataError";
import DataKosong from "../../blocks/DataKosong";
import DataTidakDitemukan from "../../blocks/DataTidakDitemukan";
import TableSkeleton from "../../blocks/tableSkeleton";

// Helper function untuk mendapatkan inisial dari nama
const getInitials = (name: string): string => {
  if (!name) return "?";

  const names = name.trim().split(" ");

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};

// Opsi role yang tersedia untuk filter (tanpa string kosong)
const roleOptions = [
  { value: "all", label: "Semua Perangkat" },
  { value: "LURAH", label: "Lurah" },
  { value: "PERANGKAT_DESA", label: "Perangkat Desa" },
];

export default function ListTablePerangkat() {
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Query states
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [active, setActive] = useQueryState("isActive", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage] = useQueryState("perPage", { defaultValue: "10" });
  const [role, setRole] = useQueryState("role", { defaultValue: "all" });

  // Sorting states
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "name" });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });

  const [debouncedQ] = useDebounce(q, 500);

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const queryString = buildQuery({
    q: debouncedQ,
    isActive: active,
    page: pageNumber,
    perPage: perPageNumber,
    sortBy,
    sortOrder,
    role: role !== "all" ? role : undefined,
  });

  const { data, meta, error, isLoading, mutate } = useGet(
    `/protected/perangkat${queryString}`,
  );

  const { del: deletePerangkat, loading: deleteLoading } = useDelete();
  const { post, loading: verifyLoading } = usePost("/auth/send-verify-email");

  const cellCenter = "text-center align-middle truncate max-w-[150px]";

  // Sorting configuration
  const sortOptions = [
    { value: "name", label: "Nama" },
    { value: "email", label: "Email" },
    { value: "jabatan", label: "Jabatan" },
    { value: "createdAt", label: "Tanggal Dibuat" },
  ];

  const hasSignificantFilter =
    (debouncedQ?.trim() !== "" && debouncedQ !== undefined) ||
    active !== "" ||
    role !== "all";

  useEffect(() => {
    setPage("1");
  }, [debouncedQ, setPage]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deletePerangkat(
        `/protected/perangkat/${selectedDeleteId}`,
      );
      notifier.success("Berhasil", res?.message);
      mutate();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
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
      const err = error as AxiosError<{ message: string }>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setActive("");
    setRole("all");
    setSortBy("name");
    setSortOrder("asc");
    setIsFilterOpen(false);
  };

  const hasActiveFilters =
    active !== "" || role !== "all" || sortBy !== "name" || sortOrder !== "asc";

  if (!isMounted) {
    return (
      <div className="p-4 md:p-6">
        {/* Skeleton loading */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="animate-pulse bg-muted h-10 w-40 rounded"></div>
            <div className="animate-pulse bg-muted h-10 w-32 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="animate-pulse bg-muted h-10 w-40 rounded"></div>
            <div className="animate-pulse bg-muted h-10 w-10 rounded"></div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-9 gap-4 p-4 border-b bg-muted/50">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-muted h-6 rounded"
                ></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-9 gap-4 p-4 border-b">
                {[...Array(9)].map((_, j) => (
                  <div
                    key={j}
                    className="animate-pulse bg-muted h-6 rounded"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-muted rounded-lg h-24"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => {
          if (!open) setSelectedDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus perangkat desa?</AlertDialogTitle>
            <AlertDialogDescription>
              Data akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
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
                  <Spinner className="mr-2 h-4 w-4" /> Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CardHeader className="space-y-4">
        {/* Baris tombol dan filter */}
        <div className="flex flex-col gap-4">
          {/* Baris pertama: Tombol Tambah dan Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/kelola-perangkat/add"
              className="flex-1 sm:flex-none"
            >
              <Button className="cursor-pointer w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Tambah Perangkat
              </Button>
            </Link>

            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <Button
                variant="outline"
                className="cursor-pointer flex-1 sm:flex-none"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter & Sort
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {[
                      active !== "" ? 1 : 0,
                      role !== "all" ? 1 : 0,
                      sortBy !== "name" || sortOrder !== "asc" ? 1 : 0,
                    ].reduce((a, b) => a + b, 0)}
                  </Badge>
                )}
              </Button>

              {/* Dialog Filter Responsif */}
              <DialogContent className="sm:max-w-125 md:max-w-137.5 w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto rounded-lg">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filter & Pengurutan
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    Atur filter dan urutan data perangkat desa
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 py-3">
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Pilih role untuk memfilter data. Default: Semua Perangkat
                      (Lurah & Perangkat Desa).
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <Label>Status Aktif</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant={active === "true" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() =>
                          setActive(active === "true" ? "" : "true")
                        }
                      >
                        <Verified className="mr-2 h-4 w-4" />
                        Aktif
                      </Button>
                      <Button
                        variant={active === "false" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() =>
                          setActive(active === "false" ? "" : "false")
                        }
                      >
                        <X className="mr-2 h-4 w-4" />
                        Tidak Aktif
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <Label>Urutkan Berdasarkan</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kolom" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() => setSortOrder("asc")}
                      >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Ascending
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() => setSortOrder("desc")}
                      >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Descending
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="cursor-pointer"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="cursor-pointer"
                  >
                    Terapkan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Baris kedua: Search input */}
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari Nama / Jabatan / Email..."
              className="flex-1 min-w-45"
            />
            {q && (
              <Button
                variant="outline"
                onClick={() => setQ("")}
                className="cursor-pointer"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Badge filter aktif */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {role !== "all" && (
              <Badge variant="secondary" className="gap-2">
                Role: {roleOptions.find((opt) => opt.value === role)?.label}
                <button
                  onClick={() => setRole("all")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {active !== "" && (
              <Badge variant="secondary" className="gap-2">
                Status: {active === "true" ? "Aktif" : "Tidak Aktif"}
                <button
                  onClick={() => setActive("")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(sortBy !== "name" || sortOrder !== "asc") && (
              <Badge variant="secondary" className="gap-2">
                Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}{" "}
                {sortOrder === "asc" ? "↑" : "↓"}
                <button
                  onClick={() => {
                    setSortBy("name");
                    setSortOrder("asc");
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-12">No</TableHead>
                <TableHead className="text-center w-16">Foto</TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSortChange("name")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Nama
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSortChange("email")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Email
                    {sortBy === "email" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSortChange("jabatan")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Jabatan
                    {sortBy === "jabatan" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center">Aktif</TableHead>
                <TableHead className="text-center">Email Verified</TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSortChange("createdAt")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Tanggal Dibuat
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center w-40">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && !data && <TableSkeleton rows={5} />}
              {error && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    <DataError message={error?.message} />
                  </TableCell>
                </TableRow>
              )}
              {data?.length === 0 && !hasSignificantFilter && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    <DataKosong />
                  </TableCell>
                </TableRow>
              )}
              {data?.length === 0 && hasSignificantFilter && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    <DataTidakDitemukan />
                  </TableCell>
                </TableRow>
              )}
              {data?.length > 0 &&
                data?.map((item: any, index: number) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() =>
                      router.push(`/admin/kelola-perangkat/${item.id}`)
                    }
                  >
                    <TableCell className={cellCenter}>
                      {(pageNumber - 1) * perPageNumber + index + 1}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      <div className="flex justify-center">
                        <Avatar className="h-10 w-10 border-2 border-muted">
                          <AvatarImage
                            src={item.image || undefined}
                            alt={item.name}
                            className={cn(
                              "object-cover",
                              !item.image && "hidden",
                            )}
                          />
                          <AvatarFallback className="bg-linear-to-br from-primary to-primary/70 text-white font-medium">
                            {getInitials(item.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TableCell>
                    <TableCell className={cellCenter}>{item.name}</TableCell>
                    <TableCell className={cellCenter}>{item.email}</TableCell>
                    <TableCell className={cellCenter}>{item.jabatan}</TableCell>
                    <TableCell className="align-middle">
                      <div className="flex items-center justify-center">
                        {item.isActive ? (
                          <Badge variant="default">Aktif</Badge>
                        ) : (
                          <Badge variant="destructive">Non Aktif</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex items-center justify-center">
                        {item.emailVerified ? (
                          <Badge variant="default">Terverifikasi</Badge>
                        ) : (
                          <Badge variant="outline">Belum</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/admin/kelola-perangkat/${item.id}/edit`,
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDeleteId(item.id);
                          }}
                          className="cursor-pointer"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={item.emailVerified || verifyLoading}
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
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Total: {meta?.total || 0} User
          </div>
          <div className="flex gap-2 order-1 sm:order-2 justify-between sm:justify-end w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber - 1))}
              disabled={pageNumber === 1}
              className="cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="px-4 py-2 bg-muted rounded-md whitespace-nowrap text-sm">
              Halaman {pageNumber} dari {meta?.totalPages || 1}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber + 1))}
              disabled={pageNumber >= (meta?.totalPages || 1)}
              className="cursor-pointer"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}

"use client";

import {
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Eye,
  Trash,
  SlidersHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { notifier } from "@/lib/ToastNotifier";
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
import { useDelete, useGet } from "@/hooks/useApi";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
import DataError from "@/components/blocks/DataError";
import TableSkeleton from "@/components/blocks/tableSkeleton";
import { useQueryState } from "nuqs";
import { buildQuery } from "@/utils/query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "MENUNGGU":
      return (
        <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
          Menunggu
        </Badge>
      );
    case "DIPROSES":
      return (
        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
          Diproses
        </Badge>
      );
    case "SELESAI":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          Selesai
        </Badge>
      );
    case "DITOLAK":
      return <Badge variant="destructive">Ditolak</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function MasukanListTable() {
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Query states
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "" });
  const [domainIsuId, setDomainIsuId] = useQueryState("domainIsuId", {
    defaultValue: "",
  });
  const [diverifikasiOlehId, setDiverifikasiOlehId] = useQueryState(
    "diverifikasiOlehId",
    { defaultValue: "" },
  );
  const [createdAt, setCreatedAt] = useQueryState("createdAt", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage] = useQueryState("perPage", { defaultValue: "10" });

  // Sorting states
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const [debouncedQ] = useDebounce(q, 500);

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  // Build query string
  const queryString = buildQuery({
    q: debouncedQ,
    status,
    domainIsuId,
    diverifikasiOlehId,
    createdAt,
    page: pageNumber,
    perPage: perPageNumber,
    sortBy,
    sortOrder,
  });

  // DATA MASUKAN
  const { data, meta, error, isLoading, mutate } = useGet(
    `/protected/masukan${queryString}`,
  );

  // DATA DOMAIN ISU untuk filter
  const { data: kategori } = useGet("/protected/domain-isu");

  // DATA USER untuk filter verifikator
  const { data: resUser } = useGet("/protected/user?role=ADMIN,VERIFIKATOR");

  const { del: deleteMasukan, loading: deleteLoading } = useDelete();

  // Kolom dengan lebar proporsional yang diperbaiki (total 100%)
  const columnWidths = {
    no: "w-[4%] min-w-[48px]",
    namaPengirim: "w-[14%] min-w-[140px]",
    nomorHp: "w-[9%] min-w-[100px]",
    judul: "w-[18%] min-w-[180px]",
    domainIsu: "w-[9%] min-w-[110px]",
    lokasi: "w-[7%] min-w-[80px]",
    status: "w-[7%] min-w-22.5",
    tanggal: "w-[9%] min-w-[110px]",
    verifikator: "w-[9%] min-w-[120px]",
    aksi: "w-[14%] min-w-[160px]", // Diperbesar untuk menampung tombol
  };

  // Sorting configuration
  const sortOptions = [
    { value: "namaPengirim", label: "Nama Pengirim" },
    { value: "judul", label: "Judul" },
    { value: "createdAt", label: "Tanggal Dibuat" },
    { value: "updatedAt", label: "Tanggal Diupdate" },
    { value: "status", label: "Status" },
  ];

  const hasSignificantFilter =
    (debouncedQ?.trim() !== "" && debouncedQ !== undefined) ||
    status !== "" ||
    domainIsuId !== "" ||
    diverifikasiOlehId !== "" ||
    createdAt !== "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset page to 1 when query parameters change
  useEffect(() => {
    // Store current values to compare
    const currentQ = q;
    const currentStatus = status;
    const currentDomainIsuId = domainIsuId;
    const currentDiverifikasiOlehId = diverifikasiOlehId;
    const currentCreatedAt = createdAt;
    const currentSortBy = sortBy;
    const currentSortOrder = sortOrder;

    // Create a dependency object
    const queryDeps = {
      q: currentQ,
      status: currentStatus,
      domainIsuId: currentDomainIsuId,
      diverifikasiOlehId: currentDiverifikasiOlehId,
      createdAt: currentCreatedAt,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
    };

    // Stringify to compare changes
    const queryDepsString = JSON.stringify(queryDeps);

    // Store initial value
    let initialDeps = queryDepsString;

    // Check if this is the first render or if dependencies changed
    if (typeof window !== "undefined") {
      const storedDeps = sessionStorage.getItem("masukanQueryDeps");

      if (storedDeps && storedDeps !== queryDepsString) {
        // Query parameters changed, reset to page 1
        setPage("1");
      }

      // Store current dependencies
      sessionStorage.setItem("masukanQueryDeps", queryDepsString);
    }
  }, [
    q,
    status,
    domainIsuId,
    diverifikasiOlehId,
    createdAt,
    sortBy,
    sortOrder,
    setPage,
  ]);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deleteMasukan(`/protected/masukan/${selectedDeleteId}`);
      notifier.success("Berhasil", res?.message);
      mutate();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error("Gagal", err?.response?.data?.message);
    } finally {
      setSelectedDeleteId(null);
    }
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
    // Reset page to 1 when sorting changes
    setPage("1");
  };

  const clearFilters = () => {
    setQ("");
    setStatus("");
    setDomainIsuId("");
    setDiverifikasiOlehId("");
    setCreatedAt("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage("1");
    setIsFilterOpen(false);
    // Clear stored dependencies
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("masukanQueryDeps");
    }
  };

  const hasActiveFilters =
    status !== "" ||
    domainIsuId !== "" ||
    diverifikasiOlehId !== "" ||
    createdAt !== "" ||
    sortBy !== "createdAt" ||
    sortOrder !== "desc";

  // Tampilkan loading atau versi sederhana saat belum mounted (SSR)
  if (!isMounted) {
    return (
      <div className="p-4 md:p-6">
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

        {/* Skeleton yang valid secara HTML */}
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

        {/* Mobile Skeleton */}
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
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => {
          if (!open) setSelectedDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus masukan warga?</AlertDialogTitle>
            <AlertDialogDescription>
              Data masukan akan dihapus permanen. Tindakan ini tidak dapat
              dibatalkan.
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
        <div className="mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          {/* Left Section - Actions */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter Button */}
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter & Sort
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {[
                      status,
                      domainIsuId,
                      diverifikasiOlehId,
                      createdAt,
                    ].filter(Boolean).length +
                      (sortBy !== "createdAt" || sortOrder !== "desc" ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filter & Pengurutan Masukan
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    Atur filter dan urutan data masukan warga
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  {/* Status Filter */}
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select
                      value={status || "ALL"}
                      onValueChange={(v) => {
                        setStatus(v === "ALL" ? "" : v);
                        setPage("1"); // Reset page when status changes
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua Status</SelectItem>
                        <SelectItem value="MENUNGGU">Menunggu</SelectItem>
                        <SelectItem value="DIPROSES">Diproses</SelectItem>
                        <SelectItem value="SELESAI">Selesai</SelectItem>
                        <SelectItem value="DITOLAK">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Domain Isu Filter */}
                  <div className="grid gap-2">
                    <Label>Domain Isu</Label>
                    <Select
                      value={domainIsuId || "ALL"}
                      onValueChange={(v) => {
                        setDomainIsuId(v === "ALL" ? "" : v);
                        setPage("1"); // Reset page when domain changes
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih domain isu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua Domain</SelectItem>
                        {kategori?.map((item: any) => (
                          <SelectItem key={item?.id} value={item?.id}>
                            {item?.nama || item?.namaDomain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Verifikator Filter */}
                  <div className="grid gap-2">
                    <Label>Verifikator</Label>
                    <Select
                      value={diverifikasiOlehId || "ALL"}
                      onValueChange={(v) => {
                        setDiverifikasiOlehId(v === "ALL" ? "" : v);
                        setPage("1"); // Reset page when verifikator changes
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih verifikator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua Verifikator</SelectItem>
                        {resUser?.data?.map((item: any) => (
                          <SelectItem key={item?.id} value={item?.id}>
                            {item?.name || item?.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tanggal Filter */}
                  <div className="grid gap-2">
                    <Label>Tanggal</Label>
                    <div className="flex items-center border rounded-md px-2 py-1">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground mr-2" />
                      <input
                        type="date"
                        className="bg-transparent outline-none w-full"
                        value={createdAt}
                        onChange={(e) => {
                          setCreatedAt(e.target.value);
                          setPage("1"); // Reset page when date changes
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Sorting Section */}
                  <div className="grid gap-2">
                    <Label>Urutkan Berdasarkan</Label>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => {
                        setSortBy(value);
                        setPage("1"); // Reset page when sort column changes
                      }}
                    >
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

                    <div className="flex gap-2">
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          setSortOrder("asc");
                          setPage("1"); // Reset page when sort order changes
                        }}
                      >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Ascending
                      </Button>

                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          setSortOrder("desc");
                          setPage("1"); // Reset page when sort order changes
                        }}
                      >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Descending
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2">
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

          {/* Right Section - Search */}
          <div className="flex gap-2">
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                // Page will be reset by useEffect when debouncedQ changes
              }}
              placeholder="Cari nama, no HP, judul..."
              className="cursor-pointer min-w-62.5"
            />
            {q && (
              <Button
                variant="outline"
                onClick={() => {
                  setQ("");
                  setPage("1");
                }}
                className="cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Badge */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {status && status !== "ALL" && (
              <Badge variant="secondary" className="gap-2">
                Status: {status}
                <button
                  onClick={() => {
                    setStatus("");
                    setPage("1");
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {domainIsuId && domainIsuId !== "ALL" && (
              <Badge variant="secondary" className="gap-2">
                Domain: {domainIsuId}
                <button
                  onClick={() => {
                    setDomainIsuId("");
                    setPage("1");
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {diverifikasiOlehId && diverifikasiOlehId !== "ALL" && (
              <Badge variant="secondary" className="gap-2">
                Verifikator: {diverifikasiOlehId}
                <button
                  onClick={() => {
                    setDiverifikasiOlehId("");
                    setPage("1");
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {createdAt && (
              <Badge variant="secondary" className="gap-2">
                Tanggal: {createdAt}
                <button
                  onClick={() => {
                    setCreatedAt("");
                    setPage("1");
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(sortBy !== "createdAt" || sortOrder !== "desc") && (
              <Badge variant="secondary" className="gap-2">
                Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}{" "}
                {sortOrder === "asc" ? "↑" : "↓"}
                <button
                  onClick={() => {
                    setSortBy("createdAt");
                    setSortOrder("desc");
                    setPage("1");
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
        {/* Responsive Table Container with Horizontal Scroll for Mobile/Tablet */}
        <div className="overflow-x-auto">
          <div className="min-w-225 md:min-w-full">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead
                    className={cn(
                      "text-center sticky left-0 z-20 bg-background",
                      columnWidths.no,
                    )}
                  >
                    No
                  </TableHead>
                  <TableHead
                    className={cn(
                      "text-center cursor-pointer hover:bg-muted/50",
                      columnWidths.namaPengirim,
                    )}
                    onClick={() => {
                      handleSortChange("namaPengirim");
                      setPage("1");
                    }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Nama Pengirim
                      {sortBy === "namaPengirim" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className={cn("text-center", columnWidths.nomorHp)}
                  >
                    No. HP
                  </TableHead>
                  <TableHead
                    className={cn(
                      "text-center cursor-pointer hover:bg-muted/50",
                      columnWidths.judul,
                    )}
                    onClick={() => {
                      handleSortChange("judul");
                      setPage("1");
                    }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Judul
                      {sortBy === "judul" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className={cn("text-center", columnWidths.domainIsu)}
                  >
                    Domain Isu
                  </TableHead>
                  <TableHead className={cn("text-center", columnWidths.lokasi)}>
                    RT/RW
                  </TableHead>
                  <TableHead
                    className={cn(
                      "text-center cursor-pointer hover:bg-muted/50",
                      columnWidths.status,
                    )}
                    onClick={() => {
                      handleSortChange("status");
                      setPage("1");
                    }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Status
                      {sortBy === "status" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className={cn(
                      "text-center cursor-pointer hover:bg-muted/50",
                      columnWidths.tanggal,
                    )}
                    onClick={() => {
                      handleSortChange("createdAt");
                      setPage("1");
                    }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Tanggal
                      {sortBy === "createdAt" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className={cn("text-center", columnWidths.verifikator)}
                  >
                    Verifikator
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading && !data && <TableSkeleton rows={5} />}

                {error && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      <DataError message={error?.message} />
                    </TableCell>
                  </TableRow>
                )}

                {data?.length === 0 && !hasSignificantFilter && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      <DataKosong />
                    </TableCell>
                  </TableRow>
                )}

                {data?.length === 0 && hasSignificantFilter && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      <DataTidakDitemukan />
                    </TableCell>
                  </TableRow>
                )}

                {data?.length > 0 &&
                  data?.map((item: any, index: number) => (
                    <TableRow
                      key={item?.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() =>
                        router.push(`/admin/kelola-masukan/${item?.id}`)
                      }
                    >
                      <TableCell
                        className={cn(
                          "text-center align-middle truncate sticky left-0 z-10 bg-background",
                          columnWidths.no,
                        )}
                      >
                        {(pageNumber - 1) * perPageNumber + index + 1}
                      </TableCell>

                      <TableCell
                        className={cn(
                          "text-center align-middle truncate",
                          columnWidths.namaPengirim,
                        )}
                        title={item?.namaPengirim}
                      >
                        {item?.namaPengirim}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center align-middle truncate",
                          columnWidths.nomorHp,
                        )}
                        title={item?.nomorHp}
                      >
                        {item?.nomorHp}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center align-middle truncate",
                          columnWidths.judul,
                        )}
                        title={item?.judul}
                      >
                        {item?.judul}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center align-middle truncate",
                          columnWidths.domainIsu,
                        )}
                        title={item?.domainIsu?.nama || "-"}
                      >
                        {item?.domainIsu?.nama || "-"}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center align-middle truncate",
                          columnWidths.lokasi,
                        )}
                      >
                        RT {item?.lokasiRt}/RW {item?.lokasiRw}
                      </TableCell>
                      <TableCell
                        className={cn("align-middle", columnWidths.status)}
                      >
                        <div className="flex items-center justify-center">
                          <StatusBadge status={item?.status} />
                        </div>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center align-middle",
                          columnWidths.tanggal,
                        )}
                      >
                        {item?.createdAt
                          ? format(new Date(item?.createdAt), "dd MMM yyyy", {
                              locale: id,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center align-middle truncate",
                          columnWidths.verifikator,
                        )}
                        title={item?.diverifikasiOleh?.name || "-"}
                      >
                        {item?.diverifikasiOleh?.name || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground w-full sm:w-auto">
            Total: {meta?.total || 0} Masukan
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber - 1))}
              disabled={pageNumber === 1}
              className="cursor-pointer min-w-22.5"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="px-4 py-2 bg-muted rounded-md min-w-30 text-center">
              Halaman {pageNumber} dari {meta?.totalPages || 1}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber + 1))}
              disabled={pageNumber >= (meta?.totalPages || 1)}
              className="cursor-pointer min-w-22.5"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}

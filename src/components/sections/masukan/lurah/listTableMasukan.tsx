"use client";

import {
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
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

import { useGet } from "@/hooks/useApi";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
import DataError from "@/components/blocks/DataError";
import TableSkeleton from "@/components/blocks/tableSkeleton";

import { useQueryState } from "nuqs";
import { buildQuery } from "@/utils/query";
import { useRouter } from "next/navigation";

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

// ============================================================
// STATUS BADGE
// ============================================================
const statusColorMap: Record<string, string> = {
  MENUNGGU: "bg-yellow-500 hover:bg-yellow-600",
  DIVERIFIKASI: "bg-green-600 hover:bg-green-700",
  DITOLAK: "bg-red-600 hover:bg-red-700",
  DIPROSES: "bg-blue-500 hover:bg-blue-600",
  DISELESAIKAN: "bg-purple-600 hover:bg-purple-700",
  KADALUWARSA: "bg-gray-500 hover:bg-gray-600",
};

const statusLabelMap: Record<string, string> = {
  MENUNGGU: "Menunggu",
  DIVERIFIKASI: "Diverifikasi",
  DITOLAK: "Ditolak",
  DIPROSES: "Diproses",
  DISELESAIKAN: "Selesai",
  KADALUWARSA: "Kadaluwarsa",
};

const StatusBadge = ({ status }: { status: string }) => {
  const color = statusColorMap[status] || "bg-gray-400 hover:bg-gray-500";
  const label = statusLabelMap[status] || status;

  return (
    <Badge variant="default" className={cn(color, "text-white shadow-sm")}>
      {label}
    </Badge>
  );
};

export default function MasukanListTable() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // ============================================================
  // QUERY STATE
  // ============================================================
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "" });
  const [domainIsuId, setDomainIsuId] = useQueryState("domainIsuId", {
    defaultValue: "",
  });
  const [diprosesOlehId, setDiprosesOlehId] = useQueryState("diprosesOlehId", {
    defaultValue: "",
  });
  const [createdAt, setCreatedAt] = useQueryState("createdAt", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage] = useQueryState("perPage", { defaultValue: "10" });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });

  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  // ============================================================
  // DERIVED STATE
  // ============================================================
  const [debouncedQ] = useDebounce(q, 500);

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const queryString = buildQuery({
    q: debouncedQ || undefined,
    status: status || undefined,
    domainIsuId: domainIsuId || undefined,
    diprosesOlehId: diprosesOlehId || undefined,
    createdAt: createdAt || undefined,
    page: pageNumber,
    perPage: perPageNumber,
    sortBy,
    sortOrder,
  });

  // ============================================================
  // API CALLS
  // ============================================================
  const { data, error, isLoading, meta } = useGet(
    `/protected/masukan${queryString}`,
  );

  const { data: domainIsuData } = useGet("/protected/kategori");
  const { data: userData } = useGet("/protected/users?role=ADMIN&perPage=100");

  const masukanList = data || [];
  const paginationMeta = meta;

  // ============================================================
  // FILTER STATE
  // ============================================================
  const hasSignificantFilter =
    (debouncedQ?.trim() !== "" && debouncedQ !== undefined) ||
    status !== "" ||
    domainIsuId !== "" ||
    diprosesOlehId !== "" ||
    createdAt !== "";

  const hasActiveFilters =
    status !== "" ||
    domainIsuId !== "" ||
    diprosesOlehId !== "" ||
    createdAt !== "" ||
    sortBy !== "createdAt" ||
    sortOrder !== "desc";

  // ============================================================
  // EFFECTS
  // ============================================================
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset ke halaman 1 ketika filter berubah
  useEffect(() => {
    setPage("1");
  }, [debouncedQ, status, domainIsuId, diprosesOlehId, createdAt, setPage]);

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage("1");
  };

  const clearFilters = () => {
    setQ("");
    setStatus("");
    setDomainIsuId("");
    setDiprosesOlehId("");
    setCreatedAt("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage("1");
    setIsFilterOpen(false);
  };

  const getDomainIsuLabel = (id: string) => {
    const domain = domainIsuData?.find((d: any) => d.id === id);
    return domain?.nama || id;
  };

  const getUserLabel = (id: string) => {
    const user = userData?.find((u: any) => u.id === id);
    return user?.name || id;
  };

  // ============================================================
  // SSR SKELETON
  // ============================================================
  if (!isMounted) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
          <div className="flex gap-4">
            <div className="animate-pulse bg-muted h-10 w-40 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="animate-pulse bg-muted h-10 w-48 rounded"></div>
            <div className="animate-pulse bg-muted h-10 w-10 rounded"></div>
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted h-12 border-b"></div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <CardHeader className="space-y-4 p-4 md:p-6 border-b bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* FILTER BUTTON */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter & Sort
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {Number(Boolean(status)) +
                    Number(Boolean(domainIsuId)) +
                    Number(Boolean(diprosesOlehId)) +
                    Number(Boolean(createdAt)) +
                    (sortBy !== "createdAt" || sortOrder !== "desc" ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filter & Pengurutan Masukan
                </DialogTitle>
                <DialogDescription>
                  Atur filter dan urutan data masukan warga
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {/* STATUS */}
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={status || "ALL"}
                    onValueChange={(v) => {
                      setStatus(v === "ALL" ? "" : v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua</SelectItem>
                      <SelectItem value="MENUNGGU">Menunggu</SelectItem>
                      <SelectItem value="DIVERIFIKASI">Diverifikasi</SelectItem>
                      <SelectItem value="DITOLAK">Ditolak</SelectItem>
                      <SelectItem value="DIPROSES">Diproses</SelectItem>
                      <SelectItem value="DISELESAIKAN">Selesai</SelectItem>
                      <SelectItem value="KADALUWARSA">Kadaluwarsa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* DOMAIN ISU */}
                <div className="grid gap-2">
                  <Label>Domain Isu</Label>
                  <Select
                    value={domainIsuId || "ALL"}
                    onValueChange={(v) => {
                      setDomainIsuId(v === "ALL" ? "" : v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih domain isu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua</SelectItem>
                      {domainIsuData?.map((domain: any) => (
                        <SelectItem key={domain.id} value={domain.id}>
                          {domain.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* DIPROSES OLEH */}
                <div className="grid gap-2">
                  <Label>Diverifikasi Oleh</Label>
                  <Select
                    value={diprosesOlehId || "ALL"}
                    onValueChange={(v) => {
                      setDiprosesOlehId(v === "ALL" ? "" : v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih verifikator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua</SelectItem>
                      {userData?.map((user: any) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* TANGGAL DIBUAT */}
                <div className="grid gap-2">
                  <Label>Tanggal Dibuat</Label>
                  <Input
                    type="date"
                    value={createdAt}
                    onChange={(e) => {
                      setCreatedAt(e.target.value);
                    }}
                  />
                </div>

                <div className="col-span-full">
                  <Separator />
                </div>

                {/* SORT */}
                <div className="col-span-full grid gap-2">
                  <Label>Urutkan Berdasarkan</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sortBy === "createdAt" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange("createdAt")}
                      className="shadow-sm hover:shadow-md transition-all"
                    >
                      Tanggal
                      {sortBy === "createdAt" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-1 h-3 w-3" />
                        ))}
                    </Button>
                    <Button
                      variant={
                        sortBy === "namaPengirim" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleSortChange("namaPengirim")}
                      className="shadow-sm hover:shadow-md transition-all"
                    >
                      Nama
                      {sortBy === "namaPengirim" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-1 h-3 w-3" />
                        ))}
                    </Button>
                    <Button
                      variant={sortBy === "status" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange("status")}
                      className="shadow-sm hover:shadow-md transition-all"
                    >
                      Status
                      {sortBy === "status" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-1 h-3 w-3" />
                        ))}
                    </Button>
                    <Button
                      variant={sortBy === "lokasiRt" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange("lokasiRt")}
                      className="shadow-sm hover:shadow-md transition-all"
                    >
                      RT
                      {sortBy === "lokasiRt" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-1 h-3 w-3" />
                        ))}
                    </Button>
                    <Button
                      variant={sortBy === "lokasiRw" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange("lokasiRw")}
                      className="shadow-sm hover:shadow-md transition-all"
                    >
                      RW
                      {sortBy === "lokasiRw" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-1 h-3 w-3" />
                        ))}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={clearFilters}>
                  Reset Semua
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>Terapkan</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* SEARCH */}
          <div className="flex gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari masukan..."
              className="min-w-62.5 transition-shadow focus:ring-2 focus:ring-primary/50"
            />
            {q && (
              <Button
                variant="outline"
                onClick={() => {
                  setQ("");
                }}
                className="shadow-sm hover:shadow-md transition-all"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {status && (
              <Badge variant="secondary" className="gap-2">
                Status: {statusLabelMap[status] || status}
                <button onClick={() => setStatus("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {domainIsuId && (
              <Badge variant="secondary" className="gap-2">
                Domain: {getDomainIsuLabel(domainIsuId)}
                <button onClick={() => setDomainIsuId("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {diprosesOlehId && (
              <Badge variant="secondary" className="gap-2">
                Verifikator: {getUserLabel(diprosesOlehId)}
                <button onClick={() => setDiprosesOlehId("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {createdAt && (
              <Badge variant="secondary" className="gap-2">
                Tanggal: {format(new Date(createdAt), "dd MMM yyyy")}
                <button onClick={() => setCreatedAt("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(sortBy !== "createdAt" || sortOrder !== "desc") && (
              <Badge variant="secondary" className="gap-2">
                Sort: {sortBy}{" "}
                {sortOrder === "asc" ? (
                  <ArrowUp className="h-3 w-3 inline" />
                ) : (
                  <ArrowDown className="h-3 w-3 inline" />
                )}
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

      <CardContent className="max-w-full overflow-hidden p-4 md:p-6">
        {/* Area tabel dengan scroll horizontal */}
        <div className="overflow-x-auto border rounded-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSortChange("namaPengirim")}
                >
                  <div className="flex justify-center items-center gap-1 font-semibold">
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
                  className="text-center cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSortChange("status")}
                >
                  <div className="flex justify-center items-center gap-1 font-semibold">
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
                  className="text-center cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSortChange("lokasiRt")}
                >
                  <div className="flex justify-center items-center gap-1 font-semibold">
                    RT
                    {sortBy === "lokasiRt" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSortChange("lokasiRw")}
                >
                  <div className="flex justify-center items-center gap-1 font-semibold">
                    RW
                    {sortBy === "lokasiRw" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSortChange("createdAt")}
                >
                  <div className="flex justify-center items-center gap-1 font-semibold">
                    Tanggal
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Domain Isu
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Diverifikasi Oleh
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableSkeleton rows={5} />}
              {error && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <DataError message={error.message} />
                  </TableCell>
                </TableRow>
              )}
              {masukanList.length === 0 &&
                !hasSignificantFilter &&
                !error &&
                !isLoading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <DataKosong />
                    </TableCell>
                  </TableRow>
                )}
              {masukanList.length === 0 &&
                hasSignificantFilter &&
                !error &&
                !isLoading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <DataTidakDitemukan />
                    </TableCell>
                  </TableRow>
                )}
              {masukanList.map((item: any) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    router.push(`/lurah/kelola-masukan/${item.id}`)
                  }
                >
                  <TableCell
                    className="text-center truncate max-w-50"
                    title={item.namaPengirim || ""}
                  >
                    {item.namaPengirim || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lokasiRt || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lokasiRw || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(new Date(item.createdAt), "dd MMM yyyy", {
                      locale: id,
                    })}
                  </TableCell>
                  <TableCell
                    className="text-center truncate max-w-37.5"
                    title={item.domainIsu?.nama || ""}
                  >
                    {item.domainIsu?.nama || "-"}
                  </TableCell>
                  <TableCell
                    className="text-center truncate max-w-37.5"
                    title={item.diverifikasiOleh?.name || ""}
                  >
                    {item.diverifikasiOleh?.name || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Total: {paginationMeta?.total || 0}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber - 1))}
              disabled={pageNumber === 1}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="px-4 py-2 bg-muted rounded-md">
              Halaman {pageNumber} dari {paginationMeta?.totalPages || 1}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber + 1))}
              disabled={pageNumber >= (paginationMeta?.totalPages || 1)}
              className="shadow-sm hover:shadow-md transition-all"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}

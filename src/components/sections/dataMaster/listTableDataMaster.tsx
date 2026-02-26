"use client";

import {
  Plus,
  XIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Trash,
  Filter,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { notifier } from "../../../lib/ToastNotifier";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDelete, useGet } from "@/hooks/useApi";
import DataKosong from "../../blocks/DataKosong";
import DataTidakDitemukan from "../../blocks/DataTidakDitemukan";
import DataError from "../../blocks/DataError";
import TableSkeleton from "../../blocks/tableSkeleton";
import Link from "next/link";
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

// Tipe data dari Prisma
import { DataMaster, DomainIsu, User } from "@/app/generated/prisma";

type DataMasterWithRelations = DataMaster & {
  domainIsu: Pick<DomainIsu, "nama">;
  diprosesOleh: Pick<User, "name"> | null;
};

export default function ListTableDataMaster() {
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Query states
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [domainIsuId, setDomainIsuId] = useQueryState("domainIsuId", {
    defaultValue: "",
  });
  const [lokasiRt, setLokasiRt] = useQueryState("lokasiRt", {
    defaultValue: "",
  });
  const [lokasiRw, setLokasiRw] = useQueryState("lokasiRw", {
    defaultValue: "",
  });
  const [nilai, setNilai] = useQueryState("nilai", { defaultValue: "" });
  const [updatedAt, setUpdatedAt] = useQueryState("updatedAt", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage] = useQueryState("perPage", { defaultValue: "10" });

  // Sorting states
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "updatedAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const [debouncedQ] = useDebounce(q, 500);

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const queryString = buildQuery({
    q: debouncedQ,
    domainIsuId,
    lokasiRt,
    lokasiRw,
    nilai,
    updatedAt,
    page: pageNumber,
    perPage: perPageNumber,
    sortBy,
    sortOrder,
  });

  const {
    data: response,
    meta,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/data-master${queryString}`);

  // Perbaikan: akses response.data
  const data: DataMasterWithRelations[] = response ?? [];

  const { del: deleteDataMaster, loading: deleteLoading } = useDelete();

  // Ambil data domain isu untuk dropdown filter
  const { data: domainResponse } = useGet(`/protected/kategori`);
  const domainList = domainResponse ?? [];

  const cellCenter =
    "text-center align-middle truncate max-w-[150px] whitespace-nowrap";

  // Sorting configuration
  const sortOptions = [
    { value: "domainIsuId", label: "Domain Isu" },
    { value: "namaAtribut", label: "Nama Atribut" },
    { value: "nilai", label: "Nilai" },
    { value: "jumlah", label: "Jumlah" },
    { value: "lokasiRt", label: "RT" },
    { value: "lokasiRw", label: "RW" },
    { value: "sumberData", label: "Sumber Data" },
    { value: "updatedAt", label: "Tanggal Diperbarui" },
    { value: "createdAt", label: "Tanggal Dibuat" },
  ];

  const hasSignificantFilter =
    (debouncedQ?.trim() !== "" && debouncedQ !== undefined) ||
    domainIsuId !== "" ||
    lokasiRt !== "" ||
    lokasiRw !== "" ||
    nilai !== "" ||
    updatedAt !== "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deleteDataMaster(
        `/protected/data-master/${selectedDeleteId}`,
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

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setDomainIsuId("");
    setLokasiRt("");
    setLokasiRw("");
    setNilai("");
    setUpdatedAt("");
    setSortBy("updatedAt");
    setSortOrder("desc");
    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (pageNumber !== 1) {
      setPage("1");
    }
  }, [
    debouncedQ,
    domainIsuId,
    lokasiRt,
    lokasiRw,
    nilai,
    updatedAt,
    sortBy,
    sortOrder,
  ]);

  const hasActiveFilters =
    domainIsuId !== "" ||
    lokasiRt !== "" ||
    lokasiRw !== "" ||
    nilai !== "" ||
    updatedAt !== "" ||
    sortBy !== "updatedAt" ||
    sortOrder !== "desc";

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
        <div className="hidden md:block">
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-11 gap-4 p-4 border-b bg-muted/50">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-muted h-6 rounded"
                ></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-11 gap-4 p-4 border-b">
                {[...Array(11)].map((_, j) => (
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
    <Card className="min-w-0 overflow-hidden">
      <AlertDialog
        open={!!selectedDeleteId}
        onOpenChange={(open) => !open && setSelectedDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus data master?</AlertDialogTitle>
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
        <div className="mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <Link href="/admin/kelola-data/add">
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Tambah Data Master
              </Button>
            </Link>

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
                    {
                      [
                        domainIsuId,
                        lokasiRt,
                        lokasiRw,
                        nilai,
                        updatedAt,
                      ].filter(Boolean).length
                    }{" "}
                    + {sortBy !== "updatedAt" || sortOrder !== "desc" ? 1 : 0}
                  </Badge>
                )}
              </Button>

              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filter & Pengurutan
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    Atur filter dan urutan data master
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label>Domain Isu</Label>
                    <Select
                      value={domainIsuId}
                      onValueChange={(val) =>
                        setDomainIsuId(val === "ALL" ? "" : val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih domain isu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua</SelectItem>
                        {domainList.map((domain: any) => (
                          <SelectItem key={domain.id} value={domain.id}>
                            {domain.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>RT</Label>
                      <Input
                        type="number"
                        min={1}
                        max={999}
                        value={lokasiRt}
                        onChange={(e) => setLokasiRt(e.target.value)}
                        placeholder="Contoh: 1"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>RW</Label>
                      <Input
                        type="number"
                        min={1}
                        max={999}
                        value={lokasiRw}
                        onChange={(e) => setLokasiRw(e.target.value)}
                        placeholder="Contoh: 5"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Nilai (teks)</Label>
                    <Input
                      value={nilai}
                      onChange={(e) => setNilai(e.target.value)}
                      placeholder="Cari nilai..."
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Tanggal Diperbarui</Label>
                    <Input
                      type="date"
                      value={updatedAt}
                      onChange={(e) => setUpdatedAt(e.target.value)}
                    />
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

                    <div className="flex gap-2">
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

          <div className="flex gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama atribut / nilai / sumber data..."
              className="cursor-pointer min-w-62.5"
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

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {domainIsuId && (
              <Badge variant="secondary" className="gap-2">
                Domain:{" "}
                {domainList.find((d: any) => d.id === domainIsuId)?.nama ||
                  domainIsuId}
                <button
                  onClick={() => setDomainIsuId("")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {lokasiRt && (
              <Badge variant="secondary" className="gap-2">
                RT: {lokasiRt}
                <button
                  onClick={() => setLokasiRt("")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {lokasiRw && (
              <Badge variant="secondary" className="gap-2">
                RW: {lokasiRw}
                <button
                  onClick={() => setLokasiRw("")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {nilai && (
              <Badge variant="secondary" className="gap-2">
                Nilai: {nilai}
                <button
                  onClick={() => setNilai("")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {updatedAt && (
              <Badge variant="secondary" className="gap-2">
                Tanggal: {updatedAt}
                <button
                  onClick={() => setUpdatedAt("")}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(sortBy !== "updatedAt" || sortOrder !== "desc") && (
              <Badge variant="secondary" className="gap-2">
                Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}{" "}
                {sortOrder === "asc" ? "↑" : "↓"}
                <button
                  onClick={() => {
                    setSortBy("updatedAt");
                    setSortOrder("desc");
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

      {/* Kontainer tabel dengan overflow-x-auto untuk scroll horizontal di dalam tabel */}
      <CardContent className="max-w-full p-4 md:p-6">
        <div className="overflow-x-auto">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-12 whitespace-nowrap px-2">
                  No
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-25"
                  onClick={() => handleSortChange("domainIsuId")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Domain Isu
                    {sortBy === "domainIsuId" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-30"
                  onClick={() => handleSortChange("namaAtribut")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Nama Atribut
                    {sortBy === "namaAtribut" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-20"
                  onClick={() => handleSortChange("nilai")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Nilai
                    {sortBy === "nilai" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-15"
                  onClick={() => handleSortChange("lokasiRt")}
                >
                  <div className="flex items-center justify-center gap-1">
                    RT
                    {sortBy === "lokasiRt" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-15"
                  onClick={() => handleSortChange("lokasiRw")}
                >
                  <div className="flex items-center justify-center gap-1">
                    RW
                    {sortBy === "lokasiRw" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-17.5"
                  onClick={() => handleSortChange("jumlah")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Jumlah
                    {sortBy === "jumlah" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-27.5"
                  onClick={() => handleSortChange("sumberData")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Sumber Data
                    {sortBy === "sumberData" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center whitespace-break-spaces px-2 min-w-27.5">
                  Diproses Oleh
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2 min-w-25"
                  onClick={() => handleSortChange("updatedAt")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Diperbarui Pada
                    {sortBy === "updatedAt" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center w-40 whitespace-nowrap px-2">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && !data && <TableSkeleton rows={5} />}

              {error && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center">
                    <DataError message={error?.message} />
                  </TableCell>
                </TableRow>
              )}

              {data?.length === 0 && !hasSignificantFilter && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center">
                    <DataKosong />
                  </TableCell>
                </TableRow>
              )}

              {data?.length === 0 && hasSignificantFilter && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center">
                    <DataTidakDitemukan />
                  </TableCell>
                </TableRow>
              )}

              {data?.length > 0 &&
                data.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => router.push(`/admin/kelola-data/${item.id}`)}
                  >
                    <TableCell className={cellCenter}>
                      {(pageNumber - 1) * perPageNumber + index + 1}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.domainIsu?.nama || "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.namaAtribut}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {item.kritikalitas}
                      </Badge>
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.lokasiRt ?? "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.lokasiRw ?? "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.jumlah ?? "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.sumberData || "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.diprosesOleh?.name ?? "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {new Date(item.updatedAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-2 whitespace-nowrap">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/kelola-data/${item.id}`);
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Total: {meta?.total || 0} Data
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber - 1))}
              disabled={pageNumber === 1}
              className="cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="px-4 py-2 bg-muted rounded-md">
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
    </Card>
  );
}

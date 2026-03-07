"use client";

import {
  Plus,
  XIcon,
  ChevronLeft,
  ChevronRight,
  Trash,
  Filter,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  Upload,
  Download,
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
import * as XLSX from "xlsx";

// Import schema dari file terpisah
import {
  dataMasterArraySchema,
  dataMasterCreateSchema,
} from "@/schema/dataMasterSchema";

// Import tipe dari Prisma
import { DataMaster, DomainIsu, User } from "@/app/generated/prisma";
import z from "zod";

type DataMasterWithRelations = DataMaster & {
  domainIsu: Pick<DomainIsu, "id" | "nama" | "code">;
  diprosesOleh: Pick<User, "id" | "name" | "email"> | null;
};

// Valid sort fields (harus sama dengan backend)
const VALID_SORT_FIELDS = [
  "namaAtribut",
  "kritikalitas",
  "jumlah",
  "tahunData",
  "isActive",
  "createdAt",
  "updatedAt",
] as const;
type ValidSortField = (typeof VALID_SORT_FIELDS)[number];

export default function ListTableDataMaster() {
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importLoading, setImportLoading] = useState(false);

  // Query states
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [domainIsuId, setDomainIsuId] = useQueryState("domainIsuId", {
    defaultValue: "",
  });
  const [kritikalitas, setKritikalitas] = useQueryState("kritikalitas", {
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

  // Build query string
  const queryString = buildQuery({
    q: debouncedQ || undefined,
    domainIsuId: domainIsuId || undefined,
    kritikalitas: kritikalitas || undefined,
    page: pageNumber,
    limit: limitNumber,
    sortBy: VALID_SORT_FIELDS.includes(sortBy as ValidSortField)
      ? sortBy
      : "updatedAt",
    sortOrder,
  });

  // Fetch data
  const {
    data: response,
    meta,
    error,
    isLoading,
    mutate,
  } = useGet(`/protected/data-master${queryString}`);

  const data: DataMasterWithRelations[] = response ?? [];
  const { del: deleteDataMaster, loading: deleteLoading } = useDelete();

  // Fetch domain isu untuk filter dropdown
  const { data: domainResponse } = useGet(`/protected/kategori`);
  const domainList: DomainIsu[] = domainResponse ?? [];

  const cellCenter =
    "text-center align-middle truncate max-w-[150px] whitespace-nowrap";

  // Sort options
  const sortOptions: { value: ValidSortField; label: string }[] = [
    { value: "namaAtribut", label: "Nama Atribut" },
    { value: "kritikalitas", label: "Kritikalitas" },
    { value: "jumlah", label: "Jumlah" },
    { value: "tahunData", label: "Tahun Data" },
    { value: "isActive", label: "Status" },
    { value: "updatedAt", label: "Tanggal Diperbarui" },
    { value: "createdAt", label: "Tanggal Dibuat" },
  ];

  const hasSignificantFilter =
    (debouncedQ?.trim() !== "" && debouncedQ !== undefined) ||
    domainIsuId !== "" ||
    kritikalitas !== "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deleteDataMaster(
        `/api/data-master/${selectedDeleteId}`,
      );
      notifier.success("Berhasil", res?.message || "Data berhasil dihapus");
      mutate();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      notifier.error(
        "Gagal",
        err?.response?.data?.message || "Terjadi kesalahan",
      );
    } finally {
      setSelectedDeleteId(null);
    }
  };

  const handleSortChange = (field: ValidSortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setDomainIsuId("");
    setKritikalitas("");
    setSortBy("updatedAt");
    setSortOrder("desc");
    setIsFilterOpen(false);
    setPage("1");
  };

  useEffect(() => {
    if (pageNumber !== 1) {
      setPage("1");
    }
  }, [debouncedQ, domainIsuId, kritikalitas, sortBy, sortOrder]);

  const hasActiveFilters =
    domainIsuId !== "" ||
    kritikalitas !== "" ||
    sortBy !== "updatedAt" ||
    sortOrder !== "desc";

  // ─────────────────────────────────────────────────────────────
  // Import Excel
  // ─────────────────────────────────────────────────────────────
  const readExcelFile = (
    file: File,
  ): Promise<z.infer<typeof dataMasterCreateSchema>[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          let sheetName = workbook.SheetNames.find((name) =>
            name.toLowerCase().includes("datamaster"),
          );
          if (!sheetName) {
            sheetName = workbook.SheetNames[0];
          }
          if (!sheetName) throw new Error("Sheet tidak ditemukan");

          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: "",
          }) as any[][];

          // Lewati baris header (baris pertama)
          const dataRows = rows
            .slice(1)
            .filter((row) => row.some((cell) => cell !== null && cell !== ""));

          const cleanString = (val: any): string =>
            val !== null && val !== undefined ? String(val).trim() : "";

          const mapped = dataRows.map((row) => {
            // Mapping berdasarkan posisi kolom (0-based index):
            // Kolom A (0): domainIsuId
            // Kolom B (1): namaAtribut
            // Kolom C (2): jumlah
            // Kolom D (3): tahunData
            // Kolom E (4): kritikalitas
            // Kolom F (5): keterangan (diabaikan)
            // Kolom G (6): isActive

            const domainIsuId = cleanString(row[0]);
            const namaAtribut = cleanString(row[1]);

            // Jumlah
            const jumlahRaw = row[2];
            const jumlah =
              jumlahRaw !== "" && jumlahRaw !== null ? Number(jumlahRaw) : null;

            // Tahun Data
            const tahunDataRaw = row[3];
            const tahunData =
              tahunDataRaw !== "" && tahunDataRaw !== null
                ? Number(tahunDataRaw)
                : null;

            // Kritikalitas
            const kritikalitasRaw = cleanString(row[4]).toUpperCase();
            const validKritikalitas: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH" =
              ["KRITIS", "TINGGI", "SEDANG", "RENDAH"].includes(kritikalitasRaw)
                ? (kritikalitasRaw as "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH")
                : "SEDANG";

            // isActive
            const isActiveRaw = row[6];
            const isActive =
              isActiveRaw === true ||
              isActiveRaw === "TRUE" ||
              isActiveRaw === 1 ||
              isActiveRaw === "1" ||
              isActiveRaw === "true"
                ? true
                : false;

            return {
              domainIsuId,
              namaAtribut,
              kritikalitas: validKritikalitas,
              jumlah,
              tahunData,
              isActive,
              // diprosesOlehId akan diisi oleh backend
            };
          });

          resolve(mapped);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleImport = async () => {
    if (!importFile) {
      notifier.error("Pilih file terlebih dahulu");
      return;
    }
    setImportLoading(true);
    try {
      const rawData = await readExcelFile(importFile);

      // Validasi dengan schema dari import
      const parsed = dataMasterArraySchema.safeParse(rawData);
      if (!parsed.success) {
        const errors = parsed.error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join("; ");
        notifier.error("Format file tidak valid", errors);
        return;
      }

      // Kirim ke endpoint import yang baru
      const res = await fetch("/api/protected/data-master/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed.data }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Gagal import data");
      }

      notifier.success("Berhasil", result.message);
      mutate();
      setIsImportOpen(false);
      setImportFile(null);
    } catch (error) {
      const err = error as Error;
      notifier.error("Gagal import", err.message);
    } finally {
      setImportLoading(false);
    }
  };

  // Loading state
  if (!isMounted) {
    return (
      <Card className="min-w-0 overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">No</TableHead>
                  <TableHead className="text-center">Domain Isu</TableHead>
                  <TableHead className="text-center">Nama Atribut</TableHead>
                  <TableHead className="text-center">Kritikalitas</TableHead>
                  <TableHead className="text-center">Jumlah</TableHead>
                  <TableHead className="text-center">Tahun Data</TableHead>
                  <TableHead className="text-center">Diproses Oleh</TableHead>
                  <TableHead className="text-center">Diperbarui Pada</TableHead>
                  <TableHead className="w-40 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableSkeleton rows={5} />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden">
      {/* Alert Dialog Hapus */}
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

      {/* Dialog Import Excel */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Data Master dari Excel</DialogTitle>
            <DialogDescription>
              Upload file Excel dengan format yang sesuai.
              <br />
              <strong>Kolom wajib:</strong> domainIsuId, namaAtribut,
              kritikalitas
              <br />
              <strong>Kolom opsional:</strong> jumlah, tahunData, isActive
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Link
              href="/Template_Import_DataMaster_FINAL.xlsm"
              target="_blank"
              download
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              <Download className="h-4 w-4" /> Download Template Excel
            </Link>
            <Input
              type="file"
              accept=".xlsx, .xls, .xlsm"
              onChange={(e) => setImportFile(e.target.files?.[0] || null)}
            />
            {importFile && (
              <p className="text-sm text-muted-foreground break-all">
                📄 {importFile.name}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsImportOpen(false);
                setImportFile(null);
              }}
              disabled={importLoading}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button
              onClick={handleImport}
              disabled={!importFile || importLoading}
              className="w-full sm:w-auto"
            >
              {importLoading && (
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {importLoading ? "Mengimport..." : "Import"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CardHeader className="space-y-4 p-4 md:p-6 border-b bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          {/* Bagian kiri: tombol aksi */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <Link href="/admin/kelola-data/add" className="w-full sm:w-auto">
              <Button className="cursor-pointer shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Tambah Data
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => setIsImportOpen(true)}
              className="cursor-pointer shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
            >
              <Upload className="mr-2 h-4 w-4" /> Import Excel
            </Button>

            {/* Filter Dialog */}
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <Button
                variant="outline"
                className="cursor-pointer shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter & Sort
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {[domainIsuId, kritikalitas].filter(Boolean).length +
                      (sortBy !== "updatedAt" || sortOrder !== "desc" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              <DialogContent className="sm:max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
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
                  {/* Filter: Domain Isu */}
                  <div className="grid gap-2">
                    <Label>Domain Isu</Label>
                    <Select
                      value={domainIsuId || "ALL"}
                      onValueChange={(val) =>
                        setDomainIsuId(val === "ALL" ? "" : val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih domain isu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua Domain</SelectItem>
                        {domainList.map((domain) => (
                          <SelectItem key={domain.id} value={domain.id}>
                            {domain.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Filter: Kritikalitas */}
                  <div className="grid gap-2">
                    <Label>Kritikalitas</Label>
                    <Select
                      value={kritikalitas || "ALL"}
                      onValueChange={(val) =>
                        setKritikalitas(val === "ALL" ? "" : val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kritikalitas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua</SelectItem>
                        <SelectItem value="KRITIS">🔴 KRITIS</SelectItem>
                        <SelectItem value="TINGGI">🟠 TINGGI</SelectItem>
                        <SelectItem value="SEDANG">🟡 SEDANG</SelectItem>
                        <SelectItem value="RENDAH">🟢 RENDAH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Sorting */}
                  <div className="grid gap-2">
                    <Label>Urutkan Berdasarkan</Label>
                    <Select
                      value={sortBy}
                      onValueChange={(val: ValidSortField) => setSortBy(val)}
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
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() => setSortOrder("asc")}
                        size="sm"
                      >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Asc
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        className="flex-1 cursor-pointer"
                        onClick={() => setSortOrder("desc")}
                        size="sm"
                      >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Desc
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="cursor-pointer"
                    size="sm"
                  >
                    Reset Filter
                  </Button>
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="cursor-pointer"
                    size="sm"
                  >
                    Terapkan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Bagian kanan: Search Box */}
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 w-full">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama atribut..."
                className="pl-8 pr-10 w-full transition-shadow focus:ring-2 focus:ring-primary/50"
              />
              {q && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQ("")}
                  className="absolute right-0 top-0 h-full px-3 cursor-pointer"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="max-w-full p-4 md:p-6">
        <div className="overflow-x-auto">
          <Table className="min-w-250 lg:min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-12 whitespace-nowrap px-2">
                  No
                </TableHead>
                <TableHead className="text-center whitespace-nowrap px-2">
                  Domain Isu
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2"
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
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2"
                  onClick={() => handleSortChange("kritikalitas")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Kritikalitas
                    {sortBy === "kritikalitas" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2"
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
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2"
                  onClick={() => handleSortChange("tahunData")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Tahun Data
                    {sortBy === "tahunData" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <ArrowDown className="h-3 w-3 shrink-0" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center whitespace-nowrap px-2">
                  Diproses Oleh
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/50 whitespace-nowrap px-2"
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
                  <TableCell colSpan={9} className="text-center py-8">
                    <DataError
                      message={error?.message || "Gagal memuat data"}
                    />
                  </TableCell>
                </TableRow>
              )}

              {data?.length === 0 && !hasSignificantFilter && !isLoading && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <DataKosong title="Data Master Masih Kosong" />
                  </TableCell>
                </TableRow>
              )}

              {data?.length === 0 && hasSignificantFilter && !isLoading && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
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
                      {(pageNumber - 1) * limitNumber + index + 1}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {item.domainIsu?.nama || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className={cellCenter} title={item.namaAtribut}>
                      {item.namaAtribut}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      <Badge
                        variant={
                          item.kritikalitas === "KRITIS"
                            ? "destructive"
                            : item.kritikalitas === "TINGGI"
                              ? "default"
                              : item.kritikalitas === "SEDANG"
                                ? "secondary"
                                : "outline"
                        }
                        className="whitespace-nowrap"
                      >
                        {item.kritikalitas}
                      </Badge>
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.jumlah ?? "-"}
                    </TableCell>
                    <TableCell className={cellCenter}>
                      {item.tahunData ?? "-"}
                    </TableCell>
                    <TableCell
                      className={cellCenter}
                      title={item.diprosesOleh?.email}
                    >
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
                          variant="secondary"
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

        {/* Pagination */}
        {data?.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              Menampilkan {(pageNumber - 1) * limitNumber + 1} -{" "}
              {Math.min(pageNumber * limitNumber, meta?.total || 0)} dari{" "}
              {meta?.total || 0} data
            </div>
            <div className="flex gap-2 order-1 sm:order-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(String(Math.max(1, pageNumber - 1)))}
                disabled={pageNumber === 1}
                className="cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <span className="px-4 py-2 bg-muted rounded-md text-sm whitespace-nowrap">
                Halaman {pageNumber} dari {meta?.totalPages || 1}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setPage(
                    String(Math.min(meta?.totalPages || 1, pageNumber + 1)),
                  )
                }
                disabled={pageNumber >= (meta?.totalPages || 1)}
                className="cursor-pointer"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

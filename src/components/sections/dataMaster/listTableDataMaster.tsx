"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { XIcon, Filter, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { notifier } from "@/lib/ToastNotifier";
import {
  useCreateDataMasterMany,
  useDeleteDataMaster,
  useGetAllDataMaster,
} from "@/hooks/api/useDataMaster";
import { DataMaster, JenisDataMaster } from "@prisma/client";
import { Badge } from "../../ui/badge";
import { getNilaiBadge } from "@/utils/getNilaiBadge";
import { Skeleton } from "../../ui/skeleton";
import {
  dataMasterArraySchema,
  dataMasterQuerySchema,
} from "@/schema/dataMasterSchema";
import * as XLSX from "xlsx";

type DataMasterWithUser = DataMaster & {
  updatedBy?: {
    name: string | null;
  } | null;
};

export default function ListTableDataMaster() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // === STATE ===
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [jenisData, setJenisData] = useState<string | undefined>(
    searchParams.get("jenisData") || undefined,
  );
  const [lokasiRt, setLokasiRt] = useState<string | undefined>(
    searchParams.get("lokasiRt") || undefined,
  );
  const [lokasiRw, setLokasiRw] = useState<string | undefined>(
    searchParams.get("lokasiRw") || undefined,
  );
  const [nilai, setNilai] = useState<string | undefined>(
    searchParams.get("nilai") || undefined,
  );
  const [updatedAt, setUpdatedAt] = useState<string | undefined>(
    searchParams.get("updatedAt") || undefined,
  );
  const [openFilter, setOpenFilter] = useState(false);

  const [value] = useDebounce(q, 500);

  // === API HOOK ===
  const {
    data: response,
    isLoading,
    error,
    refresh,
  } = useGetAllDataMaster(
    value,
    jenisData,
    lokasiRt,
    lokasiRw,
    nilai,
    updatedAt,
  );
  const { error: errorDelete, execute, loading } = useDeleteDataMaster();
  const {
    error: errorCreateMany,
    execute: executeCreateMany,
    loading: loadingCreateMany,
  } = useCreateDataMasterMany();

  const data: DataMasterWithUser[] = response?.data ?? [];

  // === URL PARAM SYNC ===
  useEffect(() => {
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    if (jenisData) params.set("jenisData", jenisData);
    if (lokasiRt) params.set("lokasiRt", lokasiRt);
    if (lokasiRw) params.set("lokasiRw", lokasiRw);
    if (nilai) params.set("nilai", nilai);
    if (updatedAt) params.set("updatedAt", updatedAt); // ⬅️ Tambahkan ini

    router.replace(`?${params.toString()}`);
    refresh();
  }, [value, jenisData, lokasiRt, lokasiRw, nilai, updatedAt]); // ⬅️ Tambahkan updatedAt di dependency

  // === FILTER HANDLER ===
  const handleResetFilter = () => {
    setJenisData(undefined);
    setLokasiRt(undefined);
    setLokasiRw(undefined);
    setNilai(undefined);
    setUpdatedAt(undefined);
    setOpenFilter(false);
  };

  const fileRef = useRef<HTMLInputElement>(null);

  function triggerPicker() {
    fileRef.current?.click();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // baca excel
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const normalized = json.map((row: any) => ({
        ...row,
        nilai: String(row.nilai ?? ""),
        lokasiRt:
          row.lokasiRt !== undefined
            ? String(row.lokasiRt).padStart(2, "0")
            : "",
        lokasiRw:
          row.lokasiRw !== undefined
            ? String(row.lokasiRw).padStart(2, "0")
            : "",
      }));

      // validasi pakai Zod
      const parsed = dataMasterArraySchema.safeParse(normalized);
      if (!parsed.success) {
        console.error(parsed.error);
        alert("Format Excel tidak sesuai. Lihat console.");
        e.target.value = "";
        return;
      }

      // kirim ke backend
      const { data: res, error } = await executeCreateMany(
        "/protected/data-master/import",
        {
          data: parsed.data,
        },
        {},
        "/protected/data-master/import",
      );
      if (error) {
        notifier.error(error);
        e.target.value = "";
        return;
      }
      notifier.success(res?.message || "Data master berhasil diimport.");
      refresh();
      e.target.value = "";
    } catch (error) {
      e.target.value = "";
      console.error(error);
      alert("Terjadi error saat import.");
    }
  }

  return (
    <CardContent>
      {/* === Header (Search + Filter Button) === */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          {/* Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Cari nama atribut"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="default" onClick={() => setQ("")}>
              <XIcon />
            </Button>
          </div>

          {/* Filter */}
          <Dialog open={openFilter} onOpenChange={setOpenFilter}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="size-4" />
                Filter
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Data Master</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Jenis Data */}
                <div>
                  <label className="text-sm font-medium">Jenis Data</label>
                  <Select
                    onValueChange={(val) => setJenisData(val)}
                    value={jenisData}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis data" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(JenisDataMaster).map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* RT */}
                <div>
                  <label className="text-sm font-medium">RT</label>
                  <Input
                    placeholder="Contoh: 001"
                    value={lokasiRt || ""}
                    onChange={(e) => setLokasiRt(e.target.value)}
                    maxLength={3}
                  />
                </div>

                {/* RW */}
                <div>
                  <label className="text-sm font-medium">RW</label>
                  <Input
                    placeholder="Contoh: 005"
                    value={lokasiRw || ""}
                    onChange={(e) => setLokasiRw(e.target.value)}
                    maxLength={3}
                  />
                </div>

                {/* Nilai */}
                <div>
                  <label className="text-sm font-medium">
                    Nilai Kepentingan
                  </label>
                  <Select onValueChange={(val) => setNilai(val)} value={nilai}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat kepentingan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Tidak Penting</SelectItem>
                      <SelectItem value="2">2 - Kurang Penting</SelectItem>
                      <SelectItem value="3">3 - Cukup Penting</SelectItem>
                      <SelectItem value="4">4 - Penting</SelectItem>
                      <SelectItem value="5">5 - Sangat Penting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Updated At */}
                <div>
                  <label className="text-sm font-medium">
                    Tanggal Diperbarui
                  </label>
                  <Input
                    type="date"
                    value={updatedAt || ""}
                    onChange={(e) => setUpdatedAt(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleResetFilter}>
                  Reset
                </Button>
                <Button onClick={() => setOpenFilter(false)}>Terapkan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-end">
          <Link href="/admin/kelola-data/add">
            <Button className="cursor-pointer">
              <PlusCircleIcon />
              Tambah Data Master
            </Button>
          </Link>
          <Button variant="outline" className="ml-2" onClick={triggerPicker}>
            Import Excel
          </Button>

          <Input
            type="file"
            accept=".xlsx,.xls"
            ref={fileRef}
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      {/* === Table === */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Jenis Data</TableHead>
            <TableHead>Nama Atribut</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>RT</TableHead>
            <TableHead>RW</TableHead>
            <TableHead>Diperbarui Oleh</TableHead>
            <TableHead>Diperbarui Pada</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="h-8 w-14" />
                  <Skeleton className="h-8 w-16" />
                </TableCell>
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-red-500">
                {error.response?.status === 403
                  ? "Anda tidak memiliki akses untuk melihat data ini."
                  : error.response?.data?.message ||
                    "Terjadi kesalahan saat memuat data."}
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.jenisData}</TableCell>
                <TableCell>{item.namaAtribut}</TableCell>
                <TableCell>
                  {(() => {
                    const { label, variant } = getNilaiBadge(item.nilai);
                    return <Badge variant={variant}>{label}</Badge>;
                  })()}
                </TableCell>

                <TableCell>{item.lokasiRt || "-"}</TableCell>
                <TableCell>{item.lokasiRw || "-"}</TableCell>
                <TableCell>{item.updatedBy?.name ?? "-"}</TableCell>
                <TableCell>
                  {new Date(item.updatedAt).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/admin/kelola-data/${item.id}`} prefetch>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      const { data: res, error } = await execute(
                        `/protected/data-master/${item.id}`,
                        {},
                        {},
                        `/protected/data-master/${item.id}`,
                      );
                      if (error) {
                        notifier.error(error);
                        return;
                      }
                      notifier.success(
                        res?.message || "Data master berhasil dihapus.",
                      );
                      refresh();
                    }}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground"
              >
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  );
}

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
import { Badge } from "../../ui/badge";
import { Skeleton } from "../../ui/skeleton";
import { dataMasterArraySchema } from "@/schema/dataMasterSchema";
import * as XLSX from "xlsx";
import { useDelete, useGet, usePost } from "@/hooks/useApi";

// Tipe data dari Prisma (asumsi)
import { DataMaster, DomainIsu, User } from "@/app/generated/prisma";

type DataMasterWithRelations = DataMaster & {
  domainIsu: Pick<DomainIsu, "nama">;
  diprosesOleh: Pick<User, "name"> | null;
};

export default function ListTableDataMaster() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // === STATE ===
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [domainIsuId, setDomainIsuId] = useState<string | undefined>(
    searchParams.get("domainIsuId") || undefined,
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

  // === API HOOKS ===
  const {
    data: response,
    isLoading,
    error,
    mutate: refresh,
  } = useGet(`/protected/data-master`);
  const { del, loading: deleteLoading } = useDelete();
  const { post: executeCreateMany, loading: loadingCreateMany } = usePost(
    `/protected/data-master/bulk`,
  );

  // Ambil data domain isu untuk dropdown filter (opsional)
  const { data: domainResponse } = useGet(`/protected/domain-isu`); // sesuaikan endpoint
  const domainList = domainResponse ?? [];

  const data: DataMasterWithRelations[] = response ?? [];

  // === URL PARAM SYNC ===
  useEffect(() => {
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    if (domainIsuId) params.set("domainIsuId", domainIsuId);
    if (lokasiRt) params.set("lokasiRt", lokasiRt);
    if (lokasiRw) params.set("lokasiRw", lokasiRw);
    if (nilai) params.set("nilai", nilai);
    if (updatedAt) params.set("updatedAt", updatedAt);

    router.replace(`?${params.toString()}`);
    refresh();
  }, [
    value,
    domainIsuId,
    lokasiRt,
    lokasiRw,
    nilai,
    updatedAt,
    router,
    refresh,
  ]);

  // === FILTER HANDLER ===
  const handleResetFilter = () => {
    setDomainIsuId(undefined);
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
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Normalisasi data dari excel
      const normalized = json.map((row: any) => ({
        domainIsuId: String(row.domainIsuId || ""),
        namaAtribut: String(row.namaAtribut || ""),
        nilai: String(row.nilai || ""),
        lokasiRt: row.lokasiRt !== undefined ? Number(row.lokasiRt) : null,
        lokasiRw: row.lokasiRw !== undefined ? Number(row.lokasiRw) : null,
        jumlah: row.jumlah !== undefined ? Number(row.jumlah) : null,
        sumberData: row.sumberData || null,
      }));

      // Validasi dengan Zod
      const parsed = dataMasterArraySchema.safeParse(normalized);
      if (!parsed.success) {
        console.error(parsed.error);
        alert("Format Excel tidak sesuai. Periksa kembali kolom-kolomnya.");
        e.target.value = "";
        return;
      }

      // Kirim ke backend
      const res = await executeCreateMany({
        data: parsed.data,
      });

      if (res?.error) {
        notifier.error(res.error);
        e.target.value = "";
        return;
      }

      notifier.success(res?.message || "Data master berhasil diimport.");
      refresh();
      e.target.value = "";
    } catch (error) {
      console.error(error);
      alert("Terjadi error saat import.");
      e.target.value = "";
    }
  }

  // Handler hapus
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const { data: res, error } = await del(`/protected/data-master/${id}`);
    if (error) {
      notifier.error(error);
      return;
    }
    notifier.success(res?.message || "Data master berhasil dihapus.");
    refresh();
  };

  return (
    <CardContent>
      {/* Header: Search + Filter */}
      <div>
        <div className="mb-4 flex items-center justify-between">
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
                {/* Domain Isu */}
                <div>
                  <label className="text-sm font-medium">Domain Isu</label>
                  <Select
                    onValueChange={(val) => setDomainIsuId(val)}
                    value={domainIsuId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih domain isu" />
                    </SelectTrigger>
                    <SelectContent>
                      {domainList.map((domain: any) => (
                        <SelectItem key={domain.id} value={domain.id}>
                          {domain.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* RT */}
                <div>
                  <label className="text-sm font-medium">RT</label>
                  <Input
                    placeholder="Contoh: 1"
                    value={lokasiRt || ""}
                    onChange={(e) => setLokasiRt(e.target.value)}
                    type="number"
                    min={1}
                    max={999}
                  />
                </div>

                {/* RW */}
                <div>
                  <label className="text-sm font-medium">RW</label>
                  <Input
                    placeholder="Contoh: 5"
                    value={lokasiRw || ""}
                    onChange={(e) => setLokasiRw(e.target.value)}
                    type="number"
                    min={1}
                    max={999}
                  />
                </div>

                {/* Nilai (pencarian teks) */}
                <div>
                  <label className="text-sm font-medium">Nilai (teks)</label>
                  <Input
                    placeholder="Cari nilai..."
                    value={nilai || ""}
                    onChange={(e) => setNilai(e.target.value)}
                  />
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

        {/* Tombol aksi */}
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

      {/* Tabel Data Master */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Domain Isu</TableHead>
            <TableHead>Nama Atribut</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>RT</TableHead>
            <TableHead>RW</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Sumber Data</TableHead>
            <TableHead>Diproses Oleh</TableHead>
            <TableHead>Diperbarui Pada</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Skeleton loading
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
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
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
              <TableCell colSpan={11} className="text-center text-red-500">
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
                <TableCell>{item.domainIsu?.nama || "-"}</TableCell>
                <TableCell>{item.namaAtribut}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.nilai}</Badge>
                </TableCell>
                <TableCell>{item.lokasiRt ?? "-"}</TableCell>
                <TableCell>{item.lokasiRw ?? "-"}</TableCell>
                <TableCell>{item.jumlah ?? "-"}</TableCell>
                <TableCell>{item.sumberData || "-"}</TableCell>
                <TableCell>{item.diprosesOleh?.name ?? "-"}</TableCell>
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
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteLoading}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={11}
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

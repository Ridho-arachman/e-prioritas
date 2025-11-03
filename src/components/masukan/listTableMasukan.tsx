"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, FilterIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { useGetAllMasukanWarga } from "@/hooks/api/useMasukanWarga";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useGetAllKategori } from "@/hooks/api/useKategori";
import { useGetAllUser } from "@/hooks/api/useUser";

export default function MasukanListTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔍 State Pencarian
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [value] = useDebounce(search, 500);

  // 🎚️ State Filter (dipisah)
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [kategoriId, setKategoriId] = useState(
    searchParams.get("kategoriId") || ""
  );
  const [verifiedByUserId, setVerifiedByUserId] = useState(
    searchParams.get("verifiedByUserId") || ""
  );
  const [createdAt, setCreatedAt] = useState(
    searchParams.get("createdAt") || ""
  );
  const [open, setOpen] = useState(false);

  // HANDELER FILTER STATUS
  const handleStatus = (v: string) => {
    setStatus(v === "ALL" ? "" : v);
  };

  //DATA MASUKAN
  const {
    data: res,
    isLoading,
    refresh,
  } = useGetAllMasukanWarga(
    value,
    status,
    kategoriId,
    verifiedByUserId,
    createdAt
  );

  // DATA KATEGORI
  const { data: resKategori } = useGetAllKategori();

  // DATA USER
  const { data: resUser } = useGetAllUser();

  const data: any[] = res?.data ?? [];

  // 🔧 Helper: Build query string URL
  const buildQuery = (params: Record<string, string | boolean>) => {
    return Object.entries(params)
      .filter(([_, v]) => v && String(v).trim() !== "")
      .map(
        ([k, v]) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(String(v).trim())}`
      )
      .join("&");
  };

  // 🎯 Update URL setiap ada perubahan search / filter
  useEffect(() => {
    const queryString = buildQuery({
      q: value,
      status,
      kategoriId,
      verifiedByUserId,
      createdAt,
    });
    console.log(createdAt);

    router.replace(`?${queryString}`);
    refresh();
  }, [value, status, kategoriId, verifiedByUserId, createdAt, refresh]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-primary" />
          Daftar Masukan Warga
        </CardTitle>

        <div className="flex gap-2 items-center">
          {/* 🔍 Search Bar */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>

          {/* ⚙️ Filter Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
              >
                <FilterIcon className="w-4 h-4" /> Filter
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Masukan</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Status */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Status</Label>
                  <Select value={status || "ALL"} onValueChange={handleStatus}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua Status</SelectItem>
                      <SelectItem value="MENUNGGU_VERIFIKASI">
                        Menunggu Verifikasi
                      </SelectItem>
                      <SelectItem value="DITOLAK">Ditolak</SelectItem>
                      <SelectItem value="DITERIMA">Diterima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Kategori */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Kategori</Label>
                  <Select
                    value={kategoriId || "ALL"}
                    onValueChange={(v) => setKategoriId(v === "ALL" ? "" : v)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih verifikator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua Verifikator</SelectItem>
                      {resKategori?.data.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.namaKategori}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Verifikator */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Verifikator</Label>
                  <Select
                    value={verifiedByUserId || "ALL"}
                    onValueChange={(v) =>
                      setVerifiedByUserId(v === "ALL" ? "" : v)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih verifikator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua Verifikator</SelectItem>
                      {resUser?.data.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tanggal */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Tanggal</Label>
                  <div className="col-span-3 flex items-center border rounded-md px-2 py-1">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground mr-2" />
                    <input
                      type="date"
                      className="bg-transparent outline-none w-full"
                      value={createdAt}
                      onChange={(e) => setCreatedAt(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    setStatus("");
                    setKategoriId("");
                    setVerifiedByUserId("");
                    setCreatedAt("");
                  }}
                >
                  Reset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* 📋 Tabel Data */}
      <CardContent>
        <Table>
          <TableCaption>Daftar semua masukan dari warga.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Pengirim</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.namaPengirim}</TableCell>
                  <TableCell>{item.emailPengirim}</TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {item.deskripsiMasukan}
                  </TableCell>
                  <TableCell>
                    {item.status === "MENUNGGU_VERIFIKASI" ? (
                      <Badge variant="default">Menunggu Verifikasi</Badge>
                    ) : item.status === "DITOLAK" ? (
                      <Badge variant="destructive">Ditolak</Badge>
                    ) : (
                      <Badge variant="secondary">Diterima</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.createdAt
                      ? format(new Date(item.createdAt), "dd MMM yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/kelola-masukan/${item.id}`)
                      }
                    >
                      Lihat
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

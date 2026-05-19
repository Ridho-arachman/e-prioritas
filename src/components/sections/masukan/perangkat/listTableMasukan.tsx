"use client";

import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
import TableSkeleton from "@/components/blocks/tableSkeleton";
import { useGet } from "@/hooks/useApi";

import { buildQuery } from "@/utils/query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

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

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Command components untuk combobox
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ============================================================
// STATUS BADGE
// ============================================================
const statusColorMap: Record<string, string> = {
  MENUNGGU: "bg-yellow-500 hover:bg-yellow-600",
  DIVERIFIKASI: "bg-green-600 hover:bg-green-700",
  DITOLAK: "bg-red-600 hover:bg-red-700",
  DIPROSES: "bg-blue-500 hover:bg-blue-600",
  DISELESAIKAN: "bg-purple-600 hover:bg-purple-700",
};

const statusLabelMap: Record<string, string> = {
  MENUNGGU: "Menunggu",
  DIVERIFIKASI: "Diverifikasi",
  DITOLAK: "Ditolak",
  DIPROSES: "Diproses",
  DISELESAIKAN: "Selesai",
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

// ============================================================
// USER COMBOBOX
// ============================================================
interface UserComboboxProps {
  value: string;
  onChange: (
    value: string,
    user?: { id: string; name: string; email: string; jabatan?: string | null },
  ) => void;
  placeholder?: string;
  allowedRoles?: string[];
}

const UserCombobox = ({
  value,
  onChange,
  placeholder,
  allowedRoles,
}: UserComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ totalPages: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: userDetail } = useGet(value ? `/protected/user/${value}` : "");
  useEffect(() => {
    if (userDetail) setSelectedUser(userDetail);
  }, [userDetail]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("q", debouncedSearch);
      params.append("page", String(page));
      params.append("perPage", "10");
      if (allowedRoles && allowedRoles.length > 0)
        params.append("roles", allowedRoles.join(","));
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/protected/user${query}`);
      const json = await res.json();
      if (json.success) {
        if (page === 1) setUsers(json.data);
        else setUsers((prev) => [...prev, ...json.data]);
        setMeta(json.meta);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, allowedRoles]);

  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [debouncedSearch]);
  useEffect(() => {
    if (open) fetchUsers();
  }, [open, fetchUsers]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && !loading && meta && page < meta.totalPages)
      setPage((p) => p + 1);
  };

  const handleSelect = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      onChange(userId, user);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {value && selectedUser
              ? selectedUser.name
              : placeholder || "Pilih verifikator"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-w-75 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Cari user..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList onScroll={handleScroll}>
            {loading && users.length === 0 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            )}
            {!loading && users.length === 0 && (
              <CommandEmpty>Tidak ada user ditemukan.</CommandEmpty>
            )}
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={handleSelect}
                  className="max-w-full"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === user.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="truncate font-medium">
                      {user.name} ({user.email})
                    </span>
                    {user.jabatan && (
                      <span className="text-xs text-muted-foreground truncate">
                        {user.jabatan}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {loading && users.length > 0 && (
              <div className="py-2 text-center text-sm text-muted-foreground">
                Memuat lebih banyak...
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MasukanListTable() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Query states
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

  const [debouncedQ] = useDebounce(q, 500);
  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const [selectedVerifikatorName, setSelectedVerifikatorName] = useState("");

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

  const { data, error, isLoading, meta } = useGet(
    `/protected/masukan${queryString}`,
  );

  const { data: domainIsuData } = useGet("/protected/kategori");

  const masukanList = data || [];
  const paginationMeta = meta || { total: 0, totalPages: 1 };

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

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setPage("1");
  }, [debouncedQ, status, domainIsuId, diprosesOlehId, createdAt, setPage]);

  const handleSortChange = (field: string) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
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
    setSelectedVerifikatorName("");
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

  if (!isMounted) return <div className="p-4 md:p-6">Loading...</div>;

  return (
    <>
      <CardHeader className="space-y-4 p-4 md:p-6 border-b bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <Filter className="mr-2 h-4 w-4" /> Filter & Sort
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
                  <SlidersHorizontal className="h-5 w-5" /> Filter & Pengurutan
                  Masukan
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
                    onValueChange={(v) => setStatus(v === "ALL" ? "" : v)}
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
                    </SelectContent>
                  </Select>
                </div>
                {/* DOMAIN ISU */}
                <div className="grid gap-2">
                  <Label>Domain Isu</Label>
                  <Select
                    value={domainIsuId || "ALL"}
                    onValueChange={(v) => setDomainIsuId(v === "ALL" ? "" : v)}
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
                  <UserCombobox
                    value={diprosesOlehId}
                    onChange={(val, user) => {
                      setDiprosesOlehId(val);
                      if (user) setSelectedVerifikatorName(user.name);
                      else setSelectedVerifikatorName("");
                    }}
                    placeholder="Pilih verifikator"
                    allowedRoles={["ADMIN", "PERANGKAT_DESA"]}
                  />
                </div>
                {/* TANGGAL */}
                <div className="grid gap-2">
                  <Label>Tanggal Dibuat</Label>
                  <Input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
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
                    >
                      Tanggal{" "}
                      {sortBy === "createdAt" &&
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
                    >
                      Status{" "}
                      {sortBy === "status" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-1 h-3 w-3" />
                        ))}
                    </Button>
                    <Button
                      variant={sortBy === "lokasi" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange("lokasi")}
                    >
                      Lokasi{" "}
                      {sortBy === "lokasi" &&
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
          <div className="flex gap-2 flex-1 min-w-0">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari judul / nama pelapor / no HP..."
              className="w-full min-w-0"
            />
            {q && (
              <Button variant="outline" onClick={() => setQ("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
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
                Verifikator: {selectedVerifikatorName || diprosesOlehId}
                <button
                  onClick={() => {
                    setDiprosesOlehId("");
                    setSelectedVerifikatorName("");
                  }}
                >
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

      <CardContent className="max-w-full p-4 md:p-6">
        <div className="w-full overflow-x-auto border rounded-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-center font-semibold w-30 max-w-30">
                  Judul
                </TableHead>
                <TableHead className="text-center font-semibold w-32.5 max-w-32.5">
                  Nama
                </TableHead>
                {/* Kolom No. HP baru */}
                <TableHead className="text-center font-semibold w-32.5 max-w-32.5">
                  No. HP
                </TableHead>
                <TableHead className="text-center font-semibold w-25 max-w-25">
                  Status
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/70 w-27.5 max-w-27.5"
                  onClick={() => handleSortChange("lokasi")}
                >
                  <div className="flex justify-center items-center gap-1">
                    Lokasi{" "}
                    {sortBy === "lokasi" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-muted/70 w-27.5 max-w-27.5"
                  onClick={() => handleSortChange("createdAt")}
                >
                  <div className="flex justify-center items-center gap-1">
                    Tanggal{" "}
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold w-30 max-w-30">
                  Domain Isu
                </TableHead>
                <TableHead className="text-center font-semibold w-32.5 max-w-32.5">
                  Diverifikasi Oleh
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableSkeleton rows={5} />}
              {error && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <DataError message={error.message} />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                masukanList.length === 0 &&
                !hasSignificantFilter && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <DataKosong />
                    </TableCell>
                  </TableRow>
                )}
              {!isLoading &&
                masukanList.length === 0 &&
                hasSignificantFilter && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <DataTidakDitemukan />
                    </TableCell>
                  </TableRow>
                )}
              {masukanList.map((item: any) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() =>
                    router.push(`/perangkat/kelola-masukan/${item.id}`)
                  }
                >
                  <TableCell
                    className="text-center truncate w-30 max-w-30"
                    title={item.judul || ""}
                  >
                    {item.judul || "-"}
                  </TableCell>
                  <TableCell
                    className="text-center truncate w-32.5 max-w-32.5"
                    title={item.warga?.nama || ""}
                  >
                    {item.warga?.nama || "-"}
                  </TableCell>
                  {/* No. HP dari item.warga.noHp (didekripsi di backend) */}
                  <TableCell
                    className="text-center truncate w-32.5 max-w-32.5"
                    title={item.warga?.noHp || ""}
                  >
                    {item.warga?.noHp || "-"}
                  </TableCell>
                  <TableCell className="text-center w-25 max-w-25">
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-center truncate w-27.5 max-w-27.5">
                    {item.lokasi || "-"}
                  </TableCell>
                  <TableCell className="text-center w-27.5 max-w-27.5">
                    {format(new Date(item.createdAt), "dd MMM yyyy", {
                      locale: id,
                    })}
                  </TableCell>
                  <TableCell
                    className="text-center truncate w-30 max-w-30"
                    title={item.domainIsu?.nama || ""}
                  >
                    {item.domainIsu?.nama || "-"}
                  </TableCell>
                  <TableCell
                    className="text-center truncate w-32.5 max-w-32.5"
                    title={item.diverifikasiOleh?.name || ""}
                  >
                    {item.diverifikasiOleh?.name || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Total: {paginationMeta.total}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber - 1))}
              disabled={pageNumber === 1}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="px-4 py-2 bg-muted rounded-md">
              Halaman {pageNumber} dari {paginationMeta.totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(String(pageNumber + 1))}
              disabled={pageNumber >= paginationMeta.totalPages}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}

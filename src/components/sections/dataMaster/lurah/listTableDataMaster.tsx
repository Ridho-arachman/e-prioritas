"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGet } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { buildQuery } from "@/utils/query";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Filter,
  SlidersHorizontal,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import DataError from "../../../blocks/DataError";
import DataKosong from "../../../blocks/DataKosong";
import DataTidakDitemukan from "../../../blocks/DataTidakDitemukan";
import TableSkeleton from "../../../blocks/tableSkeleton";

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

// Import tipe dari Prisma
import { DataMaster, DomainIsu, User } from "@/app/generated/prisma";

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
      // Kirim roles jika ada
      if (allowedRoles && allowedRoles.length > 0) {
        params.append("roles", allowedRoles.join(","));
      }
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/protected/user${query}`);
      const json = await res.json();
      if (json.success) {
        if (page === 1) {
          setUsers(json.data);
        } else {
          setUsers((prev) => [...prev, ...json.data]);
        }
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
    if (open) {
      fetchUsers();
    }
  }, [open, fetchUsers]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && !loading && meta && page < meta.totalPages) {
      setPage((p) => p + 1);
    }
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
              : placeholder || "Pilih user"}
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
export default function ListTableDataMaster() {
  const router = useRouter();
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
  const [isActive, setIsActive] = useQueryState("isActive", {
    defaultValue: "",
  });
  const [diprosesOlehId, setDiprosesOlehId] = useQueryState("diprosesOlehId", {
    defaultValue: "",
  });
  const [tahunData, setTahunData] = useQueryState("tahunData", {
    defaultValue: "",
  });
  const [createdAt, setCreatedAt] = useQueryState("createdAt", {
    defaultValue: "",
  });

  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [limit] = useQueryState("limit", { defaultValue: "2" });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "updatedAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const [selectedUserName, setSelectedUserName] = useState("");

  const [debouncedQ] = useDebounce(q, 500);
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // Build query string
  const queryString = buildQuery({
    q: debouncedQ || undefined,
    domainIsuId: domainIsuId || undefined,
    kritikalitas: kritikalitas || undefined,
    isActive: isActive || undefined,
    diprosesOlehId: diprosesOlehId || undefined,
    tahunData: tahunData || undefined,
    createdAt: createdAt || undefined,
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
    kritikalitas !== "" ||
    isActive !== "" ||
    diprosesOlehId !== "" ||
    tahunData !== "" ||
    createdAt !== "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    setIsActive("");
    setDiprosesOlehId("");
    setSelectedUserName("");
    setTahunData("");
    setCreatedAt("");
    setSortBy("updatedAt");
    setSortOrder("desc");
    setIsFilterOpen(false);
    setPage("1");
  };

  useEffect(() => {
    setPage("1");
  }, [
    debouncedQ,
    domainIsuId,
    kritikalitas,
    isActive,
    diprosesOlehId,
    tahunData,
    createdAt,
    sortBy,
    sortOrder,
  ]);

  const hasActiveFilters =
    domainIsuId !== "" ||
    kritikalitas !== "" ||
    isActive !== "" ||
    diprosesOlehId !== "" ||
    tahunData !== "" ||
    createdAt !== "" ||
    sortBy !== "updatedAt" ||
    sortOrder !== "desc";

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
      <CardHeader className="space-y-4 p-4 md:p-6 border-b bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
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
                    {[
                      domainIsuId,
                      kritikalitas,
                      isActive,
                      diprosesOlehId,
                      tahunData,
                      createdAt,
                    ].filter(Boolean).length +
                      (sortBy !== "updatedAt" || sortOrder !== "desc" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Domain Isu */}
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
                  {/* Kritikalitas */}
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
                  {/* Status Aktif */}
                  <div className="grid gap-2">
                    <Label>Status Aktif</Label>
                    <Select
                      value={isActive || "ALL"}
                      onValueChange={(val) =>
                        setIsActive(val === "ALL" ? "" : val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Semua</SelectItem>
                        <SelectItem value="true">Aktif</SelectItem>
                        <SelectItem value="false">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Diproses Oleh */}
                  <div className="grid gap-2">
                    <Label>Diproses Oleh</Label>
                    <UserCombobox
                      value={diprosesOlehId}
                      onChange={(val, user) => {
                        setDiprosesOlehId(val);
                        setSelectedUserName(user?.name || "");
                      }}
                      placeholder="Pilih user"
                      allowedRoles={["ADMIN", "PERANGKAT_DESA"]}
                    />
                  </div>
                  {/* Tahun Data */}
                  <div className="grid gap-2">
                    <Label>Tahun Data</Label>
                    <Input
                      type="number"
                      placeholder="Contoh: 2024"
                      value={tahunData}
                      onChange={(e) => setTahunData(e.target.value)}
                      min="1900"
                      max="2100"
                    />
                  </div>
                  {/* Tanggal Dibuat */}
                  <div className="grid gap-2">
                    <Label>Tanggal Dibuat</Label>
                    <Input
                      type="date"
                      value={createdAt}
                      onChange={(e) => setCreatedAt(e.target.value)}
                    />
                  </div>
                </div>
                <Separator className="my-2" />
                {/* Sorting */}
                <div className="grid gap-2 mt-4">
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
                  <div className="flex gap-2">
                    <Button
                      variant={sortOrder === "asc" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setSortOrder("asc")}
                      size="sm"
                    >
                      <ArrowUp className="mr-2 h-4 w-4" /> Asc
                    </Button>
                    <Button
                      variant={sortOrder === "desc" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setSortOrder("desc")}
                      size="sm"
                    >
                      <ArrowDown className="mr-2 h-4 w-4" /> Desc
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 mt-6">
                  <Button variant="outline" onClick={clearFilters} size="sm">
                    Reset Filter
                  </Button>
                  <Button onClick={() => setIsFilterOpen(false)} size="sm">
                    Terapkan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Box */}
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 w-full">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama atribut..."
                className="pl-8 pr-10 w-full"
              />
              {q && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQ("")}
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {domainIsuId && (
              <Badge variant="secondary" className="gap-2">
                Domain:{" "}
                {domainList.find((d) => d.id === domainIsuId)?.nama ||
                  domainIsuId}
                <button onClick={() => setDomainIsuId("")}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {kritikalitas && (
              <Badge variant="secondary" className="gap-2">
                Kritikalitas: {kritikalitas}
                <button onClick={() => setKritikalitas("")}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {isActive !== "" && (
              <Badge variant="secondary" className="gap-2">
                Status: {isActive === "true" ? "Aktif" : "Tidak Aktif"}
                <button onClick={() => setIsActive("")}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {diprosesOlehId && (
              <Badge variant="secondary" className="gap-2">
                Diproses: {selectedUserName || diprosesOlehId}
                <button
                  onClick={() => {
                    setDiprosesOlehId("");
                    setSelectedUserName("");
                  }}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {tahunData && (
              <Badge variant="secondary" className="gap-2">
                Tahun: {tahunData}
                <button onClick={() => setTahunData("")}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {createdAt && (
              <Badge variant="secondary" className="gap-2">
                Tanggal: {format(new Date(createdAt), "dd MMM yyyy")}
                <button onClick={() => setCreatedAt("")}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(sortBy !== "updatedAt" || sortOrder !== "desc") && (
              <Badge variant="secondary" className="gap-2">
                Sort: {sortOptions.find((o) => o.value === sortBy)?.label}{" "}
                {sortOrder === "asc" ? "↑" : "↓"}
                <button
                  onClick={() => {
                    setSortBy("updatedAt");
                    setSortOrder("desc");
                  }}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !data && <TableSkeleton rows={5} />}

              {error && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <DataError
                      message={error?.message || "Gagal memuat data"}
                    />
                  </TableCell>
                </TableRow>
              )}

              {data?.length === 0 && !hasSignificantFilter && !isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <DataKosong title="Data Master Masih Kosong" />
                  </TableCell>
                </TableRow>
              )}

              {data?.length === 0 && hasSignificantFilter && !isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <DataTidakDitemukan />
                  </TableCell>
                </TableRow>
              )}

              {data?.length > 0 &&
                data.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-muted/50 transition-colors"
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

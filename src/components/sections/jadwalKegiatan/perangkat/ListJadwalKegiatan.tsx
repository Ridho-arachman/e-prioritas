"use client";

import DataError from "@/components/blocks/DataError";
import DataKosong from "@/components/blocks/DataKosong";
import DataTidakDitemukan from "@/components/blocks/DataTidakDitemukan";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Spinner } from "@/components/ui/spinner";
import { useDelete, useGet } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";
import { cn } from "@/lib/utils";
import { buildQuery } from "@/utils/query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ClockIcon,
  CpuIcon,
  Edit,
  Eye,
  FileText,
  Filter,
  MapPin,
  Plus,
  SlidersHorizontal,
  SparklesIcon,
  TargetIcon,
  Trash,
  Users,
  X,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

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
import { Separator } from "@/components/ui/separator";

// ═══════════════════════════════════════════════════════════════
// 📦 ENUMS (Sesuai Schema Prisma)
// ═══════════════════════════════════════════════════════════════

export enum StatusMasukan {
  MENUNGGU = "MENUNGGU",
  DIVERIFIKASI = "DIVERIFIKASI",
  DITOLAK = "DITOLAK",
  DIPROSES = "DIPROSES",
  DISELESAIKAN = "DISELESAIKAN",
}

export enum StatusRekomendasi {
  DRAFT = "DRAFT",
  DIAJUKAN = "DIAJUKAN",
  DISETUJUI = "DISETUJUI",
  DITOLAK = "DITOLAK",
}

export enum ModeRekomendasi {
  FUSI_DATA = "FUSI_DATA",
  DATA_MASTER_SAJA = "DATA_MASTER_SAJA",
}

export enum Role {
  LURAH = "LURAH",
  PERANGKAT_DESA = "PERANGKAT_DESA",
  ADMIN = "ADMIN",
}

export enum NilaiKritikalitas {
  KRITIS = "KRITIS",
  TINGGI = "TINGGI",
  SEDANG = "SEDANG",
  RENDAH = "RENDAH",
}

// ═══════════════════════════════════════════════════════════════
// 📦 BASE ENTITIES
// ═══════════════════════════════════════════════════════════════

export interface DomainIsu {
  id: string;
  code: string;
  nama: string;
  deskripsi?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  jabatan?: string | null;
  role: Role;
}

export interface MasukanWarga {
  id: string;
  namaPengirim: string | null;
  nomorHp: string | null;
  judul: string;
  deskripsi: string;
  lokasiRt: string;
  lokasiRw: string;
  domainIsuId: string;
  domainIsu?: DomainIsu;
  status: StatusMasukan;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ═══════════════════════════════════════════════════════════════
// 📦 REKOMENDASI (JSON STRUCTURE)
// ═══════════════════════════════════════════════════════════════

export interface RekomendasiEvidence {
  masukanWargaCount?: number;
  dataMasterCount?: number;
  kritikalitas?: NilaiKritikalitas;
}

export interface RekomendasiItem {
  prioritasKe: number;
  deskripsi: string;
  skorPrioritas: number;
  alasanAnalisis: string;
  domainIsuId: string;
  lokasiRt?: string;
  lokasiRw?: string;
  fingerprint: string;
  evidence?: RekomendasiEvidence;
}

export interface RekomendasiMetadata {
  generatedAt: string;
  aiModel: string;
  modeRekomendasi: ModeRekomendasi;
  domainIsuCode: string;
  totalMasukanDianalisis: number;
  totalDataMasterDianalisis: number;
}

export interface RekomendasiSnapshot {
  metadata: RekomendasiMetadata;
  prioritas: RekomendasiItem[];
}

// ═══════════════════════════════════════════════════════════════
// 📦 KEGIATAN RAPAT (Main Entity)
// ═══════════════════════════════════════════════════════════════

export interface KegiatanRapat {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: Date | string;
  lokasi?: string | null;
  domainIsuId: string;
  domainIsu?: DomainIsu | null;
  dibuatOlehId: string;
  dibuatOleh: User;
  mode: ModeRekomendasi;
  judulLaporan: string;
  rekomendasiItems?: RekomendasiSnapshot | null;
  fingerprint: string;
  statusRekomendasi: StatusRekomendasi;
  aiModel?: string | null;
  aiProcessedAt?: Date | string | null;
  diprosesOlehId?: string | null;
  diprosesOleh?: User | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ═══════════════════════════════════════════════════════════════
// 🔧 HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const toDate = (val: Date | string): Date =>
  val instanceof Date ? val : new Date(val);

const getStatusColor = (status: StatusRekomendasi) => {
  switch (status) {
    case StatusRekomendasi.DISETUJUI:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case StatusRekomendasi.DIAJUKAN:
      return "bg-amber-50 text-amber-700 border-amber-200";
    case StatusRekomendasi.DRAFT:
      return "bg-slate-50 text-slate-700 border-slate-200";
    case StatusRekomendasi.DITOLAK:
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const getModeBadgeColor = (mode: ModeRekomendasi) => {
  switch (mode) {
    case ModeRekomendasi.FUSI_DATA:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case ModeRekomendasi.DATA_MASTER_SAJA:
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const getDomainGradient = (domainCode: string | null | undefined) => {
  switch (domainCode) {
    case "INFRASTRUKTUR":
      return "from-blue-500 to-cyan-500";
    case "KESEHATAN":
      return "from-rose-500 to-pink-500";
    case "PENDIDIKAN":
      return "from-violet-500 to-purple-500";
    case "EKONOMI":
      return "from-amber-500 to-orange-500";
    case "KEAMANAN":
      return "from-red-500 to-rose-500";
    case "LINGKUNGAN":
      return "from-green-500 to-emerald-500";
    default:
      return "from-slate-400 to-gray-400";
  }
};

const formatTanggalShort = (val: Date | string) => {
  return format(toDate(val), "dd MMM", { locale: id });
};

const formatJam = (val: Date | string) => {
  return format(toDate(val), "HH:mm", { locale: id });
};

const parseRekomendasiItems = (items: any): RekomendasiSnapshot | null => {
  try {
    if (!items || typeof items !== "object") return null;
    if (!items.metadata || !Array.isArray(items.prioritas)) return null;
    return items as RekomendasiSnapshot;
  } catch {
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════
// 🧩 USER COMBOBOX (dengan allowedRoles)
// ═══════════════════════════════════════════════════════════════

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

  // Fetch detail user jika value ada
  const { data: userDetail } = useGet(value ? `/protected/user/${value}` : "");

  useEffect(() => {
    if (userDetail) setSelectedUser(userDetail);
  }, [userDetail]);

  // Reset saat search berubah
  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [debouncedSearch]);

  // Fetch saat popover terbuka, page berubah, atau search berubah
  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch) params.append("q", debouncedSearch);
        params.append("page", String(page));
        params.append("perPage", "10");
        if (allowedRoles && allowedRoles.length > 0) {
          params.append("roles", allowedRoles.join(","));
        }
        const query = params.toString() ? `?${params.toString()}` : "";
        const res = await fetch(`/api/protected/user${query}`);
        const json = await res.json();
        if (json.success) {
          setUsers((prev) =>
            page === 1 ? json.data : [...prev, ...json.data],
          );
          setMeta(json.meta);
        } else {
          console.warn("Fetch users failed:", json);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open, debouncedSearch, page, allowedRoles]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (isBottom && !loading && meta && page < meta.totalPages) {
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
    setSearch(""); // reset pencarian setelah pilih
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

// ═══════════════════════════════════════════════════════════════
// 🎯 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ListJadwalKegiatan() {
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Query states
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [domainIsuId, setDomainIsuId] = useQueryState("domainIsuId", {
    defaultValue: "",
  });
  const [statusRekomendasi, setStatusRekomendasi] = useQueryState(
    "statusRekomendasi",
    { defaultValue: "" },
  );
  const [mode, setMode] = useQueryState("mode", { defaultValue: "" });
  const [dibuatOlehId, setDibuatOlehId] = useQueryState("dibuatOlehId", {
    defaultValue: "",
  });
  const [diprosesOlehId, setDiprosesOlehId] = useQueryState("diprosesOlehId", {
    defaultValue: "",
  });
  const [tanggal, setTanggal] = useQueryState("tanggal", { defaultValue: "" });
  const [createdAt, setCreatedAt] = useQueryState("createdAt", {
    defaultValue: "",
  });

  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [limit] = useQueryState("limit", { defaultValue: "10" });

  // Sorting states
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "updatedAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  // State untuk menyimpan nama user yang dipilih (untuk badge)
  const [selectedDibuatOlehName, setSelectedDibuatOlehName] = useState("");
  const [selectedDiprosesOlehName, setSelectedDiprosesOlehName] = useState("");

  const [debouncedQ] = useDebounce(q, 500);
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const queryString = buildQuery({
    q: debouncedQ || undefined,
    domainIsuId: domainIsuId || undefined,
    statusRekomendasi: statusRekomendasi || undefined,
    mode: mode || undefined,
    dibuatOlehId: dibuatOlehId || undefined,
    diprosesOlehId: diprosesOlehId || undefined,
    tanggal: tanggal || undefined,
    createdAt: createdAt || undefined,
    page: pageNumber,
    limit: limitNumber,
    sortBy,
    sortOrder,
  });

  const { data, meta, error, isLoading, mutate } = useGet(
    `/protected/kegiatan-rapat/perangkat${queryString}`,
  );

  const { del: deleteKegiatan, loading: deleteLoading } = useDelete();

  // Fetch domain isu options
  const { data: domainIsuOptions } = useGet("/protected/kategori");

  const sortOptions = [
    { value: "tanggal", label: "Tanggal Kegiatan" },
    { value: "judul", label: "Judul" },
    { value: "createdAt", label: "Tanggal Dibuat" },
    { value: "updatedAt", label: "Terakhir Update" },
    { value: "statusRekomendasi", label: "Status Rekomendasi" },
  ];

  const hasSignificantFilter =
    (debouncedQ?.trim() !== "" && debouncedQ !== undefined) ||
    domainIsuId !== "" ||
    statusRekomendasi !== "" ||
    mode !== "" ||
    dibuatOlehId !== "" ||
    diprosesOlehId !== "" ||
    tanggal !== "" ||
    createdAt !== "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setPage("1");
  }, [
    debouncedQ,
    domainIsuId,
    statusRekomendasi,
    mode,
    dibuatOlehId,
    diprosesOlehId,
    tanggal,
    createdAt,
    sortBy,
    sortOrder,
  ]);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await deleteKegiatan(
        `/protected/kegiatan-rapat/${selectedDeleteId}`,
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

  const clearFilters = () => {
    setDomainIsuId("");
    setStatusRekomendasi("");
    setMode("");
    setDibuatOlehId("");
    setSelectedDibuatOlehName("");
    setDiprosesOlehId("");
    setSelectedDiprosesOlehName("");
    setTanggal("");
    setCreatedAt("");
    setSortBy("updatedAt");
    setSortOrder("desc");
    setIsFilterOpen(false);
    setPage("1");
  };

  const hasActiveFilters =
    domainIsuId !== "" ||
    statusRekomendasi !== "" ||
    mode !== "" ||
    dibuatOlehId !== "" ||
    diprosesOlehId !== "" ||
    tanggal !== "" ||
    createdAt !== "" ||
    sortBy !== "updatedAt" ||
    sortOrder !== "desc";

  // Tampilkan loading saat belum mounted (SSR)
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-pulse space-y-8">
            <div className="h-20 bg-slate-200 rounded-2xl" />
            <div className="h-16 bg-slate-200 rounded-2xl" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
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
            <AlertDialogTitle>Hapus kegiatan?</AlertDialogTitle>
            <AlertDialogDescription>
              Data kegiatan akan dihapus permanen. Tindakan ini tidak dapat
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

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-linear-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    Program & Rapat
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Kelola kegiatan dengan sistem terintegrasi
                  </p>
                </div>
              </div>
              <Button
                onClick={() => router.push("/perangkat/jadwal-program/add")}
                className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 font-medium"
              >
                <Plus className="h-5 w-5" />
                Tambah Kegiatan
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">
                      Total Kegiatan
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">
                    {meta?.total || 0}
                  </p>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <CpuIcon className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">
                      Domain Isu
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">
                    {domainIsuOptions?.length || 6}
                  </p>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <TargetIcon className="h-4 w-4 text-violet-600" />
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">
                      Halaman
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">
                    {pageNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                <XIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                <Input
                  placeholder="Cari nama kegiatan..."
                  className="pl-12 pr-12 py-3 w-72 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm relative z-10"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setQ("");
                  }}
                />
                {q && (
                  <button
                    onClick={() => setQ("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-1 transition-all z-20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <Button
                  variant="outline"
                  className="cursor-pointer border-slate-200"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter & Sort
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      {[
                        domainIsuId,
                        statusRekomendasi,
                        mode,
                        dibuatOlehId,
                        diprosesOlehId,
                        tanggal,
                        createdAt,
                      ].filter(Boolean).length +
                        (sortBy !== "updatedAt" || sortOrder !== "desc"
                          ? 1
                          : 0)}
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
                      Atur filter dan urutan data kegiatan rapat
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Domain Isu */}
                    <div className="grid gap-2">
                      <Label>Domain Isu</Label>
                      <Select
                        value={domainIsuId || "all"}
                        onValueChange={(val) =>
                          setDomainIsuId(val === "all" ? "" : val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Domain</SelectItem>
                          {domainIsuOptions?.map((option: DomainIsu) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status Rekomendasi */}
                    <div className="grid gap-2">
                      <Label>Status Rekomendasi</Label>
                      <Select
                        value={statusRekomendasi || "all"}
                        onValueChange={(val) =>
                          setStatusRekomendasi(val === "all" ? "" : val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua</SelectItem>
                          {Object.values(StatusRekomendasi).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mode Rekomendasi */}
                    <div className="grid gap-2">
                      <Label>Mode Rekomendasi</Label>
                      <Select
                        value={mode || "all"}
                        onValueChange={(val) =>
                          setMode(val === "all" ? "" : val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua</SelectItem>
                          {Object.values(ModeRekomendasi).map((m) => (
                            <SelectItem key={m} value={m}>
                              {m === "FUSI_DATA" ? "Fusi Data" : "Data Master"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dibuat Oleh - hanya ADMIN & PERANGKAT_DESA */}
                    <div className="grid gap-2">
                      <Label>Dibuat Oleh</Label>
                      <UserCombobox
                        value={dibuatOlehId}
                        onChange={(val, user) => {
                          setDibuatOlehId(val);
                          setSelectedDibuatOlehName(user?.name || "");
                        }}
                        placeholder="Pilih pembuat"
                        allowedRoles={["ADMIN", "PERANGKAT_DESA"]}
                      />
                    </div>

                    {/* Diproses Oleh - semua role */}
                    <div className="grid gap-2">
                      <Label>Diproses Oleh</Label>
                      <UserCombobox
                        value={diprosesOlehId}
                        onChange={(val, user) => {
                          setDiprosesOlehId(val);
                          setSelectedDiprosesOlehName(user?.name || "");
                        }}
                        placeholder="Pilih pemroses"
                      />
                    </div>

                    {/* Tanggal Rapat */}
                    <div className="grid gap-2">
                      <Label>Tanggal Rapat</Label>
                      <Input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
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

                  {/* Sort Options */}
                  <div className="grid gap-2 mt-4">
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
                        className="flex-1"
                        onClick={() => setSortOrder("asc")}
                      >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Ascending
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setSortOrder("desc")}
                      >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Descending
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between gap-2 mt-6">
                    <Button variant="outline" onClick={clearFilters}>
                      Reset
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)}>
                      Terapkan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Badge
                variant="outline"
                className="bg-slate-100 border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-medium"
              >
                {data?.length || 0} kegiatan
              </Badge>
            </div>
          </div>

          {/* Active Filters Badge */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {domainIsuId && (
                <Badge variant="secondary" className="gap-2">
                  Domain:{" "}
                  {domainIsuOptions?.find(
                    (d: DomainIsu) => d.id === domainIsuId,
                  )?.nama || domainIsuId}
                  <button onClick={() => setDomainIsuId("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {statusRekomendasi && (
                <Badge variant="secondary" className="gap-2">
                  Status: {statusRekomendasi}
                  <button onClick={() => setStatusRekomendasi("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {mode && (
                <Badge variant="secondary" className="gap-2">
                  Mode: {mode === "FUSI_DATA" ? "Fusi Data" : "Data Master"}
                  <button onClick={() => setMode("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {dibuatOlehId && (
                <Badge variant="secondary" className="gap-2">
                  Dibuat: {selectedDibuatOlehName || dibuatOlehId}
                  <button
                    onClick={() => {
                      setDibuatOlehId("");
                      setSelectedDibuatOlehName("");
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {diprosesOlehId && (
                <Badge variant="secondary" className="gap-2">
                  Diproses: {selectedDiprosesOlehName || diprosesOlehId}
                  <button
                    onClick={() => {
                      setDiprosesOlehId("");
                      setSelectedDiprosesOlehName("");
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {tanggal && (
                <Badge variant="secondary" className="gap-2">
                  Tgl Rapat: {format(new Date(tanggal), "dd MMM yyyy")}
                  <button onClick={() => setTanggal("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {createdAt && (
                <Badge variant="secondary" className="gap-2">
                  Dibuat: {format(new Date(createdAt), "dd MMM yyyy")}
                  <button onClick={() => setCreatedAt("")}>
                    <X className="h-3 w-3" />
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
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Timeline Kegiatan */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 bg-linear-to-b from-blue-500 to-indigo-500 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-800">
                Timeline Kegiatan
              </h2>
            </div>

            {isLoading && !data && (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-slate-200 h-48 rounded-2xl"
                  />
                ))}
              </div>
            )}

            {error && (
              <Card className="border-0 bg-white rounded-2xl p-12 text-center shadow-lg">
                <DataError message={error?.message} />
              </Card>
            )}

            {data?.length === 0 && !hasSignificantFilter && (
              <Card className="border-0 bg-white rounded-2xl p-12 text-center shadow-lg">
                <DataKosong />
              </Card>
            )}

            {data?.length === 0 && hasSignificantFilter && (
              <Card className="border-0 bg-white rounded-2xl p-12 text-center shadow-lg">
                <DataTidakDitemukan />
              </Card>
            )}

            {data?.length > 0 && (
              <>
                <div className="relative pl-8">
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-linear-to-b from-blue-400 via-indigo-400 to-purple-400 rounded-full" />
                  <div className="space-y-6">
                    {data?.map((k: KegiatanRapat) => {
                      const gradient = getDomainGradient(k.domainIsu?.code);
                      const rekomendasiData = parseRekomendasiItems(
                        k.rekomendasiItems,
                      );
                      const prioritasCount =
                        rekomendasiData?.prioritas?.length || 0;

                      return (
                        <div key={k.id} className="relative group">
                          <div
                            className={`absolute -left-6.5 top-6 w-6 h-6 rounded-full bg-linear-to-br ${gradient} border-4 border-white shadow-lg z-10`}
                          />
                          <Card className="group/card border border-slate-200 bg-white rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                            <div className={`h-2 bg-linear-to-r ${gradient}`} />
                            <div className="p-6">
                              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                <div className="shrink-0">
                                  <div className="relative">
                                    <div
                                      className={`absolute inset-0 bg-linear-to-br ${gradient} rounded-2xl blur-lg opacity-20 group-hover/card:opacity-40 transition-opacity`}
                                    />
                                    <div className="relative bg-linear-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 min-w-32.5 text-center shadow-sm">
                                      <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-2 font-medium">
                                        <ClockIcon className="h-3.5 w-3.5" />
                                        <span>
                                          {formatTanggalShort(k.tanggal)}
                                        </span>
                                      </div>
                                      <p className="text-3xl font-bold text-slate-800">
                                        {formatJam(k.tanggal)}
                                      </p>
                                      <p className="text-slate-400 text-xs mt-1 font-medium">
                                        WIB
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <div>
                                      <h3 className="text-xl font-bold text-slate-800 group-hover/card:text-blue-600 transition-colors">
                                        {k.judul}
                                      </h3>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {k.domainIsu && (
                                          <Badge
                                            variant="outline"
                                            className={`${getStatusColor(StatusRekomendasi.DRAFT)} font-medium`}
                                          >
                                            {k.domainIsu.nama}
                                          </Badge>
                                        )}
                                        <Badge
                                          variant="outline"
                                          className={`${getModeBadgeColor(k.mode)} font-medium`}
                                        >
                                          {k.mode === "FUSI_DATA"
                                            ? "Fusi Data"
                                            : "Data Master"}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className={`${getStatusColor(k.statusRekomendasi)} font-medium`}
                                        >
                                          {k.statusRekomendasi}
                                        </Badge>
                                      </div>
                                    </div>
                                    {k.aiModel && (
                                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200">
                                        <SparklesIcon className="h-4 w-4 text-purple-600" />
                                        <span className="text-xs text-purple-700 font-medium">
                                          AI Powered
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                                    <div className="flex items-center gap-2">
                                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                      </div>
                                      <span className="font-medium">
                                        {k.lokasi || "Belum ditentukan"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Users className="h-4 w-4 text-slate-400" />
                                      </div>
                                      <span className="font-medium">
                                        {k.dibuatOleh.name}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed mb-5 line-clamp-2">
                                    {k.deskripsi}
                                  </p>
                                  {rekomendasiData && prioritasCount > 0 && (
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 h-px bg-linear-to-r from-slate-200 to-transparent" />
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                                          <FileText className="h-4 w-4 text-blue-600" />
                                          <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                                            {prioritasCount} Prioritas AI
                                          </span>
                                        </div>
                                        <div className="flex-1 h-px bg-linear-to-l from-slate-200 to-transparent" />
                                      </div>
                                      <div className="grid gap-3 md:grid-cols-2">
                                        {rekomendasiData.prioritas.map(
                                          (rec, idx) => (
                                            <div
                                              key={rec.fingerprint || idx}
                                              className="group/rec relative bg-linear-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                                            >
                                              <div className="absolute top-3 right-3">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                                                  <TargetIcon className="h-3.5 w-3.5 text-amber-600" />
                                                  <span className="text-xs font-bold text-amber-700">
                                                    {rec.skorPrioritas}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-2 mb-2">
                                                <Badge
                                                  variant="outline"
                                                  className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200"
                                                >
                                                  Prioritas #{rec.prioritasKe}
                                                </Badge>
                                              </div>
                                              <p className="text-sm font-semibold text-slate-800 mb-2 line-clamp-1">
                                                {rec.deskripsi}
                                              </p>
                                              <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                                                {rec.alasanAnalisis}
                                              </p>
                                              {rec.evidence && (
                                                <div className="pt-3 border-t border-slate-200">
                                                  <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                      <Users className="h-3.5 w-3.5 text-slate-400" />
                                                      <span className="text-xs text-slate-500 font-medium">
                                                        {rec.evidence
                                                          .masukanWargaCount ||
                                                          0}{" "}
                                                        masukan
                                                      </span>
                                                    </div>
                                                    {rec.evidence
                                                      .kritikalitas && (
                                                      <Badge
                                                        variant="secondary"
                                                        className="text-xs"
                                                      >
                                                        {
                                                          rec.evidence
                                                            .kritikalitas
                                                        }
                                                      </Badge>
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(
                                          `/perangkat/jadwal-program/${k.id}`,
                                        );
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      Detail
                                    </Button>
                                    {(k.statusRekomendasi ===
                                      StatusRekomendasi.DRAFT ||
                                      k.statusRekomendasi ===
                                        StatusRekomendasi.DIAJUKAN) && (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(
                                              `/perangkat/jadwal-program/${k.id}/edit`,
                                            );
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Edit className="h-4 w-4 mr-1" />
                                          Edit
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedDeleteId(k.id);
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pagination */}
                {meta && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 font-medium">
                      Menampilkan {(pageNumber - 1) * limitNumber + 1} -{" "}
                      {Math.min(pageNumber * limitNumber, meta.total)} dari{" "}
                      {meta.total} kegiatan
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(String(pageNumber - 1))}
                        disabled={pageNumber === 1}
                        className="border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 rounded-xl font-medium cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 bg-slate-100 rounded-xl font-medium text-slate-600">
                        Halaman {pageNumber} dari {meta.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(String(pageNumber + 1))}
                        disabled={pageNumber >= meta.totalPages}
                        className="border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 rounded-xl font-medium cursor-pointer"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

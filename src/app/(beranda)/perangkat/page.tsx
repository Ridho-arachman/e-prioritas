"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { notifier } from "@/lib/ToastNotifier";
import {
  Database,
  PenTool,
  Send,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Activity,
  AlertTriangle,
  MinusCircle,
  Clock,
  XCircle,
  Loader2,
  CheckCheck,
  BarChart as BarChartIcon,
} from "lucide-react";

interface KritikalitasCount {
  kritikalitas: string;
  _count: number;
}

interface StatusMasukanCount {
  status: string;
  _count: number;
}

interface DashboardData {
  totalDataMaster: number;
  activeDataMaster: number;
  recentDataMaster: Array<{
    id: string;
    namaAtribut: string;
    kritikalitas: string;
    isActive: boolean;
    createdAt: string;
    domainIsu: { nama: string };
  }>;
  totalKegiatanDraft: number;
  totalKegiatanDiajukan: number;
  totalMasukan: number;
  kritikalitasCount: KritikalitasCount[];
  masukanPerStatus: StatusMasukanCount[];
}

export default function PerangkatDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/protected/dashboard/perangkat");
        if (!res.ok) throw new Error("Gagal mengambil data dashboard");
        const result = await res.json();
        setData(result);
      } catch (error) {
        notifier.error("Error", "Gagal memuat dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Nilai default 0 jika data undefined
  const stats = {
    totalDataMaster: data?.totalDataMaster ?? 0,
    activeDataMaster: data?.activeDataMaster ?? 0,
    totalKegiatanDraft: data?.totalKegiatanDraft ?? 0,
    totalKegiatanDiajukan: data?.totalKegiatanDiajukan ?? 0,
    totalMasukan: data?.totalMasukan ?? 0,
  };

  // Daftar semua kritikalitas
  const allKritikalitas = ["KRITIS", "TINGGI", "SEDANG", "RENDAH"];
  // Daftar semua status masukan
  const allStatusMasukan = [
    "MENUNGGU",
    "DIVERIFIKASI",
    "DITOLAK",
    "DIPROSES",
    "DISELESAIKAN",
  ];

  // Mapping data kritikalitas
  const kritikalitasMap = new Map(
    data?.kritikalitasCount?.map((k) => [k.kritikalitas, k._count]) ?? [],
  );
  const kritikalitasData = allKritikalitas.map((krit) => ({
    kritikalitas: krit,
    count: kritikalitasMap.get(krit) ?? 0,
  }));

  // Mapping data status masukan
  const statusMap = new Map(
    data?.masukanPerStatus?.map((s) => [s.status, s._count]) ?? [],
  );
  const statusData = allStatusMasukan.map((status) => ({
    status,
    count: statusMap.get(status) ?? 0,
  }));

  // Konfigurasi warna dan ikon per kritikalitas
  const kritikalitasConfig: Record<
    string,
    { bg: string; text: string; icon: any }
  > = {
    KRITIS: { bg: "bg-red-100", text: "text-red-800", icon: AlertTriangle },
    TINGGI: { bg: "bg-orange-100", text: "text-orange-800", icon: TrendingUp },
    SEDANG: { bg: "bg-yellow-100", text: "text-yellow-800", icon: MinusCircle },
    RENDAH: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
  };

  // Konfigurasi warna dan ikon per status masukan (dengan tambahan warna untuk chart)
  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: any; color: string }
  > = {
    MENUNGGU: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: Clock,
      color: "#eab308",
    },
    DIVERIFIKASI: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: CheckCircle,
      color: "#22c55e",
    },
    DITOLAK: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: XCircle,
      color: "#ef4444",
    },
    DIPROSES: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: Loader2,
      color: "#3b82f6",
    },
    DISELESAIKAN: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      icon: CheckCheck,
      color: "#a855f7",
    },
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Dashboard Perangkat Desa
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Data Master */}
        <Link href="/perangkat/data-master" className="block">
          <Card className="group relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Data Master
              </CardTitle>
              <Database className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                {stats.totalDataMaster}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {stats.activeDataMaster} aktif
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Card 2: Kegiatan Draft */}
        <Link href="/perangkat/kegiatan?status=DRAFT" className="block">
          <Card className="group relative overflow-hidden border-2 border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-amber-700">
                Kegiatan (Draft)
              </CardTitle>
              <PenTool className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">
                {stats.totalKegiatanDraft}
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 3: Kegiatan Diajukan */}
        <Link href="/perangkat/kegiatan?status=DIAJUKAN" className="block">
          <Card className="group relative overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-yellow-700">
                Kegiatan Diajukan
              </CardTitle>
              <Send className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-800">
                {stats.totalKegiatanDiajukan}
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 4: Masukan Diverifikasi */}
        <Link href="/perangkat/masukan?status=DIVERIFIKASI" className="block">
          <Card className="group relative overflow-hidden border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-700">
                Total Masukan Warga
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                {stats.totalMasukan}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Tabel 5 Data Master Terbaru */}
      <Card className="border-2 border-muted overflow-hidden">
        <CardHeader className="bg-linear-to-r from-blue-50 to-transparent border-b">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle>Data Master Terbaru</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Domain Isu</TableHead>
                <TableHead className="font-semibold">Nama Atribut</TableHead>
                <TableHead className="font-semibold">Kritikalitas</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.recentDataMaster && data.recentDataMaster.length > 0 ? (
                data.recentDataMaster.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      {item.domainIsu.nama}
                    </TableCell>
                    <TableCell>{item.namaAtribut}</TableCell>
                    <TableCell>
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
                      >
                        {item.kritikalitas}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.isActive ? (
                        <Badge variant="default">Aktif</Badge>
                      ) : (
                        <Badge variant="destructive">Non-Aktif</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Belum ada data master
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ringkasan Kritikalitas */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Ringkasan Kritikalitas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kritikalitasData.map(({ kritikalitas, count }) => {
            const config = kritikalitasConfig[kritikalitas];
            const Icon = config.icon;
            return (
              <Card
                key={kritikalitas}
                className={`border-2 ${config.bg} border-opacity-50 overflow-hidden`}
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className={`text-sm font-medium ${config.text}`}>
                    {kritikalitas}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${config.text}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${config.text}`}>
                    {count}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {count === 0 ? "Belum ada data" : "Total data"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Ringkasan Status Masukan (Cards) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Ringkasan Status Masukan</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {statusData.map(({ status, count }) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            return (
              <Link
                key={status}
                href={`/perangkat/masukan?status=${status}`}
                className="block"
              >
                <Card
                  className={`border-2 ${config.bg} border-opacity-50 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1`}
                >
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className={`text-sm font-medium ${config.text}`}>
                      {status}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${config.text}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${config.text}`}>
                      {count}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {count === 0 ? "Belum ada data" : "Total masukan"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Chart Distribusi Status Masukan */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChartIcon className="h-5 w-5 text-primary" />
            <CardTitle>Distribusi Status Masukan</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6">
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={statusConfig[entry.status]?.color || "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Send, XIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { notifier } from "../ToastNotifier";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useDeleteKategori } from "@/hooks/api/useKategori";
import { useGetAllKategori } from "@/hooks/api/useKategori";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeletePerangkat,
  useGetAllPerangkat,
  useSendVerifyEmail,
} from "@/hooks/api/usePerangkat";
import { User } from "@prisma/client";

export default function ListTablePerangkat() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [active, setActive] = useState<boolean | string>(
    searchParams.get("isActive") || ""
  );
  const {
    data: response,
    error,
    isLoading,
    refresh,
  } = useGetAllPerangkat(q, active);
  const { execute: deleteKategori, loading: deleteLoading } =
    useDeletePerangkat();
  const { execute, loading } = useSendVerifyEmail();

  const [value] = useDebounce(q, 500);

  const data: any = response?.data ?? [];

  // Debounce search
  useEffect(() => {
    router.replace(
      `?${value ? `q=${encodeURIComponent(value)}` : ""}${
        active ? `&isActive=${encodeURIComponent(active)}` : ""
      }`
    );
    refresh();
  }, [value, active]);

  return (
    <>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Cari Nama/Jabatan/Email"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="max-w-sm"
            />
            <Button
              variant="default"
              onClick={() => setQ("")}
              className="cursor-pointer"
            >
              <XIcon />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant={active === "true" ? "default" : "outline"}
              onClick={() => setActive("true")}
              onDoubleClick={() => setActive("")}
              className="cursor-pointer"
            >
              Aktif
            </Button>
            <Button
              variant={active === "false" ? "default" : "outline"}
              onClick={() => setActive("false")}
              onDoubleClick={() => setActive("")}
              className="cursor-pointer"
            >
              Tidak Aktif
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Aktif</TableHead>
              <TableHead>Verifikasi Email</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  {error.response?.status === 403
                    ? "Anda tidak memiliki akses untuk melihat data ini."
                    : error.response?.data?.message ||
                      "Terjadi kesalahan saat memuat data."}
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item: User, i: number) => (
                <TableRow key={item.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.email}
                  </TableCell>
                  <TableCell>{item.jabatan}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {item.isActive === true ? "✅" : "❌"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {item.isEmailVerified === true ? "✅" : "❌"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Link href={`/admin/kelola-perangkat/${item.id}`} prefetch>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={deleteLoading}
                        className="cursor-pointer"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleteLoading}
                      onClick={async () => {
                        const { data: res, error } = await deleteKategori(
                          `/protected/perangkat/${item.id}`,
                          {},
                          {},
                          `/protected/perangkat/${item.id}`
                        );
                        if (error) {
                          notifier.error(error);
                        }

                        notifier.success(
                          res?.message || "Kategori Berhasil Dihapus"
                        );
                        refresh();
                      }}
                      className="cursor-pointer"
                    >
                      Hapus
                    </Button>
                    <Button
                      className="cursor-pointer bg-green-600 hover:bg-green-700"
                      size="sm"
                      disabled={deleteLoading || loading}
                      onClick={async () => {
                        const { data: res, error } = await execute(
                          `/auth/send-verify-email/${item.id}`,
                          {},
                          {},
                          `/auth/send-verify-email/${item.id}`
                        );
                        if (error) {
                          notifier.error(error);
                        }

                        notifier.success(
                          res?.message || "Kategori Berhasil Dihapus"
                        );
                        refresh();
                      }}
                    >
                      <Send />
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
                  Tidak ada kategori ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}

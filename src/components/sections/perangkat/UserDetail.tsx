"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDelete, useGet } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import DataError from "../../blocks/DataError";
import { useRouter } from "next/navigation";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";
import { ApiError } from "@google/genai";

interface UserDetailProps {
  id: string;
}

export default function UserDetail({ id }: UserDetailProps) {
  const router = useRouter();
  const { data: user, isLoading, error } = useGet(`/protected/perangkat/${id}`);
  const { del, loading } = useDelete();

  if (isLoading) {
    return (
      <Card className="border shadow-lg animate-pulse">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-20 mt-1" />
                </div>
              ))}
          </div>
          <hr className="border-t border-muted-foreground" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
          </div>
          <div className="pt-2 flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) return <DataError message={error?.message} />;

  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <Badge
            variant={user?.isActive ? "default" : "destructive"}
            className="capitalize"
          >
            {user?.isActive ? "Aktif" : "Tidak Aktif"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Email
            </span>
            <span className="text-sm">{user?.email}</span>
            <Badge
              variant={user?.emailVerified ? "default" : "destructive"}
              className="mt-1 w-fit"
            >
              {user?.emailVerified ? "Terverifikasi" : "Belum Terverifikasi"}
            </Badge>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Nomor HP
            </span>
            <span className="text-sm">{user?.phoneNumber}</span>
            <Badge
              variant={user?.phoneNumberVerified ? "default" : "destructive"}
              className="mt-1 w-fit"
            >
              {user?.phoneNumberVerified
                ? "Terverifikasi"
                : "Belum Terverifikasi"}
            </Badge>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Jabatan
            </span>
            <span className="text-sm">{user?.jabatan || "-"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Role
            </span>
            <span className="text-sm capitalize">
              {user?.role.replace("_", " ")}
            </span>
          </div>
        </div>

        <hr className="border-t border-muted-foreground" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col">
            <span className="font-medium">Tanggal Dibuat</span>
            <span>{new Date(user?.createdAt).toLocaleDateString("id-ID")}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium">Terakhir Diperbarui</span>
            <span>{new Date(user?.updatedAt).toLocaleDateString("id-ID")}</span>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <Link href={`/admin/kelola-perangkat/${user?.id}/edit`}>
            <Button size="sm">Edit</Button>
          </Link>

          <Button
            size="sm"
            onClick={async () => {
              try {
                const res = await del(`/protected/perangkat/${id}`);
                notifier.success(
                  "Berhasil",
                  res?.message || "Perangkat berhasil dihapus",
                );
                router.back();
              } catch (error) {
                const err = error as AxiosError<ApiError>;
                notifier.error("Gagal", err?.response?.data?.message);
              }
            }}
          >
            Hapus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

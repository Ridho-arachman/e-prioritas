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
import { Edit, Trash, Image as ImageIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface UserDetailProps {
  id: string;
}

// Helper function untuk mendapatkan inisial dari nama
const getInitials = (name: string): string => {
  if (!name) return "?";

  const names = name.trim().split(" ");

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};

export default function UserDetail({ id }: UserDetailProps) {
  const router = useRouter();
  const { data: user, isLoading, error } = useGet(`/protected/perangkat/${id}`);
  const { del, loading } = useDelete();

  if (isLoading) {
    return (
      <Card className="border shadow-lg animate-pulse">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-32 w-32 rounded-xl" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
          </div>

          <div className="pt-4 border-t border-muted-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
            </div>
          </div>

          <div className="pt-4 flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) return <DataError message={error?.message} />;

  return (
    <Card className="border shadow-lg">
      {/* Header dengan Foto Profil */}
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Foto Profil - Hero Section */}
            <div
              className={cn(
                "relative w-32 h-32 md:w-40 md:h-40 rounded-xl border-2 border-muted overflow-hidden",
                "bg-linear-to-br from-primary to-primary/70",
                "flex items-center justify-center shrink-0",
              )}
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white p-4">
                  <div className="bg-white/20 p-3 rounded-full mb-2">
                    <ImageIcon className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold tracking-wider">
                    {getInitials(user?.name || "")}
                  </span>
                </div>
              )}
            </div>

            {/* Info Nama & Status */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-foreground truncate">
                {user?.name}
              </h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge
                  variant={user?.isActive ? "default" : "destructive"}
                  className="capitalize text-sm px-3 py-1"
                >
                  {user?.isActive ? "Aktif" : "Tidak Aktif"}
                </Badge>
                <Badge
                  variant={user?.emailVerified ? "default" : "destructive"}
                  className="capitalize text-sm px-3 py-1"
                >
                  {user?.emailVerified
                    ? "Email Terverifikasi"
                    : "Email Belum Terverifikasi"}
                </Badge>
                {user?.role && (
                  <Badge
                    variant="secondary"
                    className="capitalize text-sm px-3 py-1"
                  >
                    {user.role.replace("_", " ")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Info Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium mb-1">
              Email
            </span>
            <span className="text-sm font-medium break-all">{user?.email}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium mb-1">
              Jabatan
            </span>
            <span className="text-sm font-medium">{user?.jabatan || "-"}</span>
          </div>
        </div>

        <hr className="border-t border-muted-foreground" />

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium mb-1">
              Tanggal Dibuat
            </span>
            <span className="text-sm">
              {new Date(user?.createdAt).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium mb-1">
              Terakhir Diperbarui
            </span>
            <span className="text-sm">
              {new Date(user?.updatedAt).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3 justify-end">
          <Link href={`/admin/kelola-perangkat/${user?.id}/edit`}>
            <Button size="sm" className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash className="h-4 w-4 mr-2" /> Hapus
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus perangkat desa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini bersifat permanen. Data perangkat desa
                  <span className="font-medium ml-1">"{user?.name}"</span>
                  akan dihapus dan tidak dapat dikembalikan.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={loading}
                  className="cursor-pointer"
                >
                  Batal
                </AlertDialogCancel>

                <AlertDialogAction
                  disabled={loading}
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
                      notifier.error(
                        "Gagal",
                        err?.response?.data?.message || "Gagal menghapus data",
                      );
                    }
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4 mr-2" />
                      Menghapus...
                    </>
                  ) : (
                    "Ya, hapus"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

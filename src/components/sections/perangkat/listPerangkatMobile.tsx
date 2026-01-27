"use client";

import {
  Plus,
  XIcon,
  Verified,
  X,
  Send,
  ChevronRight,
  ChevronLeft,
  Trash,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useGet, useDelete, usePost } from "@/hooks/useApi";
import DataKosong from "../../blocks/DataKosong";
import DataTidakDitemukan from "../../blocks/DataTidakDitemukan";
import DataError from "../../blocks/DataError";
import { Skeleton } from "../../ui/skeleton";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { buildQuery } from "@/utils/query";
import { cn } from "@/lib/utils";
import { notifier } from "@/lib/ToastNotifier";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { User } from "@/app/generated/prisma";
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

export default function ListPerangkatMobile() {
  const router = useRouter();

  // QUERY STATE
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [isActive, setIsActive] = useQueryState("isActive", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage, setPerPage] = useQueryState("perPage", {
    defaultValue: "10",
  });

  const [debouncedQ] = useDebounce(q, 500);
  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const queryString = buildQuery({
    q: debouncedQ,
    isActive,
    page: pageNumber,
    perPage: perPageNumber,
  });

  const { data, meta, error, isLoading, mutate } = useGet(
    `/protected/perangkat${queryString}`,
  );
  const { del: deletePerangkat, loading: deleteLoading } = useDelete();
  const { post, loading } = usePost(`/auth/send-verify-email`);

  const handleDelete = async (id: string) => {
    try {
      const res = await deletePerangkat(`/protected/perangkat/${id}`);
      notifier.success(
        "Berhasil",
        res?.message || "Perangkat berhasil dihapus",
      );
      router.back();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  const handleVerify = async (email: string) => {
    try {
      const res = await post({ email });
      notifier.success(
        "Berhasil",
        res?.message || "Verifikasi email berhasil dikirim",
      );
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  const handlePrev = () => setPage(String(Math.max(1, pageNumber - 1)));
  const handleNext = () =>
    setPage(String(Math.min(meta?.totalPages || 1, pageNumber + 1)));

  return (
    <>
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href="/admin/kelola-perangkat/add">
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Tambah Perangkat
            </Button>
          </Link>

          <div className="flex w-full gap-2 md:max-w-md">
            <Input
              placeholder="Cari Nama / Jabatan / Email"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button variant="outline" onClick={() => setQ("")}>
              <XIcon />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant={isActive === "true" ? "default" : "outline"}
            onClick={() => setIsActive(isActive === "true" ? "" : "true")}
          >
            Aktif
          </Button>
          <Button
            variant={isActive === "false" ? "default" : "outline"}
            onClick={() => setIsActive(isActive === "false" ? "" : "false")}
          >
            Tidak Aktif
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading && !data && (
          <div className="space-y-4">
            {Array.from({ length: perPageNumber }).map((_, i) => (
              <Card key={i} className="border shadow-sm animate-pulse">
                <CardContent className="space-y-3 pt-4">
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-3.5 w-4/5" />
                  <Skeleton className="h-3.5 w-7/10" />
                  <Skeleton className="h-3.5 w-1/2" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && error && <DataError message={error?.message} />}

        {data?.length === 0 && queryString && <DataTidakDitemukan />}
        {data?.length === 0 && !queryString && <DataKosong />}

        {data?.length > 0 &&
          data.map((item: User, index: number) => (
            <Card
              key={item.id}
              className="border shadow-sm"
              onClick={() => router.push(`/admin/kelola-perangkat/${item.id}`)}
            >
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {(pageNumber - 1) * perPageNumber + index + 1}. {item.name}
                  </h3>
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded",
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700",
                    )}
                  >
                    {item.isActive ? (
                      <Verified className="inline-block h-4 w-4" />
                    ) : (
                      <X className="inline-block h-4 w-4" />
                    )}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  {item.email}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Jabatan:</span> {item.jabatan}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Verify Email:</span>{" "}
                  {item.emailVerified ? "Terverifikasi" : "Belum"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Dibuat: {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </div>

                <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                  <Button
                    size="sm"
                    disabled={deleteLoading}
                    onClick={() =>
                      router.push(`/admin/kelola-perangkat/${item.id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash /> Hapus
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Hapus perangkat desa?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini bersifat permanen. Data perangkat desa
                          <span className="font-medium"> {item?.name} </span>
                          akan dihapus dan tidak dapat dikembalikan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>
                          Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                          disabled={loading}
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {loading ? (
                            <>
                              <Spinner />
                              {"Menghapus..."}
                            </>
                          ) : (
                            "Ya, hapus"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={item.emailVerified || deleteLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVerify(item.email);
                    }}
                    className="cursor-pointer"
                  >
                    <Send className="mr-1 h-4 w-4" /> Verify
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrev}
            disabled={pageNumber === 1}
            className="cursor-pointer"
          >
            <ChevronLeft /> Prev
          </Button>
          <span className="flex items-center px-2">
            {pageNumber} / {meta?.totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleNext}
            disabled={pageNumber === meta?.totalPages}
            className="cursor-pointer"
          >
            Next <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </>
  );
}

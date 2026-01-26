"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  useGetDetailMasukanWarga,
  useUpdateMasukanWarga,
} from "@/hooks/api/useMasukanWarga";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { MasukanStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../ui/skeleton";

export default function CardDetailMasukanWarga() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "MENUNGGU_VERIFIKASI" | "DITERIMA" | "DITOLAK" | null
  >(null);
  const [alasan, setAlasan] = useState("");

  const { data, error, isLoading, refresh } = useGetDetailMasukanWarga(id);
  const { execute: updateMasukan, loading: updating } = useUpdateMasukanWarga();

  const masukan = data?.data;
  // mapping status → warna badge
  const statusColorMap: Record<MasukanStatus, string> = {
    MENUNGGU_VERIFIKASI: "bg-yellow-500 text-white",
    DITERIMA: "bg-green-600 text-white",
    DITOLAK: "bg-red-600 text-white",
  };

  // pastikan status dari API dianggap MasukanStatus
  const statusKey: MasukanStatus =
    (masukan?.status as MasukanStatus) ?? "MENUNGGU_VERIFIKASI";

  const statusColor = statusColorMap[statusKey];

  function handleChangeStatus(newStatus: typeof pendingStatus) {
    if (newStatus === "DITOLAK") {
      setPendingStatus("DITOLAK");
      setOpenRejectModal(true);
    } else {
      setPendingStatus(newStatus);
      setOpenConfirmModal(true);
    }
  }

  async function handleConfirmChange() {
    if (!pendingStatus || !id) return;

    if (pendingStatus === "DITOLAK" && alasan.trim() === "") {
      toast.error("Alasan penolakan wajib diisi");
      return;
    }

    try {
      await updateMasukan(`/protected/masukan/${id}`, {
        status: pendingStatus,
        alasanPenolakan:
          pendingStatus === "DITOLAK" ? alasan.trim() : undefined,
      });

      toast.success(`Status berhasil diubah menjadi ${pendingStatus}`);
      refresh();
    } catch (err) {
      toast.error("Gagal memperbarui status masukan");
    } finally {
      setOpenRejectModal(false);
      setOpenConfirmModal(false);
      setAlasan("");
      setPendingStatus(null);
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-80" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Header User */}
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>

            <Separator />

            {/* Detail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}

              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-52" />
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !masukan) {
    return (
      <div className="p-6 text-center text-red-600">
        Terjadi kesalahan saat memuat data masukan.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detail Masukan Warga</CardTitle>
          <CardDescription>
            Data lengkap masukan dari warga berikut status verifikasi
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{masukan.namaPengirim}</h3>
              <p className="text-sm text-muted-foreground">
                {masukan.emailPengirim}
              </p>
            </div>
            <Badge className={statusColor}>{masukan.status}</Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Lokasi RT</Label>
              <p>{masukan.lokasiRt}</p>
            </div>
            <div>
              <Label>Lokasi RW</Label>
              <p>{masukan.lokasiRw}</p>
            </div>
            <div>
              <Label>Kategori</Label>
              <p>{masukan.kategori?.namaKategori ?? "-"}</p>
            </div>
            <div>
              <Label>Diverifikasi Oleh</Label>
              <p>{masukan.verifiedBy?.name ?? "-"}</p>
            </div>

            <div className="col-span-2">
              <Label>Deskripsi Masukan</Label>
              <p className="whitespace-pre-wrap">{masukan.deskripsiMasukan}</p>
            </div>

            {masukan.alasanPenolakan && (
              <div className="col-span-2">
                <Label>Alasan Penolakan</Label>
                <p className="text-red-600">{masukan.alasanPenolakan}</p>
              </div>
            )}

            <div>
              <Label>Dibuat Pada</Label>
              <p>{new Date(masukan.createdAt).toLocaleString("id-ID")}</p>
            </div>
            <div>
              <Label>Diperbarui Pada</Label>
              <p>{new Date(masukan.updatedAt).toLocaleString("id-ID")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 justify-between">
            <div className="flex gap-3">
              {masukan.status !== "DITERIMA" && (
                <Button
                  className="cursor-pointer"
                  onClick={() => handleChangeStatus("DITERIMA")}
                  disabled={updating}
                >
                  Verifikasi Diterima
                </Button>
              )}
              {masukan.status !== "DITOLAK" && (
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => handleChangeStatus("DITOLAK")}
                  disabled={updating}
                >
                  Tolak Masukan
                </Button>
              )}
              {masukan.status !== "MENUNGGU_VERIFIKASI" && (
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => handleChangeStatus("MENUNGGU_VERIFIKASI")}
                  disabled={updating}
                >
                  Kembalikan ke Menunggu Verifikasi
                </Button>
              )}
            </div>
            <Button
              className="cursor-pointer"
              variant="default"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Penolakan */}
      <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Masukkan alasan penolakan</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="alasan">Alasan</Label>
            <Textarea
              id="alasan"
              placeholder="Tuliskan alasan penolakan..."
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRejectModal(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmChange}
              disabled={updating}
            >
              Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi */}
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Perubahan Status</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin mengubah status menjadi{" "}
            <b>{pendingStatus}</b>?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenConfirmModal(false)}
            >
              Batal
            </Button>
            <Button onClick={handleConfirmChange} disabled={updating}>
              Ya, Ubah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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

export default function MasukanDetailPage() {
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [alasan, setAlasan] = useState("");
  const [status, setStatus] = useState("MENUNGGU_VERIFIKASI");

  // Dummy data masukan warga
  const masukan = {
    id: "dummy123",
    namaPengirim: "Ridho Arachman",
    emailPengirim: "ridho@example.com",
    lokasiRt: "05",
    lokasiRw: "02",
    deskripsiMasukan:
      "Lampu jalan di RT 05 RW 02 sudah padam sejak seminggu yang lalu. Mohon segera diperbaiki agar tidak gelap saat malam hari.",
    status: status,
    alasanPenolakan: null,
    kategori: { nama: "Infrastruktur" },
    verifiedBy: { name: "Admin Desa" },
    createdAt: "2025-10-20T08:32:00Z",
    updatedAt: "2025-10-25T10:15:00Z",
  };

  const statusColor = {
    MENUNGGU_VERIFIKASI: "bg-yellow-500 text-white",
    DITERIMA: "bg-green-600 text-white",
    DITOLAK: "bg-red-600 text-white",
  }[status];

  function handleVerifikasi(newStatus: "DITERIMA" | "DITOLAK") {
    setStatus(newStatus);
    if (newStatus === "DITOLAK") {
      toast.error("Masukan ditolak");
    } else {
      toast.success("Masukan diverifikasi dan diterima");
    }
    setOpenRejectModal(false);
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
            <Badge className={statusColor}>{status}</Badge>
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
              <p>{masukan.kategori.nama}</p>
            </div>
            <div>
              <Label>Diverifikasi Oleh</Label>
              <p>{masukan.verifiedBy.name}</p>
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

          {status === "MENUNGGU_VERIFIKASI" && (
            <div className="flex gap-3 pt-4">
              <Button onClick={() => handleVerifikasi("DITERIMA")}>
                Verifikasi Diterima
              </Button>
              <Button
                variant="destructive"
                onClick={() => setOpenRejectModal(true)}
              >
                Tolak Masukan
              </Button>
            </div>
          )}
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
              onClick={() => handleVerifikasi("DITOLAK")}
            >
              Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

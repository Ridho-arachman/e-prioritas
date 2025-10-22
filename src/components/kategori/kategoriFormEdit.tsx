"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { useEditKategori, useKategoriById } from "@/hooks/api/kategoriHooks";
import { toast } from "sonner";
import { notifier } from "../ToastNotifier";
import { Spinner } from "../ui/spinner";
import { stat } from "fs";

export function KategoriFormEdit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useKategoriById(id);
  const kategori = data?.data;

  const {
    execute: editExecute,
    loading: editLoading,
    error: editError,
  } = useEditKategori();

  const [namaKategori, setNamaKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");

  // Sync state saat data fetch selesai
  useEffect(() => {
    if (kategori) {
      setNamaKategori(kategori.namaKategori);
      setDeskripsi(kategori.deskripsi);

      console.log("Status dari API yang diset ke state:", kategori.status);
    }
  }, [kategori]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { namaKategori, deskripsi, status };

    const res = await editExecute(
      `/protected/kategori/${id}`,
      payload,
      {},
      `/protected/kategori/${id}`
    );
    if (res) {
      notifier.success(res.message || "Kategori berhasil diperbarui");
      router.back();
    } else {
      notifier.error(editError || res.message || "Gagal memperbarui kategori");
    }
  };

  const formComponent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="namaKategori"
          className="block text-sm font-medium text-muted-foreground"
        >
          Nama Kategori
        </label>
        <Input
          id="namaKategori"
          name="namaKategori"
          placeholder="Contoh: Infrastruktur, Kesehatan..."
          required
          value={namaKategori}
          onChange={(e) => setNamaKategori(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="deskripsi"
          className="block text-sm font-medium text-muted-foreground"
        >
          Deskripsi
        </label>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          placeholder="Tulis deskripsi singkat..."
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-muted-foreground"
        >
          Status
        </label>
        <Select
          defaultValue={kategori?.status}
          onValueChange={(val) => setStatus(val as "AKTIF" | "NON_AKTIF")}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Pilih status kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AKTIF">Aktif</SelectItem>
            {/* PASTIKAN nilai ini cocok dengan yang dari API: */}
            <SelectItem value="NON_AKTIF">Non_Aktif</SelectItem>
            {/* Jika API mengembalikan "NONAKTIF" (tanpa underscore), ubah value-nya menjadi:
            <SelectItem value="NONAKTIF">Non_Aktif</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-3 pt-8 border-t border-border">
        <Button variant="ghost" type="button" onClick={() => router.back()}>
          Kembali
        </Button>
        <Button type="submit" disabled={editLoading}>
          {editLoading ? "Memuat..." : "Simpan Kategori"}
        </Button>
      </div>
    </form>
  );

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full min-h-[50vh]">
          <Spinner className="size-28" />
        </div>
      ) : (
        formComponent
      )}

      {editLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-sm z-50">
          <Spinner className="size-28" />
        </div>
      )}
    </>
  );
}

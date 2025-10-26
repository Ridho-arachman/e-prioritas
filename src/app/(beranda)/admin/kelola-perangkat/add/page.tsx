"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function TambahPerangkatPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    jabatan: "",
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📦 Data baru:", form);
    alert("Perangkat baru disimpan (dummy mode)");
    router.push("/perangkat");
  };

  return (
    <div className=" p-12 max-w-4xl flex flex-col items-start">
      <h1 className="text-4xl font-bold mb-3">Tambah Perangkat</h1>
      <p className="text-muted-foreground mb-6 max-w-xl">
        Silakan isi form berikut untuk menambahkan perangkat baru. Pastikan
        semua data valid.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-2">
        {/* Nama */}
        <div className="flex flex-col gap-2">
          <Label className="text-xl font-semibold">Nama</Label>
          <p className="text-sm text-muted-foreground">
            Masukkan nama perangkat
          </p>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Contoh: Ridho"
            className="text-lg"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label className="text-xl font-semibold">Email</Label>
          <p className="text-sm text-muted-foreground">Email aktif perangkat</p>
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Contoh: ridho@mail.com"
            className="text-lg"
          />
        </div>

        {/* Jabatan */}
        <div className="flex flex-col gap-2">
          <Label className="text-xl font-semibold">Jabatan</Label>
          <p className="text-sm text-muted-foreground">Jabatan perangkat</p>
          <Input
            value={form.jabatan}
            onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
            placeholder="Contoh: Kades"
            className="text-lg"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <Switch
            checked={form.isActive}
            onCheckedChange={(v) => setForm({ ...form, isActive: v })}
          />
          <Label>{form.isActive ? "Aktif" : "Nonaktif"}</Label>
        </div>

        {/* Separator */}
        <Separator />

        {/* Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
}

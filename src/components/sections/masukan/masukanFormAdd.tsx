// components/sections/masukan/MasukanWargaFormAdd.tsx
"use client";

import { DomainIsu } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useGet } from "@/hooks/useApi";
import { createMasukanWargaFormSchema } from "@/schema/masukanWarga";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle,
  ImagePlus,
  Loader2,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { notifier } from "../../../lib/ToastNotifier";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type FormValues = z.infer<typeof createMasukanWargaFormSchema>;

export default function MasukanWargaFormAdd() {
  const router = useRouter();
  const { data, isLoading: domainLoading } = useGet("/kategori");
  const domainIsu = data?.data ?? [];

  // State alur
  const [step, setStep] = useState<"cek" | "daftar" | "masukan">("cek");
  const [noHp, setNoHp] = useState("");
  const [wargaId, setWargaId] = useState<string | null>(null);
  const [namaWarga, setNamaWarga] = useState("");
  const [alamatWarga, setAlamatWarga] = useState("");
  const [statusVerifikasi, setStatusVerifikasi] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // State gambar
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daftarForm = useForm<{ nama: string; alamat?: string }>({
    defaultValues: { nama: "", alamat: "" },
  });

  const masukanForm = useForm<FormValues>({
    resolver: zodResolver(createMasukanWargaFormSchema),
    defaultValues: {
      nama: "",
      noHp: "",
      alamat: "",
      judul: "",
      lokasi: "",
      deskripsi: "",
      domainIsuId: "",
    },
  });

  // Step 1: Cek nomor HP
  const handleCekNoHp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nomor = formData.get("noHp") as string;
    if (!nomor) {
      notifier.error("Nomor HP harus diisi");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/warga/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noHp: nomor }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (result.exists && result.statusNoHp === "TERVERIFIKASI") {
        // Sudah terverifikasi
        setNoHp(nomor);
        setWargaId(result.wargaId);
        setNamaWarga(result.nama);
        setAlamatWarga(result.alamat || "");
        setStatusVerifikasi("TERVERIFIKASI");
        masukanForm.setValue("nama", result.nama);
        masukanForm.setValue("noHp", nomor);
        masukanForm.setValue("alamat", result.alamat || "");
        setStep("masukan");
        notifier.success("Terverifikasi", "Silakan isi masukan Anda.");
      } else if (result.exists && result.statusNoHp !== "TERVERIFIKASI") {
        setNoHp(nomor);
        setWargaId(result.wargaId);
        setNamaWarga(result.nama);
        setAlamatWarga(result.alamat || "");
        setStatusVerifikasi(result.statusNoHp);
        daftarForm.setValue("nama", result.nama);
        daftarForm.setValue("alamat", result.alamat || "");
        setStep("daftar");
        notifier.info(
          "Belum Terverifikasi",
          "Silakan verifikasi nomor HP Anda.",
        );
      } else {
        setNoHp(nomor);
        setWargaId(null);
        setNamaWarga("");
        setAlamatWarga("");
        setStatusVerifikasi(null);
        daftarForm.reset({ nama: "", alamat: "" });
        setStep("daftar");
      }
    } catch (err: any) {
      notifier.error("Gagal", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Daftar dan kirim verifikasi
  const handleKirimVerifikasi = async (data: {
    nama: string;
    alamat?: string;
  }) => {
    setIsLoading(true);
    try {
      let targetWargaId = wargaId;
      if (!targetWargaId) {
        const wargaRes = await fetch("/api/warga/check-or-create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            noHp,
            nama: data.nama,
            alamat: data.alamat || "",
          }),
        });
        const wargaResult = await wargaRes.json();
        if (!wargaRes.ok) throw new Error(wargaResult.error);
        targetWargaId = wargaResult.wargaId;
        setWargaId(targetWargaId);
        setNamaWarga(data.nama);
        setAlamatWarga(data.alamat || "");
      }
      const linkRes = await fetch("/api/warga/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wargaId: targetWargaId }),
      });
      const linkData = await linkRes.json();
      if (!linkRes.ok) throw new Error(linkData.error);
      notifier.success("Link Verifikasi Dikirim", "Cek WhatsApp Anda.");
    } catch (err: any) {
      notifier.error("Gagal", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!wargaId) return;
    setIsResending(true);
    try {
      const linkRes = await fetch("/api/masukan-warga/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wargaId }),
      });
      const linkData = await linkRes.json();
      if (!linkRes.ok) throw new Error(linkData.error);
      notifier.success("Link Dikirim Ulang", "Cek WhatsApp Anda.");
    } catch (err: any) {
      notifier.error("Gagal", err.message);
    } finally {
      setIsResending(false);
    }
  };

  const handleCekStatusSetelahDaftar = async () => {
    if (!noHp) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/warga/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noHp }),
      });
      const result = await res.json();
      if (result.statusNoHp === "TERVERIFIKASI") {
        setStatusVerifikasi("TERVERIFIKASI");
        setWargaId(result.wargaId);
        setNamaWarga(result.nama);
        setAlamatWarga(result.alamat || "");
        masukanForm.setValue("nama", result.nama);
        masukanForm.setValue("noHp", noHp);
        masukanForm.setValue("alamat", result.alamat || "");
        setStep("masukan");
        notifier.success("Terverifikasi", "Silakan isi masukan Anda.");
      } else {
        notifier.info(
          "Belum Verifikasi",
          "Silakan klik link di WhatsApp Anda.",
        );
      }
    } catch (err: any) {
      notifier.error("Gagal", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Kirim masukan
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      notifier.error("Maksimal 5 gambar");
      return;
    }
    const valid = files.filter((f) => f.type.startsWith("image/"));
    valid.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, file]);
        setImagePreviews((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmitMasukan = async (data: FormValues) => {
    if (!wargaId) {
      notifier.error("Gagal", "Data warga tidak valid");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("wargaId", wargaId);
      formData.append("judul", data.judul);
      formData.append("deskripsi", data.deskripsi);
      formData.append("lokasi", data.lokasi);
      formData.append("domainIsuId", data.domainIsuId);
      images.forEach((img) => formData.append("images", img));

      const submitRes = await fetch("/api/masukan-warga", {
        method: "POST",
        body: formData,
      });
      const submitResult = await submitRes.json();
      if (!submitRes.ok)
        throw new Error(submitResult.message || "Gagal menyimpan masukan");
      notifier.success("Berhasil", "Masukan Anda telah dikirim");
      // Reset
      setStep("cek");
      setNoHp("");
      setWargaId(null);
      setNamaWarga("");
      setAlamatWarga("");
      setImages([]);
      setImagePreviews([]);
      daftarForm.reset();
      masukanForm.reset();
      router.refresh();
    } catch (err: any) {
      notifier.error("Gagal", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step 1
  if (step === "cek") {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-center mb-4">
          Verifikasi Nomor HP
        </h2>
        <form onSubmit={handleCekNoHp} className="space-y-4">
          <div>
            <Label>Nomor HP *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                name="noHp"
                className="pl-9"
                placeholder="08123456789"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Cek & Lanjutkan
          </Button>
        </form>
      </div>
    );
  }

  // Render step 2
  if (step === "daftar") {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Lengkapi Data & Verifikasi
        </h2>
        <form
          onSubmit={daftarForm.handleSubmit(handleKirimVerifikasi)}
          className="space-y-4"
        >
          <div>
            <Label>Nama Lengkap *</Label>
            <Input {...daftarForm.register("nama")} disabled={isLoading} />
          </div>
          <div>
            <Label>Alamat (opsional)</Label>
            <Textarea
              {...daftarForm.register("alamat")}
              rows={2}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Daftar & Kirim Verifikasi
            </Button>
            {wargaId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendVerification}
                disabled={isResending}
              >
                {isResending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          {wargaId && (
            <Button
              type="button"
              variant="link"
              onClick={handleCekStatusSetelahDaftar}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sudah verifikasi? Cek status sekarang"
              )}
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep("cek")}
            className="w-full"
          >
            Ganti Nomor HP
          </Button>
        </form>
      </div>
    );
  }

  // Render step 3 (masukan)
  if (step === "masukan" && domainLoading) {
    return (
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={masukanForm.handleSubmit(onSubmitMasukan)}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl"
    >
      <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800 flex justify-between items-center">
        <span>
          ✅ Terverifikasi sebagai: <strong>{namaWarga}</strong> ({noHp})
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setStep("cek")}
        >
          Ganti Nomor
        </Button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        Form Masukan Warga
      </h2>

      <div className="grid gap-4">
        {/* Readonly fields */}
        <div>
          <Label>Nama Lengkap</Label>
          <Input value={namaWarga} disabled className="bg-gray-50" />
        </div>
        <div>
          <Label>Nomor HP</Label>
          <Input value={noHp} disabled className="bg-gray-50" />
        </div>
        <div>
          <Label>Alamat</Label>
          <Textarea
            value={alamatWarga}
            disabled
            className="bg-gray-50"
            rows={2}
          />
        </div>

        {/* Masukan fields */}
        <Controller
          name="judul"
          control={masukanForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Judul Masukan *</FieldLabel>
              <Input
                {...field}
                placeholder="Contoh: Perbaikan lampu jalan"
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="lokasi"
          control={masukanForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Lokasi (RT/RW atau alamat) *</FieldLabel>
              <Input
                {...field}
                placeholder="RT 003 RW 001"
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="deskripsi"
          control={masukanForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Deskripsi *</FieldLabel>
              <Textarea
                {...field}
                rows={4}
                placeholder="Tulis masukan Anda..."
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div suppressHydrationWarning>
          <Controller
            name="domainIsuId"
            control={masukanForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Kategori *</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting || domainLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kategori</SelectLabel>
                      {domainIsu.map((item: DomainIsu) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Gambar */}
        <div>
          <FieldLabel>Lampiran Gambar (maks 5)</FieldLabel>
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((src, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 border rounded overflow-hidden"
              >
                <img src={src} className="w-full h-full object-cover" />
                {!isSubmitting && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            {images.length < 5 && !isSubmitting && (
              <label className="w-20 h-20 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer">
                <ImagePlus className="h-6 w-6 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Format: JPG, PNG. Maksimal 5MB per file.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep("cek")}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Ganti Nomor
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Kirim Masukan
        </Button>
      </div>
    </form>
  );
}

// components/sections/masukan/masukanFormAdd.tsx
"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { notifier } from "../../../lib/ToastNotifier";
import { createMasukanWargaFormSchema } from "@/schema/masukanWarga";
import { useGet } from "@/hooks/useApi";
import { DomainIsu } from "@/app/generated/prisma";
import { useState, useEffect, useMemo } from "react";
import { ImagePlus, X, Loader2, Send, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "../../ui/select";
import {
  MessageSquare,
  MapPin,
  User,
  ClipboardList,
  Phone,
  Heading,
} from "lucide-react";
import { useFormPersist } from "@/hooks/useFormPersist";
import { useMasukanDraftStore } from "@/stores/masukanFormAddDraft";
import { Skeleton } from "@/components/ui/skeleton";

// Helper generate UUID (fallback untuk browser lama)
const generateTrackingId = (): string => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  // fallback sederhana
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export default function MasukanWargaFormAdd() {
  const { data, isLoading: domainLoading } = useGet("/kategori");
  const domainIsu = data?.data ?? [];

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempData, setTempData] = useState<FormData | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [hasSyncedDraft, setHasSyncedDraft] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: draft,
    updateDraft,
    clearDraft,
    isHydrated,
  } = useMasukanDraftStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof createMasukanWargaFormSchema>>({
    resolver: zodResolver(createMasukanWargaFormSchema),
    defaultValues: {
      namaPengirim: "",
      nomorHp: "",
      judul: "",
      lokasiRt: "",
      lokasiRw: "",
      deskripsi: "",
      domainIsuId: "",
    },
  });

  // Sync draft ke form (hanya sekali setelah mount dan hydrated)
  useEffect(() => {
    if (!isMounted || hasSyncedDraft) return;
    if (isHydrated && draft) {
      const hasDraft =
        draft.namaPengirim ||
        draft.judul ||
        draft.deskripsi ||
        draft.imagePreview;
      if (hasDraft) {
        if (draft.namaPengirim)
          form.setValue("namaPengirim", draft.namaPengirim);
        if (draft.nomorHp) form.setValue("nomorHp", draft.nomorHp);
        if (draft.judul) form.setValue("judul", draft.judul);
        if (draft.lokasiRt) form.setValue("lokasiRt", draft.lokasiRt);
        if (draft.lokasiRw) form.setValue("lokasiRw", draft.lokasiRw);
        if (draft.deskripsi) form.setValue("deskripsi", draft.deskripsi);
        if (draft.domainIsuId) form.setValue("domainIsuId", draft.domainIsuId);
        if (draft.imagePreview) setImagePreviews([draft.imagePreview]);
        if (draft.trackingId) setTrackingId(draft.trackingId);
        setHasSyncedDraft(true);
        notifier.info("Draft Dimuat", "Data draft sebelumnya telah dimuat");
      }

      // Restore status pending WhatsApp
      if (draft.pendingWhatsApp && draft.whatsappLink) {
        setShowConfirm(true);
        setWhatsappLink(draft.whatsappLink);
        setHasSyncedDraft(true);
        rebuildTempData();
      }
    }
  }, [isMounted, isHydrated, draft, form, hasSyncedDraft]);

  // Auto-save dengan useFormPersist
  useFormPersist(
    form.watch,
    (safeData) => {
      if (!isMounted) return;
      updateDraft({
        ...safeData,
        imagePreview: imagePreviews[0] || null,
        imageFileName: images[0]?.name,
        imageSize: images[0]?.size,
        trackingId: trackingId,
      });
    },
    {
      skipFields: [],
      waitTime: 800,
      isActive: !isSubmitting && isMounted,
    },
  );

  // Fungsi untuk membuat FormData dari state saat ini (dipanggil saat perlu)
  const rebuildTempData = () => {
    const fd = new FormData();
    const values = form.getValues();
    fd.append("judul", values.judul);
    fd.append("deskripsi", values.deskripsi);
    fd.append("lokasiRt", values.lokasiRt);
    fd.append("lokasiRw", values.lokasiRw);
    fd.append("domainIsuId", values.domainIsuId);
    if (values.namaPengirim) fd.append("namaPengirim", values.namaPengirim);
    if (values.nomorHp) fd.append("nomorHp", values.nomorHp);
    images.forEach((file) => fd.append("images", file));
    if (trackingId) fd.append("trackingId", trackingId);
    setTempData(fd);
  };

  // Update store ketika images berubah
  useEffect(() => {
    if (images.length > 0 && imagePreviews[0]) {
      updateDraft({
        imagePreview: imagePreviews[0],
        imageFileName: images[0].name,
        imageSize: images[0].size,
      });
    } else {
      updateDraft({
        imagePreview: null,
        imageFileName: undefined,
        imageSize: undefined,
      });
    }
  }, [images, imagePreviews, updateDraft]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      notifier.error("Batas maksimal 5 gambar");
      e.target.value = "";
      return;
    }
    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      notifier.error("Hanya file gambar yang diperbolehkan");
      e.target.value = "";
      return;
    }
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImages((prev) => [...prev, file]);
        setImagePreviews((prev) => [...prev, dataUrl]);
      };
      reader.onerror = () => notifier.error(`Gagal membaca file ${file.name}`);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Langkah 1: Buka WhatsApp dan simpan draft
  const handleOpenWhatsApp = async (
    data: z.infer<typeof createMasukanWargaFormSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      // Generate tracking ID jika belum ada
      const newTrackingId = trackingId || generateTrackingId();
      if (!trackingId) setTrackingId(newTrackingId);

      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("deskripsi", data.deskripsi);
      formData.append("lokasiRt", data.lokasiRt);
      formData.append("lokasiRw", data.lokasiRw);
      formData.append("domainIsuId", data.domainIsuId);
      if (data.namaPengirim) formData.append("namaPengirim", data.namaPengirim);
      if (data.nomorHp) formData.append("nomorHp", data.nomorHp);
      images.forEach((file) => formData.append("images", file));
      formData.append("trackingId", newTrackingId);

      setTempData(formData);

      // Simpan draft + status pending
      updateDraft({
        ...data,
        imagePreview: imagePreviews[0] || null,
        imageFileName: images[0]?.name,
        imageSize: images[0]?.size,
        pendingWhatsApp: true,
        trackingId: newTrackingId,
      });

      const response = await fetch(
        "/api/masukan-warga/generate-whatsapp-link",
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await response.json();
      if (response.ok && result.data?.whatsappLink) {
        const link = result.data.whatsappLink;
        setWhatsappLink(link);
        setShowConfirm(true);
        updateDraft({ whatsappLink: link });
        window.open(link, "_blank");
        notifier.info(
          "Buka WhatsApp",
          "Kirim pesan konfirmasi ke perangkat desa, lalu klik 'Saya sudah kirim' untuk menyimpan masukan.",
        );
      } else {
        notifier.error("Gagal", result.message);
      }
    } catch (error) {
      console.error(error);
      notifier.error("Gagal", "Terjadi kesalahan saat membuat link WhatsApp");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Langkah 2: Submit ke server
  const handleFinalSubmit = async () => {
    if (!tempData) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/masukan-warga", {
        method: "POST",
        body: tempData,
      });
      const result = await response.json();
      if (response.ok) {
        notifier.success("Berhasil", result.message);
        clearDraft(); // hapus draft
        form.reset();
        setImages([]);
        setImagePreviews([]);
        setTempData(null);
        setShowConfirm(false);
        setWhatsappLink(null);
        setTrackingId(null);
      } else {
        notifier.error("Gagal", result.message);
      }
    } catch (error) {
      console.error(error);
      notifier.error("Gagal", "Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearDraft();
    setTempData(null);
    setShowConfirm(false);
    setWhatsappLink(null);
    setTrackingId(null);
    form.reset();
    setImages([]);
    setImagePreviews([]);
  };

  const hasDraft = useMemo(() => {
    if (!draft || !isMounted) return false;
    return !!(
      draft.namaPengirim ||
      draft.judul ||
      draft.deskripsi ||
      draft.imagePreview
    );
  }, [draft, isMounted]);

  // Skeleton loading saat hydrating
  if (!isMounted || !isHydrated) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-2xl">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  // JSX utama (sama seperti sebelumnya, dengan penambahan indikator draft)
  return (
    <form className="space-y-6 bg-white p-6 rounded-2xl">
      {hasDraft && isHydrated && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          ⚡ Draft tersimpan. Data tidak akan hilang saat halaman direfresh.
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        Form Masukan Warga
      </h2>

      <div className="grid gap-4">
        {/* Nama */}
        <Controller
          control={form.control}
          name="namaPengirim"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Nama Lengkap
                {draft?.namaPengirim && isHydrated && (
                  <span className="text-green-600 text-xs ml-1">• Draft</span>
                )}
              </FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  className="pl-9"
                  placeholder="Masukkan nama lengkap"
                  disabled={isSubmitting || showConfirm}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Nomor HP */}
        <Controller
          control={form.control}
          name="nomorHp"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nomor HP</FieldLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  type="tel"
                  placeholder="081234567890"
                  className="pl-9"
                  disabled={isSubmitting || showConfirm}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Judul */}
        <Controller
          control={form.control}
          name="judul"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Judul Masukan</FieldLabel>
              <div className="relative">
                <Heading className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...field}
                  placeholder="Contoh: Perbaikan lampu jalan"
                  className="pl-9"
                  disabled={isSubmitting || showConfirm}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* RT & RW */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="lokasiRt"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>RT</FieldLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...field}
                    placeholder="003"
                    className="pl-9"
                    disabled={isSubmitting || showConfirm}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="lokasiRw"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>RW</FieldLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...field}
                    placeholder="001"
                    className="pl-9"
                    disabled={isSubmitting || showConfirm}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Deskripsi */}
        <Controller
          control={form.control}
          name="deskripsi"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Deskripsi Masukan</FieldLabel>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Tulis masukan atau saran Anda secara lengkap..."
                  className="pl-9"
                  disabled={isSubmitting || showConfirm}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Domain Isu */}
        <div suppressHydrationWarning>
          <Controller
            control={form.control}
            name="domainIsuId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Kategori Masukan</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting || domainLoading || showConfirm}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori masukan" />
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

        {/* Upload Gambar */}
        <div>
          <FieldLabel>Lampiran Gambar (Maksimal 5)</FieldLabel>
          <div className="mt-2 flex flex-wrap gap-4">
            {imagePreviews.map((src, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 rounded-lg overflow-hidden border"
              >
                <img
                  src={src}
                  alt={`preview ${idx}`}
                  className="w-full h-full object-cover"
                />
                {!showConfirm && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            {images.length < 5 && !showConfirm && (
              <label className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <ImagePlus className="h-8 w-8 text-gray-400" />
                <span className="text-xs text-gray-500">Tambah</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting || showConfirm}
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Format: JPG, PNG, GIF. Ukuran maksimal 5MB per file.
          </p>
          {draft?.imagePreview && isHydrated && !imagePreviews.length && (
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ Gambar draft tersimpan sebagai preview. Pilih ulang file gambar
              sebelum submit untuk memastikan upload.
            </p>
          )}
        </div>
      </div>

      {!showConfirm ? (
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              clearDraft();
              form.reset();
              setImages([]);
              setImagePreviews([]);
              setTrackingId(null);
            }}
            disabled={isSubmitting}
          >
            Reset & Hapus Draft
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit(handleOpenWhatsApp)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </div>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim & Buka WhatsApp
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4 pt-4 border-t">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Penting:</strong> Anda harus mengirim pesan WhatsApp yang
              sudah terbuka. Setelah mengirim, klik tombol di bawah untuk
              menyimpan masukan. Masukan <strong>tidak akan tersimpan</strong>{" "}
              sebelum Anda menekan tombol ini.
            </p>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Buka WhatsApp lagi jika perlu
              </a>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </div>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Saya sudah kirim, simpan sekarang
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

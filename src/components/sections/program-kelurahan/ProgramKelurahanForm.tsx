// components/sections/program-kelurahan/ProgramKelurahanForm.tsx
"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DomainIsu, StatusProgram } from "@/app/generated/prisma";
import { useGet, usePost, usePut } from "@/hooks/useApi";
import { notifier } from "@/lib/ToastNotifier";

interface ProgramKelurahanFormProps {
  role: "admin" | "lurah" | "perangkat";
  id?: string;
}

interface FormState {
  judul: string;
  deskripsi: string;
  status: StatusProgram;
  tanggalMulai: string;
  tanggalSelesai: string;
  pic: string;
  domainIsuId: string;
  lokasi: string;
}

const initialForm: FormState = {
  judul: "",
  deskripsi: "",
  status: StatusProgram.BERJALAN,
  tanggalMulai: "",
  tanggalSelesai: "",
  pic: "",
  domainIsuId: "",
  lokasi: "",
};

export default function ProgramKelurahanForm({
  role,
  id,
}: ProgramKelurahanFormProps) {
  const router = useRouter();
  const isEdit = !!id;
  const basePath = `/${role}/program-kelurahan`;

  // Check if user has permission to access this form
  const hasPermission = role === "admin" || role === "lurah";

  useEffect(() => {
    if (!hasPermission) {
      router.push(basePath);
    }
  }, [hasPermission, basePath, router]);

  if (!hasPermission) {
    return null;
  }

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState | "status", string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: existingData, isLoading: isLoadingData } = useGet(
    isEdit ? `/protected/program-kelurahan/${id}` : "",
  );

  const { post, loading: createLoading } = usePost(
    "/protected/program-kelurahan",
  );
  const { put, loading: updateLoading } = usePut(
    isEdit ? `/protected/program-kelurahan/${id}` : "",
  );

  const isSubmitting = createLoading || updateLoading;
  const { data: domainIsuOptions } = useGet("/protected/kategori");

  useEffect(() => {
    if (existingData) {
      setForm({
        judul: existingData.judul || "",
        deskripsi: existingData.deskripsi || "",
        status: existingData.status || StatusProgram.BERJALAN,
        tanggalMulai: existingData.tanggalMulai
          ? new Date(existingData.tanggalMulai).toISOString().split("T")[0]
          : "",
        tanggalSelesai: existingData.tanggalSelesai
          ? new Date(existingData.tanggalSelesai).toISOString().split("T")[0]
          : "",
        pic: existingData.pic || "",
        domainIsuId: existingData.domainIsuId || "",
        lokasi: existingData.lokasi || "",
      });
    }
  }, [existingData]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState | "status", string>> = {};

    if (!form.judul.trim()) {
      newErrors.judul = "Judul wajib diisi";
    } else if (form.judul.length > 255) {
      newErrors.judul = "Judul maksimal 255 karakter";
    }

    if (!form.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi wajib diisi";
    }

    if (!form.pic.trim()) {
      newErrors.pic = "PIC wajib diisi";
    } else if (form.pic.length > 100) {
      newErrors.pic = "PIC maksimal 100 karakter";
    }

    if (!form.domainIsuId.trim()) {
      newErrors.domainIsuId = "Domain Isu wajib diisi";
    }

    if (form.lokasi && form.lokasi.length > 255) {
      newErrors.lokasi = "Lokasi maksimal 255 karakter";
    }

    // Check if tanggalMulai is after tanggalSelesai
    if (form.tanggalMulai && form.tanggalSelesai) {
      if (new Date(form.tanggalMulai) > new Date(form.tanggalSelesai)) {
        newErrors.tanggalMulai = "Tanggal mulai tidak boleh setelah tanggal selesai";
      }
    }

    // Validate based on status
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (form.status === StatusProgram.BERJALAN && form.tanggalMulai) {
      const tanggalMulai = new Date(form.tanggalMulai);
      tanggalMulai.setHours(0, 0, 0, 0);
      if (tanggalMulai > today) {
        newErrors.tanggalMulai = "Tanggal mulai tidak boleh lewat hari ini untuk status berjalan";
      }
    }

    if (form.status === StatusProgram.SELESAI && form.tanggalSelesai) {
      const tanggalSelesai = new Date(form.tanggalSelesai);
      tanggalSelesai.setHours(0, 0, 0, 0);
      if (tanggalSelesai > today) {
        newErrors.tanggalSelesai = "Tanggal selesai tidak boleh lewat hari ini untuk status selesai";
      }
    }



    if (form.status === StatusProgram.DITUNDA && form.tanggalMulai) {
      const tanggalMulai = new Date(form.tanggalMulai);
      tanggalMulai.setHours(0, 0, 0, 0);
      if (tanggalMulai < today) {
        newErrors.tanggalMulai = "Tanggal mulai tidak boleh sebelum hari ini untuk status ditunda";
      }
    }

    if (form.status === StatusProgram.BERJALAN && form.tanggalSelesai) {
      const tanggalSelesai = new Date(form.tanggalSelesai);
      tanggalSelesai.setHours(0, 0, 0, 0);
      if (tanggalSelesai < today) {
        newErrors.status = "Tanggal selesai sudah lewat hari ini, status tidak boleh berjalan";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    try {
      const payload = {
        judul: form.judul,
        deskripsi: form.deskripsi,
        status: form.status,
        tanggalMulai: form.tanggalMulai || null,
        tanggalSelesai: form.tanggalSelesai || null,
        pic: form.pic,
        domainIsuId: form.domainIsuId,
        lokasi: form.lokasi || null,
      };

      const res = isEdit ? await put(payload) : await post(payload);
      notifier.success(
        "Berhasil",
        res?.message ||
          `Program berhasil ${isEdit ? "diperbarui" : "ditambahkan"}`,
      );
      router.push(basePath);
    } catch (error: any) {
      notifier.error(
        "Gagal",
        error?.response?.data?.message || "Terjadi kesalahan",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isEdit ? "Perbarui Program?" : "Simpan Program?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isEdit
                ? "Perubahan akan disimpan ke database. Tindakan ini dapat diubah kembali."
                : "Program baru akan ditambahkan ke database. Pastikan data sudah benar."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>
              {isEdit ? "Perbarui" : "Simpan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {isEdit ? "Edit Program" : "Tambah Program Baru"}
            </h1>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Judul */}
            <div className="space-y-2">
              <Label htmlFor="judul">
                Judul Program <span className="text-red-500">*</span>
              </Label>
              <Input
                id="judul"
                value={form.judul}
                onChange={(e) => handleChange("judul", e.target.value)}
                placeholder="Masukkan judul program"
                className="w-full"
              />
              {errors.judul && (
                <p className="text-sm text-red-500">{errors.judul}</p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label htmlFor="deskripsi">
                Deskripsi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="deskripsi"
                value={form.deskripsi}
                onChange={(e) => handleChange("deskripsi", e.target.value)}
                rows={6}
                placeholder="Jelaskan detail program"
                className="w-full"
              />
              {errors.deskripsi && (
                <p className="text-sm text-red-500">{errors.deskripsi}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(val) => handleChange("status", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={StatusProgram.BERJALAN}>
                      Berjalan
                    </SelectItem>
                    <SelectItem value={StatusProgram.SELESAI}>
                      Selesai
                    </SelectItem>
                    <SelectItem value={StatusProgram.DITUNDA}>
                      Ditunda
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status}</p>
                )}
              </div>

              {/* PIC */}
              <div className="space-y-2">
                <Label htmlFor="pic">
                  Penanggung Jawab (PIC) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pic"
                  value={form.pic}
                  onChange={(e) => handleChange("pic", e.target.value)}
                  placeholder="Nama penanggung jawab"
                />
                {errors.pic && (
                  <p className="text-sm text-red-500">{errors.pic}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Domain Isu */}
              <div className="space-y-2">
                <Label htmlFor="domainIsuId">
                  Domain Isu <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={form.domainIsuId || "none"}
                  onValueChange={(val) =>
                    handleChange("domainIsuId", val === "none" ? "" : val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Pilih Domain Isu</SelectItem>
                    {domainIsuOptions?.map((d: DomainIsu) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.domainIsuId && (
                  <p className="text-sm text-red-500">{errors.domainIsuId}</p>
                )}
              </div>

              {/* Lokasi */}
              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi (opsional)</Label>
                <Input
                  id="lokasi"
                  value={form.lokasi}
                  onChange={(e) => handleChange("lokasi", e.target.value)}
                  placeholder="Contoh: RT 003 / RW 005, atau Jalan Merdeka No 10"
                  maxLength={255}
                />
                {errors.lokasi && (
                  <p className="text-sm text-red-500 mt-1">{errors.lokasi}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Kosongkan jika program mencakup seluruh kelurahan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tanggal Mulai */}
              <div className="space-y-2">
                <Label htmlFor="tanggalMulai">Tanggal Mulai</Label>
                <Input
                  type="date"
                  id="tanggalMulai"
                  value={form.tanggalMulai}
                  onChange={(e) => handleChange("tanggalMulai", e.target.value)}
                />
                {errors.tanggalMulai && (
                  <p className="text-sm text-red-500">{errors.tanggalMulai}</p>
                )}
              </div>
              {/* Tanggal Selesai */}
              <div className="space-y-2">
                <Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
                <Input
                  type="date"
                  id="tanggalSelesai"
                  value={form.tanggalSelesai}
                  onChange={(e) =>
                    handleChange("tanggalSelesai", e.target.value)
                  }
                />
                {errors.tanggalSelesai && (
                  <p className="text-sm text-red-500">{errors.tanggalSelesai}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  CalendarIcon,
  MapPinIcon,
  ArrowLeftIcon,
  SparklesIcon,
  SaveIcon,
  XIcon,
  ClockIcon,
  FileTextIcon,
  TargetIcon,
  UsersIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LightbulbIcon,
  BrainIcon,
  Loader2Icon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// ========================
// ENUM & TIPE
// ========================

export enum DomainIsuOption {
  INFRASTRUKTUR = "1",
  KESEHATAN = "2",
  PENDIDIKAN = "3",
  EKONOMI = "4",
}

const domainIsuOptions = [
  {
    id: "1",
    code: "INFRASTRUKTUR",
    nama: "Infrastruktur",
    deskripsi: "Jalan, jembatan, drainase, fasilitas umum",
  },
  {
    id: "2",
    code: "KESEHATAN",
    nama: "Kesehatan",
    deskripsi: "Posyandu, stunting, sanitasi, layanan kesehatan",
  },
  {
    id: "3",
    code: "PENDIDIKAN",
    nama: "Pendidikan",
    deskripsi: "PAUD, TPA, beasiswa, pelatihan keterampilan",
  },
  {
    id: "4",
    code: "EKONOMI",
    nama: "Ekonomi",
    deskripsi: "UMKM, pasar desa, pelatihan wirausaha",
  },
];

interface FormState {
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  domainIsuId: string;
  enableAI: boolean;
  aiModel: string;
}

const initialForm: FormState = {
  judul: "",
  deskripsi: "",
  tanggal: "",
  waktu: "",
  lokasi: "",
  domainIsuId: "",
  enableAI: true,
  aiModel: "gemini-1.5-pro",
};

interface FormErrors {
  judul?: string;
  deskripsi?: string;
  tanggal?: string;
  waktu?: string;
  lokasi?: string;
}

// ========================
// KOMPONEN UTAMA
// ========================

export default function TambahKegiatanRapat() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    // Clear error when user types
    if (errors[id as keyof FormErrors]) {
      setErrors({ ...errors, [id]: undefined });
    }
  };

  const handleDomainChange = (value: string) => {
    setForm({ ...form, domainIsuId: value });
    if (errors.domainIsuId) {
      setErrors({ ...errors, domainIsuId: undefined });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setForm({ ...form, enableAI: checked });
  };

  const handleAiModelChange = (value: string) => {
    setForm({ ...form, aiModel: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.judul.trim()) {
      newErrors.judul = "Judul kegiatan wajib diisi";
    } else if (form.judul.length < 5) {
      newErrors.judul = "Judul minimal 5 karakter";
    }

    if (!form.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi wajib diisi";
    } else if (form.deskripsi.length < 20) {
      newErrors.deskripsi = "Deskripsi minimal 20 karakter";
    }

    if (!form.tanggal) {
      newErrors.tanggal = "Tanggal wajib dipilih";
    } else {
      const selectedDate = new Date(form.tanggal);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.tanggal = "Tanggal tidak boleh di masa lalu";
      }
    }

    if (!form.waktu) {
      newErrors.waktu = "Waktu wajib dipilih";
    }

    if (!form.lokasi.trim()) {
      newErrors.lokasi = "Lokasi wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Integrasi API sebenarnya
    console.log("Form submitted:", {
      ...form,
      tanggalLengkap: `${form.tanggal}T${form.waktu}`,
    });

    setIsSubmitting(false);
    router.push("/admin/kegiatan-rapat");
  };

  const handleCancel = () => {
    router.back();
  };

  const getTodayDate = () => {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  };

  const selectedDomain = domainIsuOptions.find(
    (d) => d.id === form.domainIsuId,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Tambah Kegiatan
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Buat jadwal kegiatan rapat baru untuk kelurahan
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="mb-8 border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <CardContent className="p-0">
            {/* Form Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Judul */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="judul"
                      className="text-slate-700 font-semibold flex items-center gap-2"
                    >
                      <FileTextIcon className="h-4 w-4 text-blue-600" />
                      Nama Kegiatan *
                    </Label>
                    <Input
                      id="judul"
                      value={form.judul}
                      onChange={handleInputChange}
                      placeholder="Contoh: Musrenbang Kelurahan 2026"
                      className={`bg-white border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12 ${
                        errors.judul
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                    {errors.judul && (
                      <div className="flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircleIcon className="h-4 w-4" />
                        {errors.judul}
                      </div>
                    )}
                    <p className="text-xs text-slate-500">
                      {form.judul.length}/100 karakter
                    </p>
                  </div>

                  {/* Deskripsi */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="deskripsi"
                      className="text-slate-700 font-semibold flex items-center gap-2"
                    >
                      <FileTextIcon className="h-4 w-4 text-blue-600" />
                      Deskripsi Kegiatan *
                    </Label>
                    <Textarea
                      id="deskripsi"
                      value={form.deskripsi}
                      onChange={handleInputChange}
                      placeholder="Jelaskan detail acara, tujuan, dan pihak-pihak yang terlibat..."
                      rows={5}
                      className={`bg-white border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none ${
                        errors.deskripsi
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                    {errors.deskripsi && (
                      <div className="flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircleIcon className="h-4 w-4" />
                        {errors.deskripsi}
                      </div>
                    )}
                    <p className="text-xs text-slate-500">
                      {form.deskripsi.length}/1000 karakter
                    </p>
                  </div>

                  {/* Tanggal & Waktu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="tanggal"
                        className="text-slate-700 font-semibold flex items-center gap-2"
                      >
                        <CalendarIcon className="h-4 w-4 text-blue-600" />
                        Tanggal *
                      </Label>
                      <Input
                        id="tanggal"
                        type="date"
                        value={form.tanggal}
                        onChange={handleInputChange}
                        min={getTodayDate()}
                        className={`bg-white border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12 ${
                          errors.tanggal
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : ""
                        }`}
                      />
                      {errors.tanggal && (
                        <div className="flex items-center gap-1.5 text-sm text-red-600">
                          <AlertCircleIcon className="h-4 w-4" />
                          {errors.tanggal}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="waktu"
                        className="text-slate-700 font-semibold flex items-center gap-2"
                      >
                        <ClockIcon className="h-4 w-4 text-blue-600" />
                        Waktu *
                      </Label>
                      <Input
                        id="waktu"
                        type="time"
                        value={form.waktu}
                        onChange={handleInputChange}
                        className={`bg-white border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12 ${
                          errors.waktu
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : ""
                        }`}
                      />
                      {errors.waktu && (
                        <div className="flex items-center gap-1.5 text-sm text-red-600">
                          <AlertCircleIcon className="h-4 w-4" />
                          {errors.waktu}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lokasi */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="lokasi"
                      className="text-slate-700 font-semibold flex items-center gap-2"
                    >
                      <MapPinIcon className="h-4 w-4 text-blue-600" />
                      Lokasi Kegiatan *
                    </Label>
                    <Input
                      id="lokasi"
                      value={form.lokasi}
                      onChange={handleInputChange}
                      placeholder="Contoh: Aula Kelurahan Panggungjati"
                      className={`bg-white border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-12 ${
                        errors.lokasi
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                    {errors.lokasi && (
                      <div className="flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircleIcon className="h-4 w-4" />
                        {errors.lokasi}
                      </div>
                    )}
                  </div>

                  {/* Domain Isu */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="domainIsuId"
                      className="text-slate-700 font-semibold flex items-center gap-2"
                    >
                      <TargetIcon className="h-4 w-4 text-blue-600" />
                      Domain Isu
                    </Label>
                    <Select
                      value={form.domainIsuId}
                      onValueChange={handleDomainChange}
                    >
                      <SelectTrigger className="bg-white border-slate-200 rounded-xl text-slate-700 h-12">
                        <SelectValue placeholder="Pilih domain isu (opsional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200">
                        {domainIsuOptions.map((d) => (
                          <SelectItem
                            key={d.id}
                            value={d.id}
                            className="text-slate-700 focus:bg-slate-50"
                          >
                            {d.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDomain && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                        <LightbulbIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">
                          {selectedDomain.deskripsi}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* AI Options Card */}
                  <Card className="border-0 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <BrainIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            AI Assistant
                          </h3>
                          <p className="text-xs text-slate-500">
                            Generate rekomendasi otomatis
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-slate-700">
                            Enable AI
                          </p>
                          <p className="text-xs text-slate-500">
                            Proses dengan Gemini AI
                          </p>
                        </div>
                        <Switch
                          checked={form.enableAI}
                          onCheckedChange={handleSwitchChange}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      {form.enableAI && (
                        <div className="space-y-2 pt-2 border-t border-purple-100">
                          <Label className="text-xs text-slate-600 font-medium">
                            AI Model
                          </Label>
                          <Select
                            value={form.aiModel}
                            onValueChange={handleAiModelChange}
                          >
                            <SelectTrigger className="bg-white border-purple-200 rounded-lg text-slate-700 h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-purple-200">
                              <SelectItem
                                value="gemini-1.5-pro"
                                className="text-slate-700 focus:bg-purple-50"
                              >
                                Gemini 1.5 Pro
                              </SelectItem>
                              <SelectItem
                                value="gemini-1.5-flash"
                                className="text-slate-700 focus:bg-purple-50"
                              >
                                Gemini 1.5 Flash
                              </SelectItem>
                              <SelectItem
                                value="gemini-2.0"
                                className="text-slate-700 focus:bg-purple-50"
                              >
                                Gemini 2.0 (Experimental)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-1.5 text-xs text-purple-600">
                            <SparklesIcon className="h-3 w-3" />
                            <span>Rekomendasi akan digenerate otomatis</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Preview Card */}
                  <Card className="border-0 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-slate-400 to-slate-600" />
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-500/30">
                          <CheckCircleIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            Preview
                          </h3>
                          <p className="text-xs text-slate-500">
                            Ringkasan kegiatan
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                            Judul
                          </p>
                          <p className="text-sm font-medium text-slate-800 line-clamp-2">
                            {form.judul || "—"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {form.tanggal && form.waktu
                              ? `${format(new Date(form.tanggal), "dd MMM yyyy", { locale: id })} ${form.waktu} WIB`
                              : "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-sm text-slate-600 line-clamp-1">
                            {form.lokasi || "—"}
                          </span>
                        </div>
                        {selectedDomain && (
                          <div className="flex items-center gap-2">
                            <TargetIcon className="h-3.5 w-3.5 text-slate-400" />
                            <Badge
                              variant="outline"
                              className="bg-slate-100 text-slate-700 border-slate-200 text-xs"
                            >
                              {selectedDomain.nama}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Info Card */}
                  <Card className="border-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-400" />
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircleIcon className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <h3 className="font-semibold text-slate-800 text-sm">
                            Informasi
                          </h3>
                          <ul className="text-xs text-slate-600 space-y-1.5">
                            <li className="flex items-start gap-1.5">
                              <span className="text-amber-500">•</span>
                              <span>
                                Kegiatan akan muncul di dashboard publik
                              </span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="text-amber-500">•</span>
                              <span>
                                AI akan memproses setelah kegiatan disimpan
                              </span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="text-amber-500">•</span>
                              <span>Anda dapat mengedit kapan saja</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-6 sm:px-8 py-5 bg-slate-50/50 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <UsersIcon className="h-4 w-4" />
                  <span>
                    Dibuat oleh:{" "}
                    <span className="font-medium text-slate-700">
                      Admin Kelurahan
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium"
                  >
                    <XIcon className="h-4 w-4" />
                    Batal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                    disabled={isSubmitting}
                    className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    {showPreview ? "Tutup Preview" : "Lihat Preview"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl font-medium px-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <SaveIcon className="h-4 w-4" />
                        Simpan Kegiatan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">
                    Preview Kegiatan
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {form.judul || "(Belum ada judul)"}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {form.tanggal && form.waktu
                            ? `${format(new Date(form.tanggal), "EEEE, dd MMMM yyyy", { locale: id })} ${form.waktu} WIB`
                            : "(Tanggal belum dipilih)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{form.lokasi || "(Lokasi belum diisi)"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Deskripsi
                    </h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {form.deskripsi || "(Belum ada deskripsi)"}
                    </p>
                  </div>

                  {selectedDomain && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        Domain Isu
                      </h4>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {selectedDomain.nama}
                      </Badge>
                    </div>
                  )}

                  {form.enableAI && (
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <SparklesIcon className="h-4 w-4 text-purple-600" />
                        <h4 className="text-sm font-semibold text-purple-800">
                          AI Processing
                        </h4>
                      </div>
                      <p className="text-sm text-purple-700">
                        Model:{" "}
                        <span className="font-medium">{form.aiModel}</span>
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        Rekomendasi akan digenerate otomatis setelah kegiatan
                        disimpan
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(false)}
                    className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl"
                  >
                    {isSubmitting ? "Menyimpan..." : "Konfirmasi & Simpan"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

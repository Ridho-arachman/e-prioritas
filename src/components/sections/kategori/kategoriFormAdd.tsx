"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { notifier } from "../../../lib/ToastNotifier";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { kategoriSchema } from "@/schema/kategoriSchema";
import { Field, FieldError } from "@/components/ui/field";
import { Spinner } from "../../ui/spinner";
import { usePost } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { useKategoriDraftStore } from "@/stores/kategoriFormAddDraft";
import { useFormPersist } from "@/hooks/useFormPersist";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tag, FileText, Hash, Save, RotateCcw, ArrowLeft } from "lucide-react";

// Skeleton untuk loading state
const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export function KategoriFormAdd() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [hasSyncedDraft, setHasSyncedDraft] = useState(false);

  const {
    data: draft,
    updateDraft,
    clearDraft,
    isHydrated,
  } = useKategoriDraftStore();

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultValues = useMemo(
    () => ({
      code: "",
      nama: "",
      deskripsi: "",
    }),
    [],
  );

  const form = useForm<z.infer<typeof kategoriSchema>>({
    resolver: zodResolver(kategoriSchema),
    defaultValues,
  });

  // Form persistence hook
  const watchFormData = form.watch();

  useEffect(() => {
    if (!isClient) return;

    const timeoutId = setTimeout(() => {
      const currentData = form.getValues();
      const hasChanges =
        currentData.code !== defaultValues.code ||
        currentData.nama !== defaultValues.nama ||
        currentData.deskripsi !== defaultValues.deskripsi;

      if (hasChanges) {
        updateDraft({
          code: currentData.code,
          nama: currentData.nama,
          deskripsi: currentData.deskripsi,
        });
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [watchFormData, isClient, defaultValues, updateDraft]);

  // Sync draft data to form on hydration
  useEffect(() => {
    if (!isClient || !isHydrated || hasSyncedDraft || !draft) return;

    const hasDraftData = draft.code || draft.nama || draft.deskripsi;

    if (hasDraftData) {
      const currentValues = form.getValues();
      const shouldSync =
        currentValues.code === defaultValues.code &&
        currentValues.nama === defaultValues.nama &&
        currentValues.deskripsi === defaultValues.deskripsi;

      if (shouldSync) {
        // Only sync if form is empty
        form.reset({
          code: draft.code || "",
          nama: draft.nama || "",
          deskripsi: draft.deskripsi || "",
        });

        setHasSyncedDraft(true);

        // Show notification only for non-empty drafts
        if (draft.code || draft.nama || draft.deskripsi) {
          notifier.info("Draft Dimuat", "Data draft sebelumnya telah dimuat");
        }
      }
    }
  }, [isClient, isHydrated, draft, form, defaultValues, hasSyncedDraft]);

  const { post, loading } = usePost("/protected/kategori");

  const handleSubmit = async (data: any) => {
    try {
      const res = await post(data);
      notifier.success(
        "Berhasil",
        res?.message || "Kategori berhasil ditambahkan",
      );
      clearDraft(); // Clear draft after successful submission
      router.push("/admin/kelola-kategori"); // Use push instead of back for better navigation
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Gagal", err?.response?.data?.message);
    }
  };

  // Handler untuk reset dengan clear draft
  const handleReset = useCallback(() => {
    form.reset(defaultValues);
    clearDraft();
    setHasSyncedDraft(false);
    notifier.info("Reset", "Form telah direset dan draft dihapus");
  }, [form, clearDraft, defaultValues]);

  // Handler untuk kembali dengan konfirmasi jika ada draft
  const handleBack = useCallback(() => {
    const currentData = form.getValues();
    const hasUnsavedChanges =
      currentData.code !== defaultValues.code ||
      currentData.nama !== defaultValues.nama ||
      currentData.deskripsi !== defaultValues.deskripsi;

    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        "Anda memiliki perubahan yang belum disimpan. Yakin ingin kembali?",
      );
      if (!confirm) return;
    }

    router.back();
  }, [form, defaultValues, router]);

  const hasDraft = useMemo(() => {
    if (!isClient || !draft) return false;
    return !!(draft.code || draft.nama || draft.deskripsi);
  }, [draft, isClient]);

  // Show skeleton while hydrating on client
  if (isClient && !isHydrated) {
    return (
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl shadow-lg shadow-primary/5 p-4 md:p-6">
      {/* Draft Indicator */}
      {hasDraft && isHydrated && (
        <div className="mb-6 p-4 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium flex items-center gap-2">
              <span>⚡</span> Draft otomatis tersimpan
            </p>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Code Kategori */}
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label
                  htmlFor="code"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  Code Kategori
                  {draft?.code && isHydrated && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Draft
                    </span>
                  )}
                </Label>
                <Input
                  {...field}
                  id="code"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: KAT001, INFRA001..."
                  disabled={loading}
                  className="w-full transition-shadow focus:ring-2 focus:ring-primary/50"
                />
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span>🔤</span> Gunakan format unik untuk kode kategori
                </div>
                {fieldState.invalid && (
                  <FieldError>
                    {fieldState.error?.message || "Wajib diisi"}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Nama Kategori */}
          <Controller
            name="nama"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label
                  htmlFor="nama"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  Nama Kategori
                  {draft?.nama && isHydrated && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Draft
                    </span>
                  )}
                </Label>
                <Input
                  {...field}
                  id="nama"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: Infrastruktur, Kesehatan..."
                  disabled={loading}
                  className="w-full transition-shadow focus:ring-2 focus:ring-primary/50"
                />
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span>🏷️</span> Nama kategori yang akan ditampilkan
                </div>
                {fieldState.invalid && (
                  <FieldError>
                    {fieldState.error?.message || "Wajib diisi"}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Deskripsi */}
          <Controller
            name="deskripsi"
            control={form.control}
            render={({ field, fieldState }) => {
              const charCount = field.value?.length || 0;
              const isOverLimit = charCount >= 500;

              return (
                <Field>
                  <Label
                    htmlFor="deskripsi"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Deskripsi
                    {draft?.deskripsi && isHydrated && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Draft
                      </span>
                    )}
                  </Label>
                  <Textarea
                    {...field}
                    id="deskripsi"
                    placeholder="Tulis deskripsi singkat kategori ini..."
                    aria-invalid={fieldState.invalid || isOverLimit}
                    rows={4}
                    disabled={loading}
                    className={`w-full max-w-150 resize-y min-h-30 transition-shadow focus:ring-2 focus:ring-primary/50 ${
                      isOverLimit ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    maxLength={500}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <span>📝</span> Opsional
                    </span>
                    <span
                      className={
                        isOverLimit
                          ? "text-red-600 font-medium flex items-center gap-1"
                          : "text-muted-foreground"
                      }
                    >
                      {charCount}/500
                    </span>
                  </div>

                  {/* Pesan error dari Zod */}
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}

                  {/* Custom error untuk limit */}
                  {isOverLimit && !fieldState.error && (
                    <FieldError>Maksimal 500 karakter!</FieldError>
                  )}
                </Field>
              );
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="cursor-pointer flex-1 sm:flex-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="cursor-pointer flex-1 sm:flex-none"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner className="mr-2 size-4" />
                Menyimpan...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Kategori
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Footer note */}
      <div className="mt-4 text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/50 pt-4">
        <span className="flex items-center gap-1">
          ⚡ Draft otomatis tersimpan
        </span>
        <span className="flex items-center gap-1">🔤 Kode unik diperlukan</span>
        <span className="flex items-center gap-1">
          📝 Deskripsi maksimal 500 karakter
        </span>
      </div>
    </div>
  );
}

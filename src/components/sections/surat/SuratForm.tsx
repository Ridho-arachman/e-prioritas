"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { FieldArrayPath, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const suratFormSchema = z.object({
  nama: z.string().min(1, "Nama surat wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  ikon: z.string().min(1, "Ikon wajib dipilih"),
  persyaratan: z.array(z.string().min(1)).min(1, "Minimal 1 persyaratan"),
  linkForm: z.string().url("Link Google Form harus valid"),
  isActive: z.boolean(),
});

export type SuratFormValues = z.infer<typeof suratFormSchema>;

const iconOptions = [
  "Heart",
  "MapPin",
  "Briefcase",
  "Home",
  "Users",
  "FileCheck",
  "User",
  "Shield",
  "Building",
  "DollarSign",
  "AlertCircle",
  "FileText",
  "Star",
  "Mail",
];

interface SuratFormProps {
  initialData?: SuratFormValues;
  onSubmit: (data: SuratFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function SuratForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: SuratFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SuratFormValues>({
    resolver: zodResolver(suratFormSchema),
    defaultValues: {
      nama: "",
      deskripsi: "",
      ikon: "",
      persyaratan: [""],
      linkForm: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        persyaratan: initialData.persyaratan?.length
          ? initialData.persyaratan
          : [""],
      });
    }
  }, [initialData, reset]);

  // ✅ Explicitly specify the generic type for useFieldArray
  const { fields, append, remove } = useFieldArray<SuratFormValues>({
    control,
    name: "persyaratan" as FieldArrayPath<SuratFormValues>, // type assertion
  });

  const selectedIcon = watch("ikon");
  const isActive = watch("isActive");

  const submitHandler = async (data: SuratFormValues) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <Label htmlFor="nama">Nama Surat</Label>
        <Input id="nama" {...register("nama")} disabled={isSubmitting} />
        {errors.nama && (
          <p className="text-red-500 text-sm mt-1">{errors.nama.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          rows={3}
          {...register("deskripsi")}
          disabled={isSubmitting}
        />
        {errors.deskripsi && (
          <p className="text-red-500 text-sm mt-1">
            {errors.deskripsi.message}
          </p>
        )}
      </div>

      <div>
        <Label>Ikon</Label>
        <Select
          value={selectedIcon}
          onValueChange={(val) => setValue("ikon", val)}
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih ikon" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((icon) => (
              <SelectItem key={icon} value={icon}>
                {icon}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.ikon && (
          <p className="text-red-500 text-sm mt-1">{errors.ikon.message}</p>
        )}
      </div>

      <div>
        <Label>Link Google Form</Label>
        <Input
          {...register("linkForm")}
          placeholder="https://docs.google.com/..."
          disabled={isSubmitting}
        />
        {errors.linkForm && (
          <p className="text-red-500 text-sm mt-1">{errors.linkForm.message}</p>
        )}
      </div>

      <div>
        <Label>Persyaratan</Label>
        <div className="space-y-2">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`persyaratan.${idx}`)}
                placeholder="Masukkan persyaratan"
                disabled={isSubmitting}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(idx)}
                disabled={isSubmitting || fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-1" /> Tambah Persyaratan
          </Button>
        </div>
        {errors.persyaratan && (
          <p className="text-red-500 text-sm mt-1">
            {errors.persyaratan.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={isActive}
          onCheckedChange={(val) => setValue("isActive", val)}
          disabled={isSubmitting}
        />
        <Label>Aktif</Label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}

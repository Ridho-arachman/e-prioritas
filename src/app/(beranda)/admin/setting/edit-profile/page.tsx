"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  Trash2,
  User,
  Save,
} from "lucide-react";
import { useGet } from "@/hooks/useApi";
import { Controller, useForm } from "react-hook-form";
import { userUpdateNameSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";

import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { notifier } from "@/lib/ToastNotifier";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Helper untuk inisial
const getInitials = (name: string): string => {
  if (!name) return "?";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { data: user, error, isLoading } = useGet("/protected/user/getuser");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const form = useForm<z.infer<typeof userUpdateNameSchema>>({
    resolver: zodResolver(userUpdateNameSchema),
    defaultValues: {
      name: "",
    },
  });

  // Reset form saat user tersedia
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
      });
      // Set preview dari user.image jika ada
      if (user.image) {
        setImagePreview(user.image);
        setIsImageRemoved(false);
      }
    }
  }, [user, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran (5MB)
    if (file.size > 5 * 1024 * 1024) {
      notifier.error("Error", "Ukuran gambar maksimal 5MB");
      return;
    }

    // Validasi tipe
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifier.error("Error", "Format gambar harus JPG, PNG, atau WEBP");
      return;
    }

    setImageFile(file);
    setIsImageRemoved(false);

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setIsImageRemoved(true);
  };

  const onSubmit = async (data: z.infer<typeof userUpdateNameSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (isImageRemoved && !imageFile && user?.image) {
        // Jika gambar dihapus, kirim penanda untuk hapus
        formData.append("removeImage", "true");
      }

      const res = await fetch("/api/auth/change-name", {
        method: "PATCH",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Gagal memperbarui profil");
      }

      notifier.success("Berhasil", "Profil berhasil diperbarui");
      router.back();
    } catch (error) {
      const err = error as Error;
      notifier.error("Gagal", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
        <Card>
          <CardContent className="p-6 space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-32 w-32 rounded-full mx-auto md:mx-0" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-destructive">
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">Terjadi Kesalahan</p>
                <p className="text-sm text-muted-foreground">
                  {error.message || "Gagal memuat data."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
      {/* Tombol Kembali */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm cursor-pointer hover:pl-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </motion.div>

      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl shadow-sm">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Profil Admin
          </h1>
        </div>
        <p className="text-muted-foreground ml-1 text-sm md:text-base">
          Perbarui informasi dasar akun administrator.
        </p>
      </div>

      <Card className="border shadow-lg shadow-primary/5 overflow-hidden">
        <CardContent className="p-4 md:p-6 space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-3 w-full md:w-auto">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage
                      src={imagePreview || undefined}
                      alt={user?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-linear-to-br from-primary to-primary/70 text-white text-4xl font-bold">
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Badge untuk status gambar */}
                  {imageFile && (
                    <Badge className="absolute -bottom-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 shadow-md">
                      Baru
                    </Badge>
                  )}
                  {!imageFile && user?.image && !isImageRemoved && (
                    <Badge
                      variant="outline"
                      className="absolute -bottom-2 -right-2 bg-background text-xs px-2 py-1 shadow-md"
                    >
                      Saat ini
                    </Badge>
                  )}
                </div>

                {/* Tombol upload/hapus */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    className="cursor-pointer"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Ganti
                  </Button>
                  {(imagePreview || user?.image) && !isImageRemoved && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </Button>
                  )}
                </div>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Info kecil */}
                <p className="text-xs text-muted-foreground text-center">
                  Format: JPG, PNG, WEBP • Maks 5MB
                </p>
              </div>

              {/* Form Nama */}
              <div className="flex-1 w-full space-y-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        value={field.value}
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan nama baru"
                        autoComplete="off"
                        className="w-full transition-shadow focus:ring-2 focus:ring-primary/50"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
                className="cursor-pointer w-full sm:w-auto"
              >
                Batal
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spinner className="mr-2 size-4" />
                    Menyimpan...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

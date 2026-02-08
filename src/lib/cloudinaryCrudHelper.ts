/**
 * Helper functions untuk operasi CRUD dengan Cloudinary
 */

import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

// ==================== TYPE DEFINITIONS ====================

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

export interface CloudinaryDeleteResult {
  success: boolean;
  message: string;
}

export interface CloudinaryUpdateResult {
  newUrl: string;
  newPublicId: string;
  oldPublicIdDeleted?: string;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Helper untuk CREATE: Upload gambar ke Cloudinary dengan format standar
 */
export async function createCloudinaryImage(
  fileBuffer: Buffer,
  options?: {
    folder?: string;
    prefix?: string;
    customPublicId?: string;
  },
): Promise<CloudinaryUploadResult> {
  try {
    const folder = options?.folder || "uploads";
    const prefix = options?.prefix || "file";

    // Generate publicId jika tidak disediakan
    const publicId = options?.customPublicId
      ? `${folder}/${options.customPublicId}`
      : generatePublicId(folder, prefix);

    // Upload ke Cloudinary
    const result = await uploadToCloudinary(fileBuffer, folder, publicId);

    return {
      url: result.url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("❌ Error in createCloudinaryImage:", error);
    throw new Error(
      `Gagal upload gambar: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Helper untuk CREATE: Upload gambar profil user
 */
export async function createUserProfileImage(
  fileBuffer: Buffer,
  userIdentifier: string,
  userType: "perangkat" | "admin" | "user" = "user",
): Promise<CloudinaryUploadResult> {
  try {
    const folder = `${userType}-profiles`;
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);

    // Format: perangkat-profiles/perangkat_userId_timestamp_random
    const publicId = `${folder}/${userType}_${userIdentifier}_${timestamp}_${randomString}`;

    const result = await uploadToCloudinary(fileBuffer, folder, publicId);

    console.log(`✅ Gambar profil berhasil diupload: ${result.public_id}`);
    return {
      url: result.url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("❌ Error in createUserProfileImage:", error);
    throw new Error(
      `Gagal upload gambar profil: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Helper untuk UPDATE: Update gambar (upload baru dan hapus lama)
 */
export async function updateCloudinaryImage(
  newImageBuffer: Buffer,
  oldImageUrl: string | null | undefined,
  options?: {
    folder?: string;
    prefix?: string;
    customPublicId?: string;
  },
): Promise<CloudinaryUpdateResult> {
  try {
    let oldPublicIdDeleted: string | undefined;

    // Hapus gambar lama jika ada
    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      try {
        const oldPublicId = extractPublicIdFromUrl(oldImageUrl);
        await deleteFromCloudinary(oldPublicId);
        oldPublicIdDeleted = oldPublicId;
        console.log(`✅ Gambar lama berhasil dihapus: ${oldPublicId}`);
      } catch (deleteError) {
        console.warn(`⚠️ Gagal menghapus gambar lama: ${deleteError}`);
        // Lanjutkan upload gambar baru meski gagal hapus lama
      }
    }

    // Upload gambar baru
    const uploadResult = await createCloudinaryImage(newImageBuffer, options);

    return {
      newUrl: uploadResult.url,
      newPublicId: uploadResult.publicId,
      ...(oldPublicIdDeleted && { oldPublicIdDeleted }),
    };
  } catch (error) {
    console.error("❌ Error in updateCloudinaryImage:", error);
    throw new Error(
      `Gagal update gambar: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Helper untuk UPDATE: Update gambar profil user
 */
export async function updateUserProfileImage(
  newImageBuffer: Buffer,
  oldImageUrl: string | null | undefined,
  userIdentifier: string,
  userType: "perangkat" | "admin" | "user" = "user",
): Promise<CloudinaryUpdateResult> {
  try {
    let oldPublicIdDeleted: string | undefined;

    // Hapus gambar lama jika ada
    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      try {
        const oldPublicId = extractPublicIdFromUrl(oldImageUrl);
        await deleteFromCloudinary(oldPublicId);
        oldPublicIdDeleted = oldPublicId;
        console.log(`✅ Gambar profil lama dihapus: ${oldPublicId}`);
      } catch (deleteError) {
        console.warn(`⚠️ Gagal menghapus gambar profil lama: ${deleteError}`);
      }
    }

    // Upload gambar baru
    const folder = `${userType}-profiles`;
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const publicId = `${folder}/${userType}_${userIdentifier}_${timestamp}_${randomString}`;

    const uploadResult = await uploadToCloudinary(
      newImageBuffer,
      folder,
      publicId,
    );

    return {
      newUrl: uploadResult.url,
      newPublicId: uploadResult.public_id,
      ...(oldPublicIdDeleted && { oldPublicIdDeleted }),
    };
  } catch (error) {
    console.error("❌ Error in updateUserProfileImage:", error);
    throw new Error(
      `Gagal update gambar profil: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Helper untuk DELETE: Hapus gambar dari Cloudinary
 */
export async function deleteCloudinaryImage(
  imageUrl: string,
): Promise<CloudinaryDeleteResult> {
  try {
    // Validasi URL
    if (!imageUrl || !imageUrl.includes("cloudinary.com")) {
      return {
        success: false,
        message: "URL tidak valid atau bukan dari Cloudinary",
      };
    }

    // Ekstrak publicId dari URL
    const publicId = extractPublicIdFromUrl(imageUrl);

    // Hapus dari Cloudinary
    await deleteFromCloudinary(publicId);

    console.log(`✅ Gambar berhasil dihapus: ${publicId}`);
    return {
      success: true,
      message: `Gambar berhasil dihapus: ${publicId}`,
    };
  } catch (error) {
    console.error("❌ Error in deleteCloudinaryImage:", error);
    return {
      success: false,
      message: `Gagal menghapus gambar: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Helper untuk DELETE: Hapus gambar jika ada (safe version)
 * Tidak throw error, hanya log warning
 */
export async function safeDeleteCloudinaryImage(
  imageUrl: string | null | undefined,
): Promise<void> {
  if (!imageUrl || !imageUrl.includes("cloudinary.com")) {
    return;
  }

  try {
    const publicId = extractPublicIdFromUrl(imageUrl);
    await deleteFromCloudinary(publicId);
    console.log(`✅ Gambar dihapus: ${publicId}`);
  } catch (error) {
    console.warn(`⚠️ Gagal menghapus gambar (aman): ${error}`);
    // Tidak throw error, biarkan operasi utama berlanjut
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Ekstrak publicId dari URL Cloudinary
 */
export function extractPublicIdFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    // Cari indeks 'upload'
    const uploadIndex = pathParts.indexOf("upload");
    if (uploadIndex === -1) {
      throw new Error('Format URL tidak valid: tidak ditemukan "upload"');
    }

    // Skip 'upload' dan versi (v1770549533)
    const partsAfterVersion = pathParts.slice(uploadIndex + 2);

    // Gabungkan dan hapus ekstensi
    let publicId = partsAfterVersion.join("/");
    const lastDotIndex = publicId.lastIndexOf(".");

    if (lastDotIndex !== -1) {
      publicId = publicId.substring(0, lastDotIndex);
    }

    return publicId;
  } catch (error) {
    throw new Error(
      `Gagal ekstrak publicId: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Generate publicId unik
 */
function generatePublicId(folder: string, prefix: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${folder}/${prefix}_${timestamp}_${randomString}`;
}

/**
 * Cek apakah URL berasal dari Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes("cloudinary.com") && url.includes("/upload/");
}

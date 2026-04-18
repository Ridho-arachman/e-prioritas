// lib/encryption.ts
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const FIXED_IV = process.env.FIXED_IV;

if (!ENCRYPTION_KEY || !FIXED_IV) {
  throw new Error(
    "ENCRYPTION_KEY and FIXED_IV must be set in environment variables",
  );
}

// Konversi hex string ke Buffer (32 byte key, 16 byte IV)
const key = Buffer.from(ENCRYPTION_KEY, "hex");
const iv = Buffer.from(FIXED_IV, "hex");

/**
 * Enkripsi teks menggunakan AES-256-CBC dengan IV tetap (deterministik)
 */
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

/**
 * Dekripsi teks yang dihasilkan oleh fungsi encrypt()
 */
export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

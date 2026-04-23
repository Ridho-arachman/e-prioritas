// @/utils/whatsapp.ts

/**
 * Format nomor HP ke format internasional untuk WhatsApp
 * Contoh: 08123456789 -> 628123456789, +628123456789 -> 628123456789
 */
export function formatPhoneForWA(phone: string): string {
  // Hapus semua karakter non-digit dan tanda +
  const cleaned = phone.replace(/[\D+]/g, "");

  // Jika dimulai dengan 0, ganti dengan 62
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }

  // Jika sudah dimulai dengan 62, kembalikan apa adanya
  if (cleaned.startsWith("62")) {
    return cleaned;
  }

  // Fallback: asumsikan sudah format internasional
  return cleaned;
}

/**
 * Generate link WhatsApp dengan pesan terenkoding
 */
export function generateWALink(phone: string, message: string): string {
  const formattedPhone = formatPhoneForWA(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Template pesan untuk komunikasi dengan warga
 * (Bukan verifikasi otomatis, hanya untuk memudahkan admin menghubungi)
 */
export function getWAMessageTemplate(
  namaWarga: string,
  kodeDesa: string = "Kelurahan Panggungjati",
): string {
  return `Halo Kak ${namaWarga} 👋

Saya dari tim administrasi ${kodeDesa}.

Kami ingin mengonfirmasi data pendaftaran Anda di sistem kami. Mohon kesediaannya untuk membalas pesan ini agar kami dapat melanjutkan prosesnya.

Jika ada pertanyaan, silakan sampaikan.

Terima kasih 🙏`;
}

/**
 * Template pesan internal untuk catatan admin (opsional)
 * Bisa digunakan jika admin ingin mengirim pesan ke diri sendiri dulu
 */
export function getAdminNoteTemplate(namaWarga: string, noHp: string): string {
  return `[CATATAN ADMIN]
Nama: ${namaWarga}
No HP: ${noHp}
Status: Belum dikonfirmasi

Silakan hubungi warga untuk konfirmasi data.`;
}

import { CSSProperties } from "react";
import { toast } from "sonner";

// --- Konfigurasi Default ---
const DEFAULT_DURATION = 3500;

// BASE_STYLE akan digunakan sebagai inline style pada elemen container toast
const BASE_STYLE: CSSProperties = {
  padding: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export const notifier = {
  // Sukses (Success)
  success: (message = "Operasi berhasil!", description = "Berhasil") => {
    toast.success(message, {
      description,
      duration: DEFAULT_DURATION,
      // Menerapkan style kustom pada container toast
      style: {
        ...BASE_STYLE,
        backgroundColor: "#e6ffed", // Background Hijau muda
        color: "#1f7a1f", // Teks Hijau gelap
        border: "1px solid #70e070",
      },
    });
  },

  // Gagal/Error
  error: (message = "Terjadi kesalahan. Silakan coba lagi.") => {
    toast.error(message, {
      duration: DEFAULT_DURATION + 1000,
      style: {
        ...BASE_STYLE,
        backgroundColor: "#ffe6e6", // Background Merah muda
        color: "#cc0000", // Teks Merah gelap
        border: "1px solid #ff4d4d",
      },
    });
  },

  // Informasi (Info) - Menggunakan toast.message karena sonner tidak memiliki toast.info bawaan
  info: (message = "Informasi.") => {
    toast.message(message, {
      icon: "ℹ️",
      duration: DEFAULT_DURATION,
      style: {
        ...BASE_STYLE,
        backgroundColor: "#e6f7ff", // Background Biru muda
        color: "#005cb3", // Teks Biru gelap
        border: "1px solid #66b3ff",
      },
    });
  },

  // Peringatan (Warning)
  warning: (message = "Perhatian.") => {
    toast.message(message, {
      // Menggunakan toast.message karena sonner tidak memiliki toast.warning bawaan
      icon: "⚠️",
      duration: DEFAULT_DURATION,
      style: {
        ...BASE_STYLE,
        backgroundColor: "#fffbe6", // Background Kuning muda
        color: "#997300", // Teks Kuning gelap
        border: "1px solid #ffdb4d",
      },
    });
  },

  // Memuat (Loading)
  loading: (message = "Mohon tunggu...") => {
    // Hanya menggunakan style untuk padding dan font, karena loading style bawaan sonner sudah baik.
    return toast.loading(message, {
      style: {
        padding: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });
  },

  dismiss: (toastId?: string | number | null) => {
    toast.dismiss(toastId || toastId === 0 ? toastId : undefined);
  },
};

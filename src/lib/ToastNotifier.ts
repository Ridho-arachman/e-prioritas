import { CSSProperties } from "react";
import { toast } from "sonner";

/* =======================
 * CONSTANTS
 * ======================= */
const DEFAULT_DURATION = 3500;

const BASE_STYLE: CSSProperties = {
  padding: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "left",
};

/* =======================
 * VARIANT CONFIG
 * ======================= */
type ToastVariant = "success" | "error" | "info" | "warning";

const VARIANT_STYLE: Record<
  ToastVariant,
  {
    backgroundColor: string;
    color: string;
    border: string;
    icon?: string;
    duration?: number;
    type: "success" | "error" | "message";
  }
> = {
  success: {
    type: "success",
    backgroundColor: "#e6ffed",
    color: "#1f7a1f",
    border: "1px solid #70e070",
  },
  error: {
    type: "error",
    backgroundColor: "#ffe6e6",
    color: "#cc0000",
    border: "1px solid #ff4d4d",
    duration: DEFAULT_DURATION + 1000,
  },
  info: {
    type: "message",
    icon: "ℹ️",
    backgroundColor: "#e6f7ff",
    color: "#005cb3",
    border: "1px solid #66b3ff",
  },
  warning: {
    type: "message",
    icon: "⚠️",
    backgroundColor: "#fffbe6",
    color: "#997300",
    border: "1px solid #ffdb4d",
  },
};

/* =======================
 * HELPER
 * ======================= */
function showToast(
  variant: ToastVariant,
  message: string,
  description?: string,
) {
  const config = VARIANT_STYLE[variant];

  toast[config.type](message, {
    description,
    icon: config.icon,
    duration: config.duration ?? DEFAULT_DURATION,
    style: {
      ...BASE_STYLE,
      backgroundColor: config.backgroundColor,
      color: config.color,
      border: config.border,
    },
  });
}

/* =======================
 * PUBLIC API
 * ======================= */
export const notifier = {
  success: (message = "Operasi berhasil!", description?: string) =>
    showToast("success", message, description),

  error: (
    message = "Terjadi kesalahan. Silakan coba lagi.",
    description?: string,
  ) => showToast("error", message, description),

  info: (message = "Informasi.", description?: string) =>
    showToast("info", message, description),

  warning: (message = "Perhatian.", description?: string) =>
    showToast("warning", message, description),
};

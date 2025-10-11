import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 🔒 Anti sniffing (mencegah browser menebak MIME type)
          { key: "X-Content-Type-Options", value: "nosniff" },

          // 🚫 Cegah embedding ke iframe
          { key: "X-Frame-Options", value: "DENY" },

          // 🧱 Perlindungan dasar XSS
          { key: "X-XSS-Protection", value: "1; mode=block" },

          // 🔍 Batasi referrer agar tidak bocor ke situs lain
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // 🔐 Content Security Policy (CSP)
          // NOTE: pastikan disesuaikan kalau kamu load font, script, atau image dari luar
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';", // biar Next.js scripts tetap jalan
              "style-src 'self' 'unsafe-inline';", // biar Tailwind inline style aman
              "img-src 'self' data: blob:;",
              "font-src 'self';",
              "connect-src 'self' https://* ws://* wss://*;", // izinkan API lokal & eksternal
              "frame-ancestors 'none';",
              "object-src 'none';",
            ].join(" "),
          },

          // 🧭 Browser permission (opsional tapi direkomendasikan)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

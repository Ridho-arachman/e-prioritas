import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack(config, { dev }) {
  //   if (dev) {
  //     config.watchOptions = {
  //       poll: 1000,
  //       aggregateTimeout: 300,
  //     };
  //   }
  //   return config;
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Aktifkan React Strict Mode (direkomendasikan untuk produksi)
  reactStrictMode: true,

  // Kompresi respons dengan gzip (diaktifkan secara default, tapi bisa disetel ulang)
  compress: true,

  // Output standalone untuk deployment dengan Docker (mengurangi ukuran image)
  output: "standalone",

  // Tambahkan header keamanan HTTP (CSP, HSTS, dll)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Header keamanan non-CSP (tetap aman)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 
                https://challenges.cloudflare.com 
                https://maps.googleapis.com 
                https://*.googleapis.com 
                https://*.gstatic.com 
                'unsafe-inline' 
                'unsafe-eval';
              style-src 'self' 
                https://fonts.googleapis.com 
                https://*.googleapis.com 
                'unsafe-inline';
              img-src 'self' 
                data: 
                https://res.cloudinary.com 
                https://*.googleapis.com 
                https://maps.gstatic.com 
                https://*.gstatic.com;
              font-src 'self' 
                https://fonts.gstatic.com;
              connect-src 'self' 
                https://*.googleapis.com 
                https://challenges.cloudflare.com;
              frame-src 
                https://challenges.cloudflare.com 
                https://www.google.com;
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },

  // Opsi eksperimental (jika diperlukan)
  experimental: {
    // Misalnya, mengaktifkan optimasi tertentu
    optimizeCss: true,
  },
};

export default nextConfig;

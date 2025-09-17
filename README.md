# E-PRIORITAS – Sistem Pendukung Keputusan Prioritas Pembangunan Fasilitas Umum

**E-PRIORITAS** adalah aplikasi berbasis web yang membantu perangkat desa dalam menentukan **prioritas pembangunan fasilitas umum**.  
Aplikasi ini menggunakan kombinasi metode **AHP–TOPSIS** untuk menghasilkan keputusan yang objektif, transparan, dan akurat.

📍 Studi Kasus: **Kelurahan Panggungjati, Kecamatan Taktakan**

---

## ✨ Fitur Utama

- 🔑 Autentikasi untuk **Admin** dan **Perangkat Desa**
- ⚙️ Kelola data **kriteria** dan bobot dengan metode **AHP**
- 🏗️ Kelola data **alternatif fasilitas umum**
- 📊 Penilaian alternatif oleh perangkat desa
- 📈 Perhitungan prioritas menggunakan **TOPSIS**
- 📋 Laporan hasil prioritas dalam bentuk tabel & grafik
- 🌐 Halaman depan (landing page) publik berisi informasi & hasil terbaru

---

## 🛠️ Teknologi yang Digunakan

- [Next.js 15](https://nextjs.org/) – React Framework
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [shadcn/ui](https://ui.shadcn.com/) – UI Components
- [Prisma ORM](https://www.prisma.io/) – Database ORM
- [Supabase](https://supabase.com/) – Database PostgreSQL + Auth
- [Recharts](https://recharts.org/) – Visualisasi data

---

## 📂 Struktur Folder (Next.js App Router)

app/
├─ page.tsx # Landing page (publik)
├─ masuk/ # Halaman login
├─ admin/ # Modul admin
│ ├─ beranda/
│ ├─ pengguna/
│ ├─ kriteria/
│ ├─ alternatif/
│ ├─ nilai/
│ └─ hasil/
├─ perangkat/ # Modul perangkat desa
│ ├─ beranda/
│ ├─ nilai/
│ └─ hasil/
└─ api/ # API routes
├─ kriteria/
├─ alternatif/
├─ nilai/
├─ hasil/
├─ ahp/
└─ topsis/

---

## ⚡ Instalasi & Menjalankan

1.  **Clone repo**

    ```bash
    git clone https://github.com/username/e-prioritas.git
    cd e-prioritas
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set environment variable**
    Buat file .env lalu isi:

    ```env
    DATABASE_URL="postgresql://..."
    NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="xxxx"
    ```

4.  **Generate & migrate database dengan Prisma**

    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

5.  **Jalankan development server**

    ```bash
    npm run dev
    ```

6.  **Buka di browser:**
    👉 http://localhost:3000

---

## 👥 Roles & Akses

- **Admin**

  - Kelola pengguna (perangkat desa)
  - Kelola kriteria & bobot AHP
  - Kelola alternatif fasilitas umum
  - Lihat & validasi penilaian
  - Jalankan perhitungan & lihat hasil prioritas

- **Perangkat Desa**

  - Isi penilaian alternatif
  - Lihat hasil prioritas (read-only)

- **Publik**

  - Akses landing page & hasil prioritas terbaru

---

## 📊 Metodologi

- AHP (Analytic Hierarchy Process) → Menentukan bobot kriteria

- TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) → Menghitung ranking alternatif berdasarkan kriteria

---

## 📌 Lisensi

```
Proyek ini dibuat untuk keperluan Skripsi Sistem Informasi Penjurusan E-Bisnis, Universitas Bina Bangsa (2025).
Dilarang memperjualbelikan tanpa izin.
```

import "dotenv/config";
export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "E-Prioritas",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://panggungjati.my.id/api",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://panggungjati.my.id",
  prisma: {
    user: {
      userId: "v1ZwubsEM4V43tEodlVJkUFWKYQfl8Fc",
    },
    domainIsu: [
      {
        code: "INFRASTRUKTUR",
        nama: "Infrastruktur",
        deskripsi:
          "Perbaikan jalan rusak, drainase mampet, PJU mati, gorong-gorong, dan fasilitas umum lainnya",
      },
      {
        code: "KESEHATAN",
        nama: "Kesehatan",
        deskripsi:
          "Posyandu, fogging DBD, sanitasi lingkungan, penanganan stunting, dan pelayanan kesehatan dasar",
      },
      {
        code: "PENDIDIKAN",
        nama: "Pendidikan",
        deskripsi:
          "PAUD/TK, taman bacaan, beasiswa anak kurang mampu, dan peningkatan fasilitas belajar",
      },
      {
        code: "KEAMANAN_KETERTIBAN",
        nama: "Keamanan & Ketertiban",
        deskripsi:
          "Siskamling, penanganan premanisme, parkir liar, gangguan ketertiban malam, dan kamtibmas",
      },
      {
        code: "EKONOMI_UMKM",
        nama: "Ekonomi & UMKM",
        deskripsi:
          "Pelatihan UMKM, bantuan modal usaha, pasar murah, dan pemberdayaan pelaku usaha mikro",
      },
      {
        code: "LINGKUNGAN",
        nama: "Lingkungan Hidup",
        deskripsi:
          "Pengelolaan sampah, gotong royong bersih lingkungan, penghijauan, dan penanganan limbah rumah tangga",
      },
      {
        code: "SOSIAL_KESEJAHTERAAN",
        nama: "Sosial & Kesejahteraan",
        deskripsi:
          "Bantuan sosial lansia/disabilitas, perbaikan RTLH (Rumah Tidak Layak Huni), dan bantuan korban bencana",
      },
      {
        code: "ADMINISTRASI",
        nama: "Administrasi Pelayanan",
        deskripsi:
          "Percepatan pelayanan KTP/KK, legalisir dokumen, surat pindah, dan administrasi kependudukan",
      },
    ],
  },
};

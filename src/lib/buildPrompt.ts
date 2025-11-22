// lib/buildPrompt.ts
import { prisma } from "@/lib/prisma";

export async function buildPrompt(args: {
  mode: "FUSI_DATA" | "DATA_MASTER_SAJA";
  judulLaporan: string;
}) {
  const { mode, judulLaporan } = args;

  // Ambil data dari database
  const dataMaster = await prisma.dataMaster.findMany();
  const masukanWarga = await prisma.masukanWarga.findMany();
  const exclusionTitles = await prisma.rekomendasi.findMany({
    select: { prioritas1Deskripsi: true },
  });

  const exclusionList = exclusionTitles.map((e) => e.prioritas1Deskripsi);

  // Konversi JSON
  const dataMasterJson = JSON.stringify(dataMaster, null, 2);
  const masukanWargaJson = JSON.stringify(masukanWarga, null, 2);
  const exclusionJson = JSON.stringify(exclusionList, null, 2);

  return `
Anda adalah seorang analis pembangunan kelurahan tingkat ahli yang memiliki kemampuan analisis sosial, ekonomi, infrastruktur, dan perencanaan pembangunan berbasis data.

TUGAS:
Hasilkan 5 rekomendasi prioritas paling mendesak dalam bentuk JSON VALID TANPA TEKS TAMBAHAN.

PENTING:
1. Output HARUS berupa JSON valid yang bisa langsung di-parse tanpa error.
2. Dilarang menambahkan narasi di luar JSON.
3. Jika Anda ragu, tetap keluarkan JSON valid sesuai skema.

====================================================================
KETENTUAN INTI
====================================================================

• Gunakan judul laporan sebagai konteks: "${judulLaporan}"
• Jika judul mengandung kata seperti “Kesehatan”, “Infrastruktur”, “Ekonomi”, tambahkan bobot +10% pada kategori tersebut.
• Jangan membuat rekomendasi yang judulnya identik atau sangat mirip dengan daftar berikut:
  ${exclusionJson}

====================================================================
DATA MASTER KELURAHAN (diambil dari database)
====================================================================
${dataMasterJson}

${
  mode === "FUSI_DATA"
    ? `
====================================================================
MODE: FUSI DATA
====================================================================
Gunakan kedua sumber berikut:
1. Frekuensi kemunculan masalah dalam MASUKAN WARGA.
2. Nilai bobot Data Master (nilai numerik 1–5).
3. Perhatikan lokasi RT/RW untuk menguatkan urgensi.

DATA MASUKAN WARGA (DITERIMA dari database):
${masukanWargaJson}
`
    : `
====================================================================
MODE: DATA MASTER SAJA (CADANGAN)
====================================================================
• Abaikan aspirasi warga (kosong).
• Hanya gunakan Data Master sebagai dasar rekomendasi.
• Prioritas ditentukan berdasarkan nilai bobot tertinggi (5 paling mendesak).
• masukan_terkait_ids harus berupa [] dan alasan harus menyebutkan “Mode Cadangan”.

DATA MASUKAN WARGA:
[]
`
}

====================================================================
FORMAT OUTPUT (WAJIB DIIKUTI)
====================================================================
${JSON.stringify(
  {
    judul_laporan: judulLaporan,
    tanggal_proses: new Date().toISOString().split("T")[0],
    rekomendasi_prioritas: [
      {
        prioritas_ke: 1,
        deskripsi: "Rekomendasi solusi...",
        skor_prioritas: 0.9,
        alasan_analisis:
          mode === "FUSI_DATA"
            ? "Analisis berdasarkan fusi frekuensi + bobot data master."
            : "Mode Cadangan: berdasarkan bobot data master.",
        masukan_terkait_ids: mode === "FUSI_DATA" ? ["m-101"] : [],
      },
      {
        prioritas_ke: 2,
        deskripsi: "",
        skor_prioritas: 0,
        alasan_analisis: "",
        masukan_terkait_ids: [],
      },
      {
        prioritas_ke: 3,
        deskripsi: "",
        skor_prioritas: 0,
        alasan_analisis: "",
        masukan_terkait_ids: [],
      },
      {
        prioritas_ke: 4,
        deskripsi: "",
        skor_prioritas: 0,
        alasan_analisis: "",
        masukan_terkait_ids: [],
      },
      {
        prioritas_ke: 5,
        deskripsi: "",
        skor_prioritas: 0,
        alasan_analisis: "",
        masukan_terkait_ids: [],
      },
    ],
  },
  null,
  2
)}
`;
}

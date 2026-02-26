// lib/buildPrompt.ts
// Asumsi tipe data MasukanWarga dan DataMaster sudah didefinisikan atau diimpor

type PromptArgs = {
  mode: "FUSI_DATA" | "DATA_MASTER_SAJA";
  judulLaporan: string;
  masukanWarga: any[]; // Gunakan tipe yang benar
  dataMaster: any[]; // Gunakan tipe yang benar
  exclusionTitles: string[];
};

export function buildPrompt(args: PromptArgs): string {
  const { mode, judulLaporan, masukanWarga, dataMaster, exclusionTitles } =
    args;

  const masukanWargaJsonString = JSON.stringify(masukanWarga, null, 2);
  const dataMasterJsonString = JSON.stringify(dataMaster, null, 2);
  const exclusionListString = JSON.stringify(exclusionTitles, null, 2);

  // Kriteria Dasar & Format Output
  const baseInstruction = `
        Anda adalah analis pembangunan kelurahan ahli. Tugas Anda adalah menghasilkan 5 rekomendasi prioritas paling mendesak.
        
        ### KETENTUAN UMUM:
        1. Anda WAJIB merespon HANYA dalam format JSON valid. Jangan sertakan teks pengantar.
        2. Gunakan judul laporan: "${judulLaporan}" sebagai konteks untuk penyesuaian fokus analisis (misalnya jika mengandung kata 'Kesehatan', bobot kategori tersebut ditambah).
        3. PENCEGAHAN REDUNDANSI: Dilarang memasukkan rekomendasi yang identik dengan item di DAFTAR PENGECUALIAN.
        4. DAFTAR PENGECUALIAN: ${exclusionListString}
        
        ### DATA INPUT:
        DATA MASTER KELURAHAN (KONTEKS BOBOT): ${dataMasterJsonString}
    `;

  // Logika Prompt berdasarkan Mode
  let specificInstruction = "";
  let masukanDataSection = "";

  if (mode === "FUSI_DATA") {
    specificInstruction = `
            ### MODE: FUSI DATA (Kuat)
            Prioritaskan masalah yang paling sering muncul di Masukan Warga (frekuensi tinggi) DAN memiliki nilai bobot Data Master (nilai 4 atau 5) di lokasi yang sama. Alasan analisis harus menyebutkan kedua sumber data (Frekuensi Masukan + Bobot Data Master).
        `;
    masukanDataSection = `
            DATA MASUKAN WARGA (STATUS: DITERIMA): ${masukanWargaJsonString}
        `;
  } else {
    // DATA_MASTER_SAJA
    specificInstruction = `
            ### MODE: CADANGAN (Hanya Data Master)
            Data aspirasi warga saat ini KOSONG. Anda HANYA diperbolehkan menganalisis Data Master. Prioritas harus ditentukan murni berdasarkan Nilai Bobot (5, 4, 3) dari yang paling Kritis. Kolom 'masukan_terkait_ids' harus diisi dengan array kosong []. Alasan harus menyebutkan 'Mode Cadangan' dan murni data master.
        `;
    masukanDataSection = `
            DATA MASUKAN WARGA (STATUS: KOSONG): []
        `;
  }

  const outputFormat = `
        ### FORMAT OUTPUT:
        Anda HARUS mengembalikan JSON dengan skema berikut. Pastikan 'masukan_terkait_ids' adalah array of strings.
        
        ${JSON.stringify(
          {
            judul_laporan: judulLaporan,
            tanggal_proses: new Date().toISOString().split("T")[0],
            rekomendasi_prioritas: [
              {
                prioritas_ke: 1,
                deskripsi: "Rekomendasi solusi...",
                skor_prioritas: 0.9,
                alasan_analisis: "Justifikasi berdasarkan fusi/data master.",
                masukan_terkait_ids: ["m-101", "m-105"],
              },
              // ... 4 item lainnya hingga prioritas_ke: 5
            ],
          },
          null,
          2,
        )}
    `;

  return (
    baseInstruction + specificInstruction + masukanDataSection + outputFormat
  );
}

// src/lib/buildPrompt.ts

// ═══════════════════════════════════════════════════════════════
// 📦 TYPE DEFINITIONS (Sesuai dengan query Prisma)
// ═══════════════════════════════════════════════════════════════

export type MasukanWargaInput = {
  id: string;
  judul: string;
  deskripsi: string;
  lokasi: string;
  domainIsuId: string;
  status: string;
};

export type DataMasterInput = {
  id: string;
  namaAtribut: string;
  kritikalitas: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
  jumlah: number | null;
  domainIsuId: string;
};

export type RunningProgram = {
  judul: string;
  deskripsi: string;
  lokasi: string;
};

export type PromptArgs = {
  mode: "FUSI_DATA" | "DATA_MASTER_SAJA";
  judulLaporan: string;
  domainIsuCode: string;
  domainIsuId: string;
  masukanWarga: MasukanWargaInput[];
  dataMaster: DataMasterInput[];
  exclusionTitles: string[];
  runningPrograms?: RunningProgram[];
};

// ═══════════════════════════════════════════════════════════════
// 🔧 HELPER: Truncate data untuk hindari token limit
// ═══════════════════════════════════════════════════════════════

function truncateData<T extends Record<string, any>>(
  items: T[],
  maxItems: number,
  maxCharsPerField: number = 200,
): T[] {
  return items.slice(0, maxItems).map((item) => {
    const truncated: Record<string, any> = {};
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "string" && value.length > maxCharsPerField) {
        truncated[key] = value.substring(0, maxCharsPerField) + "...";
      } else {
        truncated[key] = value;
      }
    }
    return truncated as T;
  });
}

// ═══════════════════════════════════════════════════════════════
// 🎯 MAIN FUNCTION: Build Prompt
// ═══════════════════════════════════════════════════════════════

export function buildPrompt(args: PromptArgs): string {
  const {
    mode,
    judulLaporan,
    domainIsuCode,
    domainIsuId,
    masukanWarga,
    dataMaster,
    exclusionTitles,
    runningPrograms = [],
  } = args;

  const truncatedMasukan = truncateData(masukanWarga, 15);
  const truncatedDataMaster = truncateData(dataMaster, 15);

  const masukanWargaJsonString = JSON.stringify(truncatedMasukan, null, 2);
  const dataMasterJsonString = JSON.stringify(truncatedDataMaster, null, 2);
  const exclusionListString = JSON.stringify(
    exclusionTitles.slice(0, 10),
    null,
    2,
  );
  const currentDate = new Date().toISOString();

  const baseInstruction = `Anda adalah asisten AI ahli untuk menetukan prioritas pembantu pengambilan keputusan kegiatan kelurahan. Tugas Anda adalah menganalisis data dan menghasilkan 5 rekomendasi prioritas yang dapat ditindaklanjuti.

KONTEKS RAPAT:
${judulLaporan}

ATURAN WAJIB:
1. Output HARUS berupa JSON valid sesuai skema yang ditentukan. Tanpa teks tambahan, tanpa markdown, tanpa penjelasan.
2. Fokus analisis pada domain isu: "${domainIsuCode}".
3. Hindari duplikasi dengan judul yang ada di daftar pengecualian.
4. Semua field string wajib diisi (gunakan "" jika tidak ada data), jangan null.
5. skorPrioritas harus angka 0.00 - 1.00 dengan 2 desimal.

DATA MASTER (Referensi Bobot Kritikalitas):
${dataMasterJsonString}

SKALA KRITIKALITAS:
- KRITIS: bobot 1.00 (darurat, bahaya, dampak luas)
- TINGGI: bobot 0.75 (penting, perlu segera)
- SEDANG: bobot 0.50 (cukup, perlu perhatian)
- RENDAH: bobot 0.25 (rutin, bisa dijadwalkan)

ANALISIS DATA:
- Data master dan masukan warga di atas adalah satu-satunya sumber informasi yang valid.
- Jumlah data yang digunakan dalam evidence HARUS sesuai dengan data yang tersedia. Misalnya, jika hanya ada 4 masukan warga, maka masukanWargaCount maksimal 4.
- Jangan menciptakan data baru atau mengasumsikan jumlah yang tidak ada.`;

  let modeInstruction = "";
  let masukanSection = "";

  if (mode === "FUSI_DATA") {
    modeInstruction = `MODE: FUSI DATA
Strategi: Gabungkan frekuensi masukan warga dengan kritikalitas data master.
- Prioritaskan isu yang sering muncul di masukan warga DAN memiliki kritikalitas tinggi di data master.
- Rumus perhitungan skor:
  * Jika ada evidence (masukanWargaCount > 0 atau dataMasterCount > 0):
    skorPrioritas = (frekuensiMasukan/10 * 0.4) + (bobotKritikalitas * 0.6)
  * Jika tidak ada evidence (masukanWargaCount = 0 dan dataMasterCount = 0):
    skorPrioritas MAKSIMAL 0.20 (karena tidak ada data pendukung). Jangan beri skor tinggi berdasarkan asumsi.
- Untuk rekomendasi tanpa evidence, kritikalitas hanya boleh SEDANG atau RENDAH, tidak boleh KRITIS atau TINGGI.
- Berikan prioritas lebih tinggi pada rekomendasi yang didukung oleh data master aktual atau masukan warga.`;

    masukanSection = `MASUKAN WARGA (Terverifikasi):
${masukanWargaJsonString}`;
  } else {
    modeInstruction = `MODE: DATA MASTER SAJA
Strategi: Analisis murni berdasarkan data master karena masukan warga tidak tersedia.
- Urutkan berdasarkan kritikalitas: KRITIS → TINGGI → SEDANG → RENDAH.
- Jika field 'jumlah' ada, bobotkan isu dengan jumlah lebih besar.
- evidence.masukanWargaCount WAJIB diisi 0.
- alasanAnalisis WAJIB menyebutkan "Analisis berbasis Data Master".`;

    masukanSection = `MASUKAN WARGA: Tidak tersedia (mode cadangan)`;
  }

  // Buat daftar program berjalan
  const runningProgramsList =
    runningPrograms.length > 0
      ? runningPrograms
          .map(
            (p) =>
              `- Judul: "${p.judul}", Lokasi: ${p.lokasi}, Deskripsi: ${p.deskripsi.substring(0, 100)}`,
          )
          .join("\n")
      : "Tidak ada program yang sedang berjalan.";

  const runningInstruction = `
INFORMASI PENTING - PROGRAM YANG SEDANG BERJALAN:
Berikut adalah daftar program kelurahan yang statusnya "BERJALAN" (sedang dikerjakan). Anda WAJIB menghindari menghasilkan rekomendasi prioritas yang serupa dengan program-program ini, baik dari segi judul, deskripsi, maupun lokasi. Jangan merekomendasikan kegiatan yang sudah sedang berjalan.

DAFTAR PROGRAM BERJALAN:
${runningProgramsList}
`;

  const outputSchema = `{
  "metadata": {
    "generatedAt": "${currentDate}",
    "aiModel": "gemini-2.5-flash",
    "modeRekomendasi": "${mode}",
    "domainIsuCode": "${domainIsuCode}",
    "totalMasukanDianalisis": ${truncatedMasukan.length},
    "totalDataMasterDianalisis": ${truncatedDataMaster.length}
  },
  "prioritas": [
    {
      "prioritasKe": 1,
      "deskripsi": "String, max 150 karakter, konkret dan dapat ditindaklanjuti",
      "skorPrioritas": 0.95,
      "alasanAnalisis": "String, min 30 karakter, jelaskan sumber data dan logika scoring",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "RT 001 RW 002",
      "fingerprint": "",
      "evidence": {
        "masukanWargaCount": 0,
        "dataMasterCount": 0,
        "kritikalitas": "KRITIS"
      }
    },
    {
      "prioritasKe": 2,
      "deskripsi": "...",
      "skorPrioritas": 0.88,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "TINGGI" }
    },
    {
      "prioritasKe": 3,
      "deskripsi": "...",
      "skorPrioritas": 0.82,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "SEDANG" }
    },
    {
      "prioritasKe": 4,
      "deskripsi": "...",
      "skorPrioritas": 0.75,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "SEDANG" }
    },
    {
      "prioritasKe": 5,
      "deskripsi": "...",
      "skorPrioritas": 0.68,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "RENDAH" }
    }
  ]
}`;

  return `
${baseInstruction}

${modeInstruction}

${masukanSection}

DAFTAR PENGECUALIAN (Jangan duplikat):
${exclusionListString}

${runningInstruction}

OUTPUT SCHEMA (WAJIB PERSIS, VALID JSON):
${outputSchema}

INSTRUKSI FINAL:
- Hasilkan tepat 5 item prioritas, diurutkan dari prioritasKe 1 (tertinggi) hingga 5.
- Jangan tambahkan field baru atau hapus field wajib.
- Jangan gunakan komentar atau teks di luar JSON.
- Pastikan JSON dapat di-parse oleh JSON.parse().
- Untuk setiap rekomendasi, hitung masukanWargaCount dan dataMasterCount berdasarkan data masukan dan data master yang benar-benar relevan dengan rekomendasi tersebut. Jangan membuat angka fiktif.
- Kritikalitas harus diambil dari data master yang paling dominan atau berdasarkan penilaian dari data yang ada.
- evidence.masukanWargaCount harus diisi dengan jumlah masukan warga yang mendukung rekomendasi tersebut (dari data yang diberikan).
- evidence.dataMasterCount harus diisi dengan jumlah data master yang mendukung rekomendasi tersebut (dari data yang diberikan).
- evidence.kritikalitas harus diisi berdasarkan data master yang paling relevan.
- PENTING: Rekomendasi prioritas harus didasarkan pada data yang tersedia (masukan warga atau data master). Jangan merekomendasikan isu yang sama sekali tidak memiliki evidence, kecuali jika sama sekali tidak ada data untuk domain isu tersebut. Jika terpaksa merekomendasikan tanpa evidence, beri skor maksimal 0.20 dan kritikalitas SEDANG atau RENDAH.

Sekarang, hasilkan rekomendasi berdasarkan data di atas. Output HANYA JSON.`;
}

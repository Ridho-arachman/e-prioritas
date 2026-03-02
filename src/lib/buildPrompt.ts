// src/lib/buildPrompt.ts

// ═══════════════════════════════════════════════════════════════
// 📦 TYPE DEFINITIONS (Sesuai dengan query Prisma)
// ═══════════════════════════════════════════════════════════════

export type MasukanWargaInput = {
  id: string;
  judul: string;
  deskripsi: string;
  lokasiRt: string;
  lokasiRw: string;
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

export type PromptArgs = {
  mode: "FUSI_DATA" | "DATA_MASTER_SAJA";
  judulLaporan: string;
  domainIsuCode: string;
  domainIsuId: string; // ✅ Tambah: ID aktual untuk output
  masukanWarga: MasukanWargaInput[];
  dataMaster: DataMasterInput[];
  exclusionTitles: string[];
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
  } = args;

  // ✅ Truncate data untuk hindari token limit (max 15 items each)
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

  // ═══════════════════════════════════════════════════════════════
  // 📋 SYSTEM PROMPT (Base Instruction)
  // ═══════════════════════════════════════════════════════════════

  const baseInstruction = `Anda adalah asisten AI ahli untuk perencanaan pembangunan kelurahan. Tugas Anda adalah menganalisis data dan menghasilkan 5 rekomendasi prioritas yang dapat ditindaklanjuti.

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
- RENDAH: bobot 0.25 (rutin, bisa dijadwalkan)`;

  // ═══════════════════════════════════════════════════════════════
  // 🔄 MODE-SPECIFIC INSTRUCTION
  // ═══════════════════════════════════════════════════════════════

  let modeInstruction = "";
  let masukanSection = "";

  if (mode === "FUSI_DATA") {
    modeInstruction = `MODE: FUSI DATA
Strategi: Gabungkan frekuensi masukan warga dengan kritikalitas data master.
- Prioritaskan isu yang sering muncul di masukan warga DAN memiliki kritikalitas tinggi di data master.
- Cocokkan lokasi (RT/RW) antara kedua sumber data untuk validasi.
- skorPrioritas = (frekuensiMasukan/10 * 0.4) + (bobotKritikalitas * 0.4) + (kesesuaianLokasi * 0.2).`;

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

  // ═══════════════════════════════════════════════════════════════
  // 📦 OUTPUT SCHEMA (Valid JSON, No Comments)
  // ═══════════════════════════════════════════════════════════════

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
      "lokasiRt": "001",
      "lokasiRw": "002",
      "fingerprint": "",
      "evidence": {
        "masukanWargaCount": 5,
        "dataMasterCount": 2,
        "kritikalitas": "KRITIS"
      }
    },
    {
      "prioritasKe": 2,
      "deskripsi": "...",
      "skorPrioritas": 0.88,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasiRt": "...",
      "lokasiRw": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "TINGGI" }
    },
    {
      "prioritasKe": 3,
      "deskripsi": "...",
      "skorPrioritas": 0.82,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasiRt": "...",
      "lokasiRw": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "SEDANG" }
    },
    {
      "prioritasKe": 4,
      "deskripsi": "...",
      "skorPrioritas": 0.75,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasiRt": "...",
      "lokasiRw": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "SEDANG" }
    },
    {
      "prioritasKe": 5,
      "deskripsi": "...",
      "skorPrioritas": 0.68,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasiRt": "...",
      "lokasiRw": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "RENDAH" }
    }
  ]
}`;

  // ═══════════════════════════════════════════════════════════════
  // 🎯 FINAL PROMPT ASSEMBLY
  // ═══════════════════════════════════════════════════════════════

  return `
${baseInstruction}

${modeInstruction}

${masukanSection}

DAFTAR PENGECUALIAN (Jangan duplikat):
${exclusionListString}

OUTPUT SCHEMA (WAJIB PERSIS, VALID JSON):
${outputSchema}

INSTRUKSI FINAL:
- Hasilkan tepat 5 item prioritas, diurutkan dari prioritasKe 1 (tertinggi) hingga 5.
- Jangan tambahkan field baru atau hapus field wajib.
- Jangan gunakan komentar atau teks di luar JSON.
- Pastikan JSON dapat di-parse oleh JSON.parse().

Sekarang, hasilkan rekomendasi berdasarkan data di atas. Output HANYA JSON.`;
}

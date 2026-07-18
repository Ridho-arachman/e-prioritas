// src/lib/buildPrompt.ts

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

  // ======== KONTEKS KAPASITAS KELURAHAN (UNIVERSAL) ========
  const kapasitasKelurahan = `
KONTEKS PENTING - KAPASITAS DAN ANGGARAN KELURAHAN (UNIVERSAL):
- Kelurahan memiliki anggaran yang terbatas, bersumber dari APBDes/APBD dan partisipasi masyarakat.
- Sumber daya manusia perangkat kelurahan terbatas, kegiatan harus bisa dikerjakan dengan gotong royong warga atau kemitraan lokal.
- Kewenangan kelurahan terbatas pada urusan pemerintahan lokal, tidak dapat melakukan program besar yang membutuhkan anggaran tinggi, kewenangan lintas sektor, atau teknologi canggih.
- Oleh karena itu, rekomendasi prioritas yang dihasilkan HARUS:
  1. **Biaya rendah** atau dapat didanai melalui swadaya masyarakat/anggaran kecil.
  2. **Melibatkan partisipasi warga** (gotong royong, sosialisasi, edukasi, pelatihan sederhana).
  3. **Sederhana dan terukur**, misalnya: perbaikan fasilitas umum skala kecil, penyuluhan, pembentukan kelompok masyarakat, koordinasi dengan dinas terkait.
  4. **Menghindari** usulan yang berskala besar, membutuhkan anggaran tinggi, atau di luar kewenangan kelurahan.
- Jika ada data master yang menunjukkan angka atau luas, jangan serta-merta menjadikannya prioritas besar. Pertimbangkan apakah kelurahan mampu mengelola isu tersebut dengan cara sederhana.
`;

  // ======== RELEVANSI TEMATIK ========
  const relevansiTematik = `
**ATURAN RELEVANSI TEMATIK - WAJIB DITERAPKAN UNTUK SEMUA DOMAIN**

Sebelum menggunakan suatu data master atau masukan warga sebagai evidence untuk sebuah rekomendasi, pastikan data tersebut SECARA TEMATIK RELEVAN dengan usulan kegiatan dan KONTEKS RAPAT. Jangan hanya karena data berada di domain isu yang sama, lalu digunakan secara otomatis.

**PANDUAN RELEVANSI PER DOMAIN:**

1. **Infrastruktur** → Data yang relevan: luas pemukiman, fasilitas umum, sumur, jalan, drainase, penerangan, dll. 
   ❌ Data yang tidak relevan: data agama, jumlah penduduk (kecuali terkait kepadatan), data peternakan, data UMKM.

2. **Ekonomi & UMKM** → Data yang relevan: jumlah pedagang, buruh, kelompok simpan pinjam, kelompok tani, peternakan, UKM, dll.
   ❌ Data yang tidak relevan: data agama, data kesehatan, data pendidikan.

3. **Kesehatan** → Data yang relevan: balita, gizi buruk, imunisasi, posyandu, ibu melahirkan, dll.
   ❌ Data yang tidak relevan: data agama, data ekonomi, data pendidikan.

4. **Pendidikan** → Data yang relevan: putus sekolah, buta huruf, sarana pendidikan, tingkat pendidikan, dll.
   ❌ Data yang tidak relevan: data agama, data kesehatan (kecuali terkait stunting untuk PAUD).

5. **Lingkungan** → Data yang relevan: luas pertanian, perkebunan, kehutanan, bank sampah, gotong royong, dll.
   ❌ Data yang tidak relevan: data agama, data ekonomi (kecuali terkait perikanan).

6. **Sosial & Kesejahteraan** → Data yang relevan: KK, penduduk, DTKS, lansia, difabel, bansos, dll.
   ⚠️ **ATURAN KHUSUS DATA AGAMA UNTUK DOMAIN SOSIAL:**
   - Data agama (jumlah pemeluk, tempat ibadah) HANYA boleh digunakan jika rekomendasi secara spesifik membahas:
     * Kerukunan umat beragama
     * Bantuan sosial lintas agama
     * Pemeliharaan tempat ibadah
     * Kegiatan keagamaan bersama
   - Jika konteks rapat adalah kegiatan umum (misal: HUT RI, musdes, kegiatan sosial lainnya yang tidak berfokus pada agama), maka data agama HARUS DIABAIKAN karena tidak relevan dengan tema kegiatan.
   - Contoh: Rapat HUT RI → jangan gunakan data agama untuk rekomendasi. Fokus pada lomba, gotong royong, kebersihan, dekorasi, dll.
   - Contoh: Rapat kerukunan umat beragama → data agama boleh digunakan.

7. **Keamanan & Ketertiban** → Data yang relevan: pos kamling, angka kriminalitas, siskamling, dll.

8. **Administrasi** → Data yang relevan: aparat, RT/RW, lembaga kemasyarakatan, ormas, dll.

**PRINSIP UTAMA:** 
Data yang digunakan sebagai evidence HARUS memiliki hubungan langsung dengan isu yang dibahas dan KONTEKS RAPAT. Jika tidak ada data yang relevan, biarkan evidence kosong (count = 0) daripada memaksakan data yang tidak nyambung.
`;

  const baseInstruction = `Anda adalah asisten AI ahli untuk menetukan prioritas pembantu pengambilan keputusan kegiatan kelurahan. Tugas Anda adalah menganalisis data dan menghasilkan 5 rekomendasi prioritas yang dapat ditindaklanjuti.

KONTEKS RAPAT:
${judulLaporan}

ATURAN WAJIB:
1. Output HARUS berupa JSON valid sesuai skema yang ditentukan. Tanpa teks tambahan, tanpa markdown, tanpa penjelasan.
2. Fokus analisis pada domain isu: "${domainIsuCode}".
3. Hindari duplikasi dengan judul yang ada di daftar pengecualian.
4. Semua field string wajib diisi (gunakan "" jika tidak ada data), jangan null.
5. Setiap rekomendasi DAPAT dan SEBAIKNYA didukung oleh LEBIH DARI SATU data master dan/atau LEBIH DARI SATU masukan warga jika relevan. 
   Jangan membuat rekomendasi terpisah untuk setiap item data; gabungkan data yang saling terkait dalam satu rekomendasi.
6. skorPrioritas harus angka 0.00 - 1.00 dengan 2 desimal.

DATA MASTER (Referensi Bobot Kritikalitas):
${dataMasterJsonString}

SKALA KRITIKALITAS:
- KRITIS: bobot 1.00 (darurat, bahaya, dampak luas)
- TINGGI: bobot 0.75 (penting, perlu segera)
- SEDANG: bobot 0.50 (cukup, perlu perhatian)
- RENDAH: bobot 0.25 (rutin, bisa dijadwalkan)

ANALISIS DATA:
- Data master dan masukan warga di atas adalah satu-satunya sumber informasi yang valid.
- Jumlah data yang digunakan dalam evidence HARUS sesuai dengan data yang tersedia.
- Jangan menciptakan data baru atau mengasumsikan jumlah yang tidak ada.

${relevansiTematik}`;

  let modeInstruction = "";
  let masukanSection = "";

  if (mode === "FUSI_DATA") {
    modeInstruction = `MODE: FUSI DATA
Strategi: Gabungkan frekuensi masukan warga dengan kritikalitas data master, tetapi **WAJIB mempertimbangkan kapasitas dan anggaran kelurahan**.

- Prioritaskan isu yang sering muncul di masukan warga DAN memiliki kritikalitas tinggi di data master.
- WAJIB: Setiap prioritas harus berusaha memanfaatkan KEDUA jenis data (masukan warga DAN data master) jika keduanya relevan dengan topik yang sama.
- Jika suatu rekomendasi hanya didukung oleh satu jenis data, itu diperbolehkan ASAL tidak ada data master yang relevan untuk digabung. Jangan memaksakan penggabungan jika tidak ada keterkaitan.
- Rumus perhitungan skor:
  * Jika ada evidence (masukanWargaCount > 0 atau dataMasterCount > 0):
    skorPrioritas = (frekuensiMasukan/10 * 0.4) + (bobotKritikalitas * 0.6)
    Catatan: frekuensiMasukan adalah jumlah masukan warga yang mendukung (maksimal 10), dan bobotKritikalitas diambil dari data master dengan kritikalitas tertinggi yang mendukung.
  * Jika tidak ada evidence (masukanWargaCount = 0 dan dataMasterCount = 0):
    skorPrioritas MAKSIMAL 0.20 (karena tidak ada data pendukung). Jangan beri skor tinggi berdasarkan asumsi.
- Untuk rekomendasi tanpa evidence, kritikalitas hanya boleh SEDANG atau RENDAH, tidak boleh KRITIS atau TINGGI.
- Berikan prioritas lebih tinggi pada rekomendasi yang didukung oleh data master aktual atau masukan warga.

**ATURAN PENGURUTAN PRIORITAS (WAJIB):**
- Rekomendasi dengan EVIDENCE (masukanWargaCount > 0 atau dataMasterCount > 0) HARUS ditempatkan di atas rekomendasi TANPA EVIDENCE.
- Di antara rekomendasi yang memiliki evidence, urutkan berdasarkan skorPrioritas (semakin tinggi skor, semakin tinggi prioritasKe).
- Di antara rekomendasi tanpa evidence, urutkan berdasarkan skorPrioritas (maksimal 0.20).

${kapasitasKelurahan}`;

    masukanSection = `MASUKAN WARGA (Terverifikasi):
${masukanWargaJsonString}`;
  } else {
    modeInstruction = `MODE: DATA MASTER SAJA
Strategi: Analisis murni berdasarkan data master karena masukan warga tidak tersedia.
- Urutkan berdasarkan kritikalitas: KRITIS → TINGGI → SEDANG → RENDAH.
- Jika field 'jumlah' ada, bobotkan isu dengan jumlah lebih besar.
- evidence.masukanWargaCount WAJIB diisi 0.
- alasanAnalisis WAJIB menyebutkan "Analisis berbasis Data Master".
- TETAP perhatikan kapasitas kelurahan: jangan buat rekomendasi yang tidak realistis secara anggaran dan sumber daya.
- TETAP terapkan aturan relevansi tematik (lihat di atas).`;

    masukanSection = `MASUKAN WARGA: Tidak tersedia (mode cadangan)`;
  }

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
Berikut adalah daftar program kelurahan yang statusnya "BERJALAN" (sedang dikerjakan). Anda WAJIB menghindari menghasilkan rekomendasi prioritas yang serupa dengan program-program ini, baik dari segi judul, deskripsi, maupun lokasi.

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
      "alasanAnalisis": "String, min 30 karakter, jelaskan sumber data dan logika scoring, serta sebutkan bahwa kegiatan ini realistis untuk kelurahan",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "RT 001 RW 002",
      "fingerprint": "",
      "evidence": {
        "masukanWargaCount": 2,
        "dataMasterCount": 1,
        "kritikalitas": "TINGGI"
      },
      "usedMasukanIds": ["id1", "id2"],
      "usedDataMasterIds": ["id3"]
    },
    {
      "prioritasKe": 2,
      "deskripsi": "...",
      "skorPrioritas": 0.88,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 1, "dataMasterCount": 2, "kritikalitas": "TINGGI" },
      "usedMasukanIds": ["id4"],
      "usedDataMasterIds": ["id5", "id6"]
    },
    {
      "prioritasKe": 3,
      "deskripsi": "...",
      "skorPrioritas": 0.82,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 1, "kritikalitas": "SEDANG" },
      "usedMasukanIds": [],
      "usedDataMasterIds": ["id7"]
    },
    {
      "prioritasKe": 4,
      "deskripsi": "...",
      "skorPrioritas": 0.20,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "RENDAH" },
      "usedMasukanIds": [],
      "usedDataMasterIds": []
    },
    {
      "prioritasKe": 5,
      "deskripsi": "...",
      "skorPrioritas": 0.15,
      "alasanAnalisis": "...",
      "domainIsuId": "${domainIsuId}",
      "lokasi": "...",
      "fingerprint": "",
      "evidence": { "masukanWargaCount": 0, "dataMasterCount": 0, "kritikalitas": "RENDAH" },
      "usedMasukanIds": [],
      "usedDataMasterIds": []
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
- **WAJIB**: Pastikan semua rekomendasi yang memiliki evidence ditempatkan di atas rekomendasi tanpa evidence.
- Jangan tambahkan field baru atau hapus field wajib.
- Jangan gunakan komentar atau teks di luar JSON.
- Pastikan JSON dapat di-parse oleh JSON.parse().
- Untuk setiap rekomendasi, hitung masukanWargaCount dan dataMasterCount berdasarkan data masukan dan data master yang benar-benar relevan dengan rekomendasi tersebut. Jangan membuat angka fiktif.
- Kritikalitas harus diambil dari data master yang paling dominan atau berdasarkan penilaian dari data yang ada.
- evidence.masukanWargaCount harus diisi dengan jumlah masukan warga yang mendukung rekomendasi tersebut (dari data yang diberikan).
- evidence.dataMasterCount harus diisi dengan jumlah data master yang mendukung rekomendasi tersebut (dari data yang diberikan).
- evidence.kritikalitas harus diisi berdasarkan data master yang paling relevan.
- PENTING: Rekomendasi prioritas harus didasarkan pada data yang tersedia. Jangan merekomendasikan isu yang sama sekali tidak memiliki evidence, kecuali jika sama sekali tidak ada data untuk domain isu tersebut. Jika terpaksa merekomendasikan tanpa evidence, beri skor maksimal 0.20.
- Gabungkan data master yang saling berkaitan dalam satu rekomendasi, jangan dipisah.
- Manfaatkan beberapa masukan warga yang relevan untuk memperkuat satu rekomendasi.

**WAJIB - RELEVANSI DATA DI FINAL OUTPUT:**
- Sebelum menetapkan evidence untuk suatu rekomendasi, periksa kembali apakah data tersebut benar-benar relevan secara tematik dan sesuai dengan KONTEKS RAPAT.
- Untuk rapat HUT RI, kegiatan yang relevan: lomba, gotong royong, kebersihan, dekorasi, jalan santai, bakti sosial, dll.
- JANGAN gunakan data agama untuk rekomendasi HUT RI kecuali jika rapat secara spesifik membahas kegiatan keagamaan bersama.
- Jika Anda ragu apakah suatu data relevan dengan konteks rapat, lebih baik tidak digunakan.

**PENTING - KONSISTENSI ID (WAJIB):**
- Setiap prioritas WAJIB memiliki field "usedMasukanIds" dan "usedDataMasterIds".
- usedMasukanIds harus berisi ID dari masukan warga yang digunakan sebagai evidence, dan jumlah elemennya HARUS sama dengan evidence.masukanWargaCount.
- usedDataMasterIds harus berisi ID dari data master yang digunakan sebagai evidence, dan jumlah elemennya HARUS sama dengan evidence.dataMasterCount.
- ID yang dicantumkan HARUS berasal dari data yang diberikan (jangan buat ID fiktif).
- Jika evidence.masukanWargaCount = 0, maka usedMasukanIds harus berupa array kosong [].
- Jika evidence.dataMasterCount = 0, maka usedDataMasterIds harus berupa array kosong [].
- Deskripsi dan alasanAnalisis harus konsisten dengan ID yang dipilih.

**VALIDASI KONSISTENSI (WAJIB DIPERIKSA SEBELUM OUTPUT):**
- Panjang array usedMasukanIds HARUS sama dengan evidence.masukanWargaCount
- Panjang array usedDataMasterIds HARUS sama dengan evidence.dataMasterCount
- Jika tidak sama, PERBAIKI dengan menambahkan atau menghapus ID yang sesuai.

**INSTRUKSI PENGGABUNGAN DATA:**
- Dalam mode FUSI_DATA, setiap prioritas HARUS berusaha memanfaatkan KEDUA jenis data jika terdapat keterkaitan tematik.
- Jangan membuat rekomendasi terpisah untuk masukan dan data master jika topiknya bisa digabung.
- Jika memang tidak ada data master yang relevan dengan suatu masukan, barulah gunakan hanya masukan saja (dan sebaliknya).

**TERAKHIR: SETIAP REKOMENDASI HARUS REALISTIS DAN SESUAI KAPASITAS KELURAHAN**

Sekarang, hasilkan rekomendasi berdasarkan data di atas. Output HANYA JSON.`;
}

import { GoogleGenAI } from "@google/genai";

// ---------- Tipe respons (tetap) ----------
export type GeminiResponse = {
  metadata: {
    generatedAt: string;
    aiModel: string;
    modeRekomendasi: "FUSI_DATA" | "DATA_MASTER_SAJA";
    domainIsuCode: string;
    totalMasukanDianalisis: number;
    totalDataMasterDianalisis: number;
  };
  prioritas: Array<{
    prioritasKe: number;
    deskripsi: string;
    skorPrioritas: number;
    alasanAnalisis: string;
    domainIsuId: string;
    lokasiRt?: string;
    lokasiRw?: string;
    fingerprint?: string;
    evidence?: {
      masukanWargaCount?: number;
      dataMasterCount?: number;
      kritikalitas?: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
    };
  }>;
  inputData?: {
    masukan: Array<{
      id: string;
      judul: string;
      deskripsi: string;
      lokasiRt: string;
      lokasiRw: string;
    }>;
    dataMaster: Array<{
      id: string;
      namaAtribut: string;
      kritikalitas: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
      jumlah: number | null;
    }>;
  };
};

// ---------- Google GenAI langsung ----------
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function geminiDirect(prompt: string): Promise<GeminiResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  if (!response.text) {
    throw new Error("Gemini AI returned empty response text.");
  }

  const parsed = JSON.parse(response.text) as GeminiResponse;

  if (!parsed.metadata || !Array.isArray(parsed.prioritas)) {
    throw new Error("Gemini AI response structure is invalid.");
  }

  if (parsed.prioritas.length !== 5) {
    console.warn(
      `⚠️  Gemini returned ${parsed.prioritas.length} priorities, expected 5`,
    );
  }

  return parsed;
}

// ---------- OpenRouter fallback ----------
async function geminiViaOpenRouter(prompt: string): Promise<GeminiResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY tidak tersedia untuk fallback");
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      // Optional: masukkan referer untuk peringkat
      // "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash", // ID model di OpenRouter
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      // OpenRouter tidak mendukung responseMimeType, jadi kita andalkan prompt meminta JSON
      // Prompt di buildPrompt sudah meminta respons JSON, jadi aman.
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenRouter error: ${res.status} ${errorText}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter response kosong");
  }

  // Parse JSON dari string content
  // Kadang OpenRouter meletakkan JSON di dalam markdown code fences, kita bersihkan dulu
  let cleanContent = content.trim();
  if (cleanContent.startsWith("```json")) {
    cleanContent = cleanContent
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
  }

  const parsed = JSON.parse(cleanContent) as GeminiResponse;

  if (!parsed.metadata || !Array.isArray(parsed.prioritas)) {
    throw new Error("OpenRouter response structure invalid");
  }

  if (parsed.prioritas.length !== 5) {
    console.warn(
      `⚠️  OpenRouter returned ${parsed.prioritas.length} priorities, expected 5`,
    );
  }

  return parsed;
}

// ---------- Fungsi utama dengan fallback ----------
export async function geminiAi(prompt: string): Promise<GeminiResponse> {
  try {
    // Coba panggil langsung ke Gemini
    return await geminiDirect(prompt);
  } catch (directError) {
    console.warn(
      "Gemini AI (direct) gagal:",
      directError instanceof Error ? directError.message : directError,
    );
    console.log("🔁 Mencoba fallback ke OpenRouter...");

    try {
      return await geminiViaOpenRouter(prompt);
    } catch (fallbackError) {
      console.error(
        "OpenRouter juga gagal:",
        fallbackError instanceof Error ? fallbackError.message : fallbackError,
      );
      throw new Error(
        `Gagal generate rekomendasi melalui semua jalur: ${
          fallbackError instanceof Error
            ? fallbackError.message
            : "Unknown error"
        }`,
      );
    }
  }
}

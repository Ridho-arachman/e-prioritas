import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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
    fingerprint?: string; // Optional: backend will generate if not provided
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

export async function geminiAi(prompt: string): Promise<GeminiResponse> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Lower temperature for more deterministic output
      },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    if (!response.text) {
      throw new Error("Gemini AI returned empty response text.");
    }

    // Parse JSON response
    const parsed = JSON.parse(response.text) as GeminiResponse;

    // Validate structure (basic check)
    if (!parsed.metadata || !Array.isArray(parsed.prioritas)) {
      throw new Error("Gemini AI response structure is invalid.");
    }

    // Ensure exactly 5 priorities
    if (parsed.prioritas.length !== 5) {
      console.warn(
        `⚠️  Gemini returned ${parsed.prioritas.length} priorities, expected 5`,
      );
    }

    return parsed;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error(
      `Failed to generate recommendation: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

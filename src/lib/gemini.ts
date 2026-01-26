import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function geminiAi(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
    },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  // Perbaikan: Tambahkan penanganan jika response.text undefined (walaupun jarang)
  if (!response.text) {
    throw new Error("Gemini AI returned empty response text.");
  }

  return response.text;
}

// stores/masukanFormAddDraft.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface MasukanDraft {
  namaPengirim: string;
  nomorHp: string;
  judul: string;
  lokasiRt: string;
  lokasiRw: string;
  deskripsi: string;
  domainIsuId: string;
  // Gambar draft (preview base64)
  imagePreview?: string | null;
  imageFileName?: string;
  imageSize?: number;
  // Status alur dua langkah
  pendingWhatsApp: boolean;
  whatsappLink?: string | null;
  // Kode tracking (UUID)
  trackingId?: string | null;
}

interface MasukanDraftStore {
  data: MasukanDraft | null;
  isHydrated: boolean;
  updateDraft: (data: Partial<MasukanDraft>) => void;
  clearDraft: () => void;
  setHydrated: () => void;
}

const defaultDraft: MasukanDraft = {
  namaPengirim: "",
  nomorHp: "",
  judul: "",
  lokasiRt: "",
  lokasiRw: "",
  deskripsi: "",
  domainIsuId: "",
  imagePreview: null,
  imageFileName: undefined,
  imageSize: undefined,
  pendingWhatsApp: false,
  whatsappLink: null,
  trackingId: null,
};

export const useMasukanDraftStore = create<MasukanDraftStore>()(
  persist(
    (set) => ({
      data: null,
      isHydrated: false,
      updateDraft: (partialData) =>
        set((state) => ({
          data: state.data
            ? { ...state.data, ...partialData }
            : { ...defaultDraft, ...partialData },
          isHydrated: true,
        })),
      clearDraft: () => set({ data: null, isHydrated: true }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "masukan-draft-storage",
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error("Rehydrate error:", error);
        if (state) state.setHydrated();
      },
      storage: createJSONStorage(() => {
        if (typeof window === "undefined")
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        return sessionStorage; // Pakai sessionStorage agar per tab terpisah
      }),
      partialize: (state) => ({ data: state.data }),
    },
  ),
);

// stores/perangkatFormAddDraft.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PerangkatDraft {
  name: string;
  email: string;
  role: "PERANGKAT_DESA" | "LURAH";
  jabatan: string;
  isActive: boolean;
  imagePreview?: string | null;
  imageFileName?: string;
  imageSize?: number;
}

interface PerangkatDraftStore {
  data: PerangkatDraft | null;
  isHydrated: boolean;
  updateDraft: (data: Partial<PerangkatDraft>) => void;
  clearDraft: () => void;
  setHydrated: () => void;
}

export const usePerangkatDraftStore = create<PerangkatDraftStore>()(
  persist(
    (set) => ({
      data: null,
      isHydrated: false,

      updateDraft: (partialData) =>
        set((state) => ({
          data: state.data
            ? { ...state.data, ...partialData }
            : {
                name: "",
                email: "",
                role: "PERANGKAT_DESA",
                jabatan: "",
                isActive: true,
                ...partialData,
              },
          isHydrated: true,
        })),

      clearDraft: () => set({ data: null, isHydrated: true }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "perangkat-draft-storage",

      // ✅ onRehydrateStorage: set hydrated setelah rehydration selesai
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Rehydrate error:", error);
          return;
        }
        if (state) {
          state.setHydrated();
        }
      },

      // ✅ FIX UTAMA: Gunakan createJSONStorage dengan guard typeof window
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),

      partialize: (state) => ({
        data: state.data,
      }),
    },
  ),
);

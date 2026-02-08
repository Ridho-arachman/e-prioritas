import { create } from "zustand";
import { persist } from "zustand/middleware";

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
          isHydrated: true, // ✅ Set hydrated saat update
        })),
      clearDraft: () => set({ data: null, isHydrated: true }),
    }),
    {
      name: "perangkat-draft-storage",
      // ✅ onRehydrateStorage untuk set flag setelah load
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Rehydrate error:", error);
        }
      },
      // ✅ Custom storage untuk handle hydration flag
      storage: {
        getItem: async (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: async (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);

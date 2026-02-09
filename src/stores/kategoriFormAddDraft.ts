// stores/kategoriFormAddDraft.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface KategoriDraft {
  code: string;
  nama: string;
  deskripsi: string;
}

interface KategoriDraftStore {
  data: KategoriDraft | null;
  isHydrated: boolean;
  updateDraft: (data: Partial<KategoriDraft>) => void;
  clearDraft: () => void;
  setHydrated: () => void;
}

export const useKategoriDraftStore = create<KategoriDraftStore>()(
  persist(
    (set, get) => ({
      data: null,
      isHydrated: false,

      updateDraft: (partialData) =>
        set((state) => {
          const currentData = state.data || {
            code: "",
            nama: "",
            deskripsi: "",
          };

          return {
            data: { ...currentData, ...partialData },
          };
        }),

      clearDraft: () => set({ data: null }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "kategori-draft-storage",
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
      onRehydrateStorage: () => (state) => {
        // Set hydrated state after rehydration
        if (state) {
          state.isHydrated = true;
        }
      },
      partialize: (state) => ({
        data: state.data,
      }),
    },
  ),
);

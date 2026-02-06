// stores/perangkatFormAddDraft.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PerangkatFormDraft {
  name: string;
  email: string;
  phoneNumber: string;
  role: "PERANGKAT_DESA" | "LURAH" | "";
  jabatan: string;
  isActive: boolean;
}

interface PerangkatFormDraftStore {
  data: PerangkatFormDraft;
  updateDraft: (data: Partial<PerangkatFormDraft>) => void;
  clearDraft: () => void;
  lastSaved: string | null;
  isHydrated: boolean; // 🔥 NEW: Untuk tahu kapan data sudah di-load
}

const initialData: PerangkatFormDraft = {
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
  jabatan: "",
  isActive: true,
};

export const usePerangkatDraftStore = create<PerangkatFormDraftStore>()(
  persist(
    (set) => ({
      data: initialData,
      lastSaved: null,
      isHydrated: false, // 🔥 Default false

      updateDraft: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
          lastSaved: new Date().toISOString(),
        })),

      clearDraft: () =>
        set({
          data: initialData,
          lastSaved: null,
        }),
    }),
    {
      name: "perangkat-form-draft",
      onRehydrateStorage: () => (state) => {
        // 🔥 Set hydrated jadi true setelah data di-load
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);

// stores/userStore.ts
"use client"; // ✅ Pindahkan ke baris 1, sebelum import!

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isHydrated: boolean;
  setHydrated: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      setUser: (user) => set({ user, isHydrated: true }),
      clearUser: () => set({ user: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "user-storage",

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("User store rehydrate error:", error);
          return;
        }
        if (state) {
          state.setHydrated();
        }
      },

      // ✅ SSR-safe storage
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
        user: state.user,
      }),
    },
  ),
);

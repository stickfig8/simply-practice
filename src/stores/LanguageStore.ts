import { create } from "zustand";
import type { LanguageStoreState } from "@/types/store/LanguageStoreState";
import { persist } from "zustand/middleware";

export const useLanguageStore = create<LanguageStoreState>()(
  persist(
    (set) => ({
      lang: "kor",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "language-storage",
    }
  )
);

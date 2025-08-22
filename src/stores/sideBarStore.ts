import { create } from "zustand";
import { persist } from "zustand/middleware";

type SideBarStoreState = {
  isOpen: boolean;

  setIsOpen: (val: boolean) => void;
};

export const useSideBarStore = create<SideBarStoreState>()(
  persist(
    (set) => ({
      isOpen: true,

      setIsOpen: (val: boolean) => set({ isOpen: val }),
    }),
    {
      name: "sidebar-storage",
    }
  )
);

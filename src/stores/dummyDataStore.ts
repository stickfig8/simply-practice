import { create } from "zustand";
import type { PracticeLog } from "@/types/practiceDataTypes";
import { dummydata } from "@/assets/dummydata";

// 테스트 및 시연 용
type PracticeLogStore = {
  logData: PracticeLog[];
  addLog: (log: PracticeLog) => void;
};

export const useDummyLogStore = create<PracticeLogStore>((set) => ({
  logData: dummydata,
  addLog: (log) => set((state) => ({ logData: [...state.logData, log] })),
}));

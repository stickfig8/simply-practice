import { create } from "zustand";
import type { MetronomeState } from "../types/MetronomeStoreState";
import { persist } from "zustand/middleware";

export const useMetronomeStore = create<MetronomeState>()(
  persist(
    (set) => ({
      bpm: 120,
      beatsPerMeasure: 4,
      note: 4,
      subdivision: 1,
      volume: 0.5,

      setBpm: (bpm) => set({ bpm }),
      setBeatsPerMeasure: (beat) => set({ beatsPerMeasure: beat }),
      setNote: (note) => set({ note: note }),
      setSubdivision: (sub) => set({ subdivision: sub }),
      setVolume: (vol) => set({ volume: vol }),
    }),
    {
      name: "metronome-storage",
    },
  ),
);

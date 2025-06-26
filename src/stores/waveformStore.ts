import { create } from "zustand";
import type { WaveformStoreState } from "../types/WaveformStoreState";
import { persist } from "zustand/middleware";

export const useWaveformStore = create<WaveformStoreState>() (
    persist(
        (set) => ({
            bpm: 0,
            volume: 0.5,

            setBpm: (bpm: number) => set({bpm: bpm}),
            setVolume: (volume: number) => set({volume: volume})
        }),
        {
            name: 'waveform-storage'
        }
    )
);
import { create } from "zustand";
import type { WaveformStoreState } from "../types/WaveformStoreState";
import { devtools } from "zustand/middleware";

export const useWaveformStore = create<WaveformStoreState>()(
  devtools((set) => ({
    title: "",
    bpm: 0,
    volume: 0.5,
    loopStart: 0,
    loopEnd: 0,
    zoomLevel: 1,
    isLooping: false,
    isPlaying: false,

    setTitle: (name: string) => set({ title: name }),
    setBpm: (bpm: number) => set({ bpm: bpm }),
    setVolume: (volume: number) => set({ volume: volume }),
    setLoopStart: (start: number) => set({ loopStart: start }),
    setLoopEnd: (end: number) => set({ loopEnd: end }),
    setZoomLevel: (level: number) => set({ zoomLevel: level }),
    setIsLooping: (loop: boolean) => set({ isLooping: loop }),
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  }))
);

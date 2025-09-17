import { create } from "zustand";
import type { WaveformStoreState } from "../types/WaveformStoreState";
import { devtools } from "zustand/middleware";

export const useWaveformStore = create<WaveformStoreState>()(
  devtools((set) => ({
    title: "",
    bpm: 0,
    volume: 0.5,
    playBackRate: 1.0,
    loopStart: 0,
    loopEnd: 0,
    zoomLevel: 1,
    isLooping: false,
    isPlaying: false,
    isReady: false,

    setTitle: (name: string) => set({ title: name }),
    setBpm: (bpm: number) => set({ bpm: bpm }),
    setVolume: (volume: number) => set({ volume: volume }),
    setPlayBackRate: (rate: number) => set({ playBackRate: rate }),
    setLoopStart: (start: number) => set({ loopStart: start }),
    setLoopEnd: (end: number) => set({ loopEnd: end }),
    setZoomLevel: (level: number) => set({ zoomLevel: level }),
    setIsLooping: (loop: boolean) => set({ isLooping: loop }),
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
    setIsReady: (isReady: boolean) => set({ isReady: isReady }),
  }))
);

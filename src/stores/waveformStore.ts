import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WaveformStoreState } from "../types/store/WaveformStoreState";
import type { WaveformStoreActions } from "@/types/store/WaveformStoreActions";

const initialState: Omit<WaveformStoreState, keyof WaveformStoreActions> = {
  title: "",
  bpm: 0,
  volume: 0.5,
  duration: 0,
  position: 0,
  playBackRate: 1.0,
  loopStart: 0,
  loopEnd: 0,
  zoomLevel: 1,
  isLooping: false,
  isPlaying: false,
  isReady: false,
};

export const useWaveformStore = create<WaveformStoreState>()(
  devtools((set) => ({
    ...initialState,

    setTitle: (title) => set({ title }),
    setBpm: (bpm) => set({ bpm }),
    setVolume: (volume) => set({ volume }),
    setDuration: (duration) => set({ duration }),
    setPosition: (position) => set({ position }),
    setPlayBackRate: (rate) => set({ playBackRate: rate }),
    setLoopStart: (start) => set({ loopStart: start }),
    setLoopEnd: (end) => set({ loopEnd: end }),
    setZoomLevel: (level) => set({ zoomLevel: level }),
    setIsLooping: (loop) => set({ isLooping: loop }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setIsReady: (isReady) => set({ isReady }),

    reset: () => set({ ...initialState }),
  }))
);

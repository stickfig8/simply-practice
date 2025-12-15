import { create } from "zustand";
import type { WaveformStoreState } from "../types/store/WaveformStoreState";
import { devtools } from "zustand/middleware";

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

type WaveformStoreActions = {
  setTitle: (name: string) => void;
  setBpm: (bpm: number) => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setPosition: (position: number) => void;
  setPlayBackRate: (rate: number) => void;
  setLoopStart: (start: number) => void;
  setLoopEnd: (end: number) => void;
  setZoomLevel: (level: number) => void;
  setIsLooping: (loop: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsReady: (isReady: boolean) => void;
  reset: () => void;
};

export const useWaveformStore = create<
  WaveformStoreState & WaveformStoreActions
>()(
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

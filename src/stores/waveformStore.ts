import { create } from "zustand";
import type { WaveformStoreState } from "../types/WaveformStoreState";
import { persist } from "zustand/middleware";

export const useWaveformStore = create<WaveformStoreState>() (
    persist(
        (set) => ({
            title: '',
            bpm: 0,
            volume: 0.5,
            loopStart: 0,
            loopEnd: 10,
            isLooping: false,
            
            setTitle: (name: string) => set({title: name}),
            setBpm: (bpm: number) => set({bpm: bpm}),
            setVolume: (volume: number) => set({volume: volume}),
            setLoopStart: (start: number) => set({loopStart: start}),
            setLoopEnd: (end: number) => set({loopEnd: end}),
            setIsLooping: (loop: boolean) => set({isLooping: loop})
        }),
        {
            name: 'waveform-storage'
        }
    )
);
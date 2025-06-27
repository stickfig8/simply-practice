import { create } from "zustand";
import type { AudioInputStoreState } from "../types/AudioInputStoreState";
import { persist } from "zustand/middleware";

export const useAudioInputStore = create<AudioInputStoreState>()(
    persist(
        (set) => ({
            devices: [],
            inputId: null,
            channel: 0,
            channelCount: 1,
            volume: 0.5,

            setDevices: (devices: MediaDeviceInfo[]) => set({devices : devices}),
            setInputId: (id: string | null) => set({inputId: id}),
            setChannel: (n: number) => set({channel: n}),
            setChannelCount: (s: number) => set({channelCount: s}),
            setVolume: (volume: number) => set({volume: volume}),
        }),
        {
            name: 'audioInput-storage'
        }
    )
);

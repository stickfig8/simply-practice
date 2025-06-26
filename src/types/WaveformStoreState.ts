export type WaveformStoreState = {
    bpm: number | null;
    volume: number;

    setBpm: (bpm: number) => void;
    setVolume: (volume: number) => void;
}
export type WaveformStoreState = {
  title: string;
  bpm: number | null;
  volume: number;
  loopStart: number;
  loopEnd: number;
  zoomLevel: number;
  isLooping: boolean;
  isPlaying: boolean;

  setTitle: (name: string) => void;
  setBpm: (bpm: number) => void;
  setVolume: (volume: number) => void;
  setLoopStart: (start: number) => void;
  setLoopEnd: (end: number) => void;
  setZoomLevel: (level: number) => void;
  setIsLooping: (loop: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

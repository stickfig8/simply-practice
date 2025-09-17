export type WaveformStoreState = {
  title: string;
  bpm: number | null;
  volume: number;
  duration: number;
  position: number;
  playBackRate: number;
  loopStart: number;
  loopEnd: number;
  zoomLevel: number;
  isLooping: boolean;
  isPlaying: boolean;
  isReady: boolean;

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
};

export type MetronomeState = {
  bpm: number;
  beatsPerMeasure: number;
  note: number;
  subdivision: number;
  volume: number;

  setBpm: (bpm: number) => void;
  setBeatsPerMeasure: (b: number) => void;
  setNote: (n: number) => void;
  setSubdivision: (s: number) => void;
  setVolume: (v: number) => void;
};

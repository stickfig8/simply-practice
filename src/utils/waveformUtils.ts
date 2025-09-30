import { analyze } from "web-audio-beat-detector";

export async function analyzeBPM(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const tempo = await analyze(audioBuffer);
  return tempo;
}

export function formatPosition(position: number): string {
  const floored = Math.floor(position);

  const minutes = Math.floor(floored / 60);
  const secs = floored % 60;

  const m = String(minutes).padStart(2, "0");
  const s = String(secs).padStart(2, "0");

  return `${m}:${s}`;
}

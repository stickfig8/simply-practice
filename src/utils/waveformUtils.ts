import { analyze } from "web-audio-beat-detector";

export async function analyzeBPM(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const tempo = await analyze(audioBuffer);
  return tempo;
}

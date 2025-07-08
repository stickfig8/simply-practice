import { analyze } from "web-audio-beat-detector";

export async function analyzeBPM(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const tempo = await analyze(audioBuffer);
  return tempo;
}

export function handleVolumeChange(setVolume: (volume: number) => void) {
  return function (e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value));
  };
}

export function handleLoopingCheck(setIsLooping: (isLooping: boolean) => void) {
  return function (e: React.ChangeEvent<HTMLInputElement>) {
    setIsLooping(e.target.checked);
  };
}

export function handleZoomLevelChange(setZoomLevel: (zoom: number) => void) {
  return function (e: React.ChangeEvent<HTMLInputElement>) {
    setZoomLevel(Number(e.target.value));
  };
}

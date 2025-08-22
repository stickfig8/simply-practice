import { useWaveformStore } from "../../stores/waveformStore";
import { useWaveform } from "../../hooks/useWaveform";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

export default function Waveform() {
  const {
    bpm,
    zoomLevel,
    title,
    isLooping,
    isPlaying,
    loopStart,
    loopEnd,
    volume,
    playBackRate,
    setZoomLevel,
    setIsLooping,
    setVolume,
    setPlayBackRate,
  } = useWaveformStore();

  const { handleFileChange, togglePlay, containerRef } = useWaveform();

  return (
    <div className="space-y-4 item-center w-full">
      <input
        type="file"
        id="fileInput"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-2 hidden"
      />
      <Label
        htmlFor="fileInput"
        className="w-fit h-fit border-2 cursor-pointer"
      >
        파일
      </Label>

      <div className="w-full h-29 border-1 overflow-hidden">
        <div ref={containerRef} className="w-full bg-gray-100 rounded" />
      </div>

      <input
        id="zoom"
        type="range"
        min={1}
        max={50}
        value={zoomLevel}
        onChange={(e) => setZoomLevel(Number(e.target.value))}
      />

      <input
        type="checkbox"
        checked={isLooping}
        onChange={(e) => setIsLooping(e.target.checked)}
      />
      <label>loop</label>

      <Button
        className="cursor-pointer"
        variant="outline"
        size="default"
        onClick={togglePlay}
        disabled={title === ""}
      >
        {isPlaying ? "정지" : "재생"}
      </Button>
      <input
        id="playbackrate"
        type="range"
        min={0.5}
        max={1.5}
        step="0.1"
        value={playBackRate}
        onChange={(e) => setPlayBackRate(Number(e.target.value))}
      />
      <p className="text-sm text-gray-600">배속: {playBackRate}X</p>
      {bpm && (
        <p className="text-sm text-gray-600">추정 BPM: {Math.round(bpm)}</p>
      )}
      <p className="text-sm text-gray-600">제목: {title}</p>
      <input
        id="volume"
        type="range"
        min="0"
        max="1.0"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <p>{loopStart + " : " + loopEnd}</p>
    </div>
  );
}

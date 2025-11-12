import { useWaveformStore } from "../../stores/waveformStore";
import { useWaveform } from "../../hooks/useWaveform";
import CommonButton from "../common/CommonButton";
import { Slider } from "../ui/slider";
import { formatPosition } from "@/utils/waveformUtils";

import { Play, Pause, Rewind, FastForward, File } from "lucide-react";

export default function Waveform() {
  const {
    bpm,
    zoomLevel,
    title,
    duration,
    position,
    isLooping,
    isPlaying,
    loopStart,
    loopEnd,
    volume,
    playBackRate,
    isReady,
    setZoomLevel,
    setIsLooping,
    setVolume,
    setPlayBackRate,
  } = useWaveformStore();

  const {
    handleFileChange,
    togglePlay,
    setForward,
    setBackward,
    setTimeSlider,
    containerRef,
  } = useWaveform();

  return (
    <div className={`space-y-4 py-3`}>
      <div className="flex gap-1 items-center">
        <input
          type="file"
          id="fileInput"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-2 hidden"
        />
        <label htmlFor="fileInput" className="w-fit h-fit cursor-pointer">
          <File strokeWidth={2} />
        </label>
        <CommonButton
          width="60px"
          height="40px"
          onClick={setBackward}
          disabled={!isReady}
        >
          <Rewind />
        </CommonButton>
        <CommonButton
          width="60px"
          height="40px"
          onClick={togglePlay}
          disabled={!isReady}
        >
          {isPlaying ? <Pause /> : <Play />}
        </CommonButton>
        <CommonButton
          width="60px"
          height="40px"
          onClick={setForward}
          disabled={!isReady}
        >
          <FastForward />
        </CommonButton>
      </div>

      <div className="relative w-full h-29 border-1 overflow-x-auto overflow-y-hidden">
        <div
          ref={containerRef}
          className="absolute inset-0 bg-gray-100 rounded"
        />
      </div>
      <div className="text-lg flex justify-between items-centrer">
        <p>{formatPosition(position)}</p>
        <p>{formatPosition(duration)}</p>
      </div>

      <Slider
        id="playPosition"
        min={0}
        max={duration}
        step={0.01}
        value={[position]}
        disabled={!isReady}
        onValueChange={(val) => setTimeSlider(val[0])}
      />

      <Slider
        id="zoom"
        min={1}
        max={50}
        step={1}
        value={[zoomLevel]}
        onValueChange={(val) => setZoomLevel(val[0])}
        disabled={!isReady}
        className="w-50"
      />

      <input
        type="checkbox"
        checked={isLooping}
        onChange={(e) => setIsLooping(e.target.checked)}
        disabled={!isReady}
      />
      <label>loop</label>

      {/* <Button
        className="cursor-pointer"
        variant="outline"
        size="default"
        onClick={togglePlay}
        disabled={!isReady}
      >
        {isPlaying ? "정지" : "재생"}
      </Button> */}

      <input
        id="playbackrate"
        type="range"
        min={0.5}
        max={1.5}
        step="0.1"
        value={playBackRate}
        onChange={(e) => setPlayBackRate(Number(e.target.value))}
        disabled={!isReady}
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
        disabled={!isReady}
      />
      <p>{formatPosition(loopStart) + " ~ " + formatPosition(loopEnd)}</p>
    </div>
  );
}

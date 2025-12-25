import { useWaveformStore } from "../../stores/waveformStore";
import { useWaveform } from "@/hooks/practice/useWaveform";
import CommonButton from "../common/CommonButton";
import ControlWithLabel from "../common/ControlWithLabel";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { formatPosition } from "@/utils/waveformUtils";

import {
  Play,
  Pause,
  Rewind,
  FastForward,
  File,
  VolumeX,
  Volume1,
  Volume2,
  ZoomIn,
  ZoomOut,
  Repeat,
} from "lucide-react";
import { useLanguageStore } from "@/stores/languageSettingStore";
import { languageText } from "@/configs/language";

export default function Waveform() {
  const {
    bpm,
    zoomLevel,
    title,
    duration,
    position,
    isLooping,
    isPlaying,
    //loopStart,
    //loopEnd,
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
    //setTimeSlider,
    containerRef,
    isDragging,
  } = useWaveform();

  const { lang } = useLanguageStore();
  const text = languageText.practice;
  return (
    <div className={`space-y-4 py-3 border-1 px-2 rounded-[16px] shadow-md`}>
      {/* 상단 컨트롤 부 */}
      <div className="flex gap-5 items-center flex-wrap">
        <div className="flex gap-1 items-center">
          <input
            type="file"
            id="fileInput"
            accept="audio/*"
            onChange={handleFileChange}
            className="mb-2 hidden"
          />
          <label
            htmlFor="fileInput"
            className="w-[50px] h-[36px] cursor-pointer border-1 rounded-[8px] shadow-md flex items-center justify-center"
          >
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
        <ControlWithLabel>
          {!isReady || volume == 0 ? (
            <VolumeX />
          ) : volume < 0.51 ? (
            <Volume1 />
          ) : (
            <Volume2 />
          )}

          <Slider
            id="volume"
            min={0}
            max={1.0}
            step={0.01}
            value={[volume]}
            onValueChange={(val) => setVolume(val[0])}
            disabled={!isReady}
            className="w-30"
          />
        </ControlWithLabel>

        <ControlWithLabel>
          {zoomLevel < 25 ? <ZoomIn /> : <ZoomOut />}
          <Slider
            id="zoom"
            min={1}
            max={50}
            step={1}
            value={[zoomLevel]}
            onValueChange={(val) => setZoomLevel(val[0])}
            disabled={!isReady}
            className="w-30"
          />
        </ControlWithLabel>
        <ControlWithLabel>
          <Repeat />
          <Checkbox
            checked={isLooping}
            onCheckedChange={(e) => setIsLooping(Boolean(e))}
            disabled={!isReady}
          />
        </ControlWithLabel>
      </div>

      <div className="relative w-full h-29 border-1 overflow-x-auto overflow-y-hidden">
        <div
          ref={containerRef}
          className="absolute inset-0 bg-gray-100 rounded"
        />

        {!isReady && !isDragging && (
          <div className="absolute inset-0 w-full h-full bg-gray-300 flex justify-center items-center text-xs">
            {text.playback.loadMessage[lang]}
          </div>
        )}
      </div>
      <div className="text-sm flex justify-between items-centrer">
        <p>{formatPosition(position)}</p>
        <p>{formatPosition(duration)}</p>
      </div>

      {/* <Slider
        id="playPosition"
        min={0}
        max={duration}
        step={0.01}
        value={[position]}
        disabled={!isReady}
        onValueChange={(val) => setTimeSlider(val[0])}
      /> */}

      <div className="w-fit h-fit flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          {text.playback.title[lang]} {title ? title : "-"}
        </p>
        <p className="text-sm text-gray-600">
          {text.playback.bpm[lang]}
          {bpm ? Math.round(bpm) : "-"}
        </p>
      </div>
      <ControlWithLabel>
        <p className="text-sm text-gray-600">
          {text.playback.playSpeed[lang]}
          {playBackRate}X
        </p>
        <Slider
          id="playbackrate"
          min={0.5}
          max={1.5}
          step={0.1}
          value={[playBackRate]}
          onValueChange={(val) => setPlayBackRate(val[0])}
          disabled={!isReady}
          className="w-30"
        />
      </ControlWithLabel>

      {/* <p>{formatPosition(loopStart) + " ~ " + formatPosition(loopEnd)}</p> */}
    </div>
  );
}

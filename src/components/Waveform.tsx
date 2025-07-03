import { useRef } from "react";
import { useWaveformStore } from "../stores/waveformStore";
import { handleLoopingCheck, handleZoomLevelChange, handleVolumeChange} from "../utils/waveformHandlers";
import { useWaveform } from "../hooks/useWaveform";

export default function Waveform() {
    const { bpm, zoomLevel, title, isLooping, isPlaying, setZoomLevel, setIsLooping } = useWaveformStore();
    
    const {volume, setVolume} = useWaveformStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { handleFileChange, togglePlay } = useWaveform(containerRef);

    return(
        <div className="p-4 space-y-4 item-center">
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="mb-2"
            />

            <div ref={containerRef} className="w-100 h-full bg-gray-100 rounded overflow-x-scroll " />

            <input id="zoom" type="range" min={1} max={50} value={zoomLevel} onChange={handleZoomLevelChange(setZoomLevel)} />

            <input type="checkbox" checked={isLooping} onChange={handleLoopingCheck(setIsLooping)}/>
            <label>loop</label>
            
            <button
                onClick={togglePlay}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                {isPlaying ? "정지" : "재생"}
            </button>

            {bpm && <p className="text-sm text-gray-600">추정 BPM: {Math.round(bpm)}</p>}
            {title && <p className="text-sm text-gray-600">제목: {title}</p>}
            <input
                id="volume"
                type="range"
                min="0"
                max="1.0"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange(setVolume)}
            />
            <p>{isLooping ? "looping" : "no"}</p>
        </div>
    )
}
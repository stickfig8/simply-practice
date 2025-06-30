import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { analyze } from "web-audio-beat-detector";
import { useWaveformStore } from "../stores/waveformStore";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

export default function Waveform() {
    const {bpm, volume, setBpm, setVolume} = useWaveformStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [test, setTest] = useState(0);
    

    useEffect(() => {
        if(!containerRef.current) return;

        const regions = RegionsPlugin.create();

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: "#999",
            progressColor: "#4f46e5",
            height: 100,
            plugins: [regions]
        });

        waveSurferRef.current = wavesurfer;

        regions.enableDragSelection({color: 'rgba(255, 0, 0, 0.1)'});

        regions.on('region-clicked', (region, e) => {
            e.stopPropagation();
            region.play(true);
        })

        return() => {
            wavesurfer.destroy();
        }
    }, []);

    async function analyzeBPM(file:File) {
        const arrayBuffer = await file.arrayBuffer();
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const tempo = await analyze(audioBuffer);
        setBpm(tempo);
    }
    

    function handleFileChange(e:React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if(!file || !waveSurferRef.current) return;
        
        const url = URL.createObjectURL(file);
        waveSurferRef.current.load(url);
        waveSurferRef.current.setVolume(volume);
        setIsPlaying(false);

        analyzeBPM(file);
    };

    function togglePlay() {
        if(!waveSurferRef.current) return;
        waveSurferRef.current.playPause();
        setIsPlaying(waveSurferRef.current.isPlaying());
    }

    function handleVolumeChange(e:React.ChangeEvent<HTMLInputElement>) {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        waveSurferRef.current?.setVolume(vol);
    }

    return(
        <div className="p-4 space-y-4">
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="mb-2"
            />

            <div ref={containerRef} className="w-full bg-gray-100 rounded" />

            <p>region count: {test}</p>
            <button
                onClick={togglePlay}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                {isPlaying ? "정지" : "재생"}
            </button>

            {bpm && <p className="text-sm text-gray-600">추정 BPM: {Math.round(bpm)}</p>}
            <input
                id="volume"
                type="range"
                min="0"
                max="1.2"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    )
}
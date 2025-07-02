import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { analyze } from "web-audio-beat-detector";
import { useWaveformStore } from "../stores/waveformStore";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

export default function Waveform() {
    const {bpm, volume, loopStart, loopEnd,
        setBpm, setVolume, setLoopStart, setLoopEnd, setIsLooping, setTitle} = useWaveformStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const regionsRef = useRef<RegionsPlugin | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        if(!containerRef.current) return;
        const regions = RegionsPlugin.create();
        regionsRef.current = regions;

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: "#999",
            progressColor: "#4f46e5",
            height: 100,
            plugins: [regions]
        });

        waveSurferRef.current = wavesurfer;

        regions.enableDragSelection({color: 'rgba(255, 0, 0, 0.1)'});

        wavesurfer.on('finish', ()=> {
            wavesurfer.setTime(0);
            setIsPlaying(false);
        })

        regions.on('region-created', (newRegion) => { // 새 리전 생성 시 기존 리전 삭제
            if(!regionsRef.current) return;

            Object.values(regionsRef.current.getRegions()).forEach((region: any) => {
                if(region.id !== newRegion.id) {
                    region.remove();
                }
            })
            setLoopStart(newRegion.start);
            setLoopEnd(newRegion.end);
        })

        regions.on('region-out', (region) => {
            if(useWaveformStore.getState().isLooping) {
                region.play();
            }
        })

        window.addEventListener("keydown", handleKeyDown);

        return() => {
            wavesurfer.destroy();
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    useEffect(() => {
        const wavesurfer = waveSurferRef.current;
        if (wavesurfer && wavesurfer.getDecodedData()) {
            wavesurfer.zoom(zoomLevel);
        }
    }, [zoomLevel]);

    async function analyzeBPM(file:File) {
        const arrayBuffer = await file.arrayBuffer();
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const tempo = await analyze(audioBuffer);
        setBpm(tempo);
    }
    
    async function handleFileChange(e:React.ChangeEvent<HTMLInputElement>) {
        if(!waveSurferRef.current) return;

        setIsPlaying(false);
        setIsLooping(false);
        setLoopStart(0);
        setLoopEnd(10);

        const file = e.target.files?.[0];
        if(!file || !waveSurferRef.current) return;
        
        const url = URL.createObjectURL(file);
        waveSurferRef.current.load(url);
        waveSurferRef.current.setVolume(volume);
        waveSurferRef.current.setTime(0);
        const name = file.name.replace(/\.[^/.]+$/, "");
        setTitle(name); // zustand에 저장

        if(regionsRef.current){ // 새 오디오 로드 시 기존 리전 삭제
            await regionsRef.current.clearRegions();
        }

        waveSurferRef.current.on('decode', () => {
            regionsRef.current?.addRegion({
                start: 0,
                end: 10,
                color: 'rgba(255, 0, 0, 0.1)',
            })
        })

        analyzeBPM(file);
    };

    function togglePlay() {
        if(!waveSurferRef.current || !regionsRef.current) return;

        if(useWaveformStore.getState().isLooping) {
            if(!waveSurferRef.current.isPlaying()) {
                regionsRef.current.getRegions()[0].play(true);
            } else {
                waveSurferRef.current.pause();
            }
        } else {
            waveSurferRef.current.playPause();
        }

        setIsPlaying(waveSurferRef.current.isPlaying());
    }

    function handleVolumeChange(e:React.ChangeEvent<HTMLInputElement>) {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        waveSurferRef.current?.setVolume(vol);
    }

    function handleKeyDown(e: KeyboardEvent) {
        if(e.code === "Space") {
            e.preventDefault();
            togglePlay();
        }
    };

    return(
        <div className="p-4 space-y-4 item-center">
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="mb-2"
            />

            <div ref={containerRef} className="w-100 bg-gray-100 rounded" />
            <input id="zoom" type="range" min={1} max={500} value={zoomLevel} onChange={e => {setZoomLevel(Number(e.target.value))}} />

            <input type="checkbox" checked={useWaveformStore.getState().isLooping} onChange={(e) => setIsLooping(e.target.checked)}/>
            <label>loop</label>
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
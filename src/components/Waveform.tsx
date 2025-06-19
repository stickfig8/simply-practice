import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import MusicTempo from "music-tempo";
//import { EssentiaWASM } from 'essentia.js/dist/essentia-wasm.es.js';
//import { Essentia } from 'essentia.js/dist/essentia.js-core.es.js';


export default function Waveform() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [bpm, setBpm] = useState<number | null>(null);

    useEffect(() => {
        if(!containerRef) return;

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: "#999",
            progressColor: "#4f46e5",
            height: 100,
        });

        waveSurferRef.current = wavesurfer;

        return() => {
            wavesurfer.destroy();
        }
    }, []);

    async function analyzeBPM(file:File) {
        const arrayBuffer = await file.arrayBuffer();
        const ctx = new OfflineAudioContext(1, 44100 * 40, 44100);
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        const rawData = audioBuffer.getChannelData(0);
        const samples = [];

        const interval = 1024;

        for(let i = 0; i < rawData.length; i += interval) {
            let sum = 0;
            for(let j = 0; j < interval; j++) {
                sum += Math.abs(rawData[i + j] || 0);
            }
            samples.push(sum);
        }

        const mt = new MusicTempo(samples);
        
        setBpm(mt.tempo);
        
        
        // const wasm = await EssentiaWASM();
        // const essentia = new Essentia(wasm);

        // const arrayBuffer = await file.arrayBuffer();
        // const audioCtx = new AudioContext();
        // const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        // const channelData = audioBuffer.getChannelData(0);
        // const audioVector = essentia.arrayToVector(channelData);

        // const result = essentia.RhythmExtractor2013(audioVector, audioBuffer.sampleRate);
        // console.log("test: ", result);
        // const bpm = result.bpm;
        
        // setBpm(bpm);

    }

    function handleFileChange(e:React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if(!file || !waveSurferRef.current) return;
        
        const url = URL.createObjectURL(file);
        waveSurferRef.current.load(url);
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
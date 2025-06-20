import { useState, useRef, useEffect } from "react";
import * as Tone from 'tone';

export default function Metronome() {
    const [bpm, setBpm] = useState(120);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [note, setNote] = useState(4);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState(0);

    const indexRef = useRef(0);
    const loopRef = useRef<Tone.Loop | null>(null);

    const samplerRef = useRef<Tone.Sampler | null>(null);

    useEffect(() => {
        samplerRef.current = new Tone.Sampler({
            urls: {
                G3: "/samples/click_high.wav", 
                D3: "/samples/click_low.wav", 
            },
        }).toDestination();
        
        return () => {samplerRef.current?.dispose();};
    }, []);

    useEffect(() => { // 기본 설정
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.timeSignature = beatsPerMeasure;
    }, [bpm, beatsPerMeasure]);

    function startMetronome() {
        if(loopRef.current || !samplerRef.current) return;

     
        loopRef.current = new Tone.Loop((time) => {
            const isDownbeat = indexRef.current % beatsPerMeasure === 0;
            const note = isDownbeat ? "G3" : "D3";

            samplerRef.current!.triggerAttack(note, time);

            setCurrentBeat((indexRef.current % beatsPerMeasure) + 1);
            indexRef.current++;

        }, "4n");

        loopRef.current.start(0);
        Tone.Transport.start();
        setIsPlaying(true);
    };

    function stopMetronome() {
        if(loopRef.current) {
            loopRef.current.stop();
            loopRef.current.dispose();
            loopRef.current = null;
        }

        Tone.Transport.stop();
        indexRef.current = 0;
        setCurrentBeat(0);
        setIsPlaying(false);
    }

    return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Tone.js 메트로놈</h2>

      <div className="flex items-center gap-2">
        <label>BPM:</label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      <div className="flex items-center gap-2">
        <label>Beats / Measure:</label>
        <input
          type="number"
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      <button
        onClick={isPlaying ? stopMetronome : startMetronome}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {isPlaying ? "Stop" : "Start"}
      </button>

      <p className="text-sm text-gray-500">
        Current Beat: {isPlaying ? currentBeat : "-"}
      </p>
    </div>
  );
}
import { useState, useRef, useEffect, useMemo } from "react";
import * as Tone from 'tone';
import { useMetronomeStore } from "../stores/metronomeStore";

export default function Metronome() {
    const {bpm, beatsPerMeasure, note, subdivision, volume, setBpm, setBeatsPerMeasure, setNote, setSubdivision, setVolume } = useMetronomeStore();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState(0);

    const noteDuration = useMemo(() => {return `${note * subdivision}n`}, [note, subdivision]);

    const indexRef = useRef(0);
    const loopRef = useRef<Tone.Loop | null>(null);

    const samplerRef = useRef<Tone.Sampler | null>(null);

    const masterGain = useRef(new Tone.Gain(0.5).toDestination());

    useEffect(() => { // 샘플러 설정(초기 가동)
        samplerRef.current = new Tone.Sampler({
            urls: {
                G3: "/samples/click_high.wav", 
                D3: "/samples/click_low.wav", 
            },
            onload() {
                masterGain.current.gain.value = volume;
            },
        }).connect(masterGain.current);
        
        return () => {samplerRef.current?.dispose();};
    }, []);

    useEffect(() => { // 볼륨 설정
        masterGain.current.gain.value = volume;
    }, [volume]); 

    useEffect(() => { // 기본 설정
        Tone.getTransport().bpm.value = bpm;
        Tone.getTransport().timeSignature = [beatsPerMeasure, note];
        
    }, [note, bpm, beatsPerMeasure]);

    useEffect(() => { // noteDuration 설정
        setLoop(noteDuration);
    }, [noteDuration, beatsPerMeasure]);

    function setLoop(noteDuration:string) {
        if(!samplerRef.current) return;

        if (loopRef.current) {
            loopRef.current.stop();
            loopRef.current.dispose();
            loopRef.current = null;
        }

        loopRef.current = new Tone.Loop((time) => {
            const isDownbeat = indexRef.current % beatsPerMeasure === 0;
            const note = isDownbeat ? "G3" : "D3";

            samplerRef.current!.triggerAttack(note, time);

            setCurrentBeat((indexRef.current % beatsPerMeasure) + 1);
            indexRef.current++;

        }, noteDuration);

        if (isPlaying) {
            loopRef.current.start(0);
        }
    }

    function startMetronome() {
        if(!samplerRef.current) return;

        setLoop(noteDuration);
     
        loopRef.current!.start(0);
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

      <div className="flex items-center gap-2">
        <label>note:</label>
        <input
          type="number"
          value={note}
          onChange={(e) => setNote(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      <div className="flex items-center gap-2">
        <label>subdivision:</label>
        <input
          type="number"
          value={subdivision}
          onChange={(e) => setSubdivision(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>
      

      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-40"
    />

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
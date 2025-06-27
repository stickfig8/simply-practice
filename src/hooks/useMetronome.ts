import { useMetronomeStore } from "../stores/metronomeStore";
import { useMemo, useRef, useState, useEffect } from "react";
import * as Tone from "tone";
import { setUpLoop } from "../utils/metronomeUtils";

export function useMetronome() {
    const {bpm, beatsPerMeasure, note, subdivision, volume} = useMetronomeStore();

    const noteDuration = useMemo(() => {return `${note * subdivision}n`}, [note, subdivision]);
    
    const indexRef = useRef(0);
    const loopRef = useRef<Tone.Loop | null>(null);
    
    const samplerRef = useRef<Tone.Sampler | null>(null);
    
    const masterGain = useRef(new Tone.Gain(0.5).toDestination());

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState(0);

    async function toggleMetronome() {
        if (!samplerRef.current) return;

        await Tone.start();

        if (isPlaying) {
            loopRef.current?.stop();
            loopRef.current?.dispose();
            loopRef.current = null;
            Tone.Transport.stop();
            indexRef.current = 0;
            setCurrentBeat(0);
        } else {
            setUpLoop({
                noteDuration,
                beatsPerMeasure,
                isPlaying: true,
                loopRef,
                samplerRef,
                indexRef,
                setCurrentBeat
        });

            loopRef.current?.start(0);
            Tone.Transport.start();
        }

        setIsPlaying(!isPlaying);
  }

    useEffect(() => { // 초기 설정(샘플러 설정)
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
    
    useEffect(() => { // 박자 설정
        Tone.getTransport().bpm.value = bpm;
        Tone.getTransport().timeSignature = [beatsPerMeasure, note];
    }, [note, bpm, beatsPerMeasure]);

    useEffect(() => { // noteDuration 설정
        setUpLoop({
            noteDuration,
            beatsPerMeasure,
            isPlaying,
            loopRef,
            samplerRef,
            indexRef,
            setCurrentBeat
        });
    }, [noteDuration, beatsPerMeasure]);

    return { isPlaying, currentBeat, toggleMetronome };
}

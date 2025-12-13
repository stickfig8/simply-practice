import { useMetronomeStore } from "../stores/metronomeStore";
import { useMemo, useRef, useState, useEffect } from "react";
import * as Tone from "tone";
import { setUpLoop } from "../utils/metronomeUtils";

export function useMetronome() {
  const { bpm, beatsPerMeasure, note, subdivision, volume, setBpm } =
    useMetronomeStore();

  const noteDuration = useMemo(() => {
    return `${note * subdivision}n`;
  }, [note, subdivision]);

  const indexRef = useRef(0);
  const loopRef = useRef<Tone.Loop | null>(null);

  const samplerRef = useRef<Tone.Sampler | null>(null);

  const masterGain = useRef(new Tone.Gain(0.5).toDestination());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const tapTimeRef = useRef<number[]>([]);
  const lastTapRef = useRef<number | null>(null);

  function tapTempo() {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current > 3000) {
      // 3초 이상 지나면 리셋
      tapTimeRef.current = [];
    }
    lastTapRef.current = now;
    tapTimeRef.current.push(now);

    if (tapTimeRef.current.length > 4) {
      tapTimeRef.current.shift();
    }

    if (tapTimeRef.current.length >= 2) {
      const intervals = tapTimeRef.current
        .slice(1)
        .map((tap, i) => (tap - tapTimeRef.current[i]) / 1000); // 초 단위

      const avgInterval =
        intervals.reduce((sum, cur) => sum + cur, 0) / intervals.length;

      const newBpm = Math.round(60 / avgInterval);

      setBpm(newBpm);
    }
  }

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
        setCurrentBeat,
      });

      loopRef.current?.start(0);
      Tone.Transport.start();
    }

    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    // 초기 설정(샘플러 설정)
    samplerRef.current = new Tone.Sampler({
      urls: {
        G3: "/samples/click_high.wav",
        D3: "/samples/click_low.wav",
      },
      onload() {
        masterGain.current.gain.value = volume;
      },
    }).connect(masterGain.current);

    return () => {
      loopRef.current?.stop();
      loopRef.current?.dispose();
      loopRef.current = null;
      Tone.Transport.stop();
      indexRef.current = 0;
      setCurrentBeat(0);
    };
  }, []);

  useEffect(() => {
    // 볼륨 설정
    masterGain.current.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    // 박자 설정
    Tone.getTransport().bpm.value = bpm;
    Tone.getTransport().timeSignature = [beatsPerMeasure, note];
  }, [note, bpm, beatsPerMeasure]);

  useEffect(() => {
    // noteDuration 설정
    setUpLoop({
      noteDuration,
      beatsPerMeasure,
      isPlaying,
      loopRef,
      samplerRef,
      indexRef,
      setCurrentBeat,
    });
  }, [noteDuration, beatsPerMeasure]);

  return { isPlaying, currentBeat, toggleMetronome, tapTempo };
}

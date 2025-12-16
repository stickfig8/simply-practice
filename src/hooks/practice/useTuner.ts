import { useAudioInputStore } from "@/stores/audioInputStore";
import { useState, useRef, useEffect } from "react";
import { setUpTuner } from "@/utils/tunerUtils";

export function useTuner() {
  const { inputId, channel } = useAudioInputStore();

  const [note, setNote] = useState<string | null>(null);
  const [freq, setFreq] = useState<number | null>(null);
  const [cents, setCents] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  let lastPitchTime = Date.now();

  function handlePitchDetectd(pitch: number) {
    if (pitch > 0) {
      lastPitchTime = Date.now(); // 시간 추적용

      const midi = 69 + 12 * Math.log2(pitch / 440);
      const rounded = Math.round(midi);
      const noteName = noteNames[rounded % 12];
      const octave = Math.floor(rounded / 12) - 1;
      const cents = (midi - rounded) * 100;

      setNote(`${noteName}${octave}`);
      setFreq(Math.round(pitch));
      setCents(Math.round(cents));
    }
  }

  useEffect(() => {
    if (!inputId) return;

    setUpTuner({
      inputId,
      channel,
      audioCtxRef,
      streamRef,
      onPitchDetected: handlePitchDetectd,
    });
    const interval = setInterval(() => {
      if (Date.now() - lastPitchTime > 1500) {
        setNote(null);
        setFreq(null);
        setCents(null);
      }
    }, 500);

    return () => {
      audioCtxRef.current?.close();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      clearInterval(interval);
    };
  }, [inputId, channel]);

  return { note, freq, cents };
}

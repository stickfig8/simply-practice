import { useState, useEffect } from "react";
import { useAudioInputStore } from "../stores/audioInputStore";

export default function Tuner() {
    const {audioCtx, source, isAudioReady} = useAudioInputStore();
    const [note, setNote] = useState<string | null>(null);
    const [cents, setCents] = useState<number | null>(null);
    const [freq, setFreq] = useState<number | null>(null);

    function getNoteName(midi: number) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return noteNames[midi];
    }
    

    useEffect(() => {
        if(!isAudioReady || !audioCtx || !source) return;

        const loadWorlet = async () => {
            await audioCtx.audioWorklet.addModule("/worklets/PitchProcessor.js");
            
            const workletNode = new AudioWorkletNode(audioCtx, "pitch-processor");
            workletNode.port.onmessage = (event) => {
                const {pitch} = event.data;

                if(pitch) {
                    const midi = 69 + 12 * Math.log2(pitch / 440);
                    const rounded = Math.round(midi);
                    const noteName = getNoteName(rounded % 12);
                    const octave = Math.floor(rounded / 12) -1;
                    const cents = (midi - rounded) * 100;

                    setNote(`${noteName}${octave}`);
                    setFreq(Math.round(pitch));
                    setCents(Math.round(cents));
                }
            };
            source.connect(workletNode);
        };

        //loadWorlet();
        console.log(audioCtx);

        return () => { 
            source.disconnect();
        }
    }, [isAudioReady]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Tuner</h2>
            {note ? (
                <p>
                    <strong>{note}</strong> ({freq} Hz) <br />
                    {cents} cents
                </p>
            ) : (
                <p>Listening...</p>
            )}
        </div>
    )
}
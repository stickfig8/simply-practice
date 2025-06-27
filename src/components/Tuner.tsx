import { useEffect, useState } from "react";
import { useAudioInputStore } from "../stores/audioInputStore";

export default function Tuner() {
    const { inputId, channel } = useAudioInputStore();

    const [note, setNote] = useState<string | null>(null);
    const [cents, setCents] = useState<number | null>(null);
    const [freq, setFreq] = useState<number | null>(null);

    function getNoteName(midi: number) {
        const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return names[midi % 12];
    }

    useEffect(() => {
        if (!inputId) return;

        const ctx = new AudioContext();

        ctx.resume(); 
        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: { exact: inputId },
                channelCount: channel + 1,
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
            },
        }).then(async (stream) => {
            await ctx.audioWorklet.addModule("/worklets/PitchProcessor.js");

            const source = ctx.createMediaStreamSource(stream);
            const splitter = ctx.createChannelSplitter(source.channelCount);
            source.connect(splitter);

            const gain = ctx.createGain(); 
            gain.gain.value = 10;
            splitter.connect(gain, 0); 

            const workletNode = new AudioWorkletNode(ctx, "pitch-processor");
            gain.connect(workletNode);

            workletNode.port.onmessage = (e) => {
                const { pitch } = e.data;
                if (pitch) {
                    const midi = 69 + 12 * Math.log2(pitch / 440);
                    const rounded = Math.round(midi);
                    const noteName = getNoteName(rounded);
                    const octave = Math.floor(rounded / 12) - 1;
                    const cents = (midi - rounded) * 100;

                    setNote(`${noteName}${octave}`);
                    setFreq(Math.round(pitch));
                    setCents(Math.round(cents));
                }
            };

        }).catch((err) => {
            console.error("튜너용 stream 생성 실패", err);
        });

        return () => {
            
        };
    }, [inputId, channel]);

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
    );
}
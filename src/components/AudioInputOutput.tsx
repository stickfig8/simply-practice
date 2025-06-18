import { useEffect, useRef, useState } from "react";

export default function AudioInputOutput() {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [inputId, setInputId] = useState<string | null>(null);
    const [channel, setChannel] = useState<number>(0);
    const [channelCount, setChannelCount] = useState<number>(1);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const mergerRef = useRef<ChannelMergerNode | null>(null);

    async function getDevices() {
        const list = await navigator.mediaDevices.enumerateDevices();
        setDevices(list);
    }

    async function handleDeviceChange() {
        const updatedList = await navigator.mediaDevices.enumerateDevices();
        setDevices(updatedList);

        const inputStillValid = updatedList.some(
            (device) => device.kind === "audioinput" && device.deviceId === inputId
        );

        if(!inputStillValid) {
            setInputId(null);
            setChannel(0);
            setChannelCount(1);
        }
    }

    function cleanup() {
        if(audioCtxRef.current) {
            audioCtxRef.current.close();
            audioCtxRef.current = null;
        }
        if(streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
    }

    async function connectAudio(deviceId:string, channel: number) {
        cleanup();

        const ctx = await new AudioContext({latencyHint: "interactive", sampleRate: 48000,});
        audioCtxRef.current = ctx;

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: {exact: deviceId},
                echoCancellation: false,
                autoGainControl: false,
                noiseSuppression: false,
            },
        });

        streamRef.current = stream;

        const source = ctx.createMediaStreamSource(stream);
        const newChannelCount = source.channelCount;
        setChannelCount(newChannelCount);

        const gainNode = ctx.createGain();
        const splitter = ctx.createChannelSplitter(newChannelCount);
        const merger = ctx.createChannelMerger(2);
        mergerRef.current = merger;

        source.connect(splitter);
        
        gainNode.gain.value = 0.5;
        gainRef.current = gainNode;

        splitter.connect(gainNode, channel);
        

        gainNode.connect(merger, 0, 0);
        gainNode.connect(merger, 0, 1);
        merger.connect(ctx.destination);
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true}).then(getDevices);
    }, []);

    useEffect(() => { // 인풋 바뀌면
        if(inputId) {
            setChannel(0);
            connectAudio(inputId, 0);
        }
        
        navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
        }

    }, [inputId]);

    useEffect(() => { // 채널 바뀌면
        if (inputId) {
            connectAudio(inputId, channel);
        }
    }, [channel]);

    const inputDevices = devices.filter((device) => device.kind === "audioinput");

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">audio device test</h2>

            <div>
                <label>input : </label>
                <select onChange={(e) => setInputId(e.target.value)} className="ml-2">
                    <option value={""}>장치 선택</option>
                    {inputDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || "입력장치"}
                        </option>
                    ))}
                </select>
            </div>

            <div>           
                <label>channel : </label>
                <select value={channel} onChange={(e) => setChannel(parseInt(e.target.value))} className="ml-2">

                    {[...Array(channelCount)].map((_, idx) => ( 
                        <option key={idx} value={idx}>{idx+1}</option>
                    ))}
                </select>
            </div>

            <input
                type="range"
                min="0"
                max="1.2"
                step="0.01"
                defaultValue="0.5"
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (gainRef.current) {
                        gainRef.current.gain.setTargetAtTime(value, audioCtxRef.current!.currentTime, 0.01);
                    }
                }}
            />
            <p className="text-sm text-gray-500">
                input & output select test
            </p>
        </div>

    );

    
}
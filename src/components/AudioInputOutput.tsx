import { useEffect, useRef, useState } from "react";

export default function AudioInputOutput() {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [inputId, setInputId] = useState<string | null>(null);
    const [channel, setChannel] = useState<number>(0);
    const [channelCount, setChannelCount] = useState<number>(1);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

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

        const splitter = ctx.createChannelSplitter(newChannelCount);
        const merger = ctx.createChannelMerger(2);

        source.connect(splitter);

        splitter.connect(merger, channel, 0);
        splitter.connect(merger, channel, 1);
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

    // const audioCtx = new AudioContext({
    //         latencyHint: "interactive",
    //         sampleRate: 48000,
    // });

    // async function createStream() : Promise<MediaStream> {
    //     const stream = await navigator.mediaDevices.getUserMedia({audio : { // 기본 디바이스
    //             echoCancellation: false,
    //             autoGainControl: false,
    //             noiseSuppression: false,}
    //     });
    //     streamRef.current = stream;

    //     const list = await navigator.mediaDevices.enumerateDevices();
    //     setDevices(list);
    //     return stream;
    // }

    // async function initContext() {
    //     const stream = await createStream();
    //     if(audioCtx.state === 'suspended') {
    //         await audioCtx.resume();
    //     }

    //     const source = audioCtx.createMediaStreamSource(stream);
    //     sourceRef.current = source;

    //     setChannelCount(source.channelCount);

    //     const splitter = audioCtx.createChannelSplitter(channelCount);
    //     const merger = audioCtx.createChannelMerger(2);

    //     source.connect(splitter);

    //     splitter.connect(merger, channel, 0);
    //     splitter.connect(merger, channel, 1);
        
    //     merger.connect(audioCtx.destination);
    // }

    // useEffect(() => { // 권한요청 + 장치목록 불러오기
    //     createStream();
    //     initContext();
    // }, []);

    
    // useEffect(() => { // 장치나 채널 변경
        
    // }, [inputId, channel])

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

            <p className="text-sm text-gray-500">
                input & output select test
            </p>
        </div>
    );

    
}
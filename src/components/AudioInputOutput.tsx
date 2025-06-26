import { useEffect, useRef } from "react";
import { useAudioInputStore } from "../stores/audioInputStore";

export default function AudioInputOutput() {
    const {devices, inputId, channel, channelCount, volume, audioCtx, 
        setDevices, setInputId, setChannel, setChannelCount, setVolume, setAudioCtx, setSource, setIsAudioReady} = useAudioInputStore();

    const streamRef = useRef<MediaStream | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const mergerRef = useRef<ChannelMergerNode | null>(null);

    async function getDevices() {
        await navigator.mediaDevices.getUserMedia({audio: true});

        const devices = await navigator.mediaDevices.enumerateDevices();
        const inputDevices = devices.filter((device) => {return device.kind === 'audioinput'});
        setDevices(inputDevices);

        const defaultDevice = devices.find((device) => {return device.deviceId === 'default'});
        
        if(!inputId) {
            if(defaultDevice) {
                setInputId(defaultDevice.deviceId);
            } else if (inputDevices.length > 0){
                setInputId(inputDevices[0].deviceId);
            }
        }
    }

    async function handleDeviceListChange() {
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
        if(audioCtx instanceof AudioContext && audioCtx.state !== 'closed') {
            audioCtx.close();
            setAudioCtx(null);
        }
        if(streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setSource(null);
        setIsAudioReady(false);
    }

    async function connectAudio(deviceId:string, channel: number) {
        cleanup();

        const ctx = await new AudioContext({latencyHint: "interactive", sampleRate: 48000,});
        setAudioCtx(ctx);

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
        setSource(source);

        const newChannelCount = source.channelCount;
        setChannelCount(newChannelCount);

        const gainNode = ctx.createGain();
        const splitter = ctx.createChannelSplitter(newChannelCount);
        const merger = ctx.createChannelMerger(2);
        mergerRef.current = merger;

        source.connect(splitter);
        
        gainNode.gain.value = volume;
        gainRef.current = gainNode;

        splitter.connect(gainNode, channel);
        
        gainNode.connect(merger, 0, 0);
        gainNode.connect(merger, 0, 1);
        merger.connect(ctx.destination);

        setIsAudioReady(true);
    }

    useEffect(() => { // volume 컨트롤
        if (gainRef.current && audioCtx) {
            gainRef.current.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.01);
        }
    }, [volume])

    useEffect(() => {
        getDevices();

        navigator.mediaDevices.addEventListener("devicechange", handleDeviceListChange);
        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", handleDeviceListChange);
        }
    }, []);

    useEffect(() => { // 인풋 장비, 채널, 채널 갯수 바뀌면
        if (!inputId) return;
        
        const maxChannel = channelCount - 1;
        const adjustChannel = channel < maxChannel ? channel : 0;
        if(adjustChannel !== channel) { 
            setChannel(adjustChannel);
        }

        connectAudio(inputId, adjustChannel);
        
    }, [inputId, channel, channelCount]);


    const inputDevices = devices.filter((device) => device.kind === "audioinput");

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">audio device test</h2>

            <div>
                <label>input : </label>
                <select value={inputId ?? ""} onChange={(e) => setInputId(e.target.value)} className="ml-2">
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
                value={volume}
                onChange={(e) => { setVolume(parseFloat(e.target.value)); }}
            />
            <p className="text-sm text-gray-500">
                input & output select test
            </p>
        </div>

    );
}
type SetupTunerParams = {
    inputId: string;
    channel: number;
    audioCtxRef: React.RefObject<AudioContext | null>;
    streamRef: React.RefObject<MediaStream | null>;
    onPitchDetected: (pitch: number) => void;
};

export async function setUpTuner({
    inputId,
    channel,
    audioCtxRef,
    streamRef,
    onPitchDetected,
}: SetupTunerParams) {
    
    const ctx = new AudioContext();
    await ctx.audioWorklet.addModule("/worklets/PitchProcessor.js");
    await ctx.resume();
    audioCtxRef.current = ctx;

    const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId: { exact: inputId },
            channelCount: channel + 1,
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
        },
    });

    const source = ctx.createMediaStreamSource(stream);
    const splitter = ctx.createChannelSplitter(source.channelCount);
    source.connect(splitter);

    const gain = ctx.createGain();
    gain.gain.value = 10;
    splitter.connect(gain, channel);

    const workletNode = new AudioWorkletNode(ctx, "pitch-processor");
    gain.connect(workletNode);

    workletNode.port.onmessage = (e) => {
        const { pitch } = e.data;
        if (pitch) {
            onPitchDetected(pitch);
        }
    };

}

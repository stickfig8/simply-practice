export type AudioInputStoreState = {
    devices: MediaDeviceInfo[];
    inputId: string | null;
    channel: number;
    channelCount: number;
    volume: number;
    audioCtx: AudioContext | null;
    source: MediaStreamAudioSourceNode | null;
    isAudioReady: boolean;

    setDevices: (devices: MediaDeviceInfo[]) => void;
    setInputId: (id: string | null) => void;
    setChannel: (n: number) => void;
    setChannelCount: (s: number) => void;
    setVolume: (volume: number) => void;
    setAudioCtx: (ctx: AudioContext | null) => void;
    setSource: (source: MediaStreamAudioSourceNode | null) => void;
    setIsAudioReady: (flag: boolean) => void;
}
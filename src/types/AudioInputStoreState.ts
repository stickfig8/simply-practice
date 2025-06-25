export type AudioInputStoreState = {
    devices: MediaDeviceInfo[];
    inputId: string | null;
    channel: number;
    channelCount: number;
    volume: number;    

    setDevices: (devices: MediaDeviceInfo[]) => void;
    setInputId: (id: string | null) => void;
    setChannel: (n: number) => void;
    setChannelCount: (s: number) => void;
    setVolume: (volume: number) => void;
}
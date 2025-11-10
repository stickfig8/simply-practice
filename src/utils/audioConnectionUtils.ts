type ConnectAudioParams = {
  deviceId: string;
  channel: number;
  volume: number;
  audioCtxRef: React.RefObject<AudioContext | null>;
  streamRef: React.RefObject<MediaStream | null>;
  gainRef: React.RefObject<GainNode | null>;
  setChannelCount: (n: number) => void;
};

export async function getDevices(
  setDevices: (devices: MediaDeviceInfo[]) => void,
  setInputId: (id: string | null) => void,
  currentInputId: string | null
) {
  // 장치연결 함수

  await navigator.mediaDevices.getUserMedia({ audio: true }); // 장치 사용 권한 요구

  const devices = await navigator.mediaDevices.enumerateDevices();
  const inputs = devices.filter((device) => device.kind === "audioinput");
  setDevices(inputs);

  const valid = inputs.some((device) => device.deviceId === currentInputId);

  if (valid && currentInputId) {
    setInputId(currentInputId);
  } else if (inputs.length > 0) {
    const defaultDevice = devices.find(
      (device) => device.deviceId === "default"
    ); // 디폴트 장비 연결
    if (defaultDevice) setInputId(defaultDevice.deviceId);
    else if (inputs.length > 0) setInputId(inputs[0].deviceId);
  } else {
    setInputId(null);
  }
}

export function cleanAudioConnection( // 연결된 오디오 연결해제 & 제거
  audioCtxRef: React.RefObject<AudioContext | null>,
  streamRef: React.RefObject<MediaStream | null>
) {
  if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
    audioCtxRef.current.close();
    audioCtxRef.current = null;
  }

  if (streamRef.current) {
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }
}

export async function connectAudio({
  deviceId,
  channel,
  volume,
  audioCtxRef,
  streamRef,
  gainRef,
  setChannelCount,
}: ConnectAudioParams) {
  // 오디오 생성 및 연결

  cleanAudioConnection(audioCtxRef, streamRef);

  let ctx = audioCtxRef.current;

  if (!ctx || ctx.state === "closed") {
    ctx = new AudioContext({ latencyHint: "interactive", sampleRate: 48000 });
    audioCtxRef.current = ctx;
  }

  // suspended 상태일 경우 resume
  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: { exact: deviceId },
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
    },
  });

  streamRef.current = stream;

  const source = ctx.createMediaStreamSource(stream);

  setChannelCount(source.channelCount);

  const gainNode = ctx.createGain();
  const splitter = ctx.createChannelSplitter();
  const merger = ctx.createChannelMerger(2);

  gainNode.gain.value = volume;
  gainRef.current = gainNode;

  source.connect(splitter);

  splitter.connect(gainNode, channel);

  gainNode.connect(merger, 0, 0);
  gainNode.connect(merger, 0, 1);
  merger.connect(ctx.destination);
}

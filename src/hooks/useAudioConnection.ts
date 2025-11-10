import { useAudioInputStore } from "../stores/audioInputStore";
import { useEffect, useRef } from "react";
import {
  getDevices,
  connectAudio,
  cleanAudioConnection,
} from "../utils/audioConnectionUtils";

export function useAudioConnection() {
  const {
    inputId,
    channel,
    channelCount,
    volume,
    setDevices,
    setInputId,
    setChannel,
    setChannelCount,
  } = useAudioInputStore();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // 초기 세팅(장치 목록 로드 + 장치 목록 변경 대응)
    getDevices(setDevices, setInputId, inputId);

    async function handleDeviceChange() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const inputs = devices.filter((device) => device.kind === "audioinput");
      setDevices(inputs);

      const valid = inputs.some((input) => input.deviceId === inputId);
      if (!valid) {
        setInputId(null);
        setChannel(0);
        setChannelCount(1);
      }
    }

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
      cleanAudioConnection(audioCtxRef, streamRef);
    };
  }, []);

  useEffect(() => {
    // 장치, 채널, 채널 갯수 변경 시 오디오 재연결
    if (channel >= channelCount) {
      const fallback = channelCount > 0 ? channelCount - 1 : 0;
      setChannel(fallback);
      return;
    }

    cleanAudioConnection(audioCtxRef, streamRef);

    if (!inputId) {
      setChannel(0);
      setChannelCount(1);
      return;
    }

    connectAudio({
      deviceId: inputId,
      channel,
      volume,
      audioCtxRef,
      streamRef,
      gainRef,
      setChannelCount,
    });
  }, [inputId, channel, channelCount]);

  useEffect(() => {
    // 볼륨 조절
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(
        volume,
        audioCtxRef.current.currentTime,
        0.01
      );
    }
  }, [volume]);
}

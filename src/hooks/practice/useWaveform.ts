import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";
import { useWaveformStore } from "@/stores/waveformStore";
import { analyzeBPM } from "@/utils/waveformUtils";

export function useWaveform() {
  const {
    title,
    volume,
    playBackRate,
    zoomLevel,
    isLooping,
    setVolume,
    setLoopStart,
    setLoopEnd,
    setIsPlaying,
    setIsLooping,
    setTitle,
    setBpm,
    setIsReady,
    setPlayBackRate,
    setZoomLevel,
    setDuration,
    setPosition,
    reset,
  } = useWaveformStore();

  const isLoopingRef = useRef<Boolean>(isLooping);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const togglePlayRef = useRef(togglePlay);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 파일 변경 제어
    if (!waveSurferRef.current) return;

    setIsPlaying(false);
    setIsLooping(false);
    setLoopStart(0);
    setLoopEnd(10);
    setIsReady(false);

    const file = e.target.files?.[0];
    if (!file || !waveSurferRef.current) return;
    const url = URL.createObjectURL(file);
    waveSurferRef.current.load(url);
    waveSurferRef.current.setVolume(volume);
    waveSurferRef.current.setTime(0);
    const name = file.name.replace(/\.[^/.]+$/, "");
    setTitle(name); // zustand에 저장

    if (regionsRef.current) {
      // 새 오디오 로드 시 기존 리전 삭제
      regionsRef.current?.clearRegions();
    }

    // waveSurferRef.current.on("decode", () => {
    //   regionsRef.current?.addRegion({
    //     start: 0,
    //     end: 10,
    //     color: "rgba(255, 0, 0, 0.1)",
    //   });
    // });

    waveSurferRef.current.once("decode", () => {
      const duration = waveSurferRef.current?.getDuration();
      if (duration) {
        setDuration(duration);
      }
    });

    setBpm(await analyzeBPM(file));
    setIsReady(true);
    setPlayBackRate(1.0);
    setZoomLevel(1);
  }

  function togglePlay() {
    // 플레이 제어
    if (!waveSurferRef.current || !regionsRef.current || title === "") return;

    if (isLooping) {
      if (!waveSurferRef.current.isPlaying()) {
        regionsRef.current.getRegions()[0].play(true);
      } else {
        waveSurferRef.current.pause();
      }
    } else {
      waveSurferRef.current.playPause();
    }

    setIsPlaying(waveSurferRef.current.isPlaying());
  }

  function setForward() {
    if (!waveSurferRef.current) return;
    if (
      waveSurferRef.current.getCurrentTime() + 10 <
      waveSurferRef.current.getDuration()
    ) {
      waveSurferRef.current.setTime(
        waveSurferRef.current.getCurrentTime() + 10
      );
    }
  }

  function setBackward() {
    if (!waveSurferRef.current) return;
    if (waveSurferRef.current.getCurrentTime() - 10 > 0) {
      waveSurferRef.current.setTime(
        waveSurferRef.current.getCurrentTime() - 10
      );
    } else {
      waveSurferRef.current.setTime(0);
    }
  }

  function setTimeSlider(time: number) {
    if (!waveSurferRef.current) return;
    waveSurferRef.current.setTime(time);
  }

  function keyboardControl(e: KeyboardEvent) {
    // 키보드 작동 제어
    if (e.code === "Space") {
      e.preventDefault();
      togglePlayRef.current();
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      setBackward();
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      setForward();
    } else if (e.code === "ArrowUp") {
      e.preventDefault();
      const currentVolume = useWaveformStore.getState().volume;
      useWaveformStore.getState().setVolume(Math.min(currentVolume + 0.02, 1));
    } else if (e.code === "ArrowDown") {
      e.preventDefault();
      const currentVolume = useWaveformStore.getState().volume;
      useWaveformStore.getState().setVolume(Math.max(currentVolume - 0.02, 0));
    }
  }

  useEffect(() => {
    // 기본 세팅
    if (!containerRef.current) return;
    const regions = RegionsPlugin.create();
    regionsRef.current = regions;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current!,
      waveColor: "#999",
      progressColor: "oklch(0.646 0.222 41.116)",
      height: 100,
      plugins: [regions],
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
    });

    regions.enableDragSelection({ color: "rgba(40, 53, 147, 0.4)" });

    wavesurfer.on("finish", () => {
      if (!isLoopingRef.current) {
        wavesurfer.setTime(0);
        setIsPlaying(false);
      }
    });

    wavesurfer.on("timeupdate", (time) => {
      setPosition(time);
    });

    regions.on("region-created", (newRegion) => {
      // 새 리전 생성 시 기존 리전 삭제
      if (!regionsRef.current) return;

      Object.values(regionsRef.current.getRegions()).forEach((region) => {
        if (region.id !== newRegion.id) {
          region.remove();
        }
      });
      setLoopStart(newRegion.start);
      setLoopEnd(newRegion.end);
    });

    regions.on("region-out", (region) => {
      if (!isLoopingRef.current) return;

      region.play();
      setIsPlaying(true);
    });

    regions.on("region-updated", (region) => {
      setLoopStart(region.start);
      setLoopEnd(region.end);
    });

    window.addEventListener("keydown", keyboardControl);

    waveSurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
      window.removeEventListener("keydown", keyboardControl);
      reset();
    };
  }, []);

  useEffect(() => {
    // 줌 레벨 조정
    const wavesurfer = waveSurferRef.current;
    if (wavesurfer && wavesurfer.getDecodedData()) {
      wavesurfer.zoom(zoomLevel);
    }
  }, [zoomLevel]);

  useEffect(() => {
    // 볼륨 조절
    if (!waveSurferRef.current) return;

    waveSurferRef.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (!waveSurferRef.current) return;

    waveSurferRef.current.setPlaybackRate(playBackRate, true);
  }, [playBackRate]);

  useEffect(() => {
    // 루프상태 최신화
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleDragOver(e: DragEvent) {
      e.preventDefault();
      setIsDragging(true);
    }

    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      setIsDragging(false);
    }

    function handleDrop(e: DragEvent) {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith("audio/")) {
        const fakeEvent = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(fakeEvent);
      }
    }

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", handleDragLeave);
    container.addEventListener("drop", handleDrop);

    return () => {
      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("dragleave", handleDragLeave);
      container.removeEventListener("drop", handleDrop);
    };
  }, [containerRef]);

  useEffect(() => {
    togglePlayRef.current = togglePlay;
  }, [togglePlay]);

  return {
    handleFileChange,
    togglePlay,
    setForward,
    setBackward,
    setTimeSlider,
    containerRef,
    waveSurferRef,
    isDragging,
  };
}

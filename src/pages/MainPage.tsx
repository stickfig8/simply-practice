import MainContainer from "@/components/layout/MainContainer";
import MainIntroduceCard from "@/components/mainPage/MainIntroduceCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sections = [
  {
    id: 1,
    title: "Practice",
    desc: "Waveform으로 오디오를 분석하고 연습하세요",
    img: "/images/card1.png",
  },
  {
    id: 2,
    title: "Metronome & Tuner",
    desc: "템포를 맞추고 음정을 조율하세요",
    img: "/images/card2.png",
  },
  {
    id: 3,
    title: "Dashboard",
    desc: "연습 기록과 통계를 한눈에 확인하세요",
    img: "/images/card3.png",
  },
  {
    id: 4,
    title: "Start Practicing",
    desc: "지금 바로 연습하러 가볼까요?",
    img: "/images/mockup.png",
  },
];

export default function MainPage() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // wheel로 섹션 이동
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && current < sections.length - 1) {
        setCurrent((prev) => prev + 1);
      } else if (e.deltaY < 0 && current > 0) {
        setCurrent((prev) => prev - 1);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: window.innerHeight * current,
      behavior: "smooth",
    });
  }, [current]);

  return (
    <MainContainer isMain={true}>
      <div
        ref={containerRef}
        className="h-screen w-full overflow-hidden snap-y snap-mandatory"
      >
        {sections.map((sec, i) => (
          <section
            key={sec.id}
            className="h-screen w-full flex items-center justify-center flex-col snap-start relative gap-15 max-[700px]:gap-5"
          >
            {current > 0 && (
              <ChevronUp
                onClick={() => setCurrent((prev) => prev - 1)}
                className="cursor-pointer"
              />
            )}
            <MainIntroduceCard index={i} current={current} {...sec} />
            {current < 3 && (
              <ChevronDown
                onClick={() => setCurrent((prev) => prev + 1)}
                className="cursor-pointer"
              />
            )}
          </section>
        ))}
      </div>
    </MainContainer>
  );
}

import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageStore";
import { useEffect, useRef, useState } from "react";

export function useIntroduceSection() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { lang } = useLanguageStore();
  const text = languageText.main;

  const sections = [
    {
      id: 1,
      title: "Practice",
      desc: text.card1[lang],
      img: "/images/card1.png",
    },
    {
      id: 2,
      title: "Metronome & Tuner",
      desc: text.card2[lang],
      img: "/images/card2.png",
    },
    {
      id: 3,
      title: "Dashboard",
      desc: text.card3[lang],
      img: "/images/card3.png",
    },
    {
      id: 4,
      title: "Start Practicing",
      desc: text.card4[lang],
      img: "/images/mockup.png",
    },
  ];

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

  return { containerRef, current, setCurrent, sections };
}

import MainIntroduceCard from "@/components/mainPage/MainIntroduceCard";
import { useIntroduceSection } from "@/hooks/main/useIntroduceSection";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function IntroduceSection() {
  const { containerRef, current, setCurrent, sections } = useIntroduceSection();
  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
      id="smooth-scroll"
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
          {current < 4 && (
            <ChevronDown
              onClick={() => setCurrent((prev) => prev + 1)}
              className="cursor-pointer"
            />
          )}
        </section>
      ))}
    </div>
  );
}

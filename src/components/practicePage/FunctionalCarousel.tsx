import { useLanguageStore } from "@/stores/languageSettingStore";
import CarouselCanvas from "../common/CarouselCanvas";
import { Carousel, CarouselContent } from "../ui/carousel";
import AudioInputOutput from "./AudioInputOutput";
import Metronome from "./Metronome";
import Tuner from "./Tuner";
import { languageText } from "@/configs/language";

import { useFunctionalCarousel } from "@/hooks/practice/useFunctionalCarousel";
import { useCarouselTutorial } from "@/hooks/common/useCaruselTutorial";
import { motion } from "framer-motion";

export default function FunctionalCarousel() {
  const { lang } = useLanguageStore();
  const text = languageText.practice;

  const { setApi, disableScroll, enableScroll } = useFunctionalCarousel();
  const { controls, setUserSwiped } = useCarouselTutorial();

  return (
    <motion.div
      animate={controls}
      onTouchStart={() => setUserSwiped(true)}
      onMouseDown={() => setUserSwiped(true)}
    >
      <Carousel
        className="w-full hidden my-10 max-[600px]:block"
        setApi={setApi}
      >
        <CarouselContent>
          <CarouselCanvas title={text.metronome.metronome[lang]}>
            <Metronome
              handleSliderStart={disableScroll}
              handleSliderEnd={enableScroll}
            />
          </CarouselCanvas>
          <CarouselCanvas title={text.tuner.tuner[lang]}>
            <Tuner />
          </CarouselCanvas>
          <CarouselCanvas title={text.audio.audioSetting[lang]}>
            <AudioInputOutput
              handleSliderStart={disableScroll}
              handleSliderEnd={enableScroll}
            />
          </CarouselCanvas>
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
}

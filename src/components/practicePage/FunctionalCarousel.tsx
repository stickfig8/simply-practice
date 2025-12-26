import { useLanguageStore } from "@/stores/languageSettingStore";
import CarouselCanvas from "../common/CarouselCanvas";
import { Carousel, CarouselContent, type CarouselApi } from "../ui/carousel";
import AudioInputOutput from "./AudioInputOutput";
import Metronome from "./Metronome";
import Tuner from "./Tuner";
import { languageText } from "@/configs/language";
import { useCallback, useState } from "react";

export default function FunctionalCarousel() {
  const { lang } = useLanguageStore();
  const text = languageText.practice;

  const [api, setApi] = useState<CarouselApi>();

  const disableScroll = useCallback(
    () => api?.internalEngine().dragHandler.destroy(),
    [api]
  );
  const enableScroll = useCallback(
    () => api?.internalEngine().dragHandler.init(api),
    [api]
  );

  return (
    <Carousel className="w-full hidden my-10 max-[600px]:block" setApi={setApi}>
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
  );
}

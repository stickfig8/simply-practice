import { useLanguageStore } from "@/stores/languageStore";
import CarouselCanvas from "../common/CarouselCanvas";
import { Carousel, CarouselContent } from "../ui/carousel";
import AudioInputOutput from "./AudioInputOutput";
import Metronome from "./Metronome";
import Tuner from "./Tuner";
import { languageText } from "@/configs/language";

export default function FunctionalCarousel() {
  const { lang } = useLanguageStore();
  const text = languageText.practice;
  return (
    <Carousel className="w-full hidden my-10 max-[600px]:block">
      <CarouselContent>
        <CarouselCanvas title={text.metronome.metronome[lang]}>
          <Metronome />
        </CarouselCanvas>
        <CarouselCanvas title={text.tuner.tuner[lang]}>
          <Tuner />
        </CarouselCanvas>
        <CarouselCanvas title={text.audio.audioSetting[lang]}>
          <AudioInputOutput />
        </CarouselCanvas>
      </CarouselContent>
    </Carousel>
  );
}

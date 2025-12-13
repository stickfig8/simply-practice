import CarouselCanvas from "../common/CarouselCanvas";
import { Carousel, CarouselContent } from "../ui/carousel";
import AudioInputOutput from "./AudioInputOutput";
import Metronome from "./Metronome";
import Tuner from "./Tuner";

export default function FunctionalCarousel() {
  return (
    <Carousel className="w-full hidden my-10 max-[500px]:block">
      <CarouselContent>
        <CarouselCanvas title="metronome">
          <Metronome />
        </CarouselCanvas>
        <CarouselCanvas title="tuner">
          <Tuner />
        </CarouselCanvas>
        <CarouselCanvas title="audio input setting">
          <AudioInputOutput />
        </CarouselCanvas>
      </CarouselContent>
    </Carousel>
  );
}

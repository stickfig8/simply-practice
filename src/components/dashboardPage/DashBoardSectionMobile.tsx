import type { PracticeLog } from "@/types/practiceDataTypes";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ProgressRadialChartCard from "./ProgressRadialChartCard";
import TopSongBarChartCard from "./TopSongBarChartCard";
import InstrumentPieChartCard from "./InstrumentPiechartCard";
import DayRadarChartCard from "./DayRadarChartCard";
import CompareBarChartCard from "./CompareBarChartCard";
import PracticeDaysCard from "./PracticeDaysCard";

type Props = {
  logData: PracticeLog[];
};
export default function DashBoardSectionMobile({ logData }: Props) {
  return (
    <section className="w-full hidden my-10 flex-col gap-4 max-[600px]:flex">
      <PracticeDaysCard logData={logData} />
      <div className="w-full border-b-1 h-0 my-4" />
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <ProgressRadialChartCard logData={logData} />
          </CarouselItem>
          <CarouselItem>
            <TopSongBarChartCard logData={logData} />
          </CarouselItem>
          <CarouselItem>
            <InstrumentPieChartCard logData={logData} />
          </CarouselItem>
          <CarouselItem>
            <DayRadarChartCard logData={logData} />
          </CarouselItem>
          <CarouselItem>
            <CompareBarChartCard logData={logData} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}

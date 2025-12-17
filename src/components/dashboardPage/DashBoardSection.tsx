import CompareBarChartCard from "./CompareBarChartCard";
import DayRadarChartCard from "./DayRadarChartCard";
import InstrumentPieChartCard from "./InstrumentPiechartCard";
import PracticeDaysCard from "./PracticeDaysCard";
import TopSongBarChartCard from "./TopSongBarChartCard";
import ProgressRadialChartCard from "./ProgressRadialChartCard";
import type { PracticeLog } from "@/types/practiceDataTypes";

type Props = {
  logData: PracticeLog[];
};
export default function DashBoardSection({ logData }: Props) {
  return (
    <section className="w-full h-fit flex flex-col gap-10 max-[600px]:hidden">
      <PracticeDaysCard logData={logData} />
      <div className="grid grid-cols-3 gap-8 max-[1000px]:grid-cols-2 max-[500px]:hidden">
        <InstrumentPieChartCard logData={logData} />
        <DayRadarChartCard logData={logData} />
        <CompareBarChartCard logData={logData} />
        <TopSongBarChartCard logData={logData} />
        <ProgressRadialChartCard logData={logData} />
      </div>
    </section>
  );
}

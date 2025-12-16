import CompareBarChartCard from "./CompareBarChartCard";
import DayRadarChartCard from "./DayRadarChartCard";
import InstrumentPieChartCard from "./InstrumentPiechartCard";
import PracticeDaysCard from "./PracticeDaysCard";
import { useDashboardSection } from "@/hooks/dashboard/useDashboardSection";

export default function DashBoardSection() {
  const { logData } = useDashboardSection();
  return (
    <section className="w-full h-fit flex flex-col gap-10">
      <PracticeDaysCard logData={logData} />
      <div className="grid grid-cols-3 gap-8 max-[1000px]:grid-cols-2 max-[500px]:hidden">
        <InstrumentPieChartCard logData={logData} />
        <DayRadarChartCard logData={logData} />
        <CompareBarChartCard logData={logData} />
      </div>
    </section>
  );
}

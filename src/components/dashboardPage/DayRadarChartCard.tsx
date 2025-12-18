import type { PracticeLog } from "@/types/practiceDataTypes";
import DashBoardCard from "./DashBoardCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useDayRadarChartCard } from "@/hooks/dashboard/useDayRadarChartCard";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/language";

type Props = {
  logData: PracticeLog[];
};

export default function DayRadarChartCard({ logData }: Props) {
  const { chartConfig, chartData, topDay, topPercent } = useDayRadarChartCard({
    logData,
  });
  const { lang } = useLanguageStore();
  const text = languageText.dashboard.day;

  return (
    <DashBoardCard
      title={text.title[lang]}
      desc={text.desc[lang](topDay, topPercent)}
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-w-[250px] w-full"
      >
        <RadarChart data={chartData}>
          <ChartTooltip content={<ChartTooltipContent nameKey="count" />} />
          <PolarAngleAxis dataKey="day" />
          <PolarGrid radialLines={false} />
          <Radar
            dataKey="count"
            fill="var(--color-count)"
            fillOpacity={0}
            stroke="var(--color-count)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </DashBoardCard>
  );
}

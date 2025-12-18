import type { PracticeLog } from "@/types/practiceDataTypes";
import DashBoardCard from "./DashBoardCard";
import { useInstrumentPieChartCard } from "@/hooks/dashboard/useInstrumentPieChartCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { LabelList, Pie, PieChart } from "recharts";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/language";

type Props = {
  logData: PracticeLog[];
};

export default function InstrumentPieChartCard({ logData }: Props) {
  const { chartConfig, chartData, topInst, topPercent } =
    useInstrumentPieChartCard({ logData });
  const { lang } = useLanguageStore();
  const text = languageText.dashboard.instrument;

  return (
    <DashBoardCard
      title={text.title[lang]}
      desc={text.desc[lang](topInst, topPercent)}
    >
      <ChartContainer
        config={chartConfig}
        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-w-[250px] w-full"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="instrument" />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="instrument"
            innerRadius="50%"
            outerRadius="95%"
            strokeWidth={3}
          >
            <LabelList
              dataKey="instrument"
              className="fill-background"
              stroke="none"
              fontSize={9}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </DashBoardCard>
  );
}

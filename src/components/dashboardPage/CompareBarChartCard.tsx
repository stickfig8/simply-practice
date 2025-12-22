import type { PracticeLog } from "@/types/practiceDataTypes";
import DashBoardCard from "./DashBoardCard";
import { useCompareBarChartCard } from "@/hooks/dashboard/useCompareBarChartCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useLanguageStore } from "@/stores/languageStore";
import { languageText } from "@/configs/language";

type Props = {
  logData: PracticeLog[];
};

export default function CompareBarChartCard({ logData }: Props) {
  const { chartData, diffPercent, chartConfig } = useCompareBarChartCard({
    logData,
  });
  const { lang } = useLanguageStore();
  const text = languageText.dashboard.compare;
  return (
    <DashBoardCard title={text.title[lang]} desc={text.desc[lang](diffPercent)}>
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 30,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={8}
            barSize={40}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </DashBoardCard>
  );
}

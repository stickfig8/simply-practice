import { useProgressRadialChartCard } from "@/hooks/dashboard/useProgressRadialChartCard";
import DashBoardCard from "./DashBoardCard";
import type { PracticeLog } from "@/types/practiceDataTypes";
import { ChartContainer } from "../ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ButtonGroup } from "../ui/button-group";
import OptionSelectButton from "./OptionSelectButton";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/language";

type Props = {
  logData: PracticeLog[];
};
export default function ProgressRadialChartCard({ logData }: Props) {
  const { progress, setMode, mode, chartData, chartConfig } =
    useProgressRadialChartCard(logData);

  const { lang } = useLanguageStore();
  const text = languageText.dashboard.goal;
  return (
    <DashBoardCard
      title={text.title[lang]}
      desc={text.desc[lang](progress.currentCount, progress.goal)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <ButtonGroup className="absolute top-0 right-1 flex z-50">
          <OptionSelectButton
            onClick={() => setMode("week")}
            text={text.week[lang]}
            isActivated={mode === "week"}
          />
          <OptionSelectButton
            onClick={() => setMode("month")}
            text={text.month[lang]}
            isActivated={mode === "month"}
          />
        </ButtonGroup>
        <ChartContainer
          config={chartConfig}
          className="h-full w-full aspect-square"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(progress.percent / 100) * 360}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="count"
              cornerRadius={50}
              background
              fill="var(--chart-1)"
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {progress.percent.toLocaleString() + "%"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {mode === "week" ? text.week[lang] : text.month[lang]}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
    </DashBoardCard>
  );
}

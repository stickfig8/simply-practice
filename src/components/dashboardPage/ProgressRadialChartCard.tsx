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
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import CommonButton from "../common/CommonButton";
import OptionSelectButton from "./OptionSelectButton";

type Props = {
  logData: PracticeLog[];
};
export default function ProgressRadialChartCard({ logData }: Props) {
  const { progress, setMode, mode, chartData, chartConfig } =
    useProgressRadialChartCard(logData);
  return (
    <DashBoardCard
      title="목표 달성 현황"
      desc={`현재 ${progress.currentCount}/${progress.goal}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <ButtonGroup className="absolute top-0 right-1 flex z-50">
          <OptionSelectButton
            onClick={() => setMode("week")}
            text="week"
            isActivated={mode === "week"}
          />
          <OptionSelectButton
            onClick={() => setMode("month")}
            text="month"
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
                          {mode}
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

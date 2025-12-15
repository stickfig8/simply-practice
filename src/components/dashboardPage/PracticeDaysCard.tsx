import type { PracticeLog } from "@/types/practiceDataTypes";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { usePracticeDaysCard } from "@/hooks/usePracticeDaysCard";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = { logData: PracticeLog[] };

export default function PracticeDaysCard({ logData }: Props) {
  const { total, currentStreak, weekData, tickInterval } = usePracticeDaysCard({
    logData,
  });
  const chartConfig = {
    count: {
      label: "count",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <div className="w-full h-fit flex flex-col gap-4 border-1 rounded-[16px] overflow-hidden">
      {/* 카드 헤더 */}
      <div className="w-full h-36 flex items-center  flex-col">
        <p className="w-full flex-shrink-0">연습 일수 현황</p>
        <p className="text-lg">전체 연습 횟수: {total}</p>
        <p className="text-lg">최근 연속 연습 일수: {currentStreak}</p>
      </div>
      <div className="w-full h-50">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
        >
          <AreaChart
            accessibilityLayer
            key={weekData.length}
            data={weekData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={tickInterval}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="count"
              type="linear"
              fill="var(--color-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}

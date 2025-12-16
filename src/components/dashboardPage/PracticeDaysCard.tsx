import type { PracticeLog } from "@/types/practiceDataTypes";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { usePracticeDaysCard } from "@/hooks/dashboard/usePracticeDaysCard";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = { logData: PracticeLog[] };

export default function PracticeDaysCard({ logData }: Props) {
  const { total, currentStreak, monthData, tickInterval, chartConfig } =
    usePracticeDaysCard({
      logData,
    });

  return (
    <div className="w-full h-fit flex flex-col gap-4 border-1 rounded-[16px] p-6 shadow-md">
      {/* 카드 헤더 */}
      <div className="w-full h-36 flex items-center flex-col">
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
            key={monthData.length}
            data={monthData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={tickInterval}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
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

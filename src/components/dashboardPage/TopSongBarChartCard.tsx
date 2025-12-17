import type { PracticeLog } from "@/types/practiceDataTypes";
import DashBoardCard from "./DashBoardCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useTopSongChartCard } from "@/hooks/dashboard/useTopSongChartCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  logData: PracticeLog[];
};

export default function TopSongBarChartCard({ logData }: Props) {
  const { chartConfig, topSongs, recentSong } = useTopSongChartCard({
    logData,
  });
  return (
    <DashBoardCard title="연습곡 top 5" desc={`최근 연습곡: ${recentSong}`}>
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart
          accessibilityLayer
          data={topSongs}
          layout="vertical"
          margin={{
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="count" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="count"
            layout="vertical"
            fill="var(--color-count)"
            radius={4}
          >
            <LabelList
              dataKey="name"
              position="insideLeft"
              offset={8}
              className="fill-(--color-label)"
              fontSize={12}
            />
            <LabelList
              dataKey="count"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </DashBoardCard>
  );
}

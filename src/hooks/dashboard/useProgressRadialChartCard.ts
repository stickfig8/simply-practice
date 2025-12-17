import type { PracticeLog } from "@/types/practiceDataTypes";
import { isSameMonth, isSameWeek, parseISO } from "date-fns";
import { useMemo, useState } from "react";

export function useProgressRadialChartCard(logData: PracticeLog[]) {
  // 목표치
  const weeklyGoal = 6;
  const monthlyGoal = 26;

  const [mode, setMode] = useState<"week" | "month">("week");

  const progress = useMemo(() => {
    const now = new Date();
    let weekCount = 0;
    let monthCount = 0;

    logData.forEach((log) => {
      const date = parseISO(log.date);
      if (isSameWeek(date, now, { weekStartsOn: 1 })) weekCount++;
      if (isSameMonth(date, now)) monthCount++;
    });

    const currentCount = mode === "week" ? weekCount : monthCount;
    const goal = mode === "week" ? weeklyGoal : monthlyGoal;

    const percent = Math.min((currentCount / goal) * 100, 100);

    return {
      mode,
      currentCount,
      goal,
      percent: Math.round(percent),
    };
  }, [logData, mode]);

  const chartData = [
    { name: mode, count: progress.percent, fill: `var(--color-${mode})` },
  ];

  const chartConfig = {
    count: {
      label: "Count",
    },
    week: {
      label: "Week",
      color: "var(--chart-2)",
    },
    month: {
      label: "Month",
      color: "var(--chart-4)",
    },
  };

  return { progress, mode, setMode, chartData, chartConfig };
}

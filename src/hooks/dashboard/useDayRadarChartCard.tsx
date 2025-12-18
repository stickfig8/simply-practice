import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/LanguageStore";
import type { PracticeLog } from "@/types/practiceDataTypes";
import { getDay, parseISO } from "date-fns";
import { useMemo } from "react";

type Props = {
  logData: PracticeLog[];
};

export function useDayRadarChartCard({ logData }: Props) {
  const { lang } = useLanguageStore();

  const weekdayLabels = {
    kor: ["일", "월", "화", "수", "목", "금", "토"],
    eng: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    jpn: ["日", "月", "火", "水", "木", "金", "土"],
  } as const;

  const { chartData, topDay, topPercent } = useMemo(() => {
    if (!logData || logData.length === 0)
      return { chartData: [], topDay: "-", topPercent: 0 };

    const labels = weekdayLabels[lang] || weekdayLabels.kor;

    const counts = new Array(7).fill(0);

    logData.forEach((log) => {
      const dayIndex = getDay(parseISO(log.date)); // 0=일, 6=토
      counts[dayIndex] += 1;
    });

    const chartData = labels.map((day, idx) => ({
      day,
      count: counts[idx],
    }));

    const total = counts.reduce((a, b) => a + b, 0);
    const maxCount = Math.max(...counts);
    const maxIndex = counts.indexOf(maxCount);
    const topDay = labels[maxIndex];
    const topPercent = total ? Math.round((maxCount / total) * 100) : 0;

    return { chartData, topDay, topPercent };
  }, [logData, lang]);

  const chartConfig = {
    count: {
      label: languageText.dashboard.common.count[lang],
      color: "var(--chart-1)",
    },
  };
  return { chartData, chartConfig, topDay, topPercent };
}

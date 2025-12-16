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

  const chartData = useMemo(() => {
    if (!logData || logData.length === 0) return [];
    const labels = weekdayLabels[lang] || weekdayLabels.kor;

    // 요일별 카운트 초기화
    const counts = new Array(7).fill(0);

    logData.forEach((log) => {
      const dayIndex = getDay(parseISO(log.date)); // 0=일, 6=토
      counts[dayIndex] += 1;
    });

    return labels.map((day, idx) => ({
      day,
      count: counts[idx],
    }));
  }, [logData, lang]);

  const chartConfig = {
    count: {
      label: "Count",
      color: "var(--chart-1)",
    },
  };
  return { chartData, chartConfig };
}

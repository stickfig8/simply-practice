import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageStore";
import type { PracticeLog } from "@/types/practiceDataTypes";
import { useMemo } from "react";

type Props = {
  logData: PracticeLog[];
};

export function useInstrumentPieChartCard({ logData }: Props) {
  const { lang } = useLanguageStore();
  const { chartData, topInst, topPercent } = useMemo(() => {
    if (!logData || logData.length === 0)
      return { chartData: [], topInst: "-", topPercent: 0 };

    const counts: Record<string, number> = {};

    logData.forEach((log) => {
      counts[log.instrument] = (counts[log.instrument] || 0) + 1;
    });

    const total = logData.length;

    const colorKeys = [
      "var(--color-guitar)",
      "var(--color-bass)",
      "var(--color-drum)",
      "var(--color-keyboard)",
      "var(--color-vocal)",
      "var(--color-etc)",
    ];

    const chartData = Object.entries(counts).map(([instrument, count], i) => ({
      instrument,
      count,
      fill: colorKeys[i % colorKeys.length],
    }));

    // 가장 많이 연습한 악기 찾기
    const sorted = [...chartData].sort((a, b) => b.count - a.count);
    const top = sorted[0];
    const topInst = top?.instrument || "-";
    const topPercent = top ? Math.round((top.count / total) * 100) : 0;

    return { chartData, topInst, topPercent };
  }, [logData]);

  const chartConfig = {
    count: {
      label: languageText.dashboard.common.count[lang],
    },
    guitar: {
      label: "Guitar",
      color: "var(--chart-1)",
    },
    bass: {
      label: "Bass",
      color: "var(--chart-2)",
    },
    drum: {
      label: "Drum",
      color: "var(--chart-3)",
    },
    keyboard: {
      label: "Keyboard",
      color: "var(--chart-4)",
    },
    vocal: {
      label: "Vocal",
      color: "var(--chart-5)",
    },
    etc: {
      label: "etc",
      color: "var(--chart-6)",
    },
  };

  return { chartData, chartConfig, topInst, topPercent };
}

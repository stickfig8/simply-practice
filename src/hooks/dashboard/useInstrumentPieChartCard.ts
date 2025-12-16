import type { PracticeLog } from "@/types/practiceDataTypes";
import { useMemo } from "react";

type Props = {
  logData: PracticeLog[];
};

export function useInstrumentPieChartCard({ logData }: Props) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};

    logData.forEach((log) => {
      counts[log.instrument] = (counts[log.instrument] || 0) + 1;
    });

    const colorKeys = [
      "var(--color-guitar)",
      "var(--color-bass)",
      "var(--color-drum)",
      "var(--color-keyboard)",
      "var(--color-vocal)",
      "var(--color-etc)",
    ];

    return Object.entries(counts).map(([instrument, count], i) => ({
      instrument,
      count,
      fill: colorKeys[i % colorKeys.length],
    }));
  }, [logData]);

  const chartConfig = {
    count: {
      label: "연습 횟수",
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

  return { chartData, chartConfig };
}

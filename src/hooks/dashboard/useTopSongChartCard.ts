import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/LanguageStore";
import type { PracticeLog, SongCount } from "@/types/practiceDataTypes";
import { compareDesc, parseISO } from "date-fns";
import { useMemo } from "react";

type Props = {
  logData: PracticeLog[];
};
export function useTopSongChartCard({ logData }: Props) {
  const { lang } = useLanguageStore();
  const chartConfig = {
    count: {
      label: languageText.dashboard.common.count[lang],
      color: "var(--chart-1)",
    },
  };

  const { topSongs, recentSong } = useMemo(() => {
    if (!logData || logData.length === 0)
      return { topSongs: [], recentSong: null };

    const counts: Record<string, number> = {};

    logData.forEach((log) => {
      const name = log.songTitle || "Unknown";
      counts[name] = (counts[name] || 0) + 1;
    });

    const topSongs: SongCount[] = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const sortedByDate = [...logData].sort((a, b) =>
      compareDesc(parseISO(a.date), parseISO(b.date))
    );
    const recentSong = sortedByDate[0]?.songTitle || null;

    return { topSongs, recentSong };
  }, [logData]);

  return { chartConfig, topSongs, recentSong };
}

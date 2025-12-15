import type { PracticeLog, PracticeWeekData } from "@/types/practiceDataTypes";
import { getCurrentStreak, getSixMonthWeekData } from "@/utils/logUtils";
import { useEffect, useState } from "react";

type Props = {
  logData: PracticeLog[];
};

export function usePracticeDaysCard({ logData }: Props) {
  // 총 연습 횟수
  const [total, setTotal] = useState(0);
  // 최근 연속 연습
  const [currentStreak, setCurrentStreak] = useState(0);
  // 차트 데이터
  const [weekData, setWeekData] = useState<PracticeWeekData[]>([]);

  // 차트 x축 인터벌
  const [tickInterval, setTickInterval] = useState(0);

  useEffect(() => {
    if (!logData || logData.length === 0) return;

    setTotal(logData.length);

    const weekArr = getSixMonthWeekData(logData);

    setWeekData(weekArr);

    const streak = getCurrentStreak(logData);

    setCurrentStreak(streak);
  }, [logData]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 800) setTickInterval(2);
      else if (window.innerWidth < 1600) setTickInterval(1);
      else setTickInterval(0);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { total, currentStreak, weekData, tickInterval };
}

import type { PracticeLog, PracticeWeekData } from "@/types/practiceDataTypes";
import {
  startOfWeek,
  addWeeks,
  isBefore,
  isAfter,
  getMonth,
  getWeekOfMonth,
  subDays,
  isSameDay,
} from "date-fns";

export function getSixMonthWeekData(
  logData: PracticeLog[]
): PracticeWeekData[] {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const weeks: { weekStart: Date; label: string }[] = [];
  let current = startOfWeek(sixMonthsAgo, { weekStartsOn: 1 });

  while (isBefore(current, today)) {
    const month = getMonth(current) + 1;
    const weekOfMonth = getWeekOfMonth(current, { weekStartsOn: 1 });
    const label = `${month}월 ${weekOfMonth}주`;
    weeks.push({ weekStart: current, label });
    current = addWeeks(current, 1);
  }

  const weekCountMap: Record<string, number> = {};
  logData.forEach((log) => {
    const date = new Date(log.date);
    if (isBefore(date, sixMonthsAgo) || isAfter(date, today)) return;

    const month = getMonth(date) + 1;
    const weekOfMonth = getWeekOfMonth(date, { weekStartsOn: 1 });
    const label = `${month}월 ${weekOfMonth}주`;

    weekCountMap[label] = (weekCountMap[label] || 0) + 1;
  });

  const weekData = weeks.map(({ label }) => ({
    week: label,
    count: weekCountMap[label] || 0,
  }));

  return weekData;
}

export function getCurrentStreak(logData: PracticeLog[]): number {
  const uniqueDates = Array.from(new Set(logData.map((log) => log.date)))
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  const today = new Date();
  let streak = 0;

  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    const logDate = uniqueDates[i];

    if (streak === 0) {
      const diff = Math.floor(
        (today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff === 0 || diff === 1) {
        streak++;
      } else {
        break;
      }
    } else {
      const prevDate = subDays(today, streak);
      if (isSameDay(logDate, prevDate)) {
        streak++;
      } else {
        break;
      }
    }
  }

  return streak;
}

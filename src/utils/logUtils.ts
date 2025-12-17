import type { PracticeLog } from "@/types/practiceDataTypes";
import { subDays, isSameDay } from "date-fns";

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

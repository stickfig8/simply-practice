import type { PracticeLog } from "@/types/practiceDataTypes";
import { useMemo, useState, useEffect } from "react";
import {
  startOfMonth,
  subMonths,
  parseISO,
  format,
  isAfter,
  isBefore,
  differenceInCalendarDays,
} from "date-fns";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/language";

type MonthData = {
  month: string;
  count: number;
};

type Props = {
  logData: PracticeLog[];
};

export function usePracticeDaysCard({ logData }: Props) {
  const [tickInterval, setTickInterval] = useState(0);
  const { lang } = useLanguageStore();

  const monthLabels = {
    kor: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    eng: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    jpn: [
      "１月",
      "２月",
      "３月",
      "４月",
      "５月",
      "６月",
      "７月",
      "８月",
      "９月",
      "１０月",
      "１１月",
      "１２月",
    ],
  } as const;

  const chartConfig = {
    count: {
      label: languageText.dashboard.month.count[lang],
      color: "var(--chart-1)",
    },
  };

  const { total, monthData, currentStreak } = useMemo(() => {
    if (!logData || logData.length === 0)
      return { total: 0, monthData: [], currentStreak: 0 };

    const today = new Date();
    const start = startOfMonth(subMonths(today, 11));
    const months: MonthData[] = [];

    // 12개월 초기화
    for (let i = 0; i < 12; i++) {
      const date = subMonths(today, 11 - i);
      const monthIndex = parseInt(format(date, "M")) - 1;
      const label =
        monthLabels[lang]?.[monthIndex] || monthLabels.kor[monthIndex];
      months.push({ month: label, count: 0 });
    }

    // 월별 누적
    logData.forEach((log) => {
      const logDate = parseISO(log.date);
      if (isAfter(logDate, start) && isBefore(logDate, today)) {
        const monthIndex = parseInt(format(logDate, "M")) - 1;
        const target = months[monthIndex];
        if (target) target.count += 1;
      }
    });

    const total = logData.length;

    // ✅ 최근 연속 연습일 계산
    const uniqueDates = Array.from(
      new Set(logData.map((log) => format(parseISO(log.date), "yyyy-MM-dd")))
    ).sort((a, b) => (a > b ? -1 : 1)); // 최신순

    let streak = 0;
    let currentDate = new Date();

    for (const dateStr of uniqueDates) {
      const logDate = parseISO(dateStr);
      const diff = differenceInCalendarDays(currentDate, logDate);
      if (diff === 0 || diff === 1) {
        streak++;
        currentDate = logDate;
      } else break;
    }

    return { total, monthData: months, currentStreak: streak };
  }, [logData, lang]);

  // ✅ 반응형 X축 인터벌
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) setTickInterval(1);
      else setTickInterval(0);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { total, currentStreak, monthData, tickInterval, chartConfig };
}

import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageStore";
import type { CompareData, PracticeLog } from "@/types/practiceDataTypes";
import { getMonth, getYear, parseISO } from "date-fns";
import { useMemo } from "react";

type Props = {
  logData: PracticeLog[];
};

export function useCompareBarChartCard({ logData }: Props) {
  const { lang } = useLanguageStore();

  const chartConfig = {
    count: {
      label: languageText.dashboard.common.count[lang],
      color: "var(--chart-1)",
    },
  };

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
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
  } as const;

  const { chartData, diffPercent } = useMemo(() => {
    if (!logData || logData.length === 0)
      return { compareData: [], diffPercent: 0 };

    const now = new Date();
    const currentMonth = getMonth(now); // 0 ~ 11
    const currentYear = getYear(now);
    const labels = monthLabels[lang] || monthLabels.kor;

    let currentCount = 0;
    let prevCount = 0;

    logData.forEach((log) => {
      const date = parseISO(log.date);
      const month = getMonth(date);
      const year = getYear(date);

      if (month === currentMonth && year === currentYear) {
        currentCount++;
      } else if (
        (month === currentMonth - 1 && year === currentYear) ||
        (currentMonth === 0 && month === 11 && year === currentYear - 1)
      ) {
        prevCount++;
      }
    });

    // 월 이름 매핑
    const prevMonthLabel =
      currentMonth === 0
        ? labels[11] // 작년 12월
        : labels[currentMonth - 1];
    const currentMonthLabel = labels[currentMonth];

    // 데이터 배열
    const chartData: CompareData[] = [
      { month: prevMonthLabel, count: prevCount },
      { month: currentMonthLabel, count: currentCount },
    ];

    // 증감률 계산
    const diffPercent =
      prevCount === 0
        ? currentCount > 0
          ? 100
          : 0
        : ((currentCount - prevCount) / prevCount) * 100;

    return {
      chartData,
      diffPercent: Number(diffPercent.toFixed(1)),
    };
  }, [logData, lang]);

  return { chartData, diffPercent, chartConfig };
}

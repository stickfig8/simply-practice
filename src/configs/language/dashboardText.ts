import { format, parse } from "date-fns";

export const dashboardText = {
  common: {
    count: {
      kor: "연습 횟수",
      eng: "Count",
      jpn: "練習回数",
    },
  },
  month: {
    title: {
      kor: "연습 일수 현황",
      eng: "Days of practice",
      jpn: "練習日数現況",
    },
    total: {
      kor: "전체 연습 횟수: ",
      eng: "Total number of practice: ",
      jpn: "全体練習回数: ",
    },
    recent: {
      kor: "최근 연속 연습 일수: ",
      eng: "Last consecutive practice days: ",
      jpn: "直近連続練習日数: ",
    },
  },
  instrument: {
    title: {
      kor: "악기 분포",
      eng: "Instrument distribution",
      jpn: "楽器分布",
    },
    desc: {
      kor: (instrument: string, percent: number) =>
        `가장 많이 연습한 악기는 ${instrument}로, 전체의 ${percent}%를 차지합니다.`,
      eng: (instrument: string, percent: number) =>
        `The most practiced is the ${instrument}, which accounts for ${percent}% of the total.`,
      jpn: (instrument: string, percent: number) =>
        `最も多く練習した楽器${instrument}で、全体の ${percent}% を占めています。`,
    },
  },
  day: {
    title: {
      kor: "요일 분포",
      eng: "Day of the week distribution",
      jpn: "曜日分布",
    },
    desc: {
      kor: (most: string, percent: number) =>
        `가장 많이 연습한 요일은 ${most}요일로, 전체의 ${percent}%를 차지합니다.`,
      eng: (most: string, percent: number) =>
        `The most practiced day of the week is ${format(parse(most, "EEE", new Date()), "EEEE")}, which accounts for ${percent}% of the total.`,
      jpn: (most: string, percent: number) =>
        `最も練習した曜日は${most}曜日で、全体の ${percent}% を占めています。`,
    },
  },
  compare: {
    title: {
      kor: "지난달 연습량 비교",
      eng: "Comparison of last month's practice amount",
      jpn: "先月練習量比較",
    },
    desc: {
      kor: (percent: number) =>
        `지난달에 비해 ${Math.abs(percent)}% ${percent >= 0 ? "증가하였습니다." : "감소하였습니다."}`,
      eng: (percent: number) =>
        `It is ${percent >= 0 ? "up" : "down"} ${Math.abs(percent)}% compared to last month.`,
      jpn: (percent: number) =>
        `先月に比べて ${Math.abs(percent)}% ${percent >= 0 ? "増加" : "減少"}しました。`,
    },
  },
  topSong: {
    title: {
      kor: "연습곡 Top 5",
      eng: "Top 5 practice songs",
      jpn: "練習曲 Top 5",
    },
    desc: {
      kor: (song: string | null) =>
        song
          ? `가장 최근에 연습한 곡은 ${song}입니다.`
          : `최근에 연습한 곡이 없습니다.`,
      eng: (song: string | null) =>
        song
          ? `The most recent song practiced is ${song}.`
          : `No recent practice songs found.`,
      jpn: (song: string | null) =>
        song
          ? `一番最近練習した曲は${song}です。`
          : `最近練習した曲がありません。`,
    },
  },
  goal: {
    title: {
      kor: "목표 달성 현황",
      eng: "Goal Achievement Status",
      jpn: "目標達成現況",
    },
    desc: {
      kor: (count: number, goal: number) =>
        `현재 달성 횟수는 ${count}회, 목표 횟수는 ${goal}회입니다.`,
      eng: (count: number, goal: number) =>
        `The current number of achievements is ${count} and the target number is ${goal}.`,
      jpn: (count: number, goal: number) =>
        `現在の達成回数は${count}回、目標回数は${goal}回です。`,
    },
    week: {
      kor: "주간",
      eng: "week",
      jpn: "週刊",
    },
    month: {
      kor: "월간",
      eng: "month",
      jpn: "月刊",
    },
  },
};

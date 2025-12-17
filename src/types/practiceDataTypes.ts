export type PracticeLog = {
  date: string;
  songTitle: string;
  instrument: string;
  practicePart: string;
  bpm: number;
  desc: string;
};

export type CompareData = {
  month: string;
  count: number;
};

export type SongCount = {
  name: string;
  count: number;
};

export type PeriodCount = {
  period: "week" | "month";
  count: number;
};

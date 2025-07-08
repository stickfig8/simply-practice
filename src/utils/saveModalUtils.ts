function addZero(num: number) {
  return ("0" + num).slice(-2);
}

export function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = addZero(1 + date.getMonth());
  const day = addZero(date.getDate());

  return `${year}-${month}-${day}`;
}

export function readableSeconds(seconds: number) {
  const round = Math.round(seconds);
  if (seconds < 60) {
    return "00:" + addZero(round);
  }

  const mins = Math.floor(round / 60);
  const secs = round % 60;

  return `${addZero(mins)}:${addZero(secs)}`;
}

export function handleRangeCheck(setIsLooping: (isLooping: boolean) => void) {
  return function (e: React.ChangeEvent<HTMLInputElement>) {
    setIsLooping(e.target.checked);
  };
}

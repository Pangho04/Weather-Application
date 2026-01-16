export const formatWeatherTime = (dt_txt: string) => {
  const targetDate = new Date(`${dt_txt.replace(' ', 'T')}Z`);
  const now = new Date();

  const dateComparator = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
  });

  const isToday = dateComparator.format(targetDate) === dateComparator.format(now);

  const timePart = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    timeZone: 'Asia/Seoul',
  }).format(targetDate);

  const dayPart = isToday
    ? '오늘'
    : new Intl.DateTimeFormat('ko-KR', {
        day: 'numeric',
        timeZone: 'Asia/Seoul',
      }).format(targetDate);

  return {
    day: dayPart,
    time: timePart,
  };
};

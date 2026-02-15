import dayjs from 'dayjs';

const combineDateTime = (date, time) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const hour = time.$H;
  const minute = time.$m;
  const second = time.$s;
  const millisecond = time.$ms;

  const combinedDateTime = dayjs()
    .year(year)
    .month(month)
    .date(day)
    .hour(hour)
    .minute(minute)
    .second(second)
    .millisecond(millisecond);

  return combinedDateTime.toISOString();
};

export default combineDateTime;
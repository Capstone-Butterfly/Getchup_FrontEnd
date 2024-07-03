
import  dayjs from 'dayjs';

const DateDisplayFormat = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (startDate.isSame(endDate, 'day')) {
      return startDate.format('MMM D, YYYY');
    }

    const startMonth = startDate.format('MMM');
    const endMonth = endDate.format('MMM');
    const startDay = startDate.format('D');
    const endDay = endDate.format('D');
    const year = startDate.format('YYYY');

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  export default DateDisplayFormat;
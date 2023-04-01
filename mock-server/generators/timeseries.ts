import dayjs from 'dayjs';
import {Period} from '../../src/types';

const SUPPORTED_PERIODS = ['30d'] as const;

export interface TimeseriesParams {
  period: Period['period'];
}

export default function generateTimeseries({period}: TimeseriesParams) {
  if (!(SUPPORTED_PERIODS as unknown as Period['period'][]).includes(period)) {
    throw new Error(`Unsupported period: ${period}`);
  }
  const supportedPeriod = period as typeof SUPPORTED_PERIODS[number];

  const results = [];

  const startMap: Record<typeof supportedPeriod, () => dayjs.Dayjs> = {
    '30d': () => dayjs().subtract(30, 'day'),
  };

  let date = startMap[supportedPeriod]();
  let i = 0;
  while (date.isBefore(dayjs())) {
    results.push({
      date: date.format('YYYY-MM-DD'),
      visitors: Math.round(500 + (Math.sin(i++) + 1) * 200),
    });
    date = date.add(1, 'day');
  }

  return {results};
}

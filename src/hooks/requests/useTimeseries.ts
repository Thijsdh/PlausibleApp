import useSWR from 'swr';
import {fetcher} from '../../requests/base';
import {Period, TimeseriesDataPoint} from '../../types';

function useTimeseries(args?: {siteId: string; period: Period}) {
  const params = new URLSearchParams();
  if (args) {
    const {siteId, period} = args;
    params.append('site_id', siteId);
    params.append('period', period.period);
    if (period.date) params.append('date', period.date);
  }

  const {data, isLoading, error, mutate} = useSWR<{
    results: TimeseriesDataPoint[];
  }>(args && `/api/v1/stats/timeseries?${params.toString()}`, fetcher);

  const timeseries = data?.results.map(r => {
    // TODO: timezone support
    if (
      new Date(r.date.replace(' ', 'T')).valueOf() > Date.now() &&
      r.visitors === 0
    ) {
      r.visitors = null;
    }
    return r;
  });

  return {
    timeseries,
    isLoading,
    error,
    mutate,
  };
}

export default useTimeseries;

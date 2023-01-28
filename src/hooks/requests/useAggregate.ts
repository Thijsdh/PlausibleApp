import useSWR from 'swr';
import {fetcher} from '../../requests/base';
import {AggregateResult, Period} from '../../types';

function useAggregate(args?: {siteId: string; period: Period}) {
  const params = new URLSearchParams({
    metrics: 'visitors,pageviews,bounce_rate,visit_duration',
  });

  if (args) {
    const {siteId, period} = args;
    params.append('site_id', siteId);
    params.append('period', period.period);
    if (period.date) params.append('date', period.date);
  }

  const {data, isLoading, error, mutate} = useSWR<{results: AggregateResult}>(
    args && `/api/v1/stats/aggregate?${params.toString()}`,
    fetcher,
  );

  const aggregate: AggregateResult = {...data?.results, statType: 'aggregate'};

  return {
    aggregate,
    isLoading,
    error,
    mutate,
  };
}

export default useAggregate;

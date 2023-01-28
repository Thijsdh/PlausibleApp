import useSWR from 'swr';
import {dashboardFetcher} from '../../requests/base';
import {LiveStats} from '../../types';

type MainGraphRes = {
  plot?: number[];
  top_stats?: {name: string; value: number}[];
};

function useRealtimeAggregate(siteId?: string) {
  const {data, isLoading, error, mutate} = useSWR<MainGraphRes>(
    siteId && `/api/stats/${siteId}/top-stats?period=realtime`,
    dashboardFetcher,
  );

  const getStat = (statName: string) =>
    data?.top_stats?.find(({name}) => name.indexOf(statName) !== -1)?.value;

  const aggregate: LiveStats = {
    statType: 'live_stats',
    current_visitors: getStat('Current visitors'),
    unique_visitors: getStat('Unique visitors'),
    pageviews: getStat('Pageviews'),
  };

  return {
    aggregate,
    isLoading,
    error,
    mutate,
  };
}

export default useRealtimeAggregate;

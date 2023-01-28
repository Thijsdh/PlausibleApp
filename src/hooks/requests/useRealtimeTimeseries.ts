import useSWR from 'swr';
import {dashboardFetcher} from '../../requests/base';

type MainGraphRes = {
  plot?: number[];
  top_stats?: {name: string; value: number}[];
};

function useRealtimeTimeseries(args?: {siteId: string}) {
  const {data, isLoading, error, mutate} = useSWR<MainGraphRes>(
    args?.siteId && `/api/stats/${args.siteId}/main-graph?period=realtime`,
    dashboardFetcher,
    {refreshInterval: 10000},
  );

  const timeseries = data?.plot?.map((val, index) => ({
    date: `${30 - index} minutes ago`,
    visitors: val,
  }));

  return {
    timeseries,
    isLoading,
    error,
    mutate,
  };
}

export default useRealtimeTimeseries;

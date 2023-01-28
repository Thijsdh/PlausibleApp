import useSWR from 'swr';
import {fetcher} from '../../requests/base';

function useRealtimeVisitors(siteId?: string) {
  const {data, error, isLoading} = useSWR<number>(
    siteId && `/api/v1/stats/realtime/visitors?site_id=${siteId}`,
    fetcher,
  );

  return {
    visitors: data,
    isLoading,
    error,
  };
}

export default useRealtimeVisitors;

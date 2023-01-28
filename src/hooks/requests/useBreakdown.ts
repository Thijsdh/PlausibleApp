import useSWR from 'swr';
import {fetcher} from '../../requests/base';
import {BreakdownResult, Period, Property} from '../../types';

interface Params {
  siteId: string;
  period: Period;
  property: Property;
  limit?: number;
}

function useBreakdown(args?: Params) {
  const params = new URLSearchParams();
  if (args) {
    params.append('site_id', args.siteId);
    params.append('period', args.period.period);
    params.append('property', args.property);
    const limit = args.limit ?? 9;
    params.append('limit', limit.toString());
    if (args.period.date) params.append('date', args.period.date);
  }

  const {data, isLoading, error} = useSWR<{results: any[]}>(
    args && `/api/v1/stats/breakdown?${params.toString()}`,
    fetcher,
  );

  const key = args?.property.startsWith('visit:')
    ? args.property.substring(6)
    : 'page';

  const breakdown: BreakdownResult[] | undefined = data?.results.map(
    result => ({
      property: result[key],
      visitors: result.visitors,
    }),
  );

  return {
    breakdown,
    isLoading,
    error,
  };
}

export default useBreakdown;

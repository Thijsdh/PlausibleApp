import {AggregateResult, LiveStats, TimeseriesDataPoint} from '../Types';
import {get} from './base';
import {getRealtimeAggregate, getRealtimeTimeseries} from './dashboard';

export async function getRealtimeVisitors(siteId: string) {
  return await get<number>(`/api/v1/stats/realtime/visitors?site_id=${siteId}`);
}

export async function getAggregate(
  siteId: string,
  period: string,
): Promise<AggregateResult | LiveStats> {
  if (period === 'realtime') {
    // Realtime data is not available in the v1 API, fall back to the dashboard
    // API.
    return await getRealtimeAggregate(siteId);
  }

  const res = await get<{results: AggregateResult}>(
    `/api/v1/stats/aggregate?site_id=${siteId}&period=${period}&metrics=visitors,pageviews,bounce_rate,visit_duration`,
  );
  return {...res.results, statType: 'aggregate'};
}

export async function getTimeseries(siteId: string, period: string) {
  if (period === 'realtime') {
    // Realtime data is not available in the v1 API, fall back to the dashboard
    // API.
    return await getRealtimeTimeseries(siteId);
  }

  const res = await get<{results: TimeseriesDataPoint[]}>(
    `/api/v1/stats/timeseries?site_id=${siteId}&period=${period}`,
  );

  return res.results.map(r => {
    // TODO: timezone support
    if (
      new Date(r.date.replace(' ', 'T')).valueOf() > Date.now() &&
      r.visitors === 0
    ) {
      r.visitors = null;
    }
    return r;
  });
}

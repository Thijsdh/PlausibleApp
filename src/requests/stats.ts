import {
  AggregateResult,
  BreakdownResult,
  LiveStats,
  Period,
  Property,
  TimeseriesDataPoint,
} from '../types';
import {get} from './base';
import {getRealtimeAggregate, getRealtimeTimeseries} from './dashboard';

export async function getRealtimeVisitors(siteId: string) {
  return await get<number>(`/api/v1/stats/realtime/visitors?site_id=${siteId}`);
}

export async function getAggregate(
  siteId: string,
  period: Period,
): Promise<AggregateResult | LiveStats> {
  if (period.period === 'realtime') {
    // Realtime data is not available in the v1 API, fall back to the dashboard
    // API.
    return await getRealtimeAggregate(siteId);
  }

  const params = new URLSearchParams({
    site_id: siteId,
    period: period.period,
    metrics: 'visitors,pageviews,bounce_rate,visit_duration',
  });
  if (period.date) {
    params.append('date', period.date);
  }

  const res = await get<{results: AggregateResult}>(
    `/api/v1/stats/aggregate?${params.toString()}`,
  );
  return {...res.results, statType: 'aggregate'};
}

export async function getTimeseries(siteId: string, period: Period) {
  if (period.period === 'realtime') {
    // Realtime data is not available in the v1 API, fall back to the dashboard
    // API.
    return await getRealtimeTimeseries(siteId);
  }

  const params = new URLSearchParams({site_id: siteId, period: period.period});
  if (period.date) {
    params.append('date', period.date);
  }

  const res = await get<{results: TimeseriesDataPoint[]}>(
    `/api/v1/stats/timeseries?${params.toString()}`,
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

export async function getBreakdown(
  siteId: string,
  period: Period,
  property: Property,
  limit = 10,
) {
  const params = new URLSearchParams({
    site_id: siteId,
    period: period.period,
    property,
    limit: limit.toString(),
  });
  if (period.date) {
    params.append('date', period.date);
  }

  const res = await get<{results: BreakdownResult}>(
    `/api/v1/stats/breakdown?${params.toString()}`,
  );
  return res.results;
}

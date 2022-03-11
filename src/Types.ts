export type TimeseriesDataPoint = {
  date: string;
  visitors: number | null;
};

export type AggregateResult = {
  statType: 'aggregate';
  bounce_rate?: {value: number};
  pageviews?: {value: number};
  visit_duration?: {value: number};
  visitors?: {value: number};
};

export type LiveStats = {
  statType: 'live_stats';
  current_visitors?: number;
  unique_visitors?: number;
  pageviews?: number;
};

export type Site = {
  id: string;
  faviconUrl?: string;
};

export type Period = {
  period:
    | '12mo'
    | '6mo'
    | 'month'
    | '30d'
    | '7d'
    | 'day'
    | 'custom'
    | 'realtime';
  date?: string;
};

export type Property =
  | 'event:name'
  | 'event:page'
  | 'visit:entry_page'
  | 'visit:exit_page'
  | 'visit:source'
  | 'visit:referrer'
  | 'visit:utm_medium'
  | 'visit:utm_source'
  | 'visit:utm_campaign'
  | 'visit:utm_content'
  | 'visit:utm_term'
  | 'visit:device'
  | 'visit:browser'
  | 'visit:browser_version'
  | 'visit:os'
  | 'visit:os_version'
  | 'visit:country';

export type BreakdownResult = {
  property: string;
  visitors: number;
};

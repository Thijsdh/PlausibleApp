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

export type PageBreakdownResult = {
  page: string;
  visitors: number;
};

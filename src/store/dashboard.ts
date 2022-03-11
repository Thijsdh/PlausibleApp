import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getAggregate,
  getBreakdown,
  getRealtimeVisitors,
  getTimeseries,
} from '../requests/stats';
import {AppThunk} from '../store';
import {
  AggregateResult,
  LiveStats,
  BreakdownResult,
  Period,
  TimeseriesDataPoint,
} from '../types';

export type DashboardState = {
  fetching: boolean;
  period: Period;
  siteId?: string;
  realtimeVisitors?: number;
  timeseries?: TimeseriesDataPoint[];
  aggregate?: AggregateResult | LiveStats;
  topPagesBreakdown?: BreakdownResult[];
  entryPagesBreakdown?: BreakdownResult[];
  exitPagesBreakdown?: BreakdownResult[];
};

const initialPeriod: Period = {
  period: '30d',
};

const initialState: DashboardState = {
  fetching: false,
  period: initialPeriod,
};

export const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setSiteId: (state, action) => {
      state.siteId = action.payload;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
    setRealtimeVisitors: (state, action) => {
      state.realtimeVisitors = action.payload;
    },
    setTimeseries: (state, action) => {
      state.timeseries = action.payload;
    },
    setAggregate: (state, action) => {
      state.aggregate = action.payload;
    },
    clearData: state => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
    setBreakdowns: (
      state,
      action: PayloadAction<{
        top: BreakdownResult[];
        entry: BreakdownResult[];
        exit: BreakdownResult[];
      }>,
    ) => {
      state.topPagesBreakdown = action.payload.top;
      state.entryPagesBreakdown = action.payload.entry;
      state.exitPagesBreakdown = action.payload.exit;
    },
  },
});

export default slice.reducer;

const {
  setFetching,
  setSiteId,
  setRealtimeVisitors,
  setTimeseries,
  setAggregate,
  clearData,
  setBreakdowns,
} = slice.actions;
export {setSiteId, clearData};

export const setPeriod =
  (period: Period): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setPeriod(period));
    dispatch(fetchData());
    dispatch(fetchBreakdowns());
  };

export const fetchData = (): AppThunk => async (dispatch, getState) => {
  const {siteId, period} = getState().dashboard;
  if (!siteId) {
    return;
  }
  dispatch(setFetching(true));
  const [realtimeVisitors, timeseries, aggregate] = await Promise.all([
    getRealtimeVisitors(siteId),
    getTimeseries(siteId, period),
    getAggregate(siteId, period),
  ]);
  dispatch(setRealtimeVisitors(realtimeVisitors));
  dispatch(setTimeseries(timeseries));
  dispatch(setAggregate(aggregate));
  dispatch(fetchBreakdowns());
  dispatch(setFetching(false));
};

export const fetchBreakdowns = (): AppThunk => async (dispatch, getState) => {
  const {siteId, period} = getState().dashboard;
  if (!siteId) {
    return;
  }

  const [top, entry, exit] = await Promise.all([
    getBreakdown(siteId, period, 'event:page'),
    getBreakdown(siteId, period, 'visit:entry_page'),
    getBreakdown(siteId, period, 'visit:exit_page'),
  ]);

  dispatch(setBreakdowns({top, entry, exit}));
};

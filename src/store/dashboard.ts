import {createSlice} from '@reduxjs/toolkit';
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
  BreakdownType,
  Property,
} from '../types';

export type DashboardState = {
  fetching: boolean;
  period: Period;
  siteId?: string;
  realtimeVisitors?: number;
  timeseries?: TimeseriesDataPoint[];
  aggregate?: AggregateResult | LiveStats;
  pagesBreakdown: {
    type: BreakdownType;
    data?: BreakdownResult[];
  };
};

const initialPeriod: Period = {
  period: '30d',
};

const initialState: DashboardState = {
  fetching: false,
  period: initialPeriod,
  pagesBreakdown: {
    type: 'topPages',
  },
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
    setPagesBreakdownType: (state, params) => {
      state.pagesBreakdown.type = params.payload;
      state.pagesBreakdown.data = undefined;
    },
    setPagesBreakdown: (state, params) => {
      state.pagesBreakdown.data = params.payload;
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
  setPagesBreakdown,
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
  dispatch(setFetching(false));
};

export const fetchBreakdowns = (): AppThunk => async (dispatch, getState) => {
  const {siteId, period, pagesBreakdown} = getState().dashboard;
  if (!siteId) {
    return;
  }

  const typePropMap: {[B in BreakdownType]: Property} = {
    topPages: 'event:page',
    entryPages: 'visit:entry_page',
    exitPages: 'visit:exit_page',
  };

  const pagesBreakdownData = await getBreakdown(
    siteId,
    period,
    typePropMap[pagesBreakdown.type],
  );
  dispatch(setPagesBreakdown(pagesBreakdownData));
};

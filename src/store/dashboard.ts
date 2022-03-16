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
  Property,
} from '../types';

export type DashboardState = {
  fetching: boolean;
  period: Period;
  siteId?: string;
  realtimeVisitors?: number;
  timeseries?: TimeseriesDataPoint[];
  aggregate?: AggregateResult | LiveStats;
  breakdowns: {[T in Property]?: BreakdownResult[]};
  fetchingBreakdowns: Property[];
};

const initialPeriod: Period = {
  period: '30d',
};

const initialState: DashboardState = {
  fetching: false,
  period: initialPeriod,
  breakdowns: {},
  fetchingBreakdowns: [],
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
    setFetchingBreakdown: (state, action: PayloadAction<Property>) => {
      state.fetchingBreakdowns = [...state.fetchingBreakdowns, action.payload];
    },
    setFetchedBreakdown: (state, action: PayloadAction<Property>) => {
      state.fetchingBreakdowns = [
        ...state.fetchingBreakdowns.filter(b => b !== action.payload),
      ];
    },
    setBreakdowns: (
      state,
      action: PayloadAction<{[T in Property]?: BreakdownResult[]}>,
    ) => {
      for (const property of Object.keys(action.payload) as Property[]) {
        state.breakdowns[property] = action.payload[property];
      }
    },
    clearBreakdowns: state => {
      state.breakdowns = {};
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
  setFetchingBreakdown,
  setFetchedBreakdown,
  setBreakdowns,
  clearBreakdowns,
} = slice.actions;
export {setSiteId, clearData};

export const setPeriod =
  (period: Period): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setPeriod(period));
    dispatch(fetchData());
    dispatch(clearBreakdowns());
  };

export const fetchData = (): AppThunk => async (dispatch, getState) => {
  const {siteId, period} = getState().dashboard;
  if (!siteId) return;

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

export const fetchBreakdowns =
  (properties: Property[]): AppThunk =>
  async (dispatch, getState) => {
    const {siteId, period, fetchingBreakdowns} = getState().dashboard;
    if (!siteId) return;

    console.log(properties);

    for (const prop of properties) {
      const index = fetchingBreakdowns.indexOf(prop);
      // Do not fetch if we are already fetching this breakdown.
      if (index !== -1) {
        properties.splice(index, 1);
      } else {
        dispatch(setFetchingBreakdown(prop));
      }
    }

    const promises = properties.map(prop => getBreakdown(siteId, period, prop));
    const results = await Promise.all(promises);

    const breakdowns: {[T in Property]?: BreakdownResult[]} = {};
    for (let i = 0; i < properties.length; i++) {
      breakdowns[properties[i]] = results[i];
    }

    dispatch(setBreakdowns(breakdowns));
    for (const prop of properties) dispatch(setFetchedBreakdown(prop));
  };

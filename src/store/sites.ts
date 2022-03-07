import {createSlice} from '@reduxjs/toolkit';
import {getSites} from '../requests/dashboard';
import type {AppThunk} from '../store';
import {Site} from '../types';

export type SitesState = {
  fetchingSites: boolean;
  sites?: Site[];
};

const initialState: SitesState = {fetchingSites: false};

export const slice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSites: (state, action) => {
      state.sites = action.payload;
    },
  },
});

export default slice.reducer;

export const fetchSites = (): AppThunk => async dispatch => {
  getSites().then(sites => dispatch(slice.actions.setSites(sites)));
};

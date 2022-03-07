import {applyMiddleware, configureStore, Action} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';

import dashboard from './store/dashboard';
import sites from './store/sites';

const reducer = combineReducers({
  dashboard,
  sites,
});

const composedEnhancer = applyMiddleware(thunkMiddleware);

const store = configureStore({
  reducer,
  enhancers: [composedEnhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;

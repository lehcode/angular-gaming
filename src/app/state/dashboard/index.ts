import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '~/environments/environment';
//
import * as fromDashboard from '~/app/state/dashboard/dashboard.reducer';
import { DashboardState } from '~/app/interfaces/dashboard-state';

export const reducers: ActionReducerMap<DashboardState> = {
  games: fromDashboard.reducer,
  categories: fromDashboard.reducer
};

export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> =>
  localStorageSync({ keys: ['games', 'categories'] })(reducer);

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => (state, action) => {
  console.log('state', state);
  console.log('action', action);

  return reducer(state, action);
};

export const metaReducers: MetaReducer<DashboardState>[] = !environment.production ? [debug] : [];

export const gamesState = createFeatureSelector<DashboardState>('games');
export const categoriesState = createFeatureSelector<DashboardState>('categories');
//
export const fetchGames = createSelector(gamesState, fromDashboard.fetchGamesSelector);
export const getCategories = createSelector(categoriesState, fromDashboard.getCategoriesSelector);

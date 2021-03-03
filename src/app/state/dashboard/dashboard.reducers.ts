import { Action, ActionReducer, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
//
import * as dashboardActions from '~/app/state/dashboard/dashboard.actions';
import { DashboardState } from '~/app/interfaces/dashboard-state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '~/environments/environment';
import { throwError } from 'rxjs';
import { GameEntity } from '~/app/interfaces/game-entity';
import * as dashboardSelectors from '~/app/state/dashboard/dashboard.selectors';

// const getGamesReducer = (state: DashboardState, action) => state;

export const initialState: DashboardState = {
  games: [],
  categories: [{ name: 'other', selected: false }],
  selectedCategory: 'other',
  selectedGame: null,
  isLoading: false,
  isLoadingSuccess: false
};

const dashboardReducer = createReducer(
  initialState,
  on(
    dashboardActions.fetchGamesSuccess,
    (state: DashboardState, values: any): DashboardState => ({
      ...state,
      games: values.games,
      isLoading: false,
      isLoadingSuccess: true
    })
  ),
  on(dashboardActions.fetchGamesFailure, (state: DashboardState, error: any) => ({
    error,
    isLoading: false,
    isLoadingSuccess: false
  })),
  on(dashboardActions.getCategoriesSuccess, (state: DashboardState, action) => ({
    ...state,
    categories: initialState.categories?.concat(action.categories),
    isLoading: false,
    isLoadingSuccess: true
  })),
  on(dashboardActions.selectCategorySuccess, (state: DashboardState, action) => ({
    ...state,
    selectedCategory: action.category as string
  })),
  on(dashboardActions.selectCategoryFailure, (state: DashboardState, error: any) => ({
    error,
    isLoading: false,
    isLoadingSuccess: false
  }))
);

const debug = (reducer: ActionReducer<any>): ActionReducer<any> => (state, action) => {
  console.log('state', state);
  console.log('action', action);

  try {
    return reducer(state, action);
  } catch (err) {
    throwError(err);
  }
};

const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> =>
  localStorageSync({ keys: ['games', 'categories', 'selectedCategory'] })(reducer);

const reducer = (state: any, action: Action): any => {
  console.log(state);
  console.log(action);

  return dashboardReducer(state, action);
};

export const reducers: ActionReducerMap<DashboardState> = {
  games: reducer,
  categories: reducer,
  selectedCategory: reducer,
  selectedGame: reducer
};

export const metaReducers: MetaReducer<DashboardState>[] = !environment.production ? [debug] : [];

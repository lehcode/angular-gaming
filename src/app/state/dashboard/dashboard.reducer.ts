import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
//
import * as dashboardActions from '~/app/state/dashboard/dashboard.actions';
import { GameEntity } from '~/app/interfaces/game-entity';
import * as storage from '~/app/state/storage';
import { DashboardState } from '~/app/interfaces/dashboard-state';

export const getGamesReducer = (state: DashboardState, action) => state;

export const initialState: DashboardState = {
  games: storage.getItem('games'),
  categories: storage.getItem('categories'),
  selectedCategory: undefined,
  selectedGame: undefined,
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.fetchGamesAction, (state) => ({
    ...state,
    isLoading: true
  })),
  on(
    dashboardActions.fetchGamesSuccess,
    (state: DashboardState, values: GameEntity[]): DashboardState =>
      ({
        games: Object.values(values),
        isLoading: false,
        isLoadingSuccess: true
      } as DashboardState)
  ),
  on(dashboardActions.getCategoriesAction, (state) => ({ ...state, isLoading: true })),
  on(dashboardActions.getCategoriesSuccess, (state: DashboardState, categories) => categories)
);

export const reducer = (state: any, action: Action): any => {
  console.log(state);
  console.log(action);

  return dashboardReducer(state, action);
};

export const fetchGamesSelector = (state: DashboardState): DashboardState => {
  console.log(state);

  return {
    games: state.games,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  } as DashboardState;
};
//
export const getCategoriesSelector = (state: DashboardState) => state.categories;

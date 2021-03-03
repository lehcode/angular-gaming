import { DashboardState } from '../../interfaces/dashboard-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isArray } from 'lodash';
import { GameEntity } from '~/app/interfaces/game-entity';
import { CategoryItem } from '~/app/interfaces/category-item';
import { initialState } from '~/app/state/dashboard/dashboard.reducers';

const gamesState = createFeatureSelector<DashboardState>('games');
const categoriesState = createFeatureSelector<DashboardState>('categories');
const selectedCategoryState = createFeatureSelector<DashboardState>('selectedCategory');
const selectedGameState = createFeatureSelector<DashboardState>('selectedGame');

export const fetchGames = createSelector(gamesState, (state: DashboardState) => ({
  games: state.games,
  isLoading: true
}));
export const getCategories = createSelector(categoriesState, (state: DashboardState): {
  categories: CategoryItem[];
} => ({
  categories: state.categories as CategoryItem[]
}));
export const selectedCategory = createSelector(selectedCategoryState, (state: DashboardState): {
  name: string;
} => {
  console.log(state);

  return { name: state.selectedCategory as string }
});
export const selectedGame = createSelector(
  selectedGameState,
  (state: DashboardState): GameEntity => state.selectedGame as GameEntity
);

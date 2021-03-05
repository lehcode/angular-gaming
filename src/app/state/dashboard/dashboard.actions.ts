import { createAction, props } from '@ngrx/store';
import { GameEntity } from '~/app/interfaces/game-entity';
import { CategoryItem } from '~/app/interfaces/category-item';

export const FETCH_GAMES = '[Dashboard] Fetch Games';
export const FETCH_GAMES_SUCCESS = '[Dashboard] Fetch Games Success';
export const FETCH_GAMES_FAILURE = '[Dashboard] Fetch Games Failure';

export const GET_CATEGORIES = '[Dashboard] Fetch Categories';
export const GET_CATEGORIES_SUCCESS = '[Dashboard] Get Categories Success';
export const GET_CATEGORIES_FAILURE = '[Dashboard] Get Categories Failure';

export const SELECT_CATEGORY = '[Dashboard] Select Category';
export const SELECT_CATEGORY_SUCCESS = '[Dashboard] Select Category Success';
export const SELECT_CATEGORY_FAILURE = '[Dashboard] Select Category Failure';

// export const GET_SELECTED_GAME = '[Dashboard] Get Selected Game';
// export const GET_SELECTED_GAME_SUCCESS = '[Dashboard] Get Selected GameSuccess';
// export const GET_SELECTED_GAME_FAILURE = '[Dashboard] Get Selected Game Failure';

export const fetchGames = createAction(FETCH_GAMES);
export const fetchGamesSuccess = createAction(FETCH_GAMES_SUCCESS, props<{ games: GameEntity[] }>());
// eslint-disable-next-line id-blacklist
export const fetchGamesFailure = createAction(FETCH_GAMES_FAILURE, props<{ any }>());

export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS, props<{ categories: CategoryItem[] }>());
// eslint-disable-next-line id-blacklist
export const getCategoriesFailure = createAction(GET_CATEGORIES_FAILURE, props<{ error: string }>());

export const selectCategory = createAction(SELECT_CATEGORY, props<Record<string, any>>());
export const selectCategorySuccess = createAction(SELECT_CATEGORY_SUCCESS, props<any>());
// eslint-disable-next-line id-blacklist
export const selectCategoryFailure = createAction(SELECT_CATEGORY_FAILURE, props<{ any }>());

import { createAction, props } from '@ngrx/store';

export const FETCH_GAMES = '[Games] Fetch Games';
export const FETCH_GAMES_SUCCESS = '[Games] Fetch Games Success';
export const FETCH_GAMES_FAILURE = '[Games] Fetch Games Failure';

export const GET_SELECTED_GAME = '[Games] Get Selected Game';
export const GET_SELECTED_GAME_SUCCESS = '[Games] Get Selected GameSuccess';
export const GET_SELECTED_GAME_FAILURE = '[Games] Get Selected Game Failure';

export const GET_CATEGORIES = '[Categories] Fetch Categories';
export const GET_CATEGORIES_SUCCESS = '[Categories] Get Categories Success';
export const GET_CATEGORIES_FAILURE = '[Categories] Get Categories Failure';

export const SELECT_CATEGORY = '[Dashboard] Select Category';
export const SELECT_CATEGORY_SUCCESS = '[Dashboard] Select Category Success';
export const SELECT_CATEGORY_FAILURE = '[Dashboard] Select Category Failure';

export const fetchGamesAction = createAction(FETCH_GAMES);
export const fetchGamesSuccess = createAction(FETCH_GAMES_SUCCESS, props<any>());
// eslint-disable-next-line id-blacklist
export const fetchGamesFailure = createAction(FETCH_GAMES_FAILURE, props<any>());

export const selectCategory = createAction(SELECT_CATEGORY, props<{ name: string }>());
export const selectCategorySuccess = createAction(FETCH_GAMES_SUCCESS, props<any>());
// eslint-disable-next-line id-blacklist
export const selectCategoryFailure = createAction(FETCH_GAMES_FAILURE, props<any>());

export const getCategoriesAction = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS, props<any>());
// eslint-disable-next-line id-blacklist
export const getCategoriesFailure = createAction(GET_CATEGORIES_FAILURE, props<any>());

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of, throwError } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';
import * as dashboardActions from '~/app/state/dashboard/dashboard.actions';
import * as dashboardState from '~/app/state/dashboard/dashboard.selectors';
import { ApiService } from '~/app/services/api.service';
import { State } from '@ngrx/store';
import { GameEntity } from '~/app/interfaces/game-entity';
import { TypedAction } from '@ngrx/store/src/models';
import { CategoryItem } from '~/app/interfaces/category-item';

@Injectable()
export class DashboardEffects {
  fetchGames$ = createEffect(() =>
    this.api.games$.pipe(
      map((games: GameEntity[]) => dashboardActions.fetchGamesSuccess({ games })),
      catchError((error: any) => of(dashboardActions.fetchGamesFailure(error)))
    )
  );

  selectCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.selectCategory),
      mergeMap((action) =>
        of(action).pipe(map((categoryName) => dashboardActions.selectCategorySuccess({ category: categoryName })))
      )
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      map((action) => {
        console.log(action);
        // @ts-ignore
        const games = action.games as GameEntity[];
        const categories: CategoryItem[] = [];

        games.forEach((game, i) => {
          game.categories.reduce((result, category) => {
            const found = result.filter((cat) => cat.name === category).length;

            if (!found) {
              result.push({ name: category, selected: false });
            }

            return result;
          }, categories);
        });

        return dashboardActions.getCategoriesSuccess({ categories });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private readonly api: ApiService,
    private readonly state: State<{ games: GameEntity[]; categories: CategoryItem[] }>
  ) {}
}

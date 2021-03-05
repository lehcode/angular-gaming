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
import { GamesService } from '~/app/services/games.service';

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
    this.games.fetchAll$().pipe(
      map((games) => {
        if (games && games.length) {
          const categories: CategoryItem[] = [];

          games.forEach((game, i) => {
            game.categories.reduce((result, category) => {
              if (!result.filter((cat) => cat.name === category).length) {
                result.push({
                  name: category,
                  selected: false
                });
              }

              return result;
            }, categories);
          });

          return dashboardActions.getCategoriesSuccess({ categories });
        }

        return dashboardActions.getCategoriesFailure({ error: 'Empty categories list' });
      })
    )
  );

  constructor(private actions$: Actions, private readonly api: ApiService, private readonly games: GamesService) {}
}

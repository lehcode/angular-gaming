import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';
//
import * as dashboardActions from '~/app/state/dashboard/dashboard.actions';
import { ApiService } from '~/app/services/api.service';
import { State } from '@ngrx/store';
import { GameEntity } from '~/app/interfaces/game-entity';

@Injectable()
export class DashboardEffects {
  private games: Observable<GameEntity[]>;

  constructor(private readonly api: ApiService, private readonly state: State<{ games: GameEntity[] }>) {
    this.games = from([]);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  fetchGames$ = createEffect(() =>
    this.api.games$.pipe(
      map((games) => {
        console.log('games:', games);
        return dashboardActions.fetchGamesSuccess(games);
      }),
      // tap((success) => {
      //   this.games = success.games;
      // }),
      catchError((error: any) => of(dashboardActions.fetchGamesFailure(error)))
    )
  );
}

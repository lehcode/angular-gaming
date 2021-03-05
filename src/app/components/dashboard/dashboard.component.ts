import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { GameEntity } from '~/app/interfaces/game-entity';
import * as dashboardState from '~/app/state/dashboard/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  games$: Observable<GameEntity[]> = of([]);

  category$: Observable<string> = of('default');

  constructor(private readonly store: Store<{ games: GameEntity[]; categories: string[] }>) {}

  ngOnInit() {
    this.games$ = this.getGames$();
    this.category$ = this.getCategory$();
    this.category$.subscribe((updated) => {
      this.games$ = this.getGames$().pipe(
        map((games) => {
          if (updated !== 'other') {
            games = games.filter((game) => {
              // @ts-ignore
              const found = game.categories.findIndex((el) => el === updated);
              return found >= 0 ? game : false;
            });
          }

          return games;
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getGames$(): Observable<GameEntity[]> {
    return this.store.select(dashboardState.fetchGames).pipe(
      takeUntil(this.destroy$),
      map((resolved) => resolved.games as GameEntity[])
    );
  }

  private getCategory$(): Observable<string> {
    return this.store.select(dashboardState.selectedCategory).pipe(
      takeUntil(this.destroy$),
      map((resolved) => resolved.name as string)
    );
  }
}

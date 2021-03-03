import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
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
    this.games$ = this.store.select(dashboardState.fetchGames).pipe(
      takeUntil(this.destroy$),
      map((resolved) => resolved.games as GameEntity[])
    );

    this.category$ = this.store.select(dashboardState.selectedCategory).pipe(
      takeUntil(this.destroy$),
      map((resolved) => resolved.name as string)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

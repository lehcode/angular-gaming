import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
//
import { GameEntity } from '~/app/interfaces/game-entity';
import * as fromDashboard from '~/app/state/dashboard';
import EventEmitter from 'events';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  games: GameEntity[] = [];

  constructor(private readonly store: Store<{ games: GameEntity[]; categories: string[] }>) {}

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.store
      .select(fromDashboard.gamesState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.isLoadingSuccess && !data.isLoading) {
          this.games = data.games;
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

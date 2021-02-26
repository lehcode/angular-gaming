import { Component, OnInit, Output } from '@angular/core';
import * as fromDashboard from '~/app/state/dashboard';
import { takeUntil } from 'rxjs/operators';
import { GameEntity } from '~/app/interfaces/game-entity';
import { Store } from '@ngrx/store';
import { Subject, throwError } from 'rxjs';
import EventEmitter from 'events';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  readonly categories: string[] = ['all'];

  constructor(private readonly store: Store<{ categories: string[] }>) {}

  ngOnInit(): void {
    this.store
      .select(fromDashboard.gamesState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.games.length) {
          try {
            data.games.forEach((game: GameEntity) => {
              if (game.categories) {
                game.categories.forEach((category) => {
                  if (this.categories.indexOf(category) === -1) {
                    this.categories.push(category);
                  }
                });
              }
            });
          } catch (error) {
            debugger;
            throwError(error);
          }
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  destroy$: Subject<boolean> = new Subject<boolean>();
}

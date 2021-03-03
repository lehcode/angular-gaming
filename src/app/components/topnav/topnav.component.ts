import { Component, OnInit } from '@angular/core';
import * as dashboardState from '~/app/state/dashboard/dashboard.selectors';
import { catchError, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { GameEntity } from '~/app/interfaces/game-entity';
import { Store } from '@ngrx/store';
import { CategoryItem } from '~/app/interfaces/category-item';
import { DashboardState } from '~/app/interfaces/dashboard-state';
import { from, Observable, of, Subject } from 'rxjs';
import * as dashboardActions from '~/app/state/dashboard/dashboard.actions';
import { GamesService } from '~/app/services/games.service';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  categories$: Observable<CategoryItem[]> = of([]);

  selected$: Observable<string> = of('default');

  constructor(
    private readonly store: Store<{ categories: CategoryItem[]; selectedCategory: string }>,
    private readonly actions$: Actions
  ) {}

  ngOnInit() {
    this.categories$ = this.store.select(dashboardState.getCategories).pipe(
      takeUntil(this.destroy$),
      map((resolved) => resolved.categories)
    );
    this.selected$ = this.store.select(dashboardState.selectedCategory).pipe(map((cat) => cat.name));
  }

  onNavClick(event: Event) {
    // @ts-ignore
    const selected = /^([a-z]+)([a-z-]+)/.exec(event.target.id)[1];
    this.store.dispatch({type: dashboardActions.selectCategorySuccess.type, category: selected});
  }
}

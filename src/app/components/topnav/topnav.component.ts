import { Component, OnInit } from '@angular/core';
import * as dashboardState from '~/app/state/dashboard/dashboard.selectors';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CategoryItem } from '~/app/interfaces/category-item';
import { Observable, of, Subject, throwError } from 'rxjs';
import * as dashboardActions from '~/app/state/dashboard/dashboard.actions';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  categories$: Observable<CategoryItem[]> = of([]);

  selected$: Observable<string> = of('default');

  selected = 'default';

  constructor(
    private readonly store: Store<{
      categories: CategoryItem[];
      selectedCategory: string;
    }>
  ) {}

  ngOnInit() {
    this.categories$ = this.store.select(dashboardState.getCategories).pipe(
      takeUntil(this.destroy$),
      map((resolved) => {
        if (resolved.categories.length > 1) {
          return resolved.categories.slice(1);
        }
        return resolved.categories;
      })
    );
    this.selected$ = this.store.select(dashboardState.selectedCategory).pipe(
      map((cat) => cat.name),
      tap((cat) => (this.selected = cat))
    );
    this.selected$.subscribe((selected) => (this.selected = selected));
  }

  onNavClick(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    // @ts-ignore
    const selected = /^([a-z]+)([a-z-]+)/.exec(event.target.id)[1];
    this.store.dispatch({
      type: dashboardActions.selectCategorySuccess.type,
      category: selected
    });

    this.categories$ = this.store.select(dashboardState.getCategories).pipe(
      map((action) => action.categories.slice(1)),
      map((categories) =>
        categories.map((cat) => {
          if (selected === cat.name) {
            return Object.assign({}, cat, { selected: true }) as CategoryItem;
          }
          return Object.assign({}, cat, { selected: false }) as CategoryItem;
        })
      ),
      catchError((error) => throwError(dashboardActions.selectCategoryFailure(error)))
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
//
import { ApiService } from '~/app/services/api.service';
import { GamesService } from '~/app/services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private game$: Observable<any> | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: ApiService,
    private readonly games: GamesService
  ) {}

  ngOnInit(): void {
    // this.game$ = this.route.paramMap.pipe(
    //   switchMap((value: any) => this.games.fetchGame(value.id))
    // );
    // console.log(this.game$);
  }
}

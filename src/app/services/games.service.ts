import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { GameEntity } from '../interfaces/game-entity';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private games: GameEntity[] = [];

  private selectedGame: string | undefined;

  constructor(private readonly api: ApiService) {
    this.api.games$.subscribe((games) => (this.games = games));
  }

  /**
   * List of all games
   */
  fetchAll$(): Observable<GameEntity[]> {
    return this.api.games$;
  }

  /**
   * Single game
   */
  fetchGame(id: string): GameEntity {
    return this.games.filter((game: GameEntity) => game.id === id)[0] as GameEntity;
  }
}

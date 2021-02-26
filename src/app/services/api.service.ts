import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map, mergeMapTo, switchMap, tap } from 'rxjs/operators';
//
import { JackpotInput } from '~/app/interfaces/jackpot-input';
import { GameEntity } from '~/app/interfaces/game-entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiHost = 'http://stage.whgstage.com';

  private gamesUri = '/front-end-test/games.php';

  private jackpotsUri = '/front-end-test/jackpots.php';

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetch games list
   */
  get games$(): Observable<GameEntity[]> {
    return this.http.get<GameEntity[]>(`${this.apiHost}${this.gamesUri}`).pipe(
      map((games) => games as GameEntity[]),
      mergeMapTo(this.jackpots$, (games: GameEntity[], jackpots: JackpotInput[]) => {
        games.forEach((game: Record<string, any>) => {
          jackpots.forEach((jp: JackpotInput) => {
            if (jp.game === game.id) {
              Object.assign(game, { jackpot: jp.amount });
            }
          });
        });
        return games;
      })
    );
  }

  /**
   * Fetch jackpots
   */
  get jackpots$(): Observable<JackpotInput[]> {
    return this.http.get<JackpotInput[]>(`${this.apiHost}${this.jackpotsUri}`);
  }
}

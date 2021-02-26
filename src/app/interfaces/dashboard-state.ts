import { GameEntity } from './game-entity';

export interface DashboardState {
  games?: GameEntity[];
  categories?: string[];
  selectedCategory?: string;
  selectedGame?: GameEntity;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

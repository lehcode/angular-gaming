import { GameEntity } from './game-entity';
import { CategoryItem } from '~/app/interfaces/category-item';

export interface DashboardState {
  games?: GameEntity[];
  categories?: CategoryItem[];
  selectedCategory?: string;
  selectedGame?: GameEntity | null;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
}

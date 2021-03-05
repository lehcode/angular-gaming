export interface GameEntity {
  categories: string[];
  name: string;
  image: string;
  id: string;
  jackpot?: number;
  href?: string;
  isNew: boolean;
}

import { GameList } from "./gameList";

export interface DashboardState {
  loading: boolean;
  gameList: GameList;
  error: string;
};
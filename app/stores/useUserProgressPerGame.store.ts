import RequestManager from "../helpers/requestManager";
import { createStore } from "./store";
import { useUserStore } from "./user.store";

export type UserProgressPerGame = Record<string, GetUserProgress>;

export interface GetUserProgress {
  NumPossibleAchievements: number;
  PossibleScore: number;
  NumAchieved: number;
  ScoreAchieved: number;
  NumAchievedHardcore: number;
  ScoreAchievedHardcore: number;
}

export const useUserProgressPerGameStore = createStore<UserProgressPerGame>(
  "user-progess-per-game",
  async (gameIds: string[]) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      throw new Error("User not logged in");
    }

    const answer =
      await RequestManager.getInstance().request<UserProgressPerGame>({
        url: `https://retroachievements.org/API/API_GetUserProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&i=${gameIds.join(",")}`,
        method: "GET",
      });

    const data: UserProgressPerGame = {};
    gameIds.forEach((gameId) => {
      const game = answer?.data[gameId];
      if (game) {
        data[gameId] = game;
      }
    });

    return data;
  },
);

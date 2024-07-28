import RequestManager from "../../helpers/requestManager";
import { createStore } from "../store";
import { useUserStore } from "../user.store";

export interface AchievementOfTheWeek {
  Achievement: Achievement;
  Console: Console;
  ForumTopic: ForumTopic;
  Game: Game;
  StartAt: string;
  TotalPlayers: number;
  Unlocks: Unlock[];
  UnlocksCount: number;
  UnlocksHardcoreCount: number;
}

export interface Achievement {
  ID: number;
  Title: string;
  Description: string;
  Points: number;
  TrueRatio: number;
  Type?: string;
  Author: string;
  DateCreated: string;
  DateModified: string;
}

export interface Console {
  ID: number;
  Title: string;
}

export interface ForumTopic {
  ID: number;
}

export interface Game {
  ID: number;
  Title: string;
}

export interface Unlock {
  User: string;
  RAPoints: number;
  RASoftcorePoints: number;
  DateAwarded: string;
  HardcoreMode: number;
}

export const useAchievementOfTheWeek = createStore<AchievementOfTheWeek>(
  "game-extended",
  async (gameId: number) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer = await RequestManager.getInstance().request<AchievementOfTheWeek>({
      url: `https://retroachievements.org/API/API_GetAchievementOfTheWeek.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}`,
      method: "GET",
    });

    return answer?.data;
  },
);

import { create } from "zustand";
import {
  AchievementOfTheWeek,
  getAchievementOfTheWeek,
} from "@retroachievements/api";

import { useUserStore } from "../user";
import RequestManager from "@/app/helpers/requestManager";
import { RecentAchievements } from "@/app/types/game.type";

interface GameState {
  ownGames: any[];
  wishGames: any[];
  achievementOfTheWeek?: AchievementOfTheWeek;
  recentAchievements?: RecentAchievements;
}

interface GameAction {
  fetchOwnGames: () => Promise<void>;
  fetchAchievementOfTheWeek: () => Promise<void>;
  fetchWishGames: () => Promise<void>;
  fetchRecentAchievements: () => Promise<void>;
}

type GameStore = GameState & GameAction;

export const useGameStore = create<GameStore>()((set, get) => {
  return {
    // States
    ownGames: [],
    wishGames: [],
    achievementOfTheWeek: undefined,

    // Actions
    fetchOwnGames: async () => {
      set({ ownGames: [] });
    },
    fetchAchievementOfTheWeek: async () => {
      const { authorization } = useUserStore.getState();

      if (authorization) {
        try {
          const answer = await getAchievementOfTheWeek(authorization);
          if (answer) set({ achievementOfTheWeek: answer });
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
    fetchRecentAchievements: async () => {
      const { authorization } = useUserStore.getState();

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<RecentAchievements>({
              url: `https://retroachievements.org/API/API_GetUserRecentAchievements.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&m=${60 * 24 * 3}`,
              method: "GET",
            });
          if (answer) {
            console.log(answer.data);
            set({ recentAchievements: answer.data });
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
    fetchWishGames: async () => {
      set({ wishGames: [] });
    },
  };
});

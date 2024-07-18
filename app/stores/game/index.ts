import { create } from "zustand";

import { useUserStore } from "../user";
import RequestManager from "@/app/helpers/requestManager";
import { RecentAchievements } from "@/app/types/game.type";

interface GameState {
  ownGames: any[];
  wishGames: any[];
  recentAchievements?: RecentAchievements;
}

interface GameAction {
  fetchOwnGames: () => Promise<void>;
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
    fetchRecentAchievements: async () => {
      const { authorization } = useUserStore.getState();

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<RecentAchievements>({
              url: `https://retroachievements.org/API/API_GetUserRecentAchievements.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&m=${60 * 24 * 30}`,
              method: "GET",
            });
          if (answer) {
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

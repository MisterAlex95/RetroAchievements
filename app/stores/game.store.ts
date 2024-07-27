import { create } from "zustand";

import { useUserStore } from "./user.store";
import RequestManager from "@/app/helpers/requestManager";
import { GameExtended, RecentAchievements } from "@/app/types/game.type";

interface GameState {
  recentAchievements?: RecentAchievements;
  isFetchingRecentAchievements: boolean;

  gameExtended?: GameExtended;
  isFetchingGameExtended: boolean;
}

interface GameAction {
  fetchRecentAchievements: () => Promise<void>;
  fetchGameExtended: (gameId: string) => Promise<void>;
}

type GameStore = GameState & GameAction;

export const useGameStore = create<GameStore>()((set, get) => {
  return {
    // States
    recentAchievements: [],
    isFetchingRecentAchievements: false,

    gameExtended: undefined,
    isFetchingGameExtended: false,

    // Actions
    fetchRecentAchievements: async () => {
      const { authorization } = useUserStore.getState();
      set({ isFetchingRecentAchievements: true });

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<RecentAchievements>({
              url: `https://retroachievements.org/API/API_GetUserRecentAchievements.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&m=${60 * 24 * 30}`,
              method: "GET",
            });
          if (answer) {
            set({
              recentAchievements: answer.data,
              isFetchingRecentAchievements: false,
            });
            return;
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
        set({ isFetchingRecentAchievements: false });
      }
    },
    fetchGameExtended: async (gameId: string) => {
      const { authorization } = useUserStore.getState();
      set({ isFetchingGameExtended: true });

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<GameExtended>({
              url: `https://retroachievements.org/API/API_GetGameExtended.php?z=${authorization.username}&y=${authorization.webApiKey}&i=${gameId}`,
              method: "GET",
            });
          if (answer) {
            set({
              gameExtended: answer.data,
              isFetchingGameExtended: false,
            });
            return;
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
        set({ isFetchingGameExtended: false });
      }
    },
  };
});

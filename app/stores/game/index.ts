import { create } from "zustand";
import {
  AchievementOfTheWeek,
  getAchievementOfTheWeek,
} from "@retroachievements/api";

import { useUserStore } from "../user";

interface GameState {
  ownGames: any[];
  wishGames: any[];
  achievementOfTheWeek?: AchievementOfTheWeek;
}

interface GameAction {
  fetchOwnGames: () => Promise<void>;
  fetchAchievementOfTheWeek: () => Promise<void>;
  fetchWishGames: () => Promise<void>;
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
    fetchWishGames: async () => {
      set({ wishGames: [] });
    },
  };
});

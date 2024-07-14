import { create } from "zustand";
import {} from "@retroachievements/api";

import { useUserStore } from "../user";

interface GameState {
  ownGames: any[];
  wishGames: any[];
}

interface GameAction {
  fetchOwnGames: () => Promise<void>;
  fetchWishGames: () => Promise<void>;
}

type GameStore = GameState & GameAction;

export const useGameStore = create<GameStore>()((set, get) => {
  return {
    // States
    ownGames: [],
    wishGames: [],

    // Actions
    fetchOwnGames: async () => {
      set({ ownGames: [] });
    },
    fetchWishGames: async () => {
      set({ wishGames: [] });
    },
  };
});

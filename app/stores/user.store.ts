import { create } from "zustand";
import { buildAuthorization } from "@retroachievements/api";
import * as Keychain from "react-native-keychain";

import RequestManager from "@/app/helpers/requestManager";
import {
  GameInfoAndUserProgress,
  UserProfile,
  UserCompletionProgress,
  UserProgressPerGame,
  GetUserWantToPlayList,
} from "@/app/types/user.type";
import { UserStore } from "./user.store.d";
import { createStore } from "./store";

export const useUserStore = create<UserStore>()((set, get) => {
  return {
    // States
    username: undefined,
    authorization: undefined,
    loading: false,

    // Actions
    isLoading() {
      return get().loading;
    },
    setUsername: (username) => {
      set({ username });
    },
    logout: async () => {
      set({ authorization: undefined });
      await Keychain.resetGenericPassword();
    },
    isLoggedIn: () => {
      const { authorization } = get();
      return !!authorization;
    },
    tryLogin: async () => {
      const { login, username } = get();
      set({ loading: true });

      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          if (!username) {
            set({ username: credentials.username });
          }
          await login(credentials.password);
          set({ loading: false });
          return true;
        }
      } catch (error) {
        console.error("Keychain couldn't be accessed!", error);
      }
      set({ loading: false });
      return false;
    },
    login: async (apiKey: string, remember?: boolean) => {
      const { username } = get();
      set({ loading: true });

      if (username && apiKey) {
        try {
          const authorization = await buildAuthorization({
            username: username,
            webApiKey: apiKey,
          });

          set({ authorization: authorization });
          if (remember) {
            await Keychain.setGenericPassword(username, apiKey);
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
        set({ loading: false });
      }
    },
  };
});

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

// Not implemented yet
export const useGetUserWantToPlayListStore = createStore<GetUserWantToPlayList>(
  "user-want-to-play-list",
  async (name: string) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer =
      await RequestManager.getInstance().request<GetUserWantToPlayList>({
        url: `https://retroachievements.org/API/API_GetUserWantToPlayList.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${name}`,
        method: "GET",
      });

    return answer?.data;
  },
);

export const useGetUserProfileStore = createStore<UserProfile>(
  "user-profile",
  async (name: string) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer = await RequestManager.getInstance().request<UserProfile>({
      url: `https://retroachievements.org/API/API_GetUserProfile.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${name}`,
      method: "GET",
    });

    return answer?.data;
  },
);

export const useGameInfoAndUserProgressStore =
  createStore<GameInfoAndUserProgress>(
    "game-info-and-user-progress",
    async (gameId: string) => {
      const { authorization } = useUserStore.getState();
      if (!authorization) {
        return;
      }

      const answer =
        await RequestManager.getInstance().request<UserCompletionProgress>({
          url: `https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&g=${gameId}`,
          method: "GET",
        });

      return answer?.data;
    },
  );

export const useUserCompletionProgressStore =
  createStore<UserCompletionProgress>(
    "user-completion-progress",
    async (offset: number = 0) => {
      const { authorization } = useUserStore.getState();
      if (!authorization) {
        return;
      }

      const answer =
        await RequestManager.getInstance().request<UserCompletionProgress>({
          url: `https://retroachievements.org/API/API_GetUserCompletionProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&o=${offset}`,
          method: "GET",
        });

      return answer?.data;
    },
  );

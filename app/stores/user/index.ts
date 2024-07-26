import { create } from "zustand";
import { buildAuthorization } from "@retroachievements/api";
import * as Keychain from "react-native-keychain";

import RequestManager from "@/app/helpers/requestManager";
import {
  UserCompletionProgress,
  GameInfoAndUserProgress,
  UserProfile,
} from "@/app/types/user.type";
import { UserStore } from "./user";

export const useUserStore = create<UserStore>()((set, get) => {
  return {
    // States
    profile: undefined,
    username: undefined,
    authorization: undefined,
    loading: false,

    isFetchingUserCompletionProgress: false,
    userCompletionProgress: undefined,
    isFetchingGameInfoAndUserProgress: false,
    gameInfoAndUserProgress: undefined,

    isFetchingUserProgressPerGame: false,
    userProgressPerGame: {},

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

    // Get profile from RetroAchievements
    fetchProfile: async () => {
      const { authorization, fetchProfileByName } = get();

      if (authorization) {
        try {
          await fetchProfileByName(authorization.username);
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
    fetchProfileByName: async (name: string) => {
      const { authorization } = get();

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<UserProfile>({
              url: `https://retroachievements.org/API/API_GetUserProfile.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${name}`,
              method: "GET",
            });

          if (answer) {
            set({ profile: answer.data });
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },

    fetchGameInfoAndUserProgress: async (gameId: string) => {
      const { authorization } = get();
      set({ isFetchingGameInfoAndUserProgress: true });

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<GameInfoAndUserProgress>(
              {
                url: `https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&g=${gameId}`,
                method: "GET",
              },
            );

          if (answer) {
            set({
              gameInfoAndUserProgress: answer.data,
              isFetchingGameInfoAndUserProgress: false,
            });
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
        set({ isFetchingGameInfoAndUserProgress: false });
      }
    },
    fetchUserCompletionProgress: async (offset: number = 0) => {
      const { authorization, fetchUserProgressPerGame } = get();
      set({ isFetchingUserCompletionProgress: true });

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<UserCompletionProgress>({
              url: `https://retroachievements.org/API/API_GetUserCompletionProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&o=${offset}`,
              method: "GET",
            });
          if (answer) {
            set({
              userCompletionProgress: answer.data,
              isFetchingUserCompletionProgress: false,
            });
            await fetchUserProgressPerGame(
              answer.data.Results.map((g: any) => g.GameID),
            );
            return;
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
        set({ isFetchingUserCompletionProgress: false });
      }
    },
    fetchUserProgressPerGame: async (gameIds: string[]) => {
      const { authorization, userProgressPerGame } = get();

      set({ isFetchingUserProgressPerGame: true });
      if (authorization && gameIds && gameIds.length > 0) {
        try {
          const answer =
            await RequestManager.getInstance().request<UserCompletionProgress>({
              url: `https://retroachievements.org/API/API_GetUserProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&i=${gameIds.join(",")}`,
              method: "GET",
            });
          if (answer) {
            gameIds.forEach((gameId) => {
              if (answer.data[gameId]) {
                userProgressPerGame[gameId] = answer.data[gameId];
              }
            });
            set({ userProgressPerGame, isFetchingUserProgressPerGame: false });
            return;
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
        set({ isFetchingUserProgressPerGame: false });
      }
    },
  };
});

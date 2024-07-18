import { create } from "zustand";
import { AuthObject, buildAuthorization } from "@retroachievements/api";
import * as Keychain from "react-native-keychain";

import RequestManager from "@/app/helpers/requestManager";
import {
  UserGameProgression,
  UserCompletionProgress,
  UserProfile,
} from "@/app/types/user.type";

interface UserState {
  profile?: UserProfile;
  username?: string;
  authorization?: AuthObject;
  userCompletionProgress?: UserCompletionProgress;
  userProgressPerGame: Record<string, UserGameProgression>;
}

interface UserAction {
  setUsername: (username: string) => void;
  isLoggedIn: () => boolean;

  fetchProfile: () => Promise<void>;
  fetchProfileByName: (name: string) => Promise<void>;
  fetchUserCompletionProgress: () => Promise<void>;
  fetchUserProgressPerGame: (gameIds: string[]) => Promise<void>;

  tryLogin: () => Promise<boolean>;
  login: (apiKey: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

type UserStore = UserState & UserAction;

export const useUserStore = create<UserStore>()((set, get) => {
  return {
    // States
    profile: undefined,
    username: undefined,
    authorization: undefined,
    userCompletionProgress: undefined,
    userProgressPerGame: {},

    // Actions
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

      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          if (!username) {
            set({ username: credentials.username });
          }
          await login(credentials.password);
          return true;
        }
      } catch (error) {
        console.error("Keychain couldn't be accessed!", error);
      }
      return false;
    },
    login: async (apiKey: string, remember?: boolean) => {
      const { username } = get();

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

    fetchUserCompletionProgress: async (offset: number = 0) => {
      const { authorization, fetchUserProgressPerGame } = get();

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<UserCompletionProgress>({
              url: `https://retroachievements.org/API/API_GetUserCompletionProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&o=${offset}`,
              method: "GET",
            });
          if (answer) {
            set({ userCompletionProgress: answer.data });
            fetchUserProgressPerGame(
              answer.data.Results.map((g: any) => g.GameID),
            );
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
    fetchUserProgressPerGame: async (gameIds: string[]) => {
      const { authorization, userProgressPerGame } = get();

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
            set({ userProgressPerGame });
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
  };
});

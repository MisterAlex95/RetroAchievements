import { create } from "zustand";
import { AuthObject, buildAuthorization } from "@retroachievements/api";
import * as Keychain from "react-native-keychain";

import RequestManager from "@/app/helpers/requestManager";
import { UserCompletionProgress, UserProfile } from "@/app/types/user.type";

interface UserState {
  profile?: UserProfile;
  username?: string;
  authorization?: AuthObject;
  userCompletionProgress?: UserCompletionProgress;
}

interface UserAction {
  setUsername: (username: string) => void;
  isLoggedIn: () => boolean;

  fetchProfile: () => Promise<void>;
  fetchProfileByName: (name: string) => Promise<void>;
  fetchUserCompletionProgress: () => Promise<void>;
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

    fetchUserCompletionProgress: async () => {
      const { authorization } = get();

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<UserCompletionProgress>({
              url: `https://retroachievements.org/API/API_GetUserCompletionProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}`,
              method: "GET",
            });
          if (answer) {
            console.log(answer.data);
            set({ userCompletionProgress: answer.data });
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
  };
});

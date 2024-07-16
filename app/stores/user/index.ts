import { create } from "zustand";
import {
  AuthObject,
  buildAuthorization,
  getUserProfile,
  UserProfile,
} from "@retroachievements/api";
import * as Keychain from "react-native-keychain";
import RequestManager from "@/app/helpers/requestManager";

interface UserState {
  profile?: UserProfile;
  username?: string;
  authorization?: AuthObject;
}

interface UserAction {
  setUsername: (username: string) => void;
  isLoggedIn: () => boolean;

  fetchProfile: () => Promise<void>;
  tryLogin: () => Promise<boolean>;
  login: (apiKey: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

type UserStore = UserState & UserAction;

export const useUserStore = create<UserStore>()((set, get) => {
  return {
    // States
    username: undefined,
    authorization: undefined,

    // Actions
    setUsername: (username) => {
      set({ username });
    },
    logout: async () => {
      set({ authorization: undefined });
      await Keychain.resetGenericPassword();
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
        } else {
          console.warn("No credentials stored");
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
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
          if (err instanceof Error) console.log(err.message);
        }
      }
    },

    fetchProfile: async () => {
      const { authorization } = get();

      if (authorization) {
        try {
          // https://retroachievements.org/API/API_GetUserProfile.php?u=MaxMilyin
          const answer = await RequestManager.getInstance().request({
            url: `https://retroachievements.org/API/API_GetUserProfile.php?u=${authorization.username}`,
            method: "GET",
          });
          // const answer = await getUserProfile(authorization, {
          //   username: authorization.username,
          // });

          set({ profile: answer });
        } catch (err) {
          if (err instanceof Error) console.log(err.message);
        }
      }
    },
    isLoggedIn: () => {
      const { authorization } = get();
      return !!authorization;
    },
  };
});

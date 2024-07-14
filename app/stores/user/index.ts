import { create } from "zustand";
import {
  AuthObject,
  buildAuthorization,
  getUserProfile,
  UserProfile,
} from "@retroachievements/api";
import * as Keychain from "react-native-keychain";

interface UserState {
  profile?: UserProfile;
  username?: string;
  authObject?: AuthObject;
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
    authObject: undefined,

    // Actions
    setUsername: (username) => {
      set({ username });
    },
    logout: async () => {
      set({ authObject: undefined });
      await Keychain.resetGenericPassword();
    },
    tryLogin: async () => {
      const { login } = get();

      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          await login(credentials.password);
          return true;
        } else {
          console.log("No credentials stored");
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
          const answer = await buildAuthorization({
            username: username,
            webApiKey: apiKey,
          });

          set({ authObject: answer });
          if (remember) {
            await Keychain.setGenericPassword(username, apiKey);
          }
        } catch (err) {
          if (err instanceof Error) console.log(err.message);
        }
      }
    },
    fetchProfile: async () => {
      const { authObject } = get();

      if (authObject) {
        try {
          const answer = await getUserProfile(authObject, {
            username: authObject.username,
          });

          set({ profile: answer });
        } catch (err) {
          if (err instanceof Error) console.log(err.message);
        }
      }
    },
    isLoggedIn: () => {
      const { authObject } = get();
      return !!authObject;
    },
  };
});

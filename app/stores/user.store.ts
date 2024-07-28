import { create } from "zustand";
import { buildAuthorization } from "@retroachievements/api";
import * as Keychain from "react-native-keychain";

import { UserStore } from "./user.store.d";

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

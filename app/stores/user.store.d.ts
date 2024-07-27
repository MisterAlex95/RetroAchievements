import { AuthObject } from "@retroachievements/api";
import { UserProfile } from "../types/user.type";

export interface UserState {
  username?: string;
  authorization?: AuthObject;
  loading: boolean;
}

export interface UserAction {
  setUsername: (username: string) => void;
  isLoggedIn: () => boolean;
  isLoading: () => boolean;

  tryLogin: () => Promise<boolean>;
  login: (apiKey: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

export type UserStore = UserState & UserAction;

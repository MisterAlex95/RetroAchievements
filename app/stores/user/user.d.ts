import {
  UserProfile,
  UserCompletionProgress,
  GameInfoAndUserProgress,
} from "../../types/user.type";

export interface UserState {
  profile?: UserProfile;
  username?: string;
  authorization?: AuthObject;

  userCompletionProgress?: UserCompletionProgress;
  isFetchingUserCompletionProgress: boolean;

  userProgressPerGame: Record<string, UserGameProgression>;

  isFetchingGameInfoAndUserProgress: boolean;
  gameInfoAndUserProgress?: GameInfoAndUserProgress;

  isFetchingUserProgressPerGame: boolean;
}

export interface UserAction {
  setUsername: (username: string) => void;
  isLoggedIn: () => boolean;

  fetchProfile: () => Promise<void>;
  fetchProfileByName: (name: string) => Promise<void>;
  fetchUserCompletionProgress: () => Promise<void>;
  fetchGameInfoAndUserProgress: (gameId: string) => Promise<void>;
  fetchUserProgressPerGame: (gameIds: string[]) => Promise<void>;

  tryLogin: () => Promise<boolean>;
  login: (apiKey: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

export type UserStore = UserState & UserAction;

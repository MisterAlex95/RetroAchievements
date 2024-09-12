import RequestManager from '../../helpers/requestManager';
import { createStore } from '../store';
import { useUserStore } from '../user.store';

/**
 * Represents the Achievement of the Week.
 */
export interface AchievementOfTheWeek {
  Achievement: Achievement;
  Console: Console;
  ForumTopic: ForumTopic;
  Game: Game;
  StartAt: string;
  TotalPlayers: number;
  Unlocks: Unlock[];
  UnlocksCount: number;
  UnlocksHardcoreCount: number;
}

/**
 * Represents an Achievement.
 */
export interface Achievement {
  // Define properties of Achievement here
  ID: number;
  Title: string;
  Description: string;
  Points: number;
  TrueRatio: number;
  Type?: string;
  Author: string;
  DateCreated: string;
  DateModified: string;
}

/**
 * Represents a Console.
 */
export interface Console {
  // Define properties of Console here
  ID: number;
  Title: string;
}

/**
 * Represents a Forum Topic.
 */
export interface ForumTopic {
  // Define properties of ForumTopic here
  ID: number;
}

/**
 * Represents a Game.
 */
export interface Game {
  // Define properties of Game here
  ID: number;
  Title: string;
}

/**
 * Represents an Unlock.
 */
export interface Unlock {
  // Define properties of Unlock here
  User: string;
  RAPoints: number;
  RASoftcorePoints: number;
  DateAwarded: string;
  HardcoreMode: number;
}

/**
 * Creates a store for the Achievement of the Week.
 * @returns {Promise<AchievementOfTheWeek | undefined>} The Achievement of the Week data or undefined if not authorized.
 */
export const useAchievementOfTheWeek = createStore<AchievementOfTheWeek>(
  'achievement-of-the-week',
  async () => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer =
      await RequestManager.getInstance().request<AchievementOfTheWeek>({
        url: `https://retroachievements.org/API/API_GetAchievementOfTheWeek.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}`,
        method: 'GET',
      });

    return answer?.data;
  },
);

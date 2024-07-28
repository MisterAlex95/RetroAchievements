import RequestManager from "../../helpers/requestManager";
import { Achievements } from "../../types/common.type";
import { createStore } from "./../store";
import { useUserStore } from "./../user.store";

export interface GameInfoAndUserProgress {
  ID: number;
  Title: string;
  ConsoleID: number;
  ForumTopicID: number;
  Flags: any;
  ImageIcon: string;
  ImageTitle: string;
  ImageIngame: string;
  ImageBoxArt: string;
  Publisher: string;
  Developer: string;
  Genre: string;
  Released: string;
  IsFinal: number;
  RichPresencePatch: string;
  players_total: number;
  achievements_published: number;
  points_total: number;
  GuideURL: any;
  ConsoleName: string;
  ParentGameID: any;
  NumDistinctPlayers: number;
  NumAchievements: number;
  Achievements: Achievements;
  NumAwardedToUser: number;
  NumAwardedToUserHardcore: number;
  NumDistinctPlayersCasual: number;
  NumDistinctPlayersHardcore: number;
  UserCompletion: string;
  UserCompletionHardcore: string;
  HighestAwardKind: string;
  HighestAwardDate: string;
}

export const useGameInfoAndUserProgressStore =
  createStore<GameInfoAndUserProgress>(
    "game-info-and-user-progress",
    async (gameId: string) => {
      const { authorization } = useUserStore.getState();
      if (!authorization) {
        return;
      }

      // TODO: fix the types
      const answer =
        await RequestManager.getInstance().request<GameInfoAndUserProgress>({
          url: `https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&g=${gameId}`,
          method: "GET",
        });

      return answer?.data;
    },
  );

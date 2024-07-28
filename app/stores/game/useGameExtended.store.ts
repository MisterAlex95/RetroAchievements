import { Achievements } from "@/app/types/common.type";
import RequestManager from "../../helpers/requestManager";
import { createStore } from "../store";
import { useUserStore } from "../user.store";

export interface GameExtended {
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
  achievement_set_version_hash: string;
  achievements_published: number;
  points_total: number;
  GuideURL: any;
  Updated: string;
  ConsoleName: string;
  ParentGameID: any;
  NumDistinctPlayers: number;
  NumAchievements: number;
  Achievements: Achievements;
  Claims: any[];
  NumDistinctPlayersCasual: number;
  NumDistinctPlayersHardcore: number;
}

export const useGameExtendedStore = createStore<GameExtended>(
  "game-extended",
  async (gameId: number) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer = await RequestManager.getInstance().request<GameExtended>({
      url: `https://retroachievements.org/API/API_GetGameExtended.php?z=${authorization.username}&y=${authorization.webApiKey}&i=${gameId}`,
      method: "GET",
    });

    return answer?.data;
  },
);

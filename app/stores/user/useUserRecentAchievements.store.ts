import { Achievements } from "@/app/types/common.type";
import RequestManager from "../../helpers/requestManager";
import { createStore } from "../store";
import { useUserStore } from "../user.store";

export interface RecentAchievement {
  Date: string;
  HardcoreMode: number;
  AchievementID: number;
  Title: string;
  Description: string;
  BadgeName: string;
  Points: number;
  TrueRatio: number;
  Type: string;
  Author: string;
  GameTitle: string;
  GameIcon: string;
  GameID: number;
  ConsoleName: string;
  BadgeURL: string;
  GameURL: string;
}

export type RecentAchievements = RecentAchievement[];

export const useUserRecentAchievements = createStore<RecentAchievements>(
  "game-extended",
  async (since: number = 60 * 24 * 30) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer =
      await RequestManager.getInstance().request<RecentAchievements>({
        url: `https://retroachievements.org/API/API_GetUserRecentAchievements.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&m=${since}`,
        method: "GET",
      });

    return answer?.data;
  },
);

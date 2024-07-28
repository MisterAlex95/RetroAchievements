import RequestManager from "../../helpers/requestManager";
import { createStore } from "./../store";
import { useUserStore } from "./../user.store";

export interface GetUserWantToPlayList {
  Count: number;
  Total: number;
  Results: WantToPlayGame[];
}

export interface WantToPlayGame {
  GameID: number;
  Title: string;
  ImageIcon: string;
  ConsoleID: number;
  ConsoleName: string;
  PointsTotal: number;
  AchievementsPublished: number;
}

export const useGetUserWantToPlayListStore = createStore<GetUserWantToPlayList>(
  "user-want-to-play-list",
  async (name: string) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer =
      await RequestManager.getInstance().request<GetUserWantToPlayList>({
        url: `https://retroachievements.org/API/API_GetUserWantToPlayList.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${name}`,
        method: "GET",
      });

    return answer?.data;
  },
);

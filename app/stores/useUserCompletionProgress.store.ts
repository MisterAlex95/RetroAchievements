import RequestManager from "../helpers/requestManager";
import { createStore } from "./store";
import { useUserStore } from "./user.store";

export interface UserCompletionProgress {
  Results: UserCompletionProgressResult[];
  Count: number;
  Total: number;
}

export interface UserCompletionProgressResult {
  ConsoleID: number;
  ConsoleName: string;
  GameID: string;
  HighestAwardDate: any;
  HighestAwardKind: any;
  ImageIcon: string;
  MaxPossible: number;
  MostRecentAwardedDate: string;
  NumAwarded: number;
  NumAwardedHardcore: number;
  Title: string;
}

export const useUserCompletionProgressStore =
  createStore<UserCompletionProgress>(
    "user-completion-progress",
    async (offset: number = 0) => {
      const { authorization } = useUserStore.getState();
      if (!authorization) {
        return;
      }

      const answer =
        await RequestManager.getInstance().request<UserCompletionProgress>({
          url: `https://retroachievements.org/API/API_GetUserCompletionProgress.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&o=${offset}`,
          method: "GET",
        });

      return answer?.data;
    },
  );

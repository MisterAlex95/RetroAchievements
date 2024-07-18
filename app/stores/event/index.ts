import { create } from "zustand";

import { useUserStore } from "../user";
import RequestManager from "@/app/helpers/requestManager";
import { AchievementOfTheWeek } from "@/app/types";

interface EventState {
  achievementOfTheWeek?: AchievementOfTheWeek;
}

interface EventAction {
  fetchAchievementOfTheWeek: () => Promise<void>;
}

type EventStore = EventState & EventAction;

export const useEventStore = create<EventStore>()((set, get) => {
  return {
    // States
    achievementOfTheWeek: undefined,

    // Actions
    fetchAchievementOfTheWeek: async () => {
      const { authorization } = useUserStore.getState();

      if (authorization) {
        try {
          const answer =
            await RequestManager.getInstance().request<AchievementOfTheWeek>({
              url: `https://retroachievements.org/API/API_GetAchievementOfTheWeek.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${authorization.username}&m=${60 * 24 * 3}`,
              method: "GET",
            });

          if (answer) {
            set({ achievementOfTheWeek: answer.data });
          }
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
    },
  };
});

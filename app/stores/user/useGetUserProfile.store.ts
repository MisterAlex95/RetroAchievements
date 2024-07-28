import RequestManager from "../../helpers/requestManager";
import { createStore } from "./../store";
import { useUserStore } from "./../user.store";

export interface UserProfile {
  ContribCount: number;
  ContribYield: number;
  ID: number;
  LastGameID: number;
  MemberSince: string;
  Motto: string;
  Permissions: number;
  RichPresenceMsg: string;
  TotalPoints: number;
  TotalSoftcorePoints: number;
  TotalTruePoints: number;
  Untracked: number;
  User: string;
  UserPic: string;
  UserWallActive: true;
}

export const useGetUserProfileStore = createStore<UserProfile>(
  "user-profile",
  async (name: string) => {
    const { authorization } = useUserStore.getState();
    if (!authorization) {
      return;
    }

    const answer = await RequestManager.getInstance().request<UserProfile>({
      url: `https://retroachievements.org/API/API_GetUserProfile.php?z=${authorization.username}&y=${authorization.webApiKey}&u=${name}`,
      method: "GET",
    });

    return answer?.data;
  },
);

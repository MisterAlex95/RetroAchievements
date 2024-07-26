import API_GetUserProfile from "./API_GetUserProfile.json";
import API_GetUserCompletionProgress from "./API_GetUserCompletionProgress.json";
import API_GetAchievementOfTheWeek from "./API_GetAchievementOfTheWeek.json";
import API_GetUserRecentAchievements from "./API_GetUserRecentAchievements.json";
import API_GetUserProgress from "./API_GetUserProgress.json";
import API_GetGameExtended from "./API_GetGameExtended.json";
import API_GetGameInfoAndUserProgress from "./API_GetGameInfoAndUserProgress.json";

export const getFixture = <T = any>(fileName: string): T => {
  const dic: Record<string, any> = {
    API_GetUserProfile,
    API_GetUserProgress,
    API_GetUserCompletionProgress,
    API_GetAchievementOfTheWeek,
    API_GetUserRecentAchievements,
    API_GetGameExtended,
    API_GetGameInfoAndUserProgress
  };

  return (dic[fileName] ?? undefined) as T;
};

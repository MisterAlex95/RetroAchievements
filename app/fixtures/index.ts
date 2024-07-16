import API_GetUserProfile from "./API_GetUserProfile.json";

export const getFixture = (fileName: string) => {
  const dic: Record<string, any> = {
    API_GetUserProfile,
  };

  return dic[fileName] ?? {};
};

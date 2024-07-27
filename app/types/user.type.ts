import { Achievements } from "./common.type";

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

export interface UserCompletionProgress {
  Results: UserCompletionProgressResult[];
  Count: number;
  Total: number;
}

export type UserProgressPerGameAnswer = {
  Results: GetUserProgress[];
  Count: number;
  Total: number;
};

export type UserProgressPerGame = Record<string, GetUserProgress>;

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

export interface GetUserProgress {
  NumPossibleAchievements: number;
  PossibleScore: number;
  NumAchieved: number;
  ScoreAchieved: number;
  NumAchievedHardcore: number;
  ScoreAchievedHardcore: number;
}
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

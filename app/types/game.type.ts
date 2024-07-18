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

export type Achievements = Record<string, Achievement>;

export interface Achievement {
  ID: number;
  NumAwarded: number;
  NumAwardedHardcore: number;
  Title: string;
  Description: string;
  Points: number;
  TrueRatio: number;
  Author: string;
  DateModified: string;
  DateCreated: string;
  BadgeName: string;
  DisplayOrder: number;
  MemAddr: string;
  type: string;
}

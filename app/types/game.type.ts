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

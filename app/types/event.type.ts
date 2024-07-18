export interface AchievementOfTheWeek {
  Achievement: Achievement;
  Console: Console;
  ForumTopic: ForumTopic;
  Game: Game;
  StartAt: string;
  TotalPlayers: number;
  Unlocks: Unlock[];
  UnlocksCount: number;
  UnlocksHardcoreCount: number;
}

export interface Achievement {
  ID: number;
  Title: string;
  Description: string;
  Points: number;
  TrueRatio: number;
  Type?: string;
  Author: string;
  DateCreated: string;
  DateModified: string;
}

export interface Console {
  ID: number;
  Title: string;
}

export interface ForumTopic {
  ID: number;
}

export interface Game {
  ID: number;
  Title: string;
}

export interface Unlock {
  User: string;
  RAPoints: number;
  RASoftcorePoints: number;
  DateAwarded: string;
  HardcoreMode: number;
}

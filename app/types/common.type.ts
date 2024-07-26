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
  DateEarnedHardcore?: string;
  DateEarned?: string;
}

export type Achievements = Record<string, Achievement>;

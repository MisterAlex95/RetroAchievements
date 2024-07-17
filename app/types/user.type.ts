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

export interface UserCompletionProgressResult {
  ConsoleID: number;
  ConsoleName: string;
  GameID: number;
  HighestAwardDate: any;
  HighestAwardKind: any;
  ImageIcon: string;
  MaxPossible: number;
  MostRecentAwardedDate: string;
  NumAwarded: number;
  NumAwardedHardcore: number;
  Title: string;
}

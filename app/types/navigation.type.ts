import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
  Default: undefined;
  Home: undefined;
  Login: undefined;
  Setting: undefined;
  News: undefined;
  Game: { gameId: string };
  //   Place: { placeId: number };
};

export type HomeScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "Home"
>;

export type LoginScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "Login"
>;

export type HomeTabProps = BottomTabScreenProps<BottomTabParamList, "Home">;

export type SettingTabProps = BottomTabScreenProps<
  BottomTabParamList,
  "Setting"
>;

export type NewsTabProps = BottomTabScreenProps<
  BottomTabParamList,
  "News"
>;

export type GameTabProps = BottomTabScreenProps<BottomTabParamList, "Game">;

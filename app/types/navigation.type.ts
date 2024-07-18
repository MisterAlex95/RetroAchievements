import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
  Home: undefined;
  Login: undefined;
  Setting: undefined;
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

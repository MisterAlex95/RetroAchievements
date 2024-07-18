import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  //   Place: { placeId: number };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type BottomTabParamList = {
  Home: undefined;
  Test: undefined;
};

export type HomeTabProps = BottomTabScreenProps<BottomTabParamList, "Home">;

export type TestTabProps = BottomTabScreenProps<BottomTabParamList, "Test">;

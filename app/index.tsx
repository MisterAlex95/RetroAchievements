import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./views/LoginScreen";
import HomeScreen from "./views/HomeScreen";
import { Colors } from "./constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./views/SettingsScreen";
import { BottomTabParamList } from "./types";
import { StatusBar } from "react-native";
import GameScreen from "./views/GameScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<BottomTabParamList>();
const HomeStack = createNativeStackNavigator<BottomTabParamList>();
const DefaultTab = createBottomTabNavigator<BottomTabParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => undefined,
        contentStyle: { backgroundColor: Colors.dark.background },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Game" component={GameScreen} />
    </HomeStack.Navigator>
  );
}

function DefaultTabScreen() {
  return (
    <DefaultTab.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.dark.background }}
      screenOptions={{
        header: () => undefined,
        tabBarLabelStyle: {
          color: Colors.dark.basicText,
        },
        tabBarItemStyle: {
          backgroundColor: Colors.dark.menuBackgound,
        },
      }}
    >
      <DefaultTab.Screen name="Home" component={HomeStackScreen} />
      <DefaultTab.Screen name="Setting" component={SettingsScreen} />
    </DefaultTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar hidden={true} />
      <Stack.Navigator
        screenOptions={{
          header: () => undefined,
          contentStyle: { backgroundColor: Colors.dark.background },
        }}
      >
        <Stack.Screen name="Login" options={{}} component={LoginScreen} />
        <Stack.Screen name="Default" component={DefaultTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./views/LoginScreen";
import HomeScreen from "./views/HomeScreen";
import { Colors } from "./constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./views/SettingsScreen";
import { BottomTabParamList } from "./types";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar hidden={true} />
      <Tab.Navigator
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
        <Tab.Screen
          name="Login"
          options={{
            // Hide the login button
            tabBarButton: (props) => undefined,
            tabBarItemStyle: {
              backgroundColor: Colors.dark.background,
            },
            tabBarStyle: {
              backgroundColor: Colors.dark.background,
            },
          }}
          component={LoginScreen}
        />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Setting" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./views/LoginScreen";
import HomeScreen from "./views/HomeScreen";
import { Colors } from "./constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./views/SettingsScreen";
import { BottomTabParamList } from "./types";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: Colors.dark["base-100"] }}
        screenOptions={{
          header: () => undefined,
        }}
      >
        <Tab.Screen
          name="Login"
          options={{
            // Hide the login button
            tabBarButton: (props) => undefined,
          }}
          component={LoginScreen}
        />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Setting" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./views/LoginScreen";
import HomeScreen from "./views/HomeScreen";
import { Colors } from "./constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TestScreen from "./views/TestScreen";

export type RootBottomTabParamList = {
  Login: undefined;
  Home: undefined;
  Test: undefined;
};

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

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
        <Tab.Screen name="Test" component={TestScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useUserStore } from "../stores";
import { RootStackParamList } from "../index";

type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { logout, fetchProfile } = useUserStore();

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Bienvenue à la page d'accueil !
      </Text>
      <Button title="Fetch My Profile" onPress={fetchProfile} />
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

import React from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useUserStore, useGameStore } from "../stores";
import { RootStackParamList } from "../index";
import GameOfTheWeek from "../components/GameOfTheWeek";
import UserCard from "../components/user/UserCard";

type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { logout, fetchProfile, profile } = useUserStore();
  const { achievementOfTheWeek, fetchAchievementOfTheWeek } = useGameStore();

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {profile && <UserCard user={profile} />}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Bienvenue à la page d'accueil !
      </Text>
      {achievementOfTheWeek !== undefined && (
        <GameOfTheWeek data={achievementOfTheWeek} />
      )}
      <Button title="Fetch My Profile" onPress={fetchProfile} />
      <Button title="Fetch My Data" onPress={fetchAchievementOfTheWeek} />
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

import React, { useEffect } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useUserStore, useGameStore } from "../stores";
import { RootBottomTabParamList } from "../index";
import GameOfTheWeek from "../components/GameOfTheWeek";
import UserCard from "../components/user/UserCard";
import RecentAchivement from "../components/RecentAchivementBar";
import RecentGameCard from "../components/RecentGameCard";

import type { HomeScreenProps } from "../types/";


const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const {
    logout,
    fetchProfile,
    profile,
    userCompletionProgress,
    fetchUserCompletionProgress,
  } = useUserStore();
  const {
    achievementOfTheWeek,
    fetchAchievementOfTheWeek,
    recentAchievements,
    fetchRecentAchievements,
  } = useGameStore();

  useEffect(() => {
    fetchProfile();
    fetchUserCompletionProgress();
    fetchAchievementOfTheWeek();
    fetchRecentAchievements();
  }, []);

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {profile && <UserCard user={profile} />}
      <RecentAchivement data={recentAchievements} />
      {achievementOfTheWeek !== undefined && (
        <GameOfTheWeek data={achievementOfTheWeek} />
      )}
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {userCompletionProgress &&
          userCompletionProgress.Results.map((_) => (
            <RecentGameCard data={_} />
          ))}
      </ScrollView>
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxHeight: 50,
  },
});

export default HomeScreen;

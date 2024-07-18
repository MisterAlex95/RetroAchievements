import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useUserStore, useGameStore } from "../stores";
import UserCard from "../components/user/UserCard";
import RecentAchivement from "../components/achievement/RecentAchivementBar";
import RecentGameCard from "../components/game/RecentGameCard";

import type { HomeScreenProps } from "../types/";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const {
    fetchProfile,
    profile,
    userCompletionProgress,
    fetchUserCompletionProgress,
  } = useUserStore();
  const { recentAchievements, fetchRecentAchievements } = useGameStore();

  useEffect(() => {
    fetchProfile();
    fetchUserCompletionProgress();
    fetchRecentAchievements();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {profile && <UserCard user={profile} />}
      <RecentAchivement data={recentAchievements} />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {userCompletionProgress &&
          userCompletionProgress.Results.map((_) => (
            <RecentGameCard data={_} />
          ))}
      </ScrollView>
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

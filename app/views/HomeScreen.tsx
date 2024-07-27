import React, { useEffect } from "react";
import { View, VirtualizedList, StyleSheet, Text } from "react-native";
import {
  useUserStore,
  useGameStore,
  useUserCompletionProgressStore,
  useGetUserProfileStore,
  useUserProgressPerGameStore,
} from "../stores";
import UserCard from "../components/user/UserCard";
import RecentAchivement from "../components/achievement/RecentAchivementBar";
import RecentGameCard from "../components/game/RecentGameCard";

import type { HomeScreenProps, UserCompletionProgressResult } from "../types/";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { username } = useUserStore();
  const { fetchData: fetchingUserProgressPerGame, isFetching: isFetchingUserProgressPerGame } = useUserProgressPerGameStore();
  const { fetchData: fetchProfile, data: profile } = useGetUserProfileStore();
  const { recentAchievements, fetchRecentAchievements } = useGameStore();
  const {
    fetchData: fetchUserCompletionProgress,
    data: userCompletionProgress,
    isFetching: isFetchingUserCompletionProgress,
  } = useUserCompletionProgressStore();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      return;
    });

    fetchProfile(username);
    fetchUserCompletionProgress();
    fetchRecentAchievements();
  }, [navigation]);

  useEffect(() => {
    if (userCompletionProgress && userCompletionProgress.Results.length > 0) {
      const gameIds = userCompletionProgress.Results.map((r) => r.GameID);
      fetchingUserProgressPerGame(gameIds);
    }
  }, [userCompletionProgress]);

  const getItem = (
    _data: unknown,
    index: number,
  ): UserCompletionProgressResult | undefined =>
    userCompletionProgress?.Results[index];

  const getItemCount = (_data: unknown) => userCompletionProgress?.Count ?? 0;

  const goToGamePage = (gameId?: string) => {
    navigation.navigate("Game", { gameId: gameId ?? "" });
  };

  return (
    <View style={styles.container}>
      {profile && <UserCard user={profile} />}
      <RecentAchivement data={recentAchievements} />
      {userCompletionProgress && (
        <VirtualizedList
          style={styles.virtualizeListContainer}
          initialNumToRender={4}
          renderItem={(_) => (
            <RecentGameCard
              key={_.item?.GameID}
              data={_.item}
              goToGamePage={() => goToGamePage(_.item?.GameID)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={fetchUserCompletionProgress}
          refreshing={
            isFetchingUserCompletionProgress && isFetchingUserProgressPerGame
          }
          getItemCount={getItemCount}
          getItem={getItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  virtualizeListContainer: { flex: 1, width: "100%" },
});

export default HomeScreen;

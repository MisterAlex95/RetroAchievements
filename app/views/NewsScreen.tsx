import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NewsTabProps } from "../types";
import AchievementOfTheWeek from "../components/achievement/AchievementOfTheWeek";
import { useAchievementOfTheWeek } from "../stores/event/useAchievementOfTheWeek.store";

const NewsScreen = ({ navigation }: NewsTabProps) => {
  const { data: achievementOfTheWeek, fetchData: fetchAchievementOfTheWeek } =
    useAchievementOfTheWeek();

  useEffect(() => {
    fetchAchievementOfTheWeek();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>News!</Text>
      <AchievementOfTheWeek data={achievementOfTheWeek} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxHeight: 50,
  },
});

export default NewsScreen;

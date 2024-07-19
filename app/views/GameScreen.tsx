import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  VirtualizedList,
} from "react-native";
import { Achievement, GameExtended, GameTabProps } from "../types";
import { Colors } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGameStore, useUserStore } from "../stores";
import CircularProgress from "react-native-circular-progress-indicator";
import AchievementCard from "../components/achievement/AchievementCard";

const GameScreen = ({ navigation, route }: GameTabProps) => {
  const { userCompletionProgress, userProgressPerGame } = useUserStore();
  const { gameExtended, fetchGameExtended } = useGameStore();

  const currentGame = userCompletionProgress?.Results.find(
    (r) => r.GameID === route.params.gameId,
  );
  const userProgression = userProgressPerGame[route.params.gameId];

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.headerContainer}>
          <View style={styles.headerButton}>
            <Ionicons
              onPress={() => navigation.navigate("Home")}
              name="chevron-back"
              size={32}
              color={Colors.dark.basicText}
            />
          </View>
        </View>
      ),
    });

    fetchGameExtended(route.params.gameId);
  }, [navigation]);

  if (!currentGame || !gameExtended) return <></>;

  const getItem = (_data: unknown, index: number): Achievement => {
    return Object.keys(gameExtended.Achievements).map(
      (_) => gameExtended.Achievements[_],
    )[index];
  };

  const getItemCount = (_data: unknown) =>
    Object.keys(gameExtended.Achievements).length ?? 0;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.topContainer}
        imageStyle={{ resizeMode: "cover" }}
        blurRadius={1}
        source={{
          uri: "https://retroachievements.org" + currentGame.ImageIcon,
        }}
      >
        <View style={styles.innerContainer}>
          <Image
            source={{
              uri: "https://retroachievements.org" + currentGame.ImageIcon,
            }}
            style={styles.image}
          />
          <Text style={styles.textTitle}>{currentGame.Title}</Text>
          <CircularProgress
            radius={25}
            value={
              (userProgression.NumAchieved /
                userProgression.NumPossibleAchievements) *
              100
            }
            valueSuffix={"%"}
            progressValueColor="#ffff"
            activeStrokeColor={Colors.dark.primary}
            activeStrokeSecondaryColor={Colors.dark.secondary}
          />
        </View>
      </ImageBackground>
      <VirtualizedList
        style={styles.virtualizeListContainer}
        initialNumToRender={4}
        renderItem={(_) => <AchievementCard data={_.item} />}
        keyExtractor={(item, index) => index.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
  },
  headerButton: {
    width: 50,
    margin: 15,
    marginTop: 25,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
  },
  topContainer: {
    flex: 1,
    maxHeight: 250,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0, 0.60)",
  },
  virtualizeListContainer: {
    flex: 1,
    width: "100%",
  },
  textTitle: {
    marginTop: 15,
    color: Colors.dark.basicText,
    fontSize: 25,
  },
});

export default GameScreen;

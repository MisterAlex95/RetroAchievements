import React from "react";
import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { GameTabProps } from "../types";
import { Colors } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserStore } from "../stores";
import CircularProgress from "react-native-circular-progress-indicator";

const GameScreen = ({ navigation, route }: GameTabProps) => {
  const { userCompletionProgress, userProgressPerGame } = useUserStore();
  const currentGame = userCompletionProgress?.Results.find(
    (r) => r.GameID === route.params.gameId,
  );
  const userProgression = userProgressPerGame[route.params.gameId];
  if (!currentGame) return <></>;

  React.useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={{ width: 50, margin: 15, marginTop: 25 }}>
          <Ionicons
            onPress={() => navigation.navigate("Home")}
            name="chevron-back"
            size={32}
            color={Colors.dark.basicText}
          />
        </View>
      ),
    });
  }, [navigation]);

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
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  topContainer: {
    flex: 1,
    maxHeight: "45%",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0, 0.60)",
  },
  textTitle: {
    marginTop: 15,
    color: Colors.dark.basicText,
    fontSize: 25,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
});

export default GameScreen;

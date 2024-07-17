import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { UserCompletionProgressResult } from "../types/user.type";
import { Colors } from "../constants/Colors";

export default (props: { data: UserCompletionProgressResult }) => {
  const smallerPlatformName = (platformName: string) => {
    switch (platformName) {
      case "PlayStation 2":
        return "PS2";
      case "PlayStation":
        return "PSX";
      case "PlayStation Portable":
        return "PSP";
      case "NES/Famicom":
        return "NES";
      default:
        return platformName.match(/\b(\w)/g)?.join("");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://retroachievements.org" + props.data.ImageIcon,
        }}
        style={styles.image}
      >
        <View style={{ flex: 1 }}></View>
        <View style={styles.platformContainer}>
          <Text style={styles.platformName}>
            {smallerPlatformName(props.data.ConsoleName)}
          </Text>
        </View>
      </ImageBackground>

      <View>
        <Text style={styles.gameTitle}>{props.data.Title}</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.lastPlaytime}>
          Played on{" "}
          {new Date(props.data.MostRecentAwardedDate).toLocaleDateString()} at{" "}
          {new Date(props.data.MostRecentAwardedDate).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    margin: 5,
    backgroundColor: Colors.dark.neutral,
  },
  gameTitle: {
    marginLeft: 15,
    color: Colors.dark["base-100"],
    fontWeight: "bold",
  },
  platformContainer: {
    backgroundColor: "#000000DD",
    borderColor: "#fff",
    borderWidth: 2,
    maxWidth: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 4,
    marginHorizontal: 8
  },
  platformName: {
    color: Colors.dark["base-100"],
    fontWeight: "bold",
    fontSize: 10,
  },
  lastPlaytime: {
    marginLeft: 5,
    color: Colors.dark["base-100"],
    fontSize: 10,
  },
});

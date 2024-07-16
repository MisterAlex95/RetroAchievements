import { AchievementOfTheWeek } from "@retroachievements/api";
import { View, Text, StyleSheet, Image } from "react-native";

export default (props: { data: AchievementOfTheWeek }) => {
  console.log(props.data);
  return (
    <View style={styles.container}>
      <Text>{props.data.achievement.title}</Text>
      <View style={styles.splitView}>
        <Image
          source={{
            uri:
              "https://retroachievements.org" + props.data.achievement.badgeUrl,
          }}
          style={styles.image}
        />
        <>
          <Text>Points: {props.data.achievement.points}</Text>
          <Text>Description: {props.data.achievement.description}</Text>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "25%",
    height: "25%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splitView: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 24,
    margin: 20,
  },
});

import { Colors } from "@/app/constants/Colors";
import { AchievementOfTheWeek } from "@/app/stores/event/useAchievementOfTheWeek.store";
import { View, Text, StyleSheet, Image } from "react-native";
import AchievementPicture from "../common/AchievementPicture";

export default (props: { data: AchievementOfTheWeek | null }) => {
  if (!props.data) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game : {props.data.Game.Title}</Text>
      <Text style={styles.text}>Console : {props.data.Console.Title}</Text>
      <Text style={styles.text}>
        Achievement : {props.data.Achievement.Title}
      </Text>
      <View>
        <AchievementPicture
          imageUrl={props.data.Achievement.ID.toString() + ".png"}
          needPrefix
          width={100}
          height={100}
          borderRadius={5}
        />
        <>
          <Text style={styles.text}>
            Points: {props.data.Achievement.Points}
          </Text>
          <Text style={styles.text}>
            Description: {props.data.Achievement.Description}
          </Text>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.dark.basicText,
    fontSize: 24,
    margin: 20,
  },
});

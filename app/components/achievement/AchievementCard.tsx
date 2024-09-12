import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "@/app/constants/Colors";
import { Achievement } from "@/app/types/common.type";
import AchievementPicture from "../common/AchievementPicture";

/**
 * Functional component to display an achievement card.
 * @param props - The properties of the component.
 * @param props.data - The achievement data to display.
 * @returns A JSX component representing an achievement card.
 */
export default (props: { data?: Achievement }) => {
  // If the achievement data is not provided, return an empty component.
  if (!props.data) return <></>;

  return (
    <View style={styles.container}>
      <AchievementPicture
        imageUrl={props.data.BadgeName + (props.data.DateEarned ? ".png" : "_lock.png")}
        width={100}
        needPrefix
        height={100}
        borderRadius={5}
      />
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text style={styles.gameTitle}>{props.data.Title}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.description}>{props.data.Description}</Text>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    </View>
  );
};

/**
 * Styles for the AchievementCard component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    margin: 5,
    maxHeight: 100,
    backgroundColor: Colors.dark.neutral,
  },
  gameTitle: {
    marginLeft: 15,
    maxWidth: "75%",
    color: Colors.dark["base-100"],
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
  },
});

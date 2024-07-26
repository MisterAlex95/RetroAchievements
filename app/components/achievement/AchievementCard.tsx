import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "@/app/constants/Colors";
import { Achievement } from "@/app/types/common.type";

export default (props: { data?: Achievement }) => {
  if (!props.data) return <></>;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://retroachievements.org/Badge/" +
            props.data.BadgeName +
            (props.data.DateEarned ? ".png" : "_lock.png"),
        }}
        style={styles.image}
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
    color: Colors.dark["base-100"],
    fontSize: 13,
  },
});

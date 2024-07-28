import { RecentAchievements } from "@/app/stores";
import { ScrollView, StyleSheet, Image } from "react-native";

export default (props: { data: RecentAchievements | null }) => {
  return (
    <ScrollView scrollEnabled horizontal style={styles.container}>
      {props.data &&
        props.data.map((ra) => (
          <Image
            key={ra.AchievementID}
            source={{
              uri: "https://retroachievements.org" + ra.BadgeURL,
            }}
            style={styles.image}
          />
        ))}
    </ScrollView>
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

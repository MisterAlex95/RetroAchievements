import { UserProfile } from "@/app/types/user.type";
import { Image, View, Text, StyleSheet } from "react-native";

export default (props: { user: UserProfile }) => {
  console.log(props);
  return (
    <View>
      <View>
        <View>
          <Image
            source={{
              uri: "https://retroachievements.org" + props.user.UserPic,
            }}
            style={styles.image}
          />
        </View>
        <Text>{props.user.User}</Text>
      </View>
      <View>
        <Text>{props.user.RichPresenceMsg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
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

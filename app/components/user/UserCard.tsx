import { UserProfile } from "@/app/types/user.type";
import { Image, View, Text } from "react-native";
import { config } from "@/config";
import { generateStyleSheet } from "@/app/helpers/debugStyle";
import { Colors } from "@/app/constants/Colors";

export default (props: { user: UserProfile }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://retroachievements.org" + props.user.UserPic,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{props.user.User}</Text>
      </View>
      <Text style={styles.richPresenceText}>{props.user.RichPresenceMsg}</Text>
    </View>
  );
};

const styles = generateStyleSheet(
  {
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: 200,
      width: "100%",
    },
    header: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      maxHeight: 150,
      width: "100%",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    text: {
      color: Colors.dark.basicText,
      fontSize: 24,
    },
    richPresenceText: {
      color: Colors.dark.basicText,
      fontSize: 11,
    },
  },
  config.debugStyle.components.UserCard,
);

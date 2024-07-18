import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { GameTabProps } from "../types";
import { Colors } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const GameScreen = ({ navigation }: GameTabProps) => {
  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
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

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxHeight: 50,
  },
});

export default GameScreen;

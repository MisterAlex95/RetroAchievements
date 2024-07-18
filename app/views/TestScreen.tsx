import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TestTabProps } from "../types";

const TestScreen = ({ navigation }: TestTabProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
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

export default TestScreen;

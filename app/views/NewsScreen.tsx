import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { NewsTabProps } from "../types";
import { useUserStore } from "../stores";

const NewsScreen = ({ navigation }: NewsTabProps) => {
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>News!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxHeight: 50,
  },
});

export default NewsScreen;

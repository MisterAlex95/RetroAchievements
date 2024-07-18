import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { SettingTabProps } from "../types";
import { useUserStore } from "../stores";

const SettingsScreen = ({ navigation }: SettingTabProps) => {
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button title="Disconnect" onPress={handleLogout} />
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

export default SettingsScreen;

import React from "react";
import { View, Text, Button } from "react-native";
import { SettingTabProps } from "../types";
import { useUserStore } from "../stores";
import { generateStyleSheet } from "../helpers/debugStyle";

const SettingsScreen = ({ navigation }: SettingTabProps) => {
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
      <Button title="Disconnect" onPress={handleLogout} />
    </View>
  );
};

const styles = generateStyleSheet({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;

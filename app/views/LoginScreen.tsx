import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useUserStore } from "../stores/";
import React, { useEffect, useState } from "react";

import UrlButton from "../components/UrlButton";
import { RootStackParamList } from "../index";
import { StackScreenProps } from "@react-navigation/stack";

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { login, username, setUsername, isLoggedIn, tryLogin } = useUserStore();
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      if (await tryLogin()) {
        navigation.replace("Home");
      }
    };

    autoLogin().catch((err) => console.error(err));

    if (isLoggedIn()) {
      navigation.replace("Home");
    }
  }, [isLoggedIn(), navigation]);

  const handleLogin = async () => {
    await login(apiKey, remember);
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View>
            <Text>Username</Text>

            <TextInput
              defaultValue={username ?? ""}
              onChangeText={setUsername}
              placeholder="username"
            />
          </View>

          <Text>API Key</Text>

          <TextInput
            defaultValue=""
            placeholder="apiKey"
            onChangeText={setApiKey}
          />

          <View>
            <Text>
              you can find it{" "}
              <UrlButton
                children="here"
                url="https://retroachievements.org/controlpanel.php"
              />
            </Text>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={remember}
              onValueChange={setRemember}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Remember me</Text>
          </View>

          <Button onPress={() => handleLogin()} title="Login" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

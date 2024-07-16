import { StyleSheet, View, Text, Button, TextInput, Image } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useUserStore } from "../stores/";
import React, { useEffect, useState } from "react";

import UrlButton from "../components/UrlButton";
import { RootStackParamList } from "../index";
import { StackScreenProps } from "@react-navigation/stack";
import { generateStyleSheet } from "@/app/helpers/debugStyle";
import { config } from "../config";

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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/ra-icon.png")}
          />
        </View>
        <View>
          <View>
            <Text style={styles.label}>Username</Text>

            <TextInput
              style={styles.inputText}
              defaultValue={username ?? ""}
              onChangeText={setUsername}
              placeholder="username"
            />
          </View>

          <Text style={styles.label}>API Key</Text>

          <TextInput
            style={styles.inputText}
            defaultValue=""
            placeholder="apiKey"
            onChangeText={setApiKey}
          />

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>You can find it{" "}</Text>
            <UrlButton
              title="here"
              styles={{ button: styles.urlButton, text: styles.helpTextUrl }}
              url="https://retroachievements.org/controlpanel.php"
            />
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

const styles = generateStyleSheet(
  {
    container: {
      flex: 1,
      alignItems: "center",
    },
    image: {
      maxWidth: 250,
      resizeMode: "contain",
      backgroundColor: "#161616",
      margin: 10,
      borderRadius: 50,
    },
    imageContainer: {
      backgroundColor: "#161616",
      margin: 10,
      borderRadius: 50,
    },
    inputText: {
      borderWidth: 2,
      borderRadius: 4,
      padding: 1,
      paddingHorizontal: 15,
      marginVertical: 5,
      color: "#161616",
    },
    helpContainer: {
      flexDirection: "row",
    },
    helpText: {
      fontSize: 12,
    },
    helpTextUrl: {
      fontSize: 12,
      textDecorationLine: "underline",
    },
    urlButton: {
      fontSize: 12,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      fontSize: 15,
      color: "#161616",
      fontWeight: "bold",
    },
  },
  config.debugStyle.views.LoginScreen,
);

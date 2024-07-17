import {
  KeyboardAvoidingView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from "react-native";
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50} // this could be dependent on something else
      style={styles.container}
    >
      <ScrollView scrollEnabled style={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/ra-icon.png")}
          />
        </View>
        <View style={styles.inputsContainer}>
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
            <Text style={styles.helpText}>You can find it </Text>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = generateStyleSheet(
  {
    container: {
      flex: 1,
      alignItems: "center",
    },
    scrollViewContainer: {
      flex: 1,
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
    inputsContainer: {
      flex: 1,
      minWidth: 250,
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
      alignItems: "center",
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

import {
  KeyboardAvoidingView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useUserStore } from "../stores/";
import React, { useEffect, useState } from "react";

import UrlButton from "../components/common/UrlButton";
import { generateStyleSheet } from "@/app/helpers/debugStyle";
import { config } from "../../config";
import { Colors } from "../constants/Colors";
import { LoginScreenProps } from "../types";

/**
 * LoginScreen component handles the user login interface.
 *
 * @param {LoginScreenProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { login, username, setUsername, isLoggedIn, tryLogin, isLoading } =
    useUserStore();
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    /**
     * Attempts to auto-login the user.
     */
    const autoLogin = async () => {
      if (await tryLogin()) {
        navigation.navigate("Default");
      }
    };

    autoLogin().catch((err) => console.error(err));

    if (isLoggedIn()) {
      navigation.navigate("Default");
    }
  }, [isLoggedIn(), navigation]);

  /**
   * Handles the login process.
   */
  const handleLogin = async () => {
    await login(apiKey, remember);
  };

  if (isLoading()) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50} // this could be dependent on something else
      style={styles.container}
    >
      <ScrollView scrollEnabled style={styles.scrollViewContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/ra-icon.png")}
        />
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
              tintColors={{ true: Colors.dark.basicText, false: "black" }}
            />
            <Text style={styles.label}>Remember me</Text>
          </View>

          <Button
            onPress={() => handleLogin()}
            title="Login"
            color={Colors.dark.primary}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = generateStyleSheet(
  {
    container: {
      flex: 1,
      marginTop: 50,
      alignItems: "center",
      backgroundColor: Colors.dark.background,
    },
    scrollViewContainer: {
      flex: 1,
    },
    image: {
      maxWidth: 250,
      resizeMode: "contain",
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
      borderColor: Colors.dark.basicText,
      color: Colors.dark.basicText,
    },
    helpContainer: {
      flexDirection: "row",
    },
    helpText: {
      fontSize: 12,
      color: Colors.dark.basicText,
    },
    helpTextUrl: {
      fontSize: 12,
      textDecorationLine: "underline",
      color: Colors.dark.basicText,
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
      color: Colors.dark.basicText,
    },
    label: {
      fontSize: 15,
      fontWeight: "bold",
      color: Colors.dark.basicText,
    },
  },
  config.debugStyle.views.LoginScreen,
);
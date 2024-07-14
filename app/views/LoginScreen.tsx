import {
  Box,
  Button,
  ButtonText,
  Checkbox,
  CheckboxIcon,
  CheckIcon,
  CheckboxIndicator,
  CheckboxLabel,
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Link,
  LinkText,
} from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { useUserStore } from "../stores/";
import { useEffect, useState } from "react";

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

    autoLogin().catch((err) => console.log(err));

    if (isLoggedIn()) {
      navigation.replace("Home");
    }
  }, [isLoggedIn(), navigation]);

  const handleLogin = async () => {
    console.log(remember);
    await login(apiKey, remember);
  };

  return (
    <Box style={styles.container}>
      <Box>
        <Box h="$32" w="$72">
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            <Box mb="$10">
              <FormControlLabel mb="$1">
                <FormControlLabelText>Username</FormControlLabelText>
              </FormControlLabel>

              <Input>
                <InputField
                  type="text"
                  defaultValue={username ?? ""}
                  onChangeText={setUsername}
                  placeholder="username"
                />
              </Input>
            </Box>

            <FormControlLabel mb="$1">
              <FormControlLabelText>API Key</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                type="text"
                defaultValue=""
                placeholder="apiKey"
                onChangeText={setApiKey}
              />
            </Input>

            <FormControlHelper>
              <FormControlHelperText>
                you can find it{" "}
                <Link href="https://retroachievements.org/controlpanel.php">
                  <LinkText marginVertical="$0" size="xs">
                    here
                  </LinkText>
                </Link>
              </FormControlHelperText>
            </FormControlHelper>

            <Checkbox
              size="md"
              isInvalid={false}
              isDisabled={false}
              isChecked={remember}
              value=""
              onChange={setRemember}
              aria-label="Remember button"
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Remember</CheckboxLabel>
            </Checkbox>

            <Button onPress={() => handleLogin()}>
              <ButtonText>Login</ButtonText>
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,
  },
});

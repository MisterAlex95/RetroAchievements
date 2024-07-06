import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
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

import { useState } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [userName, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");

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
                <FormControlLabelText>Username </FormControlLabelText>
              </FormControlLabel>

              <Input>
                <InputField
                  type="text"
                  defaultValue=""
                  placeholder="username"
                />
              </Input>
            </Box>

            <FormControlLabel mb="$1">
              <FormControlLabelText>API Key</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField type="text" defaultValue="" placeholder="apiKey" />
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

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>

            <Button onPress={() => navigation.navigate("Home")} />

            <Button>
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

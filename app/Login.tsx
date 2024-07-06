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
  Heading,
  Link,
  LinkText,
} from "@gluestack-ui/themed";

import { useState } from "react";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");

  return (
    <Box>
      <Heading>Login page.</Heading>
      <Box mt="$10">
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

            <Button>
              <ButtonText>Login</ButtonText>
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

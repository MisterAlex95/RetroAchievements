import React, { useCallback } from "react";
import { Alert, Linking } from "react-native";
import Button, { ButtonProps } from "./Button";

type OpenURLButtonProps = {
  url: string;
} & Omit<ButtonProps, "onPress">;

export default (props: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(props.url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(props.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${props.url}`);
    }
  }, [props.url]);

  return (
    <Button title={props.title} styles={props.styles} onPress={handlePress} />
  );
};

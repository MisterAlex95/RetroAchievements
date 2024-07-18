import React from "react";
import { Text, Pressable } from "react-native";

export type ButtonProps = {
  onPress: any;
  title: string;
  styles: { button?: Record<string, any>; text?: Record<string, any> };
};

export default function Button(props: ButtonProps) {
  const { onPress, title = "Save", styles } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

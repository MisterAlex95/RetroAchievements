import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const colors = ["red", "yellow", "green", "blue", "pink", "grey"];

export const generateStyleSheet = <T extends NamedStyles<T> | NamedStyles<any>>(
  styles: T & NamedStyles<any>,
  debug?: boolean,
): T => {
  if (debug) {
    let i = 0;
    for (const className in styles) {
      if (!("backgroundColor" in styles[className])) {
        styles[className]["backgroundColor"] = colors[i];
        i > colors.length ? (i = 0) : i++;
      }
    }
  }

  return StyleSheet.create(styles);
};

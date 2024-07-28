import React, { ReactNode } from "react";
import {
  DimensionValue,
  Image,
  ImageBackground,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface AchievementPictureProps {
  imageUrl: string;
  needPrefix?: boolean;
  asBackground?: boolean;
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  borderRadius?: number;
  blurRadius?: number;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const AchievementPicture: React.FC<AchievementPictureProps> = (props) => {
  const url =
    "https://retroachievements.org" +
    (props.needPrefix ? "/Badge/" : "") +
    props.imageUrl;

  if (props.asBackground) {
    return (
      <ImageBackground
        source={{ uri: url }}
        style={{
          width: props.width,
          height: props.height,
          borderRadius: props.borderRadius,
          ...(props.style as object),
        }}
        imageStyle={{
          resizeMode: props.resizeMode ?? "cover",
        }}
        blurRadius={props.blurRadius ?? 0}
      >
        {props.children}
      </ImageBackground>
    );
  }

  return (
    <Image
      source={{ uri: url }}
      style={{
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        resizeMode: props.resizeMode ?? "cover",
      }}
      blurRadius={props.blurRadius ?? 0}
    />
  );
};

export default AchievementPicture;

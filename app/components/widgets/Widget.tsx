import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface WidgetProps {
  halfWidth?: boolean;
  doubleHeight?: boolean;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  children?: React.ReactNode;
  type?: string;
}

const Widget: React.FC<WidgetProps> = ({
  halfWidth,
  doubleHeight,
  containerStyle,
  backgroundColor = '#f0f0f0',
  borderRadius = 5,
  padding = 20,
  margin = 10,
  children,
}) => {
  return (
    <View
      style={[
        styles.widget,
        halfWidth && styles.halfWidth,
        (doubleHeight && { height: 200 }),
        { backgroundColor, borderRadius, padding, margin },
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  widget: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '90%',
  },
  halfWidth: {
    width: '40%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Widget;

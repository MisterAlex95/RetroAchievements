import { WidgetProps } from '@/app/types/widget.type';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Widget: React.FC<WidgetProps> = ({
  halfWidth,
  containerStyle,
  backgroundColor = '#f0f0f0',
  borderRadius = 5,
  children,
}) => {
  return (
    <View
      style={[
        styles.widget,
        { width: halfWidth ? '45%' : '100%' },
        {
          backgroundColor,
          borderRadius,
          padding: 20,
        },
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
    width: '100%',
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Widget;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoopContainerWidgetProps {
  count: number;
  renderItem: (index: number) => React.ReactNode;
}

const LoopContainerWidget: React.FC<LoopContainerWidgetProps> = ({
  count,
  renderItem,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.item}>
          {renderItem(index)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    marginVertical: 5,
  },
});

export default LoopContainerWidget;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Widget from './Widget';
import RecentGameWidget, { RecentGameProps } from './RecentGameWidget';
import { WidgetProps } from '@/app/types/widget.type';

export interface LoopContainerWidgetProps {
  type: 'loop-container';
  count: number;
  widget: RecentGameProps;
}

const LoopContainerWidget: React.FC<LoopContainerWidgetProps> = ({
  count,
  widget,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => {
        switch (widget.type) {
          case 'recentGame':
            return (
              <RecentGameWidget
                key={index}
                index={index}
                {...(widget as RecentGameProps)}
              />
            );
          default:
            return <Widget key={index} {...(widget as WidgetProps)} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    marginVertical: 5,
  },
});

export default LoopContainerWidget;

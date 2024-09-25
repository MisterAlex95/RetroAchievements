import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Widget, { WidgetProps } from './Widget';
import ProfileWidget, { ProfileWidgetProps } from './ProfileWidget';
import RecentGameWidget, { RecentGameProps } from './RecentGameWidget';

const widgets: (WidgetProps | ProfileWidgetProps)[] = [
  {
    type: 'profile',
    isRichPresence: true,
    backgroundColor: 'transparent',
  },
  {
    type: 'profile',
    isRichPresence: false,
    backgroundColor: 'transparent',
    containerStyle: { height: 100, padding: 10 },
  },
  {
    type: 'recentGame',
    doubleHeight: true,
    backgroundColor: 'transparent',
    containerStyle: { height: 150, padding: 10 },
  },
  { doubleHeight: true },
  { halfWidth: true, doubleHeight: true },
  { halfWidth: true },
  { doubleHeight: true, halfWidth: true },
  { halfWidth: false },
];

export default () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {widgets.map((widget, index) => {
        switch (widget.type) {
          case 'profile':
            return (
              <ProfileWidget key={index} {...(widget as ProfileWidgetProps)} />
            );
          case 'recentGame':
            return (
              <RecentGameWidget key={index} {...(widget as RecentGameProps)} />
            );
          default:
            return <Widget key={index} {...(widget as WidgetProps)} />;
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

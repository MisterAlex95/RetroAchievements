import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import Widget, { WidgetProps } from './Widget';
import ProfileWidget, { ProfileWidgetProps } from './ProfileWidget';
import RecentGameWidget, { RecentGameProps } from './RecentGameWidget';
import VerticalContainerWidget, {
  VerticalContainerWidgetProps,
} from './VerticalContainerWidget';

const widgets: (
  | WidgetProps
  | ProfileWidgetProps
  | VerticalContainerWidgetProps
  | RecentGameProps
)[] = [
  {
    type: 'profile',
    isRichPresence: true,
    halfWidth: true,
    backgroundColor: 'transparent',
  },
  {
    type: 'vertical-container',
    widgets: [
      {
        type: 'profile',
        isRichPresence: false,
        backgroundColor: 'transparent',
      },
      {
        type: 'profile',
        isRichPresence: false,
        backgroundColor: 'transparent',
      },
    ],
  },
  {
    type: 'profile',
    isRichPresence: false,
    halfWidth: true,
    backgroundColor: 'transparent',
  },
  {
    type: 'profile',
    isRichPresence: false,
    halfWidth: true,
    backgroundColor: 'transparent',
  },

  {
    type: 'profile',
    isRichPresence: false,
    halfWidth: true,
    backgroundColor: 'transparent',
  },
  {
    type: 'profile',
    isRichPresence: false,
    halfWidth: true,
    backgroundColor: 'transparent',
  },

  {
    type: 'profile',
    isRichPresence: false,
    backgroundColor: 'transparent',
  },
  {
    type: 'recentGame',
    doubleHeight: true,
    backgroundColor: 'transparent',
  },
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
          case 'vertical-container':
            return (
              <VerticalContainerWidget
                key={index}
                {...(widget as VerticalContainerWidgetProps)}
              />
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
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

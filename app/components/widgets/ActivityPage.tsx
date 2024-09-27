import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import Widget, { WidgetProps } from './Widget';
import ProfileWidget, { ProfileWidgetProps } from './ProfileWidget';
import RecentGameWidget, { RecentGameProps } from './RecentGameWidget';
import VerticalContainerWidget, {
  VerticalContainerWidgetProps,
} from './VerticalContainerWidget';
import RecentAchievementWidget, {
  RecentAchievementProps,
} from './RecentAchievementWidget';

const widgets: (
  | WidgetProps
  | ProfileWidgetProps
  | VerticalContainerWidgetProps
  | RecentGameProps
  | RecentAchievementProps
)[] = [
  {
    type: 'profile',
    isRichPresence: true,
    backgroundColor: 'transparent',
  },
  {
    type: 'recentAchievement',
    backgroundColor: 'transparent',
  },
  {
    type: 'recentGame',
    index: 0,
    backgroundColor: 'transparent',
  },
  {
    type: 'recentGame',
    index: 1,
    backgroundColor: 'transparent',
  },
  {
    type: 'recentGame',
    index: 2,
    backgroundColor: 'transparent',
  }
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
          case 'recentAchievement':
            return (
              <RecentAchievementWidget
                key={index}
                {...(widget as RecentAchievementProps)}
              />
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

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
import LoopContainerWidget, {
  LoopContainerWidgetProps,
} from './LoopContainerWidgets';

const widgets: (
  | WidgetProps
  | ProfileWidgetProps
  | VerticalContainerWidgetProps
  | RecentGameProps
  | RecentAchievementProps
  | LoopContainerWidgetProps
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
    type: 'loop-container',
    count: 10,
    widget: {
      type: 'recentGame',
      backgroundColor: 'transparent',
    },
  },
];

function generateWidgetComponent(widget: any, index: number) {
  switch (widget.type) {
    case 'profile':
      return <ProfileWidget key={index} {...(widget as ProfileWidgetProps)} />;
    case 'recentGame':
      return <RecentGameWidget key={index} {...(widget as RecentGameProps)} />;
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
    case 'loop-container':
      return (
        <LoopContainerWidget
          key={index}
          {...(widget as LoopContainerWidgetProps)}
        />
      );
    default:
      return <Widget key={index} {...(widget as WidgetProps)} />;
  }
}

export default () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {widgets.map((widget, index) => {
        return generateWidgetComponent(widget, index);
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

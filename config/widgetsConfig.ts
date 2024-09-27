import { LoopContainerWidgetProps } from '../app/components/widgets/LoopContainerWidgets';
import { ProfileWidgetProps } from '../app/components/widgets/ProfileWidget';
import { RecentAchievementProps } from '../app/components/widgets/RecentAchievementWidget';
import { RecentGameProps } from '../app/components/widgets/RecentGameWidget';
import { VerticalContainerWidgetProps } from '../app/components/widgets/VerticalContainerWidget';
import { WidgetProps } from '../app/components/widgets/Widget';

export const widgetsConfig: (
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

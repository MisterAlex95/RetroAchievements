import { ViewStyle } from 'react-native';
import { LoopContainerWidgetProps } from '../components/widgets/LoopContainerWidgets';
import { ProfileWidgetProps } from '../components/widgets/ProfileWidget';
import { RecentAchievementProps } from '../components/widgets/RecentAchievementWidget';
import { RecentGameProps } from '../components/widgets/RecentGameWidget';
import { VerticalContainerWidgetProps } from '../components/widgets/VerticalContainerWidget';

export type WidgetType =
  | 'profile'
  | 'recentAchievement'
  | 'recentGame'
  | 'loop-container'
  | 'vertical-container';

export type WidgetProps = {
  type: WidgetType;
  halfWidth?: boolean;
  doubleHeight?: boolean;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  widgets?: WidgetProps & any[];
  children?: React.ReactNode;
};

export type WidgetListProps =
  | WidgetProps
  | ProfileWidgetProps
  | VerticalContainerWidgetProps
  | RecentGameProps
  | RecentAchievementProps
  | LoopContainerWidgetProps;

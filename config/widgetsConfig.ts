import { WidgetListProps } from '@/app/types/widget.type';

export const widgetsConfig: WidgetListProps[] = [
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

import { StyleSheet, View } from 'react-native';
import ProfileWidget, { ProfileWidgetProps } from './ProfileWidget';
import RecentGameWidget, { RecentGameProps } from './RecentGameWidget';
import Widget from './Widget';
import { WidgetListProps, WidgetProps } from '@/app/types/widget.type';

export interface VerticalContainerWidgetProps {
  type: 'vertical-container';
  widgets: WidgetProps[];
}

const VerticalContainerWidget: React.FC<VerticalContainerWidgetProps> = ({
  widgets,
}) => {
  return (
    <View style={styles.verticalContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    width: '45%',
    flexDirection: 'column',
  },
});

export default VerticalContainerWidget;

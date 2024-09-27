import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Widget from './Widget';
import { useUserRecentAchievements } from '@/app/stores';
import { Colors } from '@/app/constants/Colors';
import { WidgetProps } from '@/app/types/widget.type';

export interface RecentAchievementProps extends WidgetProps {}

const RecentAchievementWidget: React.FC<RecentAchievementProps> = (props) => {
  const {
    data: recentAchievements,
    fetchData: fetchRecentAchievements,
    isFetching: isFetchingRecentAchievements,
  } = useUserRecentAchievements();

  useEffect(() => {
    fetchRecentAchievements();
  }, []);

  if (isFetchingRecentAchievements) {
    return (
      <Widget {...{ containerStyle: { height: 85 }, ...props }}>
        <ActivityIndicator size="large" color={Colors.dark.primary} />
      </Widget>
    );
  }

  return (
    <Widget {...{ containerStyle: { height: 70, padding: 10 }, ...props }}>
      <ScrollView scrollEnabled horizontal style={styles.container}>
        {recentAchievements &&
          recentAchievements.map((ra) => (
            <Image
              key={ra.AchievementID}
              source={{
                uri: 'https://retroachievements.org' + ra.BadgeURL,
              }}
              style={styles.image}
            />
          ))}
      </ScrollView>
    </Widget>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: 50,
  },
});

export default RecentAchievementWidget;

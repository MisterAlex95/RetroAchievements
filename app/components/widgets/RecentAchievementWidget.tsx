import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Widget, { WidgetProps } from './Widget';
import { useUserRecentAchievements } from '@/app/stores';
import { Colors } from '@/app/constants/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';

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
      <View>
        <CircularProgress
          radius={25}
          value={0}
          valueSuffix={'%'}
          progressValueColor="#ffff"
          activeStrokeColor={Colors.dark.primary}
          activeStrokeSecondaryColor={Colors.dark.secondary}
        />
      </View>
    );
  }

  return (
    <Widget {...{ containerStyle: { height: 70, padding:10 }, ...props }}>
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

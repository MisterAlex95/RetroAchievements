import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Widget, { WidgetProps } from './Widget';
import { useGetUserProfileStore, useUserStore } from '@/app/stores';
import { Colors } from '@/app/constants/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';

export interface ProfileWidgetProps extends WidgetProps {
  isRichPresence: boolean;
}

const ProfileWidget: React.FC<ProfileWidgetProps> = (props) => {
  const { username } = useUserStore();
  const { fetchData: fetchProfile, data: user } = useGetUserProfileStore();

  useEffect(() => {
    fetchProfile(username);
  }, []);

  if (!user) {
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
    <Widget
      containerStyle={{
        ...styles.container,
        height: props.isRichPresence ? 210 : 100,
      }}
      {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://retroachievements.org' + user.UserPic }}
          style={styles.image}
        />
        {props.isRichPresence && (
          <>
            <Text style={styles.username}>{user.User}</Text>
            <Text style={styles.richPresence}>{user.RichPresenceMsg}</Text>
          </>
        )}
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.basicText,
  },
  richPresence: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.dark.basicText,
  },
});

export default ProfileWidget;

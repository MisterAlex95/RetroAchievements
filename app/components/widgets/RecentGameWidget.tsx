import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Widget from './Widget';
import {
  useUserStore,
  useUserCompletionProgressStore,
  useUserProgressPerGameStore,
} from '@/app/stores';
import { Colors } from '@/app/constants/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import GamePicture from '../common/GamePicture';
import { WidgetProps } from '@/app/types/widget.type';

export interface RecentGameProps extends WidgetProps {
  index?: number;
}

const RecentGameWidget: React.FC<RecentGameProps> = (props) => {
  const {
    fetchData: fetchUserCompletionProgress,
    data: userCompletionProgress,
    isFetching: isFetchingUserCompletionProgress,
  } = useUserCompletionProgressStore();
  const {
    data: userProgressPerGame,
    isFetching: isFetchingUserProgressPerGame,
  } = useUserProgressPerGameStore();

  useEffect(() => {
    fetchUserCompletionProgress();
  }, []);

  if (
    !userCompletionProgress ||
    isFetchingUserCompletionProgress ||
    isFetchingUserProgressPerGame
  ) {
    return (
      <Widget {...{ containerStyle: { height: 85 }, ...props }}>
        <ActivityIndicator size="large" color={Colors.dark.primary} />
      </Widget>
    );
  }

  const smallerPlatformName = (platformName: string) => {
    switch (platformName) {
      case 'PlayStation 2':
        return 'PS2';
      case 'PlayStation':
        return 'PSX';
      case 'PlayStation Portable':
        return 'PSP';
      case 'NES/Famicom':
        return 'NES';
      default:
        return platformName.match(/\b(\w)/g)?.join('');
    }
  };

  const game = userCompletionProgress.Results[props.index ?? 0];

  if (!game || !userProgressPerGame) return null;

  const gameData = userProgressPerGame[game.GameID];
  if (!gameData) return null;

  return (
    <Widget {...{ containerStyle: { height: 125 }, ...props }}>
      <TouchableOpacity style={styles.container} onPress={() => {}}>
        <GamePicture
          imageUrl={game.ImageIcon}
          width={75}
          height={75}
          borderRadius={5}
          asBackground>
          <View style={{ flex: 1 }}></View>
          <View style={styles.platformContainer}>
            <Text style={styles.platformName}>
              {smallerPlatformName(game.ConsoleName ?? '')}
            </Text>
          </View>
        </GamePicture>

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={styles.gameTitle}>{game.Title}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              <Text style={{ color: Colors.dark.basicText }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {gameData.ScoreAchieved}
                </Text>{' '}
                of{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {gameData.PossibleScore}
                </Text>{' '}
                points
              </Text>
              <Text style={{ color: Colors.dark.basicText }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {gameData.NumAchieved}
                </Text>{' '}
                of{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {gameData.NumPossibleAchievements}
                </Text>{' '}
                achievements
              </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            {gameData && (
              <CircularProgress
                radius={25}
                value={
                  (gameData.NumAchieved / gameData.NumPossibleAchievements) *
                  100
                }
                valueSuffix={'%'}
                progressValueColor="#ffff"
                activeStrokeColor={Colors.dark.primary}
                activeStrokeSecondaryColor={Colors.dark.secondary}
              />
            )}
          </View>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.lastPlaytime}>
            Played on{' '}
            {new Date(game.MostRecentAwardedDate).toLocaleDateString()} at{' '}
            {new Date(game.MostRecentAwardedDate).toLocaleTimeString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Widget>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  gameTitle: {
    color: Colors.dark['base-100'],
    fontWeight: 'bold',
  },
  platformContainer: {
    backgroundColor: '#000000DD',
    borderColor: '#fff',
    borderWidth: 2,
    maxWidth: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 4,
    marginHorizontal: 8,
  },
  platformName: {
    color: Colors.dark['base-100'],
    fontWeight: 'bold',
    fontSize: 10,
  },
  lastPlaytime: {
    marginLeft: 5,
    color: Colors.dark['base-100'],
    fontSize: 10,
  },
});

export default RecentGameWidget;

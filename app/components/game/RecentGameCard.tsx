import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  UserCompletionProgressResult,
  useUserProgressPerGameStore,
} from '../../stores';
import GamePicture from '../common/GamePicture';

export default (props: {
  data?: UserCompletionProgressResult;
  goToGamePage: () => void;
}) => {
  const { data: userProgessPerGame } = useUserProgressPerGameStore();
  if (!props.data || !userProgessPerGame) return;

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

  const game = userProgessPerGame[props.data?.GameID];
  if (!game) return;

  return (
    <TouchableOpacity style={styles.container} onPress={props.goToGamePage}>
      <GamePicture
        imageUrl={props.data.ImageIcon}
        width={100}
        height={100}
        borderRadius={5}
        asBackground>
        <View style={{ flex: 1 }}></View>
        <View style={styles.platformContainer}>
          <Text style={styles.platformName}>
            {smallerPlatformName(props.data.ConsoleName)}
          </Text>
        </View>
      </GamePicture>

      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text style={styles.gameTitle}>{props.data.Title}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <Text style={{ color: Colors.dark.primary }}>
              <Text style={{ fontWeight: 'bold' }}>{game.ScoreAchieved}</Text>{' '}
              of{' '}
              <Text style={{ fontWeight: 'bold' }}>{game.PossibleScore}</Text>{' '}
              points
            </Text>
            <Text style={{ color: Colors.dark.primary }}>
              <Text style={{ fontWeight: 'bold' }}>{game.NumAchieved}</Text> of{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {game.NumPossibleAchievements}
              </Text>{' '}
              achievements
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          {game && (
            <CircularProgress
              radius={25}
              value={(game.NumAchieved / game.NumPossibleAchievements) * 100}
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
          {new Date(props.data.MostRecentAwardedDate).toLocaleDateString()} at{' '}
          {new Date(props.data.MostRecentAwardedDate).toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    margin: 5,
    maxHeight: 100,
    backgroundColor: Colors.dark.neutral,
  },
  gameTitle: {
    marginLeft: 15,
    maxWidth: '75%',
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

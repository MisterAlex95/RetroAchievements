import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, VirtualizedList } from 'react-native';
import { GameTabProps } from '../types';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useGameInfoAndUserProgressStore,
  useUserProgressPerGameStore,
  useUserCompletionProgressStore,
} from '../stores';
import CircularProgress from 'react-native-circular-progress-indicator';
import AchievementCard from '../components/achievement/AchievementCard';
import { useGameExtendedStore } from '../stores/game/useGameExtended.store';
import { Achievement, Achievements } from '../types/common.type';
import GamePicture from '../components/common/GamePicture';

const GameScreen = ({ navigation, route }: GameTabProps) => {
  const { data: userProgressPerGame } = useUserProgressPerGameStore();

  const {
    data: gameInfoAndUserProgress,
    fetchData: fetchGameInfoAndUserProgress,
  } = useGameInfoAndUserProgressStore();

  const { data: userCompletionProgress } = useUserCompletionProgressStore();
  const { data: gameExtended, fetchData: fetchGameExtended } =
    useGameExtendedStore();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.headerContainer}>
          <View style={styles.headerButton}>
            <Ionicons
              onPress={() => {
                navigation.navigate('Home');
              }}
              name="chevron-back"
              size={32}
              color={Colors.dark.basicText}
            />
          </View>
        </View>
      ),
    });

    fetchGameExtended(route.params.gameId);
    fetchGameInfoAndUserProgress(route.params.gameId);
  }, [navigation]);

  const currentGame = userCompletionProgress?.Results.find(
    (r) => r.GameID === route.params.gameId,
  );

  if (!userProgressPerGame || !userProgressPerGame[route.params.gameId])
    return <></>;
  const userProgression = userProgressPerGame[route.params.gameId];
  if (!userProgression) return <></>;
  if (!currentGame || !gameExtended) return <></>;

  const getItem = (_data: Achievements, index: number): Achievement => {
    if (!gameInfoAndUserProgress) return {} as Achievement;
    const achievementsArray = Object.values(gameInfoAndUserProgress.Achievements);

    const achievementEarned = achievementsArray.filter((a) => a.DateEarned);
    const achievementNotEarned = achievementsArray.filter((a) => !a.DateEarned);

    achievementEarned.sort((a, b) => {
      if (!a.DateEarned || !b.DateEarned) return 0;
      return (
        new Date(a.DateEarned).getTime() - new Date(b.DateEarned).getTime()
      );
    });

    return achievementEarned.concat(achievementNotEarned)[index];
  };

  const getItemCount = (_data: unknown) =>
    Object.keys(gameExtended.Achievements).length ?? 0;

  return (
    <View style={styles.container}>
      <GamePicture
        height={250}
        width={'100%'}
        borderRadius={0}
        resizeMode="cover"
        blurRadius={1}
        asBackground
        style={styles.topContainer}
        imageUrl={currentGame.ImageIcon}>
        <View style={styles.innerContainer}>
          <GamePicture
            imageUrl={currentGame.ImageIcon}
            width={100}
            height={100}
          />
          <Text style={styles.textTitle}>{currentGame.Title}</Text>
          <CircularProgress
            radius={25}
            value={
              (userProgression.NumAchieved /
                userProgression.NumPossibleAchievements) *
              100
            }
            valueSuffix={'%'}
            progressValueColor="#ffff"
            activeStrokeColor={Colors.dark.primary}
            activeStrokeSecondaryColor={Colors.dark.secondary}
          />
        </View>
      </GamePicture>
      <VirtualizedList
        style={styles.virtualizeListContainer}
        initialNumToRender={4}
        renderItem={(_) => (
          <AchievementCard
            data={_.item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
  },
  headerButton: {
    width: 50,
    margin: 15,
    marginTop: 25,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topContainer: {
    flex: 1,
    maxHeight: 250,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0, 0.60)',
  },
  virtualizeListContainer: {
    flex: 1,
    width: '100%',
  },
  textTitle: {
    marginTop: 15,
    color: Colors.dark.basicText,
    fontSize: 25,
  },
});

export default GameScreen;

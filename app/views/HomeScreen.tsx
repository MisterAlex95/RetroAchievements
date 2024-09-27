import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import type { HomeScreenProps } from '../types/';
import ActivityPage from '../components/widgets/ActivityPage';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return;
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  virtualizeListContainer: { flex: 1, width: '100%' },
});

export default HomeScreen;

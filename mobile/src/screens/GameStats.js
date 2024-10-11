import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../redux/slices/statsSlice';

const GameStats = () => {
  const dispatch = useDispatch();
  const { wins, losses, draws } = useSelector((state) => state.stats);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Stats for {user.name}</Text>
      <Text style={styles.stat}>Wins: {wins}</Text>
      <Text style={styles.stat}>Losses: {losses}</Text>
      <Text style={styles.stat}>Draws: {draws}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default GameStats;

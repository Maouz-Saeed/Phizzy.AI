import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const recoveryProgress = 65; // Demo data
  const daysUntilWorkout = 3; // Demo data
  const exercises = [
    { id: '1', name: 'Shoulder Rotations', duration: '10 minutes', sets: '3 sets' },
    { id: '2', name: 'Neck Stretches', duration: '8 minutes', sets: '2 sets' },
    { id: '3', name: 'Core Strengthening', duration: '15 minutes', sets: '4 sets' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Message for Suzzy */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Hello, Suzzy! 👋</Text>
          <Text style={styles.welcomeMessage}>
            Welcome back! We're so glad to see you here today. Let's continue your journey to feeling your best.
          </Text>
        </View>

        {/* Recovery Progress Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recovery Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${recoveryProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{recoveryProgress}%</Text>
          </View>
          <Text style={styles.cardSubtext}>Keep up the great work!</Text>
        </View>

        {/* Days Until Workout Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next Workout</Text>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownNumber}>{daysUntilWorkout}</Text>
            <Text style={styles.countdownLabel}>Days Until Scheduled Workout</Text>
          </View>
        </View>

        {/* Exercise List Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Exercises</Text>
          {exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseItem}>
              <View style={styles.exerciseIcon}>
                <Ionicons name="fitness" size={24} color="#0B63F6" />
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>{exercise.duration} • {exercise.sets}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Workouts Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Days Streak</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating nav bar
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A0A0A',
    marginBottom: 12,
  },
  welcomeMessage: {
    fontSize: 20,
    color: '#333',
    lineHeight: 28,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
    marginBottom: 16,
  },
  cardSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0B63F6',
    borderRadius: 12,
  },
  progressText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A0A0A',
    minWidth: 50,
  },
  countdownContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  countdownNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: '#0B63F6',
    marginBottom: 8,
  },
  countdownLabel: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A0A0A',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0B63F6',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
});


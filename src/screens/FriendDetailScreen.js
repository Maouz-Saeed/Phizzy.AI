import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FriendDetailScreen({ route, navigation }) {
  const { friend } = route.params;
  const [isInConnectGroup, setIsInConnectGroup] = useState(false);
  const [hasSharedProgress, setHasSharedProgress] = useState(false);

  // Demo progress data
  const friendProgress = {
    recoveryProgress: 72,
    workoutsCompleted: 15,
    daysStreak: 10,
    lastWorkout: '2 days ago',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#0A0A0A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{friend.name}</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Friend Avatar */}
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: friend.color }]}>
            <Ionicons name="person" size={48} color="#222" />
          </View>
        </View>

        {/* Share Progress Option */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Share Progress</Text>
          <Text style={styles.cardDescription}>
            Share your recovery progress with {friend.name}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, hasSharedProgress && styles.actionButtonSuccess]}
            activeOpacity={0.8}
            onPress={() => setHasSharedProgress(true)}
          >
            <Ionicons
              name={hasSharedProgress ? 'checkmark-circle' : 'share-outline'}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.actionButtonText}>
              {hasSharedProgress ? 'Progress Shared!' : 'Share My Progress'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Connect™ Group Option */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Connect™ Group</Text>
          <Text style={styles.cardDescription}>
            Join {friend.name}'s Connect™ group to stay connected
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.connectButton,
              isInConnectGroup && styles.actionButtonSuccess,
            ]}
            activeOpacity={0.8}
            onPress={() => setIsInConnectGroup(!isInConnectGroup)}
          >
            <Ionicons
              name={isInConnectGroup ? 'people' : 'people-outline'}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.actionButtonText}>
              {isInConnectGroup ? 'In Connect™ Group' : 'Join Connect™ Group'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Friend's Progress Display */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{friend.name}'s Progress</Text>

          {/* Recovery Progress */}
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>Recovery Progress</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${friendProgress.recoveryProgress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>{friendProgress.recoveryProgress}%</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="fitness" size={32} color="#0B63F6" />
              <Text style={styles.statNumber}>{friendProgress.workoutsCompleted}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={32} color="#FF6B9D" />
              <Text style={styles.statNumber}>{friendProgress.daysStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <View style={styles.lastWorkout}>
            <Text style={styles.lastWorkoutText}>
              Last workout: {friendProgress.lastWorkout}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating nav bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
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
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B63F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  connectButton: {
    backgroundColor: '#FF6B9D',
  },
  actionButtonSuccess: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  progressSection: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A0A0A',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0A0A0A',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  lastWorkout: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  lastWorkoutText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});


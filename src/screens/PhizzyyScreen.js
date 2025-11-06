import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhizzyyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.gradientCircle}>
            <Ionicons name="mic" size={64} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.title}>Phizzyy</Text>
        <Text style={styles.subtitle}>Your Voice Assistant</Text>
        <Text style={styles.message}>Coming Soon</Text>
        <Text style={styles.description}>
          Phizzyy will help you with your physiotherapy journey through voice interaction.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEE7FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  gradientCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B9D', // Pink gradient color
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0A0A0A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#666',
    marginBottom: 24,
  },
  message: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0B63F6',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 300,
  },
});


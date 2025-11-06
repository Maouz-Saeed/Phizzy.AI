import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhizzyyMenu({ visible, onClose, onChatPress, onWorkoutPress }) {
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const opacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.blurContainer}>
          <View style={styles.blurView} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  opacity,
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.bubbleButton}
                activeOpacity={0.8}
                onPress={() => {
                  if (onChatPress) onChatPress();
                  onClose();
                }}
              >
                <Text style={styles.bubbleButtonText}>Need a 2 minute chat?</Text>
                <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.bubbleButton, styles.workoutButton]}
                activeOpacity={0.8}
                onPress={() => {
                  if (onWorkoutPress) onWorkoutPress();
                  onClose();
                }}
              >
                <Text style={styles.bubbleButtonText}>Ready to hit this workout?</Text>
                <Ionicons name="fitness-outline" size={24} color="#FFFFFF" style={styles.icon} />
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    width: '100%',
  },
  bubbleButton: {
    backgroundColor: '#FF6B9D',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 32,
    minHeight: 72,
    width: '85%',
    maxWidth: 320,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B9D',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  workoutButton: {
    backgroundColor: '#0B63F6',
    shadowColor: '#0B63F6',
  },
  bubbleButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 12,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 4,
  },
});


import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutRecordingScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);

  // Start timer when recording
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  // Stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    if (!cameraRef.current) return;

    try {
      setRecording(true);
      setPaused(false);
      setRecordingTime(0);
      startTimer();
      
      // Start recording - recordAsync returns a promise that resolves when recording stops
      cameraRef.current.recordAsync({
        quality: '720p',
      }).then((result) => {
        // Recording finished
        console.log('Recording saved:', result.uri);
        setRecording(false);
        setPaused(false);
        stopTimer();
      }).catch((error) => {
        Alert.alert('Error', 'Failed to record video');
        console.error(error);
        setRecording(false);
        setPaused(false);
        stopTimer();
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
      console.error(error);
      setRecording(false);
    }
  };

  const handlePause = () => {
    if (recording) {
      setPaused(true);
      stopTimer();
      // Note: expo-camera doesn't support pause directly, so we'll stop and indicate paused
      // In a real implementation, you might want to handle this differently
    }
  };

  const handleResume = () => {
    if (paused) {
      setPaused(false);
      startTimer();
      // Resume recording logic would go here
    }
  };

  const handleStop = async () => {
    if (cameraRef.current && recording) {
      try {
        await cameraRef.current.stopRecording();
        stopTimer();
        setRecording(false);
        setPaused(false);
        setRecordingTime(0);
        // Navigate back or show completion screen
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to stop recording');
        console.error(error);
      }
    } else {
      navigation.goBack();
    }
  };

  const handleClose = () => {
    if (recording) {
      Alert.alert(
        'Recording in Progress',
        'Are you sure you want to exit? Your recording will be saved.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              handleStop();
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color="#666" />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to record your workout sessions.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="front"
        mode="video"
      >
        {/* Top Bar - Exit Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Recording Indicator */}
        {recording && !paused && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>{formatTime(recordingTime)}</Text>
          </View>
        )}

        {/* Paused Indicator */}
        {paused && (
          <View style={styles.pausedIndicator}>
            <Text style={styles.pausedText}>PAUSED</Text>
          </View>
        )}

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {!recording ? (
            // Start Recording Button
            <TouchableOpacity
              style={styles.recordButton}
              onPress={handleStartRecording}
              activeOpacity={0.8}
            >
              <View style={styles.recordButtonInner}>
                <Text style={styles.recordButtonText}>Start Recording</Text>
              </View>
            </TouchableOpacity>
          ) : paused ? (
            // Resume Button
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleResume}
              activeOpacity={0.8}
            >
              <Ionicons name="play" size={32} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>Resume</Text>
            </TouchableOpacity>
          ) : (
            // Pause Button
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePause}
              activeOpacity={0.8}
            >
              <Ionicons name="pause" size={32} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>Pause</Text>
            </TouchableOpacity>
          )}

          {/* Stop Button (shown when recording) */}
          {recording && (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleStop}
              activeOpacity={0.8}
            >
              <Ionicons name="stop" size={24} color="#FFFFFF" />
              <Text style={styles.stopButtonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#F8F9FA',
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
    marginTop: 24,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#0B63F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  topBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 20,
    right: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  recordingIndicator: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  pausedIndicator: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 20,
    left: 20,
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  pausedText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  bottomControls: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    zIndex: 10,
  },
  recordButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#FF4444',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    minHeight: 80,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  stopButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginLeft: 20,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
});


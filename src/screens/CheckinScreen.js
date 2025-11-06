import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const ORB_SIZE = width * 0.65; 

export default function CheckInScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);

  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.08, { duration: 2000 }), -1, true);
  }, []);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    let interval = null;
    if (!paused) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [paused]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={36} color="black" />
      </TouchableOpacity>

      <Animated.View style={[styles.orbWrapper, orbStyle]}>
        <Image
          source={require("../../assets/phizzyy-icon.webp")} 
          style={styles.orb}
          resizeMode="contain"
        />
      </Animated.View>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => setMuted((p) => !p)}>
          <Ionicons name={muted ? "mic-off" : "mic"} size={34} color="black" />
        </TouchableOpacity>

        <Text style={styles.timer}>{formatTime(seconds)}</Text>

        <TouchableOpacity onPress={() => setPaused((p) => !p)}>
          <Ionicons name={paused ? "play" : "pause"} size={34} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDEEFF", 
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 60,
    right: 25,
    zIndex: 10,
  },
  orbWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
  },
  bottomBar: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    alignItems: "center",
  },
  timer: {
    fontSize: 34,
    fontWeight: "600",
    color: "white",
  },
});
import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import FriendDetailScreen from './src/screens/FriendDetailScreen';
import WorkoutRecordingScreen from './src/screens/WorkoutRecordingScreen';
import PhizzyyMenu from './src/components/PhizzyyMenu';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Floating Tab Bar Component
function CustomTabBar({ state, descriptors, navigation, onPhizzyyPress }) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isPhizzyy = route.name === 'Phizzyy';

          const onPress = () => {
            if (isPhizzyy) {
              // Trigger menu instead of navigation
              if (onPhizzyyPress) {
                onPhizzyyPress();
              }
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName = 'home-outline';
          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'Phizzyy') {
            iconName = 'mic-outline';
          } else if (route.name === 'Friends') {
            iconName = isFocused ? 'people' : 'people-outline';
          }

          if (isPhizzyy) {
            // Emphasized center button for Phizzyy with glass effect
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.phizzyyButton}
                activeOpacity={0.9}
              >
                <View style={styles.phizzyyGlassContainer}>
                  {/* Outer glow */}
                  <View style={styles.phizzyyOuterGlow} />
                  
                  {/* Main glass ball */}
                  <View style={styles.phizzyyGlassBall}>
                    {/* Light reflection overlay */}
                    <View style={styles.phizzyyReflection} />
                    
                    {/* Image */}
                    <Image
                      source={require('./assets/phizzyy-icon.webp')}
                      style={styles.phizzyyImage}
                      resizeMode="contain"
                    />
                    
                    {/* Glass shine overlay */}
                    <View style={styles.phizzyyShine} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }

          // Regular side buttons
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
              activeOpacity={0.8}
            >
              <Ionicons name={iconName} size={24} color={isFocused ? '#0B63F6' : '#999'} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Friends Stack Navigator
function FriendsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FriendsList" component={FriendsScreen} />
      <Stack.Screen name="FriendDetail" component={FriendDetailScreen} />
    </Stack.Navigator>
  );
}

// Placeholder screen for Phizzyy tab (not used, but needed for tab navigator)
function PhizzyyPlaceholder() {
  return null;
}

export default function App() {
  const [phizzyyMenuVisible, setPhizzyyMenuVisible] = React.useState(false);
  const navigationRef = React.useRef(null);

  const handlePhizzyyPress = () => {
    setPhizzyyMenuVisible(true);
  };

  const handleChatPress = () => {
    // Handle chat action - placeholder for now
    console.log('Chat pressed');
    setPhizzyyMenuVisible(false);
  };

  const handleWorkoutPress = () => {
    // Menu will close itself via onClose prop
    if (navigationRef.current) {
      navigationRef.current.navigate('WorkoutRecording');
    }
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs">
            {() => (
              <Tab.Navigator
                tabBar={(props) => (
                  <CustomTabBar {...props} onPhizzyyPress={handlePhizzyyPress} />
                )}
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Phizzyy" component={PhizzyyPlaceholder} />
                <Tab.Screen name="Friends" component={FriendsStack} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="WorkoutRecording" component={WorkoutRecordingScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <PhizzyyMenu
        visible={phizzyyMenuVisible}
        onClose={() => setPhizzyyMenuVisible(false)}
        onChatPress={handleChatPress}
        onWorkoutPress={handleWorkoutPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    minHeight: 44,
  },
  tabButtonFocused: {
    backgroundColor: '#E8E8E8',
  },
  phizzyyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: -25, // Elevate button above nav bar
  },
  phizzyyGlassContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  phizzyyOuterGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    // Iridescent glow with multiple colors
    backgroundColor: '#FF6B9D',
    opacity: 0.6,
    shadowColor: '#FF6B9D',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  phizzyyGlassBall: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // Iridescent gradient effect - using pink/purple/blue
    backgroundColor: '#9C27B0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    // Multiple shadow layers for strong elevation
    shadowColor: '#9C27B0',
    shadowOpacity: 0.8,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 8 },
    elevation: 20,
  },
  phizzyyReflection: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  phizzyyImage: {
    width: 58,
    height: 58,
    zIndex: 3,
    borderRadius: 29,
  },
  phizzyyShine: {
    position: 'absolute',
    top: 12,
    left: 16,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#FFFFFF',
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    zIndex: 4,
  },
});

import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Image, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import HomeScreen from './src/screens/HomeScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import FriendDetailScreen from './src/screens/FriendDetailScreen';
import WorkoutRecordingScreen from './src/screens/WorkoutRecordingScreen';
import PhizzyyMenu from './src/components/PhizzyyMenu';
import CheckInScreen from './src/screens/CheckinScreen';

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

  // Handle notification responses
  const [isNavigationReady, setIsNavigationReady] = React.useState(false);

  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('[App] Notification response received:', response);
      const url = response.notification.request.content.data?.url;
      console.log('[App] URL from notification:', url);
      
      if (url) {
        // Extract the path from the URL
        const path = url.replace('phizzyy://', '').replace('https://phizzyy.app/', '');
        console.log('[App] Navigating to path:', path);
        
        // Wait for navigation to be ready
        const navigate = () => {
          if (navigationRef.current && isNavigationReady) {
            if (path === 'checkin') {
              navigationRef.current.navigate('CheckIn');
            }
          } else {
            // Retry after a short delay
            setTimeout(navigate, 100);
          }
        };
        
        navigate();
      }
    });

    return () => subscription.remove();
  }, [isNavigationReady]);

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

  // Deep linking configuration
  const linking = {
    prefixes: ['phizzyy://', 'https://phizzyy.app'],
    config: {
      screens: {
        MainTabs: {
          screens: {
            Home: 'home',
            Friends: {
              screens: {
                FriendsList: 'friends',
                FriendDetail: 'friends/:friendId',
              },
            },
          },
        },
        WorkoutRecording: 'workout',
        CheckIn: 'checkin',
      },
    },
    async getInitialURL() {
      console.log('[Deep Link] Getting initial URL...');
      
      // First, check if app was opened from a deep link
      const url = await Linking.getInitialURL();
      if (url != null) {
        console.log('[Deep Link] Found deep link URL:', url);
        return url;
      }
      
      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();
      let notificationUrl = response?.notification.request.content.data?.url;
      
      // Transform relative paths to full URLs
      if (notificationUrl && notificationUrl.startsWith('/')) {
        notificationUrl = `phizzyy://${notificationUrl.substring(1)}`;
        console.log('[Deep Link] Transformed notification URL:', notificationUrl);
      }
      
      console.log('[Deep Link] Notification response:', response);
      console.log('[Deep Link] Notification URL:', notificationUrl);
      return notificationUrl;
    },
    subscribe(listener) {
      console.log('[Deep Link] Setting up listeners...');
      
      const onReceiveURL = ({ url }) => {
        console.log('[Deep Link] Received URL from deep link:', url);
        listener(url);
      };
      
      // Listen to incoming links from deep linking
      const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
      
      // Listen to expo push notifications
      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('[Deep Link] Notification tapped:', response);
        let url = response.notification.request.content.data?.url;
        console.log('[Deep Link] Extracted URL from notification:', url);
        
        if (url) {
          // If URL is a relative path, convert it to full URL
          if (url.startsWith('/')) {
            url = `phizzyy://${url.substring(1)}`; // Remove leading slash and add prefix
            console.log('[Deep Link] Transformed URL:', url);
          }
          // Let React Navigation handle the URL
          listener(url);
        } else {
          console.log('[Deep Link] No URL found in notification data');
        }
      });
      
      return () => {
        console.log('[Deep Link] Cleaning up listeners...');
        // Clean up the event listeners
        eventListenerSubscription.remove();
        subscription.remove();
      };
    },
  };

  return (
    <>
      <NavigationContainer 
        ref={navigationRef} 
        linking={linking}
        onReady={() => {
          console.log('[Navigation] Navigation ready');
          setIsNavigationReady(true);
        }}
      >
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
          <Stack.Screen name="CheckIn" component={CheckInScreen} />
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
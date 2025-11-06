import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const friends = [
  { id: '1', name: 'Adam', message: 'Sent you a 🌟 for your progress', feeling: '😊', color: '#FFD580' },
  { id: '2', name: 'Chloe', message: 'Sent you a 💐 for being awesome', feeling: '🙂', color: '#FFB6C1' },
  { id: '3', name: 'Jess', message: 'Sent you a 🍪 for being awesome', feeling: '😡', color: '#FFD580' },
];

const contacts = [{ id: '4', name: 'Melissa', color: '#FFD580' }];

export default function FriendsScreen() {
  const navigation = useNavigation();

  const handleFriendPress = (friend) => {
    navigation.navigate('FriendDetail', { friend });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.inviteBanner}>
          <Text style={styles.inviteText}>INVITE YOUR FRIENDS TODAY</Text>
        </View>

        <Text style={styles.sectionTitle}>Friends</Text>
        {friends.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handleFriendPress(f)}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.avatar, { backgroundColor: f.color }]}>
                <Ionicons name="person" size={32} color="#222" />
              </View>

              <View style={styles.nameContainer}>
                <Text style={styles.name}>{f.name}</Text>
              </View>

              <View style={styles.feelingRow}>
                <Text style={styles.feelingLabel}>They're feeling</Text>
                <Text style={styles.feelingEmoji}>{f.feeling}</Text>
              </View>
            </View>

            <Text style={styles.message}>{f.message}</Text>
            <View style={styles.tapHint}>
              <Text style={styles.tapHintText}>Tap to view details</Text>
              <Ionicons name="chevron-forward" size={20} color="#0B63F6" />
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Find your Contacts</Text>
        {contacts.map((c) => (
          <View key={c.id} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={[styles.avatar, { backgroundColor: c.color }]}>
                <Ionicons name="person" size={32} color="#222" />
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{c.name}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
              <Text style={styles.addBtnText}>ADD FRIEND</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
  },
  scrollContent: { 
    paddingBottom: 120, // Space for floating nav bar
  },

  inviteBanner: {
    backgroundColor: '#1E90FF',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  inviteText: { 
    color: '#fff', 
    fontWeight: '800', 
    fontSize: 20, 
    letterSpacing: 0.5,
  },

  sectionTitle: {
    fontWeight: '800',
    fontSize: 22,
    marginBottom: 16,
    marginLeft: 4,
    marginTop: 8,
    color: '#0A0A0A',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 120,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  nameContainer: {
    flex: 1,
    paddingRight: 12,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A0A0A',
  },

  feelingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  feelingLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },

  feelingEmoji: {
    fontSize: 40,
  },

  message: {
    fontSize: 20,
    color: '#222',
    lineHeight: 28,
    paddingLeft: 0,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },

  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  tapHintText: {
    fontSize: 16,
    color: '#0B63F6',
    fontWeight: '600',
    marginRight: 4,
  },

  addBtn: {
    marginTop: 12,
    backgroundColor: '#0B63F6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    minHeight: 56,
  },
  
  addBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

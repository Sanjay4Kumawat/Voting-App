import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Mock data for voting sessions
  const sessions = [
    {
      id: '1',
      title: 'Best Programming Language',
      createdAt: 'March 15, 2024',
    },
    {
      id: '2',
      title: 'Favorite Movie of 2024',
      createdAt: 'March 14, 2024',
    },
    {
      id: '3',
      title: 'Best Pizza Topping',
      createdAt: 'March 13, 2024',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#E9F5FF" />
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>VotingApp</Text>
      </View>

      {/* Session List */}
      <ScrollView style={styles.scrollView}>
        {sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={styles.card}
            onPress={() => navigation.navigate('Voting', { sessionId: session.id })}
          >
            <Text style={styles.cardTitle}>{session.title}</Text>
            <Text style={styles.cardDate}>{session.createdAt}</Text>
            <TouchableOpacity
              style={styles.voteButton}
              onPress={() => navigation.navigate('Voting', { sessionId: session.id })}
            >
              <Text style={styles.voteButtonText}>Vote Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateSession')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F3F0',
  },
  header: {
    backgroundColor: '#E9F5FF',
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: { 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 3 
      },
      android: { 
        elevation: 3 
      },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFDEDE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  voteButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  voteButtonText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E9F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65 },
      android: { elevation: 8 },
    }),
  },
  fabText: {
    fontSize: 32,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

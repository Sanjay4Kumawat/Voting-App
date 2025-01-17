import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useVoting } from '../context/VotingContext';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { sessions, hasVoted, isResultRevealed } = useVoting();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#E9F5FF" />
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>VotingApp</Text>
          <TouchableOpacity
            style={styles.createdVotesButton}
            onPress={() => navigation.navigate('CreatedVotes')}
          >
            <MaterialIcons name="poll" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Session List */}
      <ScrollView style={styles.scrollView}>
        {sessions.map((session) => (
          <View key={session.id} style={styles.card}>
            <Text style={styles.cardTitle}>{session.title}</Text>
            <Text style={styles.cardDate}>{session.createdAt}</Text>
            
            <View style={styles.buttonContainer}>
              {!hasVoted(session.id) ? (
                <TouchableOpacity
                  style={[styles.button, styles.voteButton]}
                  onPress={() => navigation.navigate('Voting', { sessionId: session.id })}
                >
                  <MaterialIcons name="how-to-vote" size={20} color="#333333" />
                  <Text style={styles.buttonText}>Vote Now</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.votedButton]}
                    disabled={true}
                  >
                    <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                    <Text style={[styles.buttonText, styles.votedButtonText]}>Voted</Text>
                  </TouchableOpacity>

                  {isResultRevealed(session.id) && (
                    <TouchableOpacity
                      style={[styles.button, styles.resultsButton]}
                      onPress={() => navigation.navigate('Result', { sessionId: session.id })}
                    >
                      <MaterialIcons name="bar-chart" size={20} color="#007AFF" />
                      <Text style={[styles.buttonText, styles.resultsButtonText]}>
                        Results
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  voteButton: {
    backgroundColor: '#E9F5FF',
  },
  resultsButton: {
    backgroundColor: '#F0F0F0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  resultsButtonText: {
    color: '#007AFF',
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
  votedButton: {
    backgroundColor: '#E8F5E9',
    flex: 1,
  },
  votedButtonText: {
    color: '#4CAF50',
  },
  createdVotesButton: {
    padding: 8,
  },
});

export default HomeScreen;

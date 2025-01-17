import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useVoting } from '../context/VotingContext';

const CreatedVotesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { sessions, revealResults, isResultRevealed } = useVoting();

  const calculateTotalVotes = (options) => {
    return options.reduce((sum, option) => sum + option.votes, 0);
  };

  const handleRevealResults = (sessionId) => {
    Alert.alert(
      'Reveal Results',
      'Are you sure you want to reveal the results? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Reveal',
          onPress: () => revealResults(sessionId)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#E9F5FF" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Created Votes</Text>
      </View>

      <ScrollView style={styles.content}>
        {sessions.map((session) => (
          <View key={session.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{session.title}</Text>
              <Text style={styles.cardDate}>{session.createdAt}</Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialIcons name="how-to-vote" size={20} color="#666" />
                <Text style={styles.statText}>
                  {calculateTotalVotes(session.options)} votes
                </Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="list" size={20} color="#666" />
                <Text style={styles.statText}>
                  {session.options.length} options
                </Text>
              </View>
            </View>

            {isResultRevealed(session.id) ? (
              <>
                <View style={styles.optionsContainer}>
                  {session.options.map((option) => (
                    <View key={option.id} style={styles.optionItem}>
                      <Text style={styles.optionText}>{option.text}</Text>
                      <Text style={styles.voteCount}>{option.votes} votes</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.viewResultsButton}
                  onPress={() => navigation.navigate('Result', { sessionId: session.id })}
                >
                  <MaterialIcons name="bar-chart" size={20} color="#007AFF" />
                  <Text style={styles.viewResultsText}>View Full Results</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.revealButton}
                onPress={() => handleRevealResults(session.id)}
              >
                <MaterialIcons name="visibility" size={20} color="#FF6B6B" />
                <Text style={styles.revealButtonText}>Reveal Results</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  header: {
    backgroundColor: '#E9F5FF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  voteCount: {
    fontSize: 14,
    color: '#666',
  },
  viewResultsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  viewResultsText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
  },
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
  },
  revealButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default CreatedVotesScreen; 
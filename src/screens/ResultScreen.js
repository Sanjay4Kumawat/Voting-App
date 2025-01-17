import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useVoting } from '../context/VotingContext';

const ResultScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { sessionId } = route.params;
  const { getSession } = useVoting();

  const session = getSession(sessionId);

  const calculateTotalVotes = () => {
    return session.options.reduce((sum, option) => sum + option.votes, 0);
  };

  const calculatePercentage = (votes) => {
    const totalVotes = calculateTotalVotes();
    return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
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
        <Text style={styles.headerTitle}>Voting Results</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Title */}
        <Text style={styles.sessionTitle}>{session.title}</Text>
        
        {/* Total Votes */}
        <View style={styles.totalVotesContainer}>
          <Text style={styles.totalVotesText}>
            Total Votes: {calculateTotalVotes()}
          </Text>
        </View>

        {/* Results */}
        <View style={styles.resultsContainer}>
          {session.options.map((option) => (
            <View key={option.id} style={styles.resultItem}>
              <View style={styles.resultHeader}>
                <Text style={styles.optionName}>{option.text}</Text>
                <Text style={styles.voteCount}>{option.votes} votes</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { 
                      width: `${calculatePercentage(option.votes)}%`,
                      backgroundColor: '#4ECDC4'
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4ECDC4' }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.actionButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  totalVotesContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
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
  totalVotesText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  resultsContainer: {
    marginBottom: 24,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  voteCount: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    height: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 8,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
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
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen; 